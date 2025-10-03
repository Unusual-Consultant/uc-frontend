"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calendar,
  MessageCircle,
  DollarSign,
  Star,
  Users,
  Video,
  FileText,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import { ActionPanel } from "../dashboard/action-panel"
import { MentorActionPanel } from "./mentor_action_panel"

export function DashboardOverview() {
  const todaySessions = [
    {
      id: 1,
      time: "10:00 AM",
      mentee: "Sarah Johnson",
      topic: "Career Transition",
      type: "Video Call",
    },
    {
      id: 2,
      time: "2:30 PM",
      mentee: "Mike Chen",
      topic: "Resume Review",
      type: "Chat Session",
    },
    {
      id: 3,
      time: "4:00 PM",
      mentee: "Emma Davis",
      topic: "Interview Prep",
      type: "Video Call",
    },
  ]

  const recentMessages = [
    {
      id: 1,
      mentee: "Alex Kumar",
      message: "Thank you for the session! Could you share those resources?",
      time: "2 hours ago",
      unread: 3,
    },
    {
      id: 2,
      mentee: "Lisa Wang",
      message: "I'd like to schedule a follow-up session for next week",
      time: "5 hours ago",
      unread: 1,
    },
  ]
  // Define mapping once
const sessionTypeIcons: Record<string, string> = {
  "Video Call": "/video.png",
  "Chat Session": "/message.png",
  "Career Transition": "/video.png",
  "Resume Review": "/document.png",
  "Interview Prep": "/video.png",
}


  return (
    <div className="space-y-6"> {/* outermost container is transparent */}
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <Card className="bg-gradient-to-b from-[#B1B3FF] via-[#B1B3FF]/20 to-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
            <div className="w-8 h-8 rounded-full bg-[#6E73F1] flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,230</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </div>
            <div className="mt-2 text-xs">
              <div className="flex justify-between">
                <span>Mentorship: ₹32,400</span>
                <span>Freelance: ₹12,830</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="bg-gradient-to-b from-[#FFC7AF] via-[#FFC7AF]/20 to-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
            <div className="w-8 h-8 rounded-full bg-[#F78553] flex items-center justify-center">
              <Star className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">4.9</div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= Math.round(4.9) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Based on 127 reviews</div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="bg-gradient-to-b from-[#AEFFE3] via-[#AEFFE3]/20 to-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repeat Clients</CardTitle>
            <div className="w-8 h-8 rounded-full bg-[#0BD08D] flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            {/* Slim custom progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-[#0BD08D] h-2 rounded-full" style={{ width: "68%" }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">34 of 50 clients returned</div>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="bg-gradient-to-b from-[#97DFFF] via-[#97DFFF]/20 to-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <div className="w-8 h-8 rounded-full bg-[#5BBFEC] flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-orange-600">3 urgent</span> • 5 regular
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule & Messages Row */}
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule column */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Image src="/calendar.png" alt="Calendar" height={24} width={24} />
              <span>
                <span className="text-[#003C6C]">Today's</span> Schedule
              </span>
            </CardTitle>
          </CardHeader>

          {/* Make CardContent expand to allow equal heights */}
          <CardContent className="flex-1 p-0">
            <div className="rounded-xl bg-[#F8F9FB] border border-[#DADADA] p-6 space-y-4 min-h-[420px] h-full flex flex-col overflow-auto">
              {/* inner white cards */}
              {todaySessions.map((session) => (
  <div
    key={session.id}
    className="flex items-center justify-between p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center space-x-3">
      <div className="text-sm font-medium text-blue-600">{session.time}</div>
      <div>
        <div className="font-medium">{session.mentee}</div>
        <div className="text-sm text-muted-foreground flex items-center space-x-1">
          <Image
            src={sessionTypeIcons[session.type] || "/icons/default.png"}
            alt={session.type}
            height={12}
            width={12}
          />
          <span>{session.topic}</span>
        </div>
      </div>
    </div>

    <Button
      size="sm"
      className="rounded-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-1"
    >
      Join Session
    </Button>
  </div>
))}


              {/* empty state */}
              {todaySessions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground bg-white rounded-lg shadow">
                  No sessions scheduled for today
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages column */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image src="/message.png" alt="message" height={24} width={24} />
                <span>
                  <span className="text-[#003C6C]">Recent</span> Messages
                </span>
              </div>
              <Badge variant="secondary">2 unread</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            <div className="rounded-xl bg-[#F8F9FB] border border-[#DADADA] p-6 space-y-4 min-h-[420px] h-full flex flex-col overflow-auto">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{message.mentee.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">{message.mentee}</div>
                      <div className="text-xs text-muted-foreground">{message.time}</div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 truncate">
                      {message.message}
                    </div>
                  </div>

                  {/* unread count as blue number circle */}
                  {message.unread > 0 && (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">
                      {message.unread}
                    </div>
                  )}
                </div>
              ))}

<div className="flex justify-end">
  <span className="text-gray-500 text-sm cursor-pointer hover:underline">
    View All Messages
  </span>
</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <MentorActionPanel/>
    </div>
  )
}
