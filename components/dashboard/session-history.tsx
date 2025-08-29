"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, RotateCcw, MessageCircle, StarIcon, Clock, CheckCircle } from "lucide-react"
import { ReviewForm } from "@/components/reviews/review-form"

interface Session {
  id: string
  mentorName: string
  mentorTitle: string
  mentorImage: string
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
    mentorImage: "/placeholder.svg?height=40&width=40",
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
    mentorImage: "/placeholder.svg?height=40&width=40",
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

export function SessionHistory() {
  const [showReviewForm, setShowReviewForm] = useState<string | null>(null)
  const [sessions, setSessions] = useState(mockSessions)

  const handleReviewSubmit = async (sessionId: string, reviewData: any) => {
    console.log("Review submitted for session:", sessionId, reviewData)

    // Update the session to show it has been reviewed
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
          <Button variant="outline" onClick={() => setShowReviewForm(null)} className="mb-4">
            ← Back to Session History
          </Button>
          <ReviewForm
            mentorName={session.mentorName}
            sessionType={session.sessionType}
            onSubmit={(reviewData) => handleReviewSubmit(session.id, reviewData)}
            onCancel={() => setShowReviewForm(null)}
          />
        </div>
      )
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Session History & Feedback
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">Your past mentorship sessions</p>
        </div>
        <Button variant="outline" size="sm" className="bg-transparent">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions yet</h3>
            <p className="text-gray-600 mb-4">Your completed sessions will appear here</p>
            <Button className="bg-green-700 hover:bg-green-800">Book Your First Session</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={session.mentorImage || "/placeholder.svg"}
                      alt={session.mentorName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{session.sessionType}</h3>
                          <p className="text-sm text-gray-600">with {session.mentorName}</p>
                          <p className="text-sm text-blue-600">{session.mentorTitle}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(session.status)}
                          <div className="text-sm text-gray-500 mt-1">{session.date}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                        <span>{session.duration}</span>
                        <span>•</span>
                        <span className="font-medium text-green-600">{session.price}</span>
                      </div>

                      {/* Review Status */}
                      {session.hasReview ? (
                        <div className="mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">Review Submitted</span>
                            <div className="flex items-center space-x-1">
                              {[...Array(session.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">"{session.reviewText}"</p>
                        </div>
                      ) : session.canReview ? (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm font-medium text-yellow-800">Review Pending</span>
                              {session.daysLeft && session.daysLeft > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  {session.daysLeft} days left
                                </Badge>
                              )}
                            </div>
                            <Button
                              size="sm"
                              className="bg-yellow-600 hover:bg-yellow-700 text-white"
                              onClick={() => setShowReviewForm(session.id)}
                            >
                              <StarIcon className="h-3 w-3 mr-1" />
                              Write Review
                            </Button>
                          </div>
                          <p className="text-xs text-yellow-700 mt-2">
                            Help other mentees by sharing your experience with this mentor
                          </p>
                        </div>
                      ) : (
                        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Review period expired</span>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Book Again
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
