"use client"

import { useState } from "react"
import Image from "next/image"
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
} from "lucide-react"
import { ReviewForm } from "@/components/reviews/review-form"

interface Session {
  id: string
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

const mockSessions: Session[] = [
  {
    id: "1",
    mentorName: "David Kim",
    mentorTitle: "Ex-Netflix Data Scientist",
    mentorImage: "",
    sessionType: "Mock Interview",
    date: "2 days ago",
    duration: "60 mins",
    price: "₹1600",
    status: "completed",
    hasReview: true,
    rating: 5,
    reviewText:
      "Excellent session! David provided detailed feedback on my technical skills and helped me prepare for system design questions.",
    canReview: false,
  },
  {
    id: "2",
    mentorName: "Priya Patel",
    mentorTitle: "Senior PM at Amazon",
    mentorImage: "/placeholder.svg?height=40&width=40",
    sessionType: "Resume Review",
    date: "1 week ago",
    duration: "30 mins",
    price: "₹800",
    status: "completed",
    hasReview: false,
    canReview: true,
    daysLeft: 3,
  },
  {
    id: "3",
    mentorName: "Rahul Sharma",
    mentorTitle: "Product Lead at Flipkart",
    mentorImage: "",
    sessionType: "Career Strategy",
    date: "2 weeks ago",
    duration: "45 mins",
    price: "₹1200",
    status: "completed",
    hasReview: false,
    canReview: false,
    daysLeft: 0,
  },
]

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

export function SessionHistory() {
  const [showReviewForm, setShowReviewForm] = useState<string | null>(null)
  const [sessions, setSessions] = useState(mockSessions)

  const handleReviewSubmit = async (sessionId: string, reviewData: any) => {
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

      {/* Sessions */}
      {sessions.length === 0 ? (
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
                    <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-4 py-1 flex items-center">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Book Again
                    </Button>

                    {/* Message pill */}
                    <Button className="border-black text-black hover:bg-gray-400 bg-white rounded-full px-4 py-1 flex items-center" variant={"outline"}>
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
    </div>
  )
}
