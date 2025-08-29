"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Video, MessageCircle, Star, Download, Edit, X, CheckCircle, DollarSign } from "lucide-react"

export function MentorshipManagement() {
  const [selectedSession, setSelectedSession] = useState<number | null>(null)
  const [sessionNotes, setSessionNotes] = useState<{ [key: number]: string }>({})

  const upcomingSessions = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:00 AM",
      mentee: "Sarah Johnson",
      topic: "Career Transition Strategy",
      type: "Video Call",
      duration: "60 min",
      price: "₹2,500",
      status: "confirmed",
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "2:30 PM",
      mentee: "Mike Chen",
      topic: "Resume Review & Optimization",
      type: "Chat Session",
      duration: "30 min",
      price: "₹1,200",
      status: "confirmed",
    },
    {
      id: 3,
      date: "2024-01-16",
      time: "11:00 AM",
      mentee: "Emma Davis",
      topic: "Interview Preparation",
      type: "Video Call",
      duration: "45 min",
      price: "₹2,000",
      status: "pending",
    },
  ]

  const completedSessions = [
    {
      id: 4,
      date: "2024-01-12",
      time: "3:00 PM",
      mentee: "Alex Kumar",
      topic: "Product Management Career Path",
      type: "Video Call",
      duration: "60 min",
      price: "₹2,500",
      rating: 5,
      feedback: "Excellent session! Very insightful advice.",
      earnings: "₹2,125", // After platform fee
      hasNotes: true,
    },
    {
      id: 5,
      date: "2024-01-11",
      time: "1:00 PM",
      mentee: "Lisa Wang",
      topic: "Startup Pitch Deck Review",
      type: "Video Call",
      duration: "90 min",
      price: "₹3,500",
      rating: 4,
      feedback: "Great feedback on the pitch deck structure.",
      earnings: "₹2,975",
      hasNotes: false,
    },
  ]

  const handleAddNote = (sessionId: number, note: string) => {
    setSessionNotes((prev) => ({
      ...prev,
      [sessionId]: note,
    }))
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="completed">Completed Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New Session
            </Button>
          </div>

          <div className="grid gap-4">
            {upcomingSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{session.mentee.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{session.mentee}</div>
                        <div className="text-sm text-muted-foreground">{session.topic}</div>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {session.type === "Video Call" ? (
                              <Video className="h-4 w-4" />
                            ) : (
                              <MessageCircle className="h-4 w-4" />
                            )}
                            <span>{session.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{session.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>{session.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline">
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button size="sm">Join Session</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Completed Sessions</h3>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          <div className="grid gap-4">
            {completedSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback>{session.mentee.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">{session.mentee}</div>
                        <div className="text-sm text-muted-foreground">{session.topic}</div>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-medium text-green-600">{session.earnings}</span>
                          </div>
                        </div>

                        {session.feedback && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= session.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-medium">{session.rating}/5</span>
                            </div>
                            <div className="text-sm text-gray-700">{session.feedback}</div>
                          </div>
                        )}

                        {/* Session Notes Section */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Session Notes (Private)</span>
                            {session.hasNotes && (
                              <Badge variant="outline" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Notes Added
                              </Badge>
                            )}
                          </div>
                          {selectedSession === session.id ? (
                            <div className="space-y-2">
                              <Textarea
                                placeholder="Add your private notes about this session..."
                                value={sessionNotes[session.id] || ""}
                                onChange={(e) => handleAddNote(session.id, e.target.value)}
                                className="min-h-[100px]"
                              />
                              <div className="flex space-x-2">
                                <Button size="sm" onClick={() => setSelectedSession(null)}>
                                  Save Notes
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setSelectedSession(null)}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => setSelectedSession(session.id)}>
                              {session.hasNotes ? "Edit Notes" : "Add Notes"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download Summary
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
