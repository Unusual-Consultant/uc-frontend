"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, MoreVertical } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface Session {
  id: number
  mentorName: string
  mentorTitle: string
  sessionType: string
  date: string
  time: string
  duration: string
  price: string
  status: "confirmed" | "pending" | "processing"
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
    }, 60000)

    return () => clearInterval(interval)
  }, [sessions])

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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming sessions</h3>
            <p className="text-gray-600 mb-4">Book your first session to get started</p>
            <Button className="bg-green-700 hover:bg-green-800">Find Mentors</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
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
          {sessions.map((session) => (
            <div
              key={session.id}
              className="relative rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow bg-white"
            >
              {/* Payment Status Image at Top Right */}
              <div className="absolute top-2 right-2 w-16 h-16"> 
                <Image
                  src={`/${session.status}.png`}
                  alt={session.status}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>

              <div className="flex items-start justify-between">
                {/* Left side - Session info */}
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full shadow flex items-center justify-center">
                    <span className="text-gray-800 font-medium text-base">
                      {session.mentorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    {/* Starting soon badge above title */}
                    {timeLeft[session.id] === "Starting soon" && (
                      <Badge className="bg-yellow-500 text-white mb-1">
                        Starting soon
                      </Badge>
                    )}
                    <h3 className="font-bold text-lg">{session.sessionType}</h3>
                    <p className="text-sm text-gray-600">
                      with {session.mentorName}
                    </p>
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
                      {timeLeft[session.id] &&
                        timeLeft[session.id] !== "Starting soon" && (
                          <Badge variant="outline" className="text-xs">
                            {timeLeft[session.id]}
                          </Badge>
                        )}
                    </div>
                  </div>
                </div>

                {/* Right side - Price, Join & More */}
                <div className="flex flex-col items-end space-y-2 mt-10">
                  {/* Price slightly shifted right */}
                  <div className="font-semibold text-sm text-green-600 pr-1">
                    {session.price}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 h-8 text-xs"
                    >
                      Join
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-8 w-8 p-0"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

