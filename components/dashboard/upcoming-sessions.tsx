"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Clock, Calendar, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"

interface Session {
  id: number
  mentorName: string
  mentorTitle: string
  sessionType: string
  date: string
  time: string
  duration: string
  price: string
  status: string
}

interface UpcomingSessionsProps {
  sessions: Session[]
}

export function UpcomingSessions({ sessions }: UpcomingSessionsProps) {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const newTimeLeft: { [key: number]: string } = {}

      sessions.forEach((session) => {
        if (session.date === "Today") {
          // Mock countdown for today's sessions
          const sessionTime = new Date()
          sessionTime.setHours(16, 0, 0, 0) // 4:00 PM
          const diff = sessionTime.getTime() - now.getTime()

          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            newTimeLeft[session.id] = `${hours}h ${minutes}m`
          } else {
            newTimeLeft[session.id] = "Starting soon"
          }
        }
      })

      setTimeLeft(newTimeLeft)
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [sessions])

  if (sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="mr-2 h-5 w-5" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming sessions</h3>
            <p className="text-gray-600 mb-4">Book your first session to get started</p>
            <Button className="bg-green-700 hover:bg-green-800">Find Mentors</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Video className="mr-2 h-5 w-5" />
          Upcoming Sessions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {session.mentorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{session.sessionType}</h3>
                      <p className="text-sm text-gray-600">with {session.mentorName}</p>
                      <p className="text-sm text-blue-600">{session.mentorTitle}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {session.date} at {session.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {session.duration}
                        </div>
                        {timeLeft[session.id] && (
                          <Badge variant="outline" className="text-xs">
                            {timeLeft[session.id]}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="font-bold text-lg text-green-600">{session.price}</div>
                    <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>{session.status}</Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-green-700 hover:bg-green-800">
                        {session.status === "confirmed" ? "Join" : "Confirm"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
