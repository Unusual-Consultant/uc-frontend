"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Star, MessageCircle, Flag, Award, Clock, Users, ThumbsUp } from "lucide-react"

export function ReviewsFeedback() {
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const reviewSummary = {
    overallRating: 4.9,
    totalReviews: 127,
    ratingDistribution: [
      { stars: 5, count: 98, percentage: 77 },
      { stars: 4, count: 23, percentage: 18 },
      { stars: 3, count: 4, percentage: 3 },
      { stars: 2, count: 2, percentage: 2 },
      { stars: 1, count: 0, percentage: 0 },
    ],
    topStrengths: [
      { tag: "Excellent Communication", count: 45 },
      { tag: "Actionable Advice", count: 38 },
      { tag: "Industry Expertise", count: 32 },
      { tag: "Quick Response", count: 28 },
      { tag: "Patient & Understanding", count: 25 },
    ],
    qualityBadges: [
      { name: "Top Mentor", icon: Award, description: "Top 5% of mentors" },
      { name: "Quick Responder", icon: Clock, description: "Responds within 2 hours" },
      { name: "Repeat Client Favorite", icon: Users, description: "68% repeat client rate" },
    ],
  }

  const recentReviews = [
    {
      id: 1,
      mentee: "Sarah Johnson",
      rating: 5,
      date: "2024-01-12",
      service: "Career Strategy Session",
      review:
        "Absolutely fantastic session! The mentor provided clear, actionable advice that I could implement immediately. The career roadmap we created together has already helped me identify my next steps.",
      helpful: 8,
      hasResponse: false,
    },
    {
      id: 2,
      mentee: "Mike Chen",
      rating: 5,
      date: "2024-01-10",
      service: "Resume Review",
      review:
        "My resume was completely transformed! The feedback was detailed and the suggestions were spot-on. I got 3 interview calls within a week of implementing the changes.",
      helpful: 12,
      hasResponse: true,
      mentorResponse:
        "Thank you Mike! I'm thrilled to hear about your interview success. Best of luck with the process!",
    },
    {
      id: 3,
      mentee: "Emma Davis",
      rating: 4,
      date: "2024-01-08",
      service: "Mock Interview",
      review:
        "Great practice session with valuable feedback. The mentor was patient and provided specific examples of how to improve my answers. Would definitely book again.",
      helpful: 5,
      hasResponse: false,
    },
    {
      id: 4,
      mentee: "Alex Kumar",
      rating: 5,
      date: "2024-01-05",
      service: "Product Management Consultation",
      review:
        "Exceptional insights into product strategy! The mentor's experience really showed, and I learned practical frameworks I can use in my current role.",
      helpful: 9,
      hasResponse: true,
      mentorResponse: "Thanks Alex! Feel free to reach out if you need help implementing those frameworks.",
    },
  ]

  const handleReply = (reviewId: number) => {
    // Handle reply submission
    setReplyingTo(null)
    setReplyText("")
  }

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Review Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{reviewSummary.overallRating}</div>
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= reviewSummary.overallRating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Based on {reviewSummary.totalReviews} reviews</div>
            </div>

            <div className="space-y-2">
              {reviewSummary.ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm">{rating.stars}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  </div>
                  <Progress value={rating.percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-8">{rating.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Strengths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {reviewSummary.topStrengths.map((strength, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{strength.tag}</span>
                  <Badge variant="secondary">{strength.count}</Badge>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Quality Badges</h4>
              <div className="space-y-2">
                {reviewSummary.qualityBadges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                    <badge.icon className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">{badge.name}</div>
                      <div className="text-xs text-muted-foreground">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentReviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback>{review.mentee.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">{review.mentee}</div>
                        <div className="text-sm text-muted-foreground">{review.service}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">{review.date}</div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-700 mb-3">{review.review}</div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{review.helpful} found helpful</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Flag className="h-4 w-4 mr-1" />
                          Flag
                        </Button>
                        {!review.hasResponse && (
                          <Button size="sm" onClick={() => setReplyingTo(review.id)}>
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Mentor Response */}
                    {review.hasResponse && review.mentorResponse && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-900 mb-1">Your Response:</div>
                        <div className="text-sm text-blue-800">{review.mentorResponse}</div>
                      </div>
                    )}

                    {/* Reply Form */}
                    {replyingTo === review.id && (
                      <div className="mt-4 space-y-3">
                        <Textarea
                          placeholder="Write a public response to this review..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleReply(review.id)}>
                            Post Response
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
