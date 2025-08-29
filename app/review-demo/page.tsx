"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReviewForm } from "@/components/reviews/review-form"
import { Star, User, Calendar, Clock } from "lucide-react"

export default function ReviewDemoPage() {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [submittedReview, setSubmittedReview] = useState<any>(null)

  const handleReviewSubmit = async (reviewData: any) => {
    console.log("Review submitted:", reviewData)
    setSubmittedReview(reviewData)
    setShowReviewForm(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review System Demo</h1>
          <p className="text-gray-600">See how mentees can review their sessions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Session Card Example */}
          <Card>
            <CardHeader>
              <CardTitle>Completed Session Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Mock Interview Session</h3>
                    <p className="text-sm text-gray-600">with Sarah Johnson</p>
                    <p className="text-sm text-blue-600">Ex-Google Product Manager</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>60 mins</span>
                  </div>
                  <span className="font-medium text-green-600">₹1600</span>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-yellow-800">Review Pending</span>
                    <span className="text-xs text-yellow-600">3 days left</span>
                  </div>
                  <p className="text-xs text-yellow-700 mb-3">Help other mentees by sharing your experience</p>
                  <Button
                    size="sm"
                    className="bg-yellow-600 hover:bg-yellow-700 w-full"
                    onClick={() => setShowReviewForm(true)}
                  >
                    <Star className="h-3 w-3 mr-1" />
                    Write Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Form or Submitted Review */}
          <div>
            {showReviewForm ? (
              <ReviewForm
                mentorName="Sarah Johnson"
                sessionType="Mock Interview Session"
                onSubmit={handleReviewSubmit}
                onCancel={() => setShowReviewForm(false)}
              />
            ) : submittedReview ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Review Submitted Successfully!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Overall Rating:</span>
                      <div className="flex items-center">
                        {[...Array(submittedReview.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({submittedReview.rating}/5)</span>
                      </div>
                    </div>

                    <div>
                      <span className="font-medium">Review:</span>
                      <p className="text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">"{submittedReview.review}"</p>
                    </div>

                    {submittedReview.tags.length > 0 && (
                      <div>
                        <span className="font-medium">Tags:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {submittedReview.tags.map((tag: string) => (
                            <span key={tag} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <span className="text-sm font-medium">Session Ratings:</span>
                        <div className="space-y-2 mt-2">
                          {Object.entries(submittedReview.sessionSpecific).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                              <span className="text-sm capitalize">{key}:</span>
                              <div className="flex items-center">
                                {[...Array(value as number)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-blue-400 text-blue-400" />
                                ))}
                                <span className="ml-1 text-xs text-gray-600">({value}/5)</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmittedReview(null)
                        setShowReviewForm(false)
                      }}
                      className="w-full mt-4"
                    >
                      Reset Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Review Form Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Click "Write Review" on the session card to see the review form in action.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Overall star rating (1-5)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Session-specific ratings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Skill tags selection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Written review with guidelines</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
