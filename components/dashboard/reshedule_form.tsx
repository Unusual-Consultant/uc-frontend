"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const dates = [
  "Tue 16 Sept",
  "Wed 17 Sept",
  "Sat 20 Sept",
  "Sun 21 Sept",
  "Mon 22 Sept",
  "Mon 25 Sept",
  "Mon 27 Sept",
];

const times = [
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "5:30 PM",
  "7:45 PM",
  "9:30 PM",
];

export default function RescheduleForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timezone, setTimezone] = useState("");
  const [reason, setReason] = useState("");

  return (
    <div className="mt-4 border-t border-gray-200 pt-6 animate-fadeIn">
      <h3 className="text-lg font-semibold text-[#003b6b] mb-4">
        Re-schedule Session details:
      </h3>

      {/* Dates */}
      <div>
        <p className="text-sm font-medium mb-2 text-gray-700">New Session Date</p>
        <div className="flex flex-wrap gap-2">
          {dates.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`px-3 py-2 rounded-md border text-sm ${
                selectedDate === d
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Times */}
      <div className="mt-5">
        <p className="text-sm font-medium mb-2 text-gray-700">New Session Time</p>
        <div className="flex flex-wrap gap-2">
          {times.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`px-3 py-2 rounded-md border text-sm ${
                selectedTime === t
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
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

      {/* Buttons */}
      <div className="flex justify-end mt-6 gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => {
            console.log({
              selectedDate,
              selectedTime,
              timezone,
              reason,
            });
            onClose();
          }}
        >
          Request Re-Schedule
        </Button>
      </div>
    </div>
  );
}
