"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, MoreVertical, Loader2, Eye, CalendarClock, X, FileText } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import RescheduleForm from "./reshedule_form"
import { cancelBooking } from "@/lib/api"

interface Session {
  id: string | number
  mentorId?: string
  mentorName: string
  mentorTitle: string
  sessionType: string
  date: string
  time: string
  duration: string
  price: string
  status: "confirmed" | "pending" | "processing" | "cancelled" | "rescheduled"
  meetingLink?: string
  notes?: string
}

export function UpcomingSessions() {
  const { makeAuthenticatedRequest } = useAuthenticatedUser()
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<{ [key: string | number]: string }>({})
  const [expandedSession, setExpandedSession] = useState<string | number | null>(null)
  const [rescheduleSessionId, setRescheduleSessionId] = useState<string | number | null>(null)
  const [cancelSessionId, setCancelSessionId] = useState<string | number | null>(null)
  const [paymentSessionId, setPaymentSessionId] = useState<string | number | null>(null)

  // Handle Escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCancelSessionId(null)
        setPaymentSessionId(null)
        setRescheduleSessionId(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Fetch upcoming sessions from backend
  useEffect(() => {
    const fetchUpcomingSessions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const token = localStorage.getItem("auth_token")
        if (!token) {
          console.warn("No auth token found, showing empty state")
          setSessions([])
          setIsLoading(false)
          return
        }

        const response = await makeAuthenticatedRequest(
          `/mentee-dashboard/upcoming-sessions`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch sessions: ${response.status}`)
        }

        const data: Array<{
          id: string
          mentorId?: string
          mentorName: string
          mentorTitle: string
          sessionType: string
          date: string
          time: string
          duration: string
          price: string
          status: string
          meetingLink?: string
          notes?: string
        }> = await response.json()

        // Transform backend data to match frontend format
        const transformedSessions: Session[] = data.map((session) => ({
          id: session.id,
          mentorId: session.mentorId,
          mentorName: session.mentorName,
          mentorTitle: session.mentorTitle,
          sessionType: session.sessionType,
          date: session.date, // Already formatted as "Today", "Tomorrow", etc. by backend
          time: session.time,
          duration: session.duration,
          price: session.price,
          status: (session.status as Session["status"]) || "pending",
          meetingLink: session.meetingLink,
          notes: session.notes
        }))

        setSessions(transformedSessions)
      } catch (err) {
        console.error("Error fetching upcoming sessions:", err)
        setError("Failed to load sessions")
        setSessions([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchUpcomingSessions()
  }, [makeAuthenticatedRequest])

  // Calculate time left for sessions happening today
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const newTimeLeft: { [key: string | number]: string } = {}

      sessions.forEach((session) => {
        if (session.date === "Today" && session.time) {
          // Parse time (e.g., "4:00 PM" or "16:00")
          const timeMatch = session.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)
          if (timeMatch) {
            let hours = parseInt(timeMatch[1])
            const minutes = parseInt(timeMatch[2])
            const ampm = timeMatch[3]?.toUpperCase()

            // Convert to 24-hour format
            if (ampm === "PM" && hours !== 12) hours += 12
            if (ampm === "AM" && hours === 12) hours = 0

            const sessionTime = new Date()
            sessionTime.setHours(hours, minutes, 0, 0)
            const diff = sessionTime.getTime() - now.getTime()

            if (diff > 0) {
              const hoursLeft = Math.floor(diff / (1000 * 60 * 60))
              const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
              newTimeLeft[session.id] = `${hoursLeft}h ${minutesLeft}m`
            } else {
              newTimeLeft[session.id] = "Starting soon"
            }
          }
        }
      })

      setTimeLeft(newTimeLeft)
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [sessions])

  if (isLoading) {
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
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading sessions...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
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
          <div className="text-center py-8">
            <p className="text-red-600 mb-2">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

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
            const isRescheduling = rescheduleSessionId === session.id
            
            return (
            <div
              key={session.id}
              className={`relative rounded-lg p-6 shadow-lg hover:shadow-xl transition-all bg-white overflow-visible ${
                isRescheduling ? "border border-blue-300 shadow-xl" : ""
              }`}
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
                  <div className="w-14 h-14 rounded-full shadow flex items-center justify-center bg-gray-100">
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
                      onClick={() => {
                        if (session.meetingLink) {
                          window.open(session.meetingLink, '_blank')
                        } else {
                          setPaymentSessionId(session.id)
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
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => {
                            setRescheduleSessionId(session.id)
                          }}
                        >
                          <CalendarClock className="mr-2 h-4 w-4" />
                          Re-schedule Session
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCancelSessionId(session.id)
                          }}
                          className="text-red-600 focus:text-red-600"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel Session
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Reschedule Form with animation */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isRescheduling
                    ? "max-h-[600px] opacity-100 mt-6"
                    : "max-h-0 opacity-0 mt-0"
                }`}
                style={{
                  overflow: isRescheduling ? "visible" : "hidden",
                }}
              >
                {isRescheduling && (
                  <div className="p-4 border-t border-blue-100 bg-blue-50/50 rounded-lg pb-6">
                    <RescheduleForm
                      bookingId={String(session.id)}
                      mentorId={session.mentorId || ""}
                      durationMinutes={parseInt(session.duration.replace(/\D/g, '')) || 45}
                      onClose={() => setRescheduleSessionId(null)}
                      onSuccess={() => {
                        // Refresh sessions after successful reschedule
                        const fetchUpcomingSessions = async () => {
                          try {
                            const token = localStorage.getItem("auth_token")
                            if (!token) return

                            const response = await makeAuthenticatedRequest(
                              `/mentee-dashboard/upcoming-sessions`
                            )

                            if (response.ok) {
                              const data = await response.json()
                              const transformedSessions: Session[] = data.map((s: any) => ({
                                id: s.id,
                                mentorName: s.mentorName,
                                mentorTitle: s.mentorTitle,
                                sessionType: s.sessionType,
                                date: s.date,
                                time: s.time,
                                duration: s.duration,
                                price: s.price,
                                status: (s.status as Session["status"]) || "pending",
                                meetingLink: s.meetingLink,
                                notes: s.notes
                              }))
                              setSessions(transformedSessions)
                            }
                          } catch (err) {
                            console.error("Error refreshing sessions:", err)
                          }
                        }
                        fetchUpcomingSessions()
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            )
          })}
        </div>
      </CardContent>
    </Card>

    {/* Cancel Session Modal */}
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
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("auth_token")
                    if (!token) {
                      console.error("No auth token found")
                      return
                    }
                    
                    await cancelBooking(token, String(cancelSessionId))
                    
                    // Refresh sessions after successful cancel
                    const fetchUpcomingSessions = async () => {
                      try {
                        const response = await makeAuthenticatedRequest(
                          `/mentee-dashboard/upcoming-sessions`
                        )
                        if (response.ok) {
                          const data = await response.json()
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
                            notes: session.notes
                          }))
                          setSessions(transformedSessions)
                        }
                      } catch (err) {
                        console.error("Error refreshing sessions:", err)
                      }
                    }
                    
                    fetchUpcomingSessions()
                    setCancelSessionId(null)
                  } catch (err) {
                    console.error("Error cancelling booking:", err)
                    alert(err instanceof Error ? err.message : "Failed to cancel booking")
                  }
                }}
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
              onClick={() => {
                // TODO: Implement payment flow
                console.log("Payment for session:", paymentSessionId)
                setPaymentSessionId(null)
              }}
            >
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

