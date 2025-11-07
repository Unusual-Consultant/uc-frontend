"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  RotateCcw,
  MessageCircle,
  StarIcon,
  Clock,
  CheckCircle,
  Bell,
  Loader2,
} from "lucide-react"
import { ReviewForm } from "@/components/reviews/review-form"
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider"
import { QuickBook } from "@/components/dashboard/quickbook"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface Session {
  id: string
  mentorId?: string
  mentorName: string
  mentorTitle: string
  mentorImage?: string
  sessionType: string
  date: string
  duration: string
  price: string
  status: "completed" | "upcoming" | "cancelled"
  hasReview: boolean
  rating?: number
  reviewText?: string
  canReview: boolean
  daysLeft?: number
}

// Avatar with initials fallback
function MentorAvatar({ name, image }: { name: string; image?: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover"
      />
    )
  }

  return (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-700">
      {initials}
    </div>
  )
}

interface Mentor {
  id: string | number
  name: string
  role: string
  location: string
  company: string
  rating: number
  reviews: number
  price: number
  tags: string[]
  image: string
  expertise: string
  experience?: string
  responseTime?: string
  totalMentees?: number
  successRate?: string
}

export function SessionHistory() {
  const router = useRouter()
  const { makeAuthenticatedRequest } = useAuthenticatedUser()
  const [showReviewForm, setShowReviewForm] = useState<string | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)

  // Fetch session history from backend
  useEffect(() => {
    const fetchSessionHistory = async () => {
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
          `/mentee-dashboard/session-history?limit=20`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch session history: ${response.status}`)
        }

        const data: Array<{
          id: string
          mentorId: string
          mentorName: string
          mentorTitle: string
          mentorImage?: string
          sessionType: string
          date: string
          duration: string
          price: string
          status: string
          hasReview: boolean
          rating?: number
          reviewText?: string
          canReview: boolean
          daysLeft?: number
        }> = await response.json()

        // Transform backend data to match frontend format
        const transformedSessions: Session[] = data.map((session) => ({
          id: session.id,
          mentorId: session.mentorId,
          mentorName: session.mentorName,
          mentorTitle: session.mentorTitle,
          mentorImage: session.mentorImage,
          sessionType: session.sessionType,
          date: session.date,
          duration: session.duration,
          price: session.price,
          status: (session.status as Session["status"]) || "completed",
          hasReview: session.hasReview,
          rating: session.rating,
          reviewText: session.reviewText,
          canReview: session.canReview,
          daysLeft: session.daysLeft,
        }))

        setSessions(transformedSessions)
      } catch (err) {
        console.error("Error fetching session history:", err)
        setError("Failed to load session history")
        setSessions([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSessionHistory()
  }, [makeAuthenticatedRequest])

  const handleReviewSubmit = async (sessionId: string, reviewData: any) => {
    try {
      const response = await makeAuthenticatedRequest(
        `/mentee-dashboard/submit-review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: sessionId,
            rating: reviewData.rating,
            review: reviewData.review,
            tags: reviewData.tags || [],
            sessionSpecific: reviewData.sessionSpecific || {
              punctuality: 0,
              communication: 0,
              expertise: 0,
              helpfulness: 0,
            },
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to submit review")
      }

      // Update the session in the list to reflect the new review
      setSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                hasReview: true,
                rating: reviewData.rating,
                reviewText: reviewData.review,
                canReview: false,
              }
            : session,
        ),
      )
      
      setShowReviewForm(null)
    } catch (err) {
      console.error("Error submitting review:", err)
      alert(err instanceof Error ? err.message : "Failed to submit review. Please try again.")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Upcoming
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (showReviewForm) {
    const session = sessions.find((s) => s.id === showReviewForm)
    if (session) {
      return (
        <div className="space-y-6">
          <Button
            variant="outline"
            onClick={() => setShowReviewForm(null)}
            className="mb-4 rounded-full"
          >
            ← Back to Session History
          </Button>
          <ReviewForm
            mentorName={session.mentorName}
            sessionType={session.sessionType}
            onSubmit={(reviewData) =>
              handleReviewSubmit(session.id, reviewData)
            }
            onCancel={() => setShowReviewForm(null)}
          />
        </div>
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/calendar.png"
              alt="Calendar"
              width={25}
              height={25}
              className="object-contain"
            />
            <h1 className="text-2xl font-semibold">
              <span className="text-[#003b6b] text-2xl">Session</span> History & Feedback
            </h1>
          </div>
          <Button variant="outline" size="sm" className="bg-transparent rounded-full">
            View All
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-1 ml-[38px]">
          Your past membership sessions
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600">Loading session history...</span>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Sessions */}
      {!isLoading && !error && sessions.length === 0 ? (
        <div className="text-center py-8">
          <Image
            src="/calendar.png"
            alt="Calendar"
            width={48}
            height={48}
            className="mx-auto mb-4"
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No sessions yet
          </h3>
          <p className="text-gray-600 mb-4">
            Your completed sessions will appear here
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2">
            Book Your First Session
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition p-4"
            >
              <div className="flex items-start space-x-4">
                <MentorAvatar
                  name={session.mentorName}
                  image={session.mentorImage}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {session.sessionType}
                      </h3>
                      <p className="text-sm text-gray-600">
                        with {session.mentorName}
                      </p>
                      <p className="text-sm text-blue-600">
                        {session.mentorTitle}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(session.status)}
                      <div className="text-sm text-gray-500 mt-1">
                        {session.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                    <span>{session.duration}</span>
                    <span>•</span>
                    <span className="font-medium text-green-600">
                      {session.price}
                    </span>
                  </div>

                  {/* Review Status */}
                  {session.hasReview ? (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          Review Submitted
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(session.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        "{session.reviewText}"
                      </p>
                    </div>
                  ) : session.canReview ? (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Bell className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            Review Pending
                          </span>
                          {session.daysLeft && session.daysLeft > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {session.daysLeft} days left
                            </Badge>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-full px-4 py-1"
                          onClick={() => setShowReviewForm(session.id)}
                        >
                          <StarIcon className="h-3 w-3 mr-1" />
                          Write Review
                        </Button>
                      </div>
                      <p className="text-xs text-yellow-700 mt-2">
                        Help other mentees by sharing your experience with this
                        mentor
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Review period expired
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {/* Book Again pill */}
                    <Button 
                      className="bg-green-700 hover:bg-green-800 text-white rounded-full px-4 py-1 flex items-center"
                      onClick={() => {
                        if (session.mentorId) {
                          // Transform session data to mentor format for QuickBook
                          const mentor: Mentor = {
                            id: session.mentorId,
                            name: session.mentorName,
                            role: session.mentorTitle,
                            location: "Remote", // Default, can be enhanced later
                            company: session.mentorTitle.split(" at ")[1] || session.mentorTitle.split(" at ")[0] || "",
                            rating: 0, // Will be fetched by QuickBook if needed
                            reviews: 0,
                            price: 0, // Will be fetched from session types
                            tags: [],
                            image: session.mentorImage || "/default_pfp.png",
                            expertise: session.mentorTitle,
                          }
                          setSelectedMentor(mentor)
                        }
                      }}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Book Again
                    </Button>

                    {/* Message pill */}
                    <Button 
                      className="border-black text-black hover:bg-gray-400 bg-white rounded-full px-4 py-1 flex items-center" 
                      variant={"outline"}
                      onClick={() => router.push("/quickactions/messages")}
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Book Modal */}
      <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
        <DialogContent className="max-w-3xl w-full rounded-2xl overflow-hidden p-0">
          <VisuallyHidden>
            <DialogTitle>Book {selectedMentor?.name}</DialogTitle>
          </VisuallyHidden>
          {selectedMentor && (
            <QuickBook
              mentor={selectedMentor}
              sessions={[]} // Empty, QuickBook will fetch from backend
              timezones={["IST"]}
              onClose={() => setSelectedMentor(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
