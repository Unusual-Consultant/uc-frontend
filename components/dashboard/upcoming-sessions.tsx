"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "@fontsource/mulish/700.css";
import {
  Clock,
  Calendar,
  MoreVertical,
  X,
  CalendarClock,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RescheduleForm from "./reshedule_form";

interface Session {
  id: string | number;
  mentorId?: string;
  mentorName: string;
  mentorTitle: string;
  sessionType: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  status:
    | "confirmed"
    | "pending"
    | "processing"
    | "cancelled"
    | "rescheduled";
  meetingLink?: string;
  notes?: string;
}

export function UpcomingSessions() {
  const { makeAuthenticatedRequest } = useAuthenticatedUser();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [rescheduleSessionId, setRescheduleSessionId] = useState<
    string | number | null
  >(null);
  const [cancelSessionId, setCancelSessionId] = useState<
    string | number | null
  >(null);
  const [paymentSessionId, setPaymentSessionId] = useState<
    string | number | null
  >(null);

  // 🟡 Dynamic Fetch (replace with live API)
  useEffect(() => {
    const fetchUpcomingSessions = async () => {
      try {
        const response = await makeAuthenticatedRequest(
          `/mentee-dashboard/upcoming-sessions`
        );
        if (!response.ok) throw new Error("Failed to fetch sessions");

        const data = await response.json();
        const transformedSessions: Session[] = data.map((session: any) => ({
          id: session.id,
          mentorId: session.mentorId,
          mentorName: session.mentorName,
          mentorTitle: session.mentorTitle,
          sessionType: session.sessionType,
          date: session.date,
          time: session.time,
          duration: session.duration,
          price: session.price,
          status: (session.status as Session["status"]) || "pending",
          meetingLink: session.meetingLink,
          notes: session.notes,
        }));

        setSessions(transformedSessions);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      }
    };

    fetchUpcomingSessions();
  }, [makeAuthenticatedRequest]);

  return (
    <>
      <Card className="border-0 bg-transparent shadow-none">
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
          <div className="space-y-6">
            {sessions.map((session) => {
              const isRescheduling = rescheduleSessionId === session.id;

              return (
                <div
                  key={session.id}
                  className={`relative rounded-lg p-6 shadow-lg hover:shadow-xl transition-all bg-white overflow-visible ${
                    isRescheduling ? "border border-blue-300 shadow-xl" : ""
                  }`}
                >
                  {/* Status Icon */}
                  <div className="absolute -top-3 -right-2 w-24 h-24 flex items-center justify-center">
                    <Image
                      src={`/${
                        session.status === "processing"
                          ? "rescheduled"
                          : session.status
                      }.png`}
                      alt={session.status}
                      width={120}
                      height={120}
                      className="object-contain w-full h-full"
                    />
                  </div>

                  <div className="flex items-start justify-between">
                    {/* Left Info */}
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-full shadow flex items-center justify-center bg-gray-100">
                        <span className="text-gray-800 font-medium text-base">
                          {session.mentorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{session.sessionType}</h3>
                        <p className="text-sm text-gray-600">
                          with {session.mentorName}
                        </p>
                        <p className="text-sm text-blue-600">
                          {session.mentorTitle}
                        </p>

                        {/* 🕓 Date + Duration */}
                        <div className="flex items-center space-x-4 mt-2 text-gray-500 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {session.date} at {session.time}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {session.duration}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Buttons */}
                    <div className="flex flex-col items-end space-y-2 mt-10">
                      <div className="font-semibold text-black font-[22px] pr-10">
                        {session.price}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          className="rounded-full w-[150px] h-[38px] bg-[#0073CF] hover:bg-[#005FAF] text-white text-xs"
                          onClick={() => {
                            if (
                              session.status === "pending" ||
                              session.status === "processing"
                            ) {
                              setPaymentSessionId(session.id);
                            } else if (session.meetingLink) {
                              window.open(session.meetingLink, "_blank");
                            }
                          }}
                        >
                          Join Session
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-48 bg-white border border-gray-200 shadow-md rounded-md"
                          >
                            <DropdownMenuItem
                              onClick={() => setRescheduleSessionId(session.id)}
                              className="hover:bg-[#E6F1FB] hover:text-[#0073CF] transition-all"
                            >
                              <CalendarClock className="mr-2 h-4 w-4" />
                              Re-schedule Session
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setCancelSessionId(session.id)}
                              className="text-red-600 hover:bg-[#FDECEC] hover:text-red-700 transition-all"
                            >
                              <X className="mr-2 h-4 w-4" />
                              Cancel Session
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  {/* Cancel Session Modal */}
                  {cancelSessionId === session.id && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                      <div className="relative bg-white rounded-2xl w-[437px] h-[294px] shadow-lg flex flex-col items-center text-center p-6">
                        <div className="absolute -top-10 flex justify-center w-full">
                          <Image
                            src="/cancel.png"
                            alt="Cancel Icon"
                            width={75}
                            height={75}
                            className="object-contain"
                          />
                        </div>

                        <h2 className="text-[22px] font-[700] text-black mt-10 mb-3 font-mulish">
                          Cancel Session
                        </h2>
                        <p className="text-[15px] text-black mb-3 leading-relaxed">
                          Are you sure you want to cancel this session?
                        </p>
                        <p className="text-[14px] text-black max-w-[90%] mb-8 leading-relaxed">
                          You can reschedule instead if you just need to change
                          the date or time.
                        </p>

                        <div className="flex space-x-6 mt-auto">
                          <Button
                            className="w-[146px] h-[32px] rounded-[33.83px] border border-black bg-white text-black hover:bg-gray-100 text-sm font-medium transition-all"
                            onClick={() => setCancelSessionId(null)}
                          >
                            Go Back
                          </Button>
                          <Button
                            className="w-[146px] h-[32px] rounded-[33.83px] bg-[#E55573] hover:bg-[#C93B5A] text-white text-sm font-medium transition-all"
                            onClick={() => {
                              alert("Session cancelled");
                              setCancelSessionId(null);
                            }}
                          >
                            Confirm Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Modal */}
                  {paymentSessionId === session.id && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                      <div
                        className="relative w-[437px] h-[294px] rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-6"
                        style={{
                          background:
                            "linear-gradient(to bottom, #FFFFFF, #FFFFFF66)",
                        }}
                      >
                        {/* Exclamation Triangle Icon */}
                        <div className="flex items-center justify-center mb-6 mt-2">
                          <svg
                            width="80"
                            height="80"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 85c0 3 2.5 5 5 5h70c2.5 0 5-2 5-5 0-1-0.5-2.5-1-3.5L56 17c-1-2-3-3.5-6-3.5s-5 1.5-6 3.5L11 81.5c-0.5 1-1 2.5-1 3.5z"
                              fill="#0073CF"
                              stroke="#0073CF"
                              strokeWidth="2"
                            />
                            <rect
                              x="46"
                              y="35"
                              width="8"
                              height="25"
                              rx="4"
                              fill="white"
                            />
                            <circle cx="50" cy="70" r="4" fill="white" />
                          </svg>
                        </div>

                        <h2 className="text-[22px] font-[700] text-black mb-3 font-mulish">
                          Complete your Payment
                        </h2>
                        <p className="text-[15px] text-black mb-8 leading-relaxed max-w-[90%]">
                          Complete your payment to confirm your session booking.
                        </p>

                        <div className="flex space-x-10 mt-auto">
                          <Button
                            className="w-[146px] h-[32px] rounded-[33.83px] border border-black bg-white text-black hover:bg-gray-100 text-sm font-medium transition-all"
                            onClick={() => setPaymentSessionId(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="w-[146px] h-[32px] rounded-[33.83px] bg-[#0073CF] hover:bg-[#005FAF] text-white text-sm font-medium transition-all"
                            onClick={() => {
                              alert("Proceeding to payment...");
                              setPaymentSessionId(null);
                            }}
                          >
                            Pay Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reschedule Form */}
                  {isRescheduling && (
                    <div className="p-4 border-t border-grey-600 rounded-lg pb-6">
                      <RescheduleForm
                        bookingId={String(session.id)}
                        mentorId={session.mentorId || ""}
                        durationMinutes={
                          parseInt(session.duration.replace(/\D/g, "")) || 45
                        }
                        onClose={() => setRescheduleSessionId(null)}
                        onSuccess={() => console.log("Mock refresh success")}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
