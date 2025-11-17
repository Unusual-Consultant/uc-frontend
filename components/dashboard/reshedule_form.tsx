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
  const [timezone, setTimezone] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // ✅ Fetch available dates dynamically
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/availability/${mentorId}?duration=${durationMinutes}`
        );
        const data: AvailabilitySlot[] = await response.json();

        // Extract unique available dates
        const dates = [...new Set(data.map((slot) => slot.date))];
        setAvailableDates(dates);

        // Automatically set timezone from first slot
        if (data.length > 0) setTimezone(data[0].timezone);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch availability data.");
      }
    };

    fetchAvailability();
  }, [mentorId, durationMinutes]);

  // ✅ Fetch available times when a date is selected
  useEffect(() => {
    const fetchTimes = async () => {
      if (!selectedDate) return;
      try {
        const response = await fetch(
          `${API_BASE_URL}/availability/${mentorId}?date=${selectedDate}&duration=${durationMinutes}`
        );
        const data: AvailabilitySlot[] = await response.json();
        setAvailableTimes(data.map((slot) => slot.time));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch available times.");
      }
    };

    fetchTimes();
  }, [selectedDate, mentorId, durationMinutes]);

  const formatDateForDisplay = (dateStr: string): { day: string; formatted: string } => {
    const date = new Date(dateStr);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    return { day, formatted: `${dayNum} ${month}` };
  };

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) {
      setError("Please select both date and time");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const authToken = localStorage.getItem("auth_token");
      const newStart = `${selectedDate}T${selectedTime}`;
      const newEnd = new Date(new Date(newStart).getTime() + durationMinutes * 60000).toISOString();

      await rescheduleBooking(authToken, bookingId, newStart, newEnd, reason || undefined);

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reschedule booking");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-[#003b6b] mb-4">
        Re-schedule Session Details
      </h3>

      {/* Two-column grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {/* LEFT: Date + Timezone */}
        <div className="space-y-6">
          {/* Date */}
          <div>
            <p className="text-sm font-medium mb-2 text-gray-700">New Session Date</p>
            <div className="flex flex-wrap gap-2">
              {availableDates.map((date) => {
                const { day, formatted } = formatDateForDisplay(date);
                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`flex flex-col items-center justify-center px-4 py-2 rounded-md border text-sm w-20 h-16
                      ${
                        selectedDate === date
                          ? "border-[#0073CF] text-[#0073CF] bg-blue-50"
                          : "border-gray-300 hover:bg-gray-100 text-gray-700"
                      }`}
                  >
                    <span className="text-xs">{day}</span>
                    <span className="font-semibold">{formatted}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timezone */}
          <div>
            <p className="text-sm font-medium mb-2 text-gray-700">Time Zone</p>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#0073CF] focus:outline-none"
            >
              <option value="">Select Timezone</option>
              <option value="IST">IST (India)</option>
              <option value="EST">EST (US Eastern)</option>
              <option value="PST">PST (US Pacific)</option>
              <option value="GMT">GMT</option>
            </select>
          </div>
        </div>

        {/* RIGHT: Time + Reason */}
        <div className="space-y-6">
          {/* Time */}
          <div>
            <p className="text-sm font-medium mb-2 text-gray-700">New Session Time</p>
            {!selectedDate ? (
              <div className="text-sm text-gray-500 py-2">Select a date first</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-md border text-sm min-w-[90px] text-center
                      ${
                        selectedTime === time
                          ? "border-[#0073CF] text-[#0073CF] bg-blue-50"
                          : "border-gray-300 hover:bg-gray-100 text-gray-700"
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reason */}
          <div>
            <p className="text-sm font-medium mb-2 text-gray-700">
              Reason for Re-scheduling
            </p>
            <input
              type="text"
              placeholder="Why are you rescheduling?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#0073CF] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Button aligned bottom-right */}
      <div className="flex justify-end mt-10">
        <Button
          className="bg-[#0073CF] hover:bg-[#0063B8] text-white px-8 py-3 rounded-full text-sm font-medium shadow-md transition-all"
          onClick={handleReschedule}
          disabled={!selectedDate || !selectedTime || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Confirm Reschedule"
          )}
        </Button>
      </div>
    </div>
  );
}
