"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, MoreVertical, X } from "lucide-react";
import RescheduleForm from "./reshedule_form";

interface Session {
  id: number;
  mentorName: string;
  mentorTitle: string;
  sessionType: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  status: "confirmed" | "pending" | "processing";
}

interface UpcomingSessionsProps {
  sessions: Session[];
}

export function UpcomingSessions({ sessions }: UpcomingSessionsProps) {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({});
  const [cancelSessionId, setCancelSessionId] = useState<number | null>(null);
  const [rescheduleSessionId, setRescheduleSessionId] = useState<number | null>(null);
  const [paymentSessionId, setPaymentSessionId] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newTimeLeft: { [key: number]: string } = {};

      sessions.forEach((session) => {
        if (session.date === "Today") {
          const sessionTime = new Date();
          sessionTime.setHours(16, 0, 0, 0);
          const diff = sessionTime.getTime() - now.getTime();

          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            newTimeLeft[session.id] = `${hours}h ${minutes}m`;
          } else {
            newTimeLeft[session.id] = "Starting soon";
          }
        }
      });

      setTimeLeft(newTimeLeft);
    }, 60000);

    return () => clearInterval(interval);
  }, [sessions]);

  // Handle Escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCancelSessionId(null);
        setPaymentSessionId(null);
        setRescheduleSessionId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (sessions.length === 0) {
    return (
      <Card>
        <CardHeader className="pl-2">
          <CardTitle className="flex items-center space-x-2">
            <Image
              src="/ph_video-light.png"
              alt="upcoming sessions"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-[#003b6b]">Upcoming</span>
            <span className="text-text-primary"> Sessions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No upcoming sessions
            </h3>
            <p className="text-gray-600 mb-4">
              Book your first session to get started
            </p>
            <Button className="bg-green-700 hover:bg-green-800">
              Find Mentors
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
  <>
    <Card className="border-0 bg-transparent shadow-none">
      <CardHeader className="pl-2">
        <CardTitle className="flex items-center space-x-2">
          <Image src="/ph_video-light.png" alt="upcoming sessions" width={24} height={24} />
          <span className="text-[#003b6b]">Upcoming</span>
          <span className="text-text-primary"> Sessions</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {sessions.map((session) => {
            const isRescheduling = rescheduleSessionId === session.id;
            const isMenuOpen = openMenuId === session.id;

            return (
              <div
                key={session.id}
                className={`relative rounded-lg p-6 shadow-lg transition-all bg-white ${
                  isRescheduling ? "border border-blue-300 shadow-xl" : ""
                }`}
              >
                {/* Session header */}
                <div className="flex items-start justify-between">
                  {/* Left side info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full shadow flex items-center justify-center bg-gray-100">
                      <span className="text-gray-800 font-medium text-base">
                        {session.mentorName.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      {timeLeft[session.id] === "Starting soon" && (
                        <Badge className="bg-yellow-500 text-white mb-1">Starting soon</Badge>
                      )}
                      <h3 className="font-bold text-lg">{session.sessionType}</h3>
                      <p className="text-sm text-gray-600">with {session.mentorName}</p>
                      <p className="text-sm text-blue-600">{session.mentorTitle}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {session.date} at {session.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {session.duration}
                        </div>
                        {timeLeft[session.id] && timeLeft[session.id] !== "Starting soon" && (
                          <Badge variant="outline" className="text-xs">
                            {timeLeft[session.id]}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right side actions */}
                  <div className="flex flex-col items-end space-y-2 mt-10">
                    <div className="font-semibold text-sm text-green-600 pr-1">{session.price}</div>
                    <div className="flex items-center space-x-2 relative">
                      <Button
                        size="sm"
                        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 h-8 text-xs"
                        onClick={() => setPaymentSessionId(session.id)}
                      >
                        Join Session
                      </Button>

                      {/* kebab menu */}
                      <div className="relative" ref={menuRef}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full h-8 w-8 p-0"
                          onClick={() => setOpenMenuId(isMenuOpen ? null : session.id)}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>

                        {isMenuOpen && (
                          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-[999]">
                            <button
                              onClick={() => {
                                setRescheduleSessionId(session.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              Reschedule Session
                            </button>
                            <button
                              onClick={() => {
                                setCancelSessionId(session.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              Cancel Session
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ✅ Inline Reschedule Form */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isRescheduling
                      ? "max-h-[400px] opacity-100 mt-6"
                      : "max-h-0 opacity-0 mt-0"
                  }`}
                  style={{
                    overflow: isRescheduling ? "visible" : "hidden",
                  }}
                >
                  {isRescheduling && (
                    <div className="p-4 border-t border-blue-100 bg-blue-50/50 rounded-lg">
                      <RescheduleForm onClose={() => setRescheduleSessionId(null)} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>

    {/* Cancel Modal */}
    {cancelSessionId !== null && (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-xl p-6 w-[350px] animate-fadeIn">
          <div className="text-center space-y-3">
            <X className="h-10 w-10 text-red-500 mx-auto" />
            <h2 className="text-lg font-semibold">Cancel Session?</h2>
            <p className="text-sm text-gray-500">Are you sure you want to cancel this session?</p>
            <div className="flex justify-center gap-4 mt-4">
              <Button variant="outline" onClick={() => setCancelSessionId(null)}>
                Go Back
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setCancelSessionId(null)}
              >
                Confirm Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Payment Modal */}
    {paymentSessionId !== null && (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div
          className="rounded-xl shadow-xl p-6 w-[360px] animate-fadeIn text-center"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF66 100%)",
          }}
        >
          <div
            className="relative w-0 h-0 mx-auto mt-2 mb-3"
            style={{
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderBottom: "35px solid #007BFF",
            }}
          >
            <span className="absolute top-[6px] left-[-4px] text-white text-xl font-bold">!</span>
          </div>

          <h2 className="text-lg font-semibold text-gray-900">Complete Your Payment</h2>
          <p className="text-sm text-gray-600 mt-1">
            You need to complete your payment before joining this session.
          </p>

          <div className="flex justify-center gap-6 mt-6">
            <Button
              variant="outline"
              onClick={() => setPaymentSessionId(null)}
              className="rounded-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setPaymentSessionId(null)}
            >
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    )}
  </>
);

}
