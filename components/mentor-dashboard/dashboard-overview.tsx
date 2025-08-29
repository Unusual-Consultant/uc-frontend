"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MessageCircle, DollarSign, Star, Users, Video, FileText, TrendingUp } from "lucide-react"

export function DashboardOverview() {
  const todaySessions = [
    {
      id: 1,
      time: "10:00 AM",
      mentee: "Sarah Johnson",
      topic: "Career Transition",
      type: "Video Call",
      status: "upcoming",
    },
    {
      id: 2,
      time: "2:30 PM",
      mentee: "Mike Chen",
      topic: "Resume Review",
      type: "Chat Session",
      status: "upcoming",
    },
    {
      id: 3,
      time: "4:00 PM",
      mentee: "Emma Davis",
      topic: "Interview Prep",
      type: "Video Call",
      status: "upcoming",
    },
  ]

  const recentMessages = [
    {
      id: 1,
      mentee: "Alex Kumar",
      message: "Thank you for the session! Could you share those resources?",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      mentee: "Lisa Wang",
      message: "I'd like to schedule a follow-up session for next week",
      time: "5 hours ago",
      unread: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">4.9</div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= 4.9 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Based on 127 reviews</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repeat Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-1">34 of 50 clients returned</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Today's Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-blue-600">{session.time}</div>
                    <div>
                      <div className="font-medium">{session.mentee}</div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-1">
                        {session.type === "Video Call" ? (
                          <Video className="h-3 w-3" />
                        ) : (
                          <MessageCircle className="h-3 w-3" />
                        )}
                        <span>{session.topic}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Join
                  </Button>
                </div>
              ))}
              {todaySessions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No sessions scheduled for today</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Recent Messages</span>
              </div>
              <Badge variant="secondary">2 unread</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{message.mentee.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">{message.mentee}</div>
                      <div className="text-xs text-muted-foreground">{message.time}</div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 truncate">{message.message}</div>
                  </div>
                  {message.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                View All Messages
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Schedule Session</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Create Package</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">View Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">Withdraw Funds</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
