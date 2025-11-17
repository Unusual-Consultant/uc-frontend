"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Send,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider";
import { fetchMessages, sendMessage, markMessageAsRead, Message } from "@/lib/api";

export default function MessagesPage() {
  const { makeAuthenticatedRequest, user } = useAuthenticatedUser();
  const [selectedTab, setSelectedTab] = useState("scheduled");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [replies, setReplies] = useState<{ [key: string]: string }>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sendingReply, setSendingReply] = useState<{ [key: string]: boolean }>({});

  const tabs = [
    { id: "scheduled", label: "Scheduled Session Messages" },
    { id: "requests", label: "Message Requests" },
    { id: "all", label: "All Messages" },
  ];

  // Fetch messages when tab changes
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const authToken = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
        if (!authToken) {
          setError("Please sign in to view messages");
          setMessages([]);
          return;
        }

        const data = await fetchMessages(authToken, selectedTab);
        
        if (data) {
          setMessages(data.messages || []);
        } else {
          setError("Failed to load messages");
          setMessages([]);
        }
      } catch (err) {
        console.error("Error loading messages:", err);
        setError(err instanceof Error ? err.message : "Failed to load messages");
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [selectedTab, user]);

  const tabPillText =
    selectedTab === "scheduled"
      ? "Scheduled Session"
      : selectedTab === "requests"
      ? "Message Request"
      : "All Messages";

  const handleToggleExpand = async (messageId: string) => {
    const isExpanding = expandedCard !== messageId;
    setExpandedCard(expandedCard === messageId ? null : messageId);
    
    // Mark message as read when expanding
    if (isExpanding) {
      const authToken = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
      if (authToken) {
        await markMessageAsRead(authToken, messageId);
        // Refresh messages to update unread counts
        const data = await fetchMessages(authToken, selectedTab);
        if (data) {
          setMessages(data.messages || []);
        }
      }
    }
  };

  const handleSendReply = async (messageId: string, mentorId: string, replyContent: string, sessionId?: string) => {
    if (!replyContent.trim()) {
      return;
    }

    try {
      setSendingReply({ ...sendingReply, [messageId]: true });
      
      const authToken = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
      if (!authToken) {
        setError("Please sign in to send messages");
        return;
      }

      const sentMessage = await sendMessage(authToken, mentorId, replyContent, sessionId);
      
      if (sentMessage) {
        // Clear reply input
        setReplies({ ...replies, [messageId]: "" });
        
        // Refresh messages
        const data = await fetchMessages(authToken, selectedTab);
        if (data) {
          setMessages(data.messages || []);
        }
      } else {
        setError("Failed to send reply");
      }
    } catch (err) {
      console.error("Error sending reply:", err);
      setError(err instanceof Error ? err.message : "Failed to send reply");
    } finally {
      setSendingReply({ ...sendingReply, [messageId]: false });
    }
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
        <CardContent className="space-y-10 max-h-[70vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Loading messages...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button
                onClick={() => {
                  const authToken = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
                  if (authToken) {
                    fetchMessages(authToken, selectedTab).then(data => {
                      if (data) {
                        setMessages(data.messages || []);
                        setError(null);
                      }
                    });
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Retry
              </Button>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages</h3>
              <p className="text-gray-600">
                {selectedTab === "scheduled" 
                  ? "You don't have any messages related to scheduled sessions."
                  : selectedTab === "requests"
                  ? "You don't have any message requests."
                  : "You don't have any messages yet."}
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={msg.id} className="relative">
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
                        {expandedCard !== msg.id && (
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
                        onClick={() => handleToggleExpand(msg.id)}
                        className="p-1 mt-1 rounded-full hover:bg-gray-100 transition relative z-10"
                      >
                        {expandedCard === msg.id ? (
                          <ChevronUp className="w-4 h-4 text-gray-700" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-700" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Section */}
                  {expandedCard === msg.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-6">
                      {/* Subject & Session */}
                      {(msg.subject || msg.title) && (
                        <div className="flex justify-evenly text-center gap-10">
                          {msg.subject && (
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                                Subject
                              </p>
                              <p className="text-sm font-medium text-gray-800">
                                {msg.subject}
                              </p>
                            </div>
                          )}
                          {msg.title && (
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                                Session
                              </p>
                              <p className="text-sm font-medium text-gray-800">
                                {msg.title}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

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
                            Reply to mentor
                          </div>
                          <input
                            type="text"
                            value={replies[msg.id] || ""}
                            onChange={(e) =>
                              setReplies({ ...replies, [msg.id]: e.target.value })
                            }
                            placeholder="Type your reply..."
                            className="w-full border border-[#0073CF] rounded-xl px-4 py-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0073CF]/30"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSendReply(msg.id, msg.mentor_id, replies[msg.id] || "", msg.session_id);
                              }
                            }}
                          />
                        </div>

                        <Button
                          size="sm"
                          onClick={() => handleSendReply(msg.id, msg.mentor_id, replies[msg.id] || "", msg.session_id)}
                          disabled={!replies[msg.id]?.trim() || sendingReply[msg.id]}
                          className="rounded-full bg-[#0073CF] hover:bg-[#005fa3] px-6 py-2 text-white font-medium flex items-center gap-1 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {sendingReply[msg.id] ? (
                            <>
                              <Loader2 className="w-4 h-4 text-white animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 text-white" />
                              Send Reply
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
