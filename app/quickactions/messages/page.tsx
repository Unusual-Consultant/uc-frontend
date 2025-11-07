"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const [selectedTab, setSelectedTab] = useState("scheduled");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [replies, setReplies] = useState<{ [key: number]: string }>({});

  const tabs = [
    { id: "scheduled", label: "Scheduled Session Messages" },
    { id: "requests", label: "Message Requests" },
    { id: "all", label: "All Messages" },
  ];

  const messages = [
    {
      mentor: "John Carter",
      time: "2h ago",
      postTime: "10:30 AM",
      message:
        "Hey! Excited for our session later today — please check the pre-reading material and confirm your availability.",
      subject: "Frontend Development",
      title: "Building Responsive Layouts",
      profile: "/avatars/avatar1.png",
      notifications: 1,
    },
    {
      mentor: "Sara Williams",
      time: "5h ago",
      postTime: "7:00 AM",
      message:
        "I’ve uploaded the design mockups for the dashboard revamp. Let’s review them tomorrow morning and finalize the structure.",
      subject: "UI/UX Mentorship",
      title: "User Experience Principles",
      profile: "",
      notifications: 2,
    },
  ];

  const tabPillText =
    selectedTab === "scheduled"
      ? "Scheduled Session"
      : selectedTab === "requests"
      ? "Message Request"
      : "All Messages";

  const handleToggleExpand = (idx: number) => {
    setExpandedCard(expandedCard === idx ? null : idx);
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center p-6 md:p-10">
      {/* Header */}
      <div className="w-full max-w-[1243px] flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          className="p-2 hover:bg-transparent"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </Button>
        <MessageCircle className="w-6 h-6 text-gray-700" />
        <h1 className="text-2xl font-semibold text-gray-900 ml-2">Messages</h1>
      </div>

      {/* Pill Bar */}
      <div className="flex justify-center items-center w-full max-w-[1243px] mb-10 bg-white rounded-[40px] shadow-[0_3px_6px_#9F9D9D30] border border-gray-200 py-2 px-4">
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={cn(
                "text-sm md:text-base font-medium px-5 py-2 rounded-full transition-all duration-200",
                selectedTab === tab.id
                  ? "bg-[#0073CF] text-white shadow-md"
                  : "text-gray-700 hover:text-[#0073CF] hover:bg-[#EAF3FF]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Container */}
      <Card className="bg-[#ECF7FF] border-2 border-white shadow-sm rounded-xl p-6 w-full max-w-[1243px] mt-4">
        <CardContent className="space-y-10 max-h-[70vh] overflow-y-hidden cursor-grab active:cursor-grabbing">
          {messages.map((msg, idx) => (
            <div key={idx} className="relative">
              {/* Pill Tag */}
              <div className="absolute -top-3 left-5 z-10">
                <div className="bg-[#0073CF] text-white text-xs font-medium px-4 py-1 rounded-full shadow-md">
                  {tabPillText}
                </div>
              </div>

              {/* Message Card */}
              <div className="bg-white rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition relative overflow-visible mt-3">
                {/* Top Row */}
                <div className="flex justify-between items-start">
                  {/* Left side */}
                  <div className="flex items-start gap-3">
                    {/* Profile / Initials */}
                    {msg.profile ? (
                      <Image
                        src={msg.profile}
                        alt={msg.mentor}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#0073CF] text-white flex items-center justify-center font-semibold text-sm">
                        {getInitials(msg.mentor)}
                      </div>
                    )}

                    {/* Mentor Info + Message */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-gray-800 font-medium">
                        <span>{msg.mentor}</span>
                        <span className="text-gray-400 text-xs">• {msg.time}</span>
                      </div>
                      {expandedCard !== idx && (
                        <p className="text-gray-700 text-sm mt-1">{msg.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Right side: post time, notification, dropdown */}
                  <div className="flex flex-col items-center gap-1 relative">
                    <span className="text-xs text-gray-500">{msg.postTime}</span>
                    {msg.notifications > 0 && (
                      <div className="bg-[#0073CF] text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm z-20">
                        {msg.notifications}
                      </div>
                    )}
                    <button
                      onClick={() => handleToggleExpand(idx)}
                      className="p-1 mt-1 rounded-full hover:bg-gray-100 transition relative z-10"
                    >
                      {expandedCard === idx ? (
                        <ChevronUp className="w-4 h-4 text-gray-700" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-700" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Section */}
                {expandedCard === idx && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-6">
                    {/* Subject & Session */}
                    <div className="flex justify-evenly text-center gap-10">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                          Subject
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {msg.subject}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                          Session
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {msg.title}
                        </p>
                      </div>
                    </div>

                    {/* Full Message Section */}
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase mb-2">
                        Message
                      </p>
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {msg.message}
                      </p>
                    </div>

                    {/* Reply Box */}
                    <div className="space-y-3">
                      <div className="relative">
                        <div className="absolute -top-2 left-6 bg-white px-2 text-[#0073CF] text-xs font-semibold">
                          Reply to mentee
                        </div>
                        <input
                          type="text"
                          value={replies[idx] || ""}
                          onChange={(e) =>
                            setReplies({ ...replies, [idx]: e.target.value })
                          }
                          placeholder="Type your reply..."
                          className="w-full border border-[#0073CF] rounded-xl px-4 py-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0073CF]/30"
                        />
                      </div>

                      <Button
                        size="sm"
                        className="rounded-full bg-[#0073CF] hover:bg-[#005fa3] px-6 py-2 text-white font-medium flex items-center gap-1 ml-auto"
                      >
                        <Send className="w-4 h-4 text-white" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
