"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { rescheduleBooking } from "@/lib/api";
import { API_BASE_URL } from "@/lib/api";

interface AvailabilitySlot {
  date: string;
  time: string;
  timezone: string;
  available: boolean;
}

export default function RescheduleForm({
  onClose,
  bookingId,
  mentorId,
  durationMinutes = 45,
  onSuccess,
}: {
  onClose: () => void;
  bookingId: string;
  mentorId: string;
  durationMinutes?: number;
  onSuccess?: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timezone, setTimezone] = useState("IST");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Availability states
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true);

  // Fetch availability on mount
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!mentorId) {
        setIsLoadingAvailability(false);
        return;
      }
      
      try {
        setIsLoadingAvailability(true);
        const today = new Date().toISOString().split('T')[0];
        const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        const response = await fetch(
          `${API_BASE_URL}/bookings/mentors/${mentorId}/availability?start_date=${today}&end_date=${endDate}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch availability: ${response.status}`);
        }
        
        const data = await response.json();
        const slots: AvailabilitySlot[] = (data.available_slots || []) as AvailabilitySlot[];
        setAvailabilitySlots(slots);
        
        // Extract unique dates
        const dates: string[] = [...new Set(slots.map((slot: AvailabilitySlot) => slot.date))];
        setAvailableDates(dates.sort());
        
        // Filter times for first date if none selected
        if (dates.length > 0 && !selectedDate) {
          updateAvailableTimes(dates[0], slots);
        }
      } catch (err) {
        console.error("Error fetching availability:", err);
        setError("Failed to load availability");
      } finally {
        setIsLoadingAvailability(false);
      }
    };
    
    fetchAvailability();
  }, [mentorId]);

  // Update available times when date is selected
  const updateAvailableTimes = (date: string | null, slots: AvailabilitySlot[]) => {
    if (!date) {
      setAvailableTimes([]);
      return;
    }
    
    const timesForDate = slots
      .filter(slot => slot.date === date && slot.available)
      .map(slot => {
        // Convert 24-hour format (HH:MM) to 12-hour format (h:mm AM/PM)
        const [hours, minutes] = slot.time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
      })
      .sort((a, b) => {
        // Sort by time
        const timeA = a.match(/(\d+):(\d+)\s*(AM|PM)/i);
        const timeB = b.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!timeA || !timeB) return 0;
        
        let hoursA = parseInt(timeA[1]);
        const minutesA = parseInt(timeA[2]);
        const ampmA = timeA[3].toUpperCase();
        if (ampmA === 'PM' && hoursA !== 12) hoursA += 12;
        if (ampmA === 'AM' && hoursA === 12) hoursA = 0;
        
        let hoursB = parseInt(timeB[1]);
        const minutesB = parseInt(timeB[2]);
        const ampmB = timeB[3].toUpperCase();
        if (ampmB === 'PM' && hoursB !== 12) hoursB += 12;
        if (ampmB === 'AM' && hoursB === 12) hoursB = 0;
        
        if (hoursA !== hoursB) return hoursA - hoursB;
        return minutesA - minutesB;
      });
    
    setAvailableTimes(timesForDate);
  };

  // Update times when date changes
  useEffect(() => {
    if (selectedDate) {
      updateAvailableTimes(selectedDate, availabilitySlots);
    }
  }, [selectedDate, availabilitySlots]);

  // Format date for display (e.g., "Mon 27 Sept")
  const formatDateForDisplay = (dateStr: string): string => {
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    return `${dayName} ${dayNum} ${month}`;
  };

  // Parse time string like "9:30 PM" to hours and minutes
  const parseTime = (timeStr: string): { hours: number; minutes: number } | null => {
    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!timeMatch) return null;
    
    let hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);
    const ampm = timeMatch[3].toUpperCase();
    
    if (ampm === "PM" && hours !== 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;
    
    return { hours, minutes };
  };

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) {
      setError("Please select both date and time");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Parse date (YYYY-MM-DD) and time
      const date = new Date(selectedDate);
      const time = parseTime(selectedTime);
      
      if (!time) {
        setError("Invalid time format");
        return;
      }

      // Create datetime objects
      const startDateTime = new Date(date);
      startDateTime.setHours(time.hours, time.minutes, 0, 0);
      
      const endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(endDateTime.getMinutes() + durationMinutes);

      // Convert to ISO strings
      const newScheduledStart = startDateTime.toISOString();
      const newScheduledEnd = endDateTime.toISOString();

      // Get auth token
      const authToken = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
      if (!authToken) {
        setError("Please sign in to reschedule");
        return;
      }

      // Call reschedule API
      await rescheduleBooking(
        authToken,
        bookingId,
        newScheduledStart,
        newScheduledEnd,
        reason || undefined
      );

      // Success - close form and refresh
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (err) {
      console.error("Error rescheduling booking:", err);
      setError(err instanceof Error ? err.message : "Failed to reschedule booking");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <h3 className="text-lg font-semibold text-[#003b6b] mb-4">
        Re-schedule Session details:
      </h3>

      {/* Dates */}
      <div>
        <p className="text-sm font-medium mb-2 text-gray-700">New Session Date</p>
        {isLoadingAvailability ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-2" />
            <span className="text-sm text-gray-600">Loading available dates...</span>
          </div>
        ) : availableDates.length === 0 ? (
          <div className="text-center py-4 text-sm text-gray-500">
            No available dates found for this mentor.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {availableDates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-3 py-2 rounded-md border text-sm ${
                  selectedDate === date
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {formatDateForDisplay(date)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Times */}
      <div className="mt-5">
        <p className="text-sm font-medium mb-2 text-gray-700">New Session Time</p>
        {!selectedDate ? (
          <div className="text-center py-2 text-sm text-gray-500">
            Please select a date first
          </div>
        ) : isLoadingAvailability ? (
          <div className="flex items-center justify-center py-2">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          </div>
        ) : availableTimes.length === 0 ? (
          <div className="text-center py-2 text-sm text-gray-500">
            No available times for the selected date.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-2 rounded-md border text-sm ${
                  selectedTime === time
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Time zone */}
      <div className="mt-5">
        <p className="text-sm font-medium mb-2 text-gray-700">Time Zone</p>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="">Select Timezone</option>
          <option value="IST">IST (India)</option>
          <option value="EST">EST (US Eastern)</option>
          <option value="PST">PST (US Pacific)</option>
          <option value="GMT">GMT</option>
        </select>
      </div>

      {/* Reason */}
      <div className="mt-5">
        <p className="text-sm font-medium mb-2 text-gray-700">
          Reason for Re-scheduling
        </p>
        <input
          type="text"
          placeholder="Why are you rescheduling?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end mt-6 gap-3">
        <Button 
          variant="outline" 
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleReschedule}
          disabled={!selectedDate || !selectedTime || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Request Re-Schedule"
          )}
        </Button>
      </div>
    </div>
  );
}
