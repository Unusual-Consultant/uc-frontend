"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, Flag, MessageCircle, ChevronDown, ChevronUp } from "lucide-react"

interface Review {
  id: string
  menteeId: string
  menteeName: string
  menteeAvatar?: string
  rating: number
  review: string
  tags: string[]
  sessionType: string
  date: string
  verified: boolean
  helpful: number
  sessionSpecific: {
    punctuality: number
    communication: number
    expertise: number
    helpfulness: number
  }
  mentorResponse?: {
    response: string
    date: string
  }
}

interface ReviewDisplayProps {
  reviews: Review[]
  showAll?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
}

export function ReviewDisplay({ reviews, showAll = false, onLoadMore, hasMore = false }: ReviewDisplayProps) {
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set())
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({})

  const toggleExpanded = (reviewId: string) => {
    setExpandedReviews((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId)
      } else {
        newSet.add(reviewId)
      }
      return newSet
    })
  }

  const handleHelpfulVote = (reviewId: string) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }))
  }

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600">Be the first to leave a review for this mentor!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {displayedReviews.map((review) => {
        const isExpanded = expandedReviews.has(review.id)
        const isLongReview = review.review.length > 200

        return (
          <Card key={review.id} className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{review.menteeName.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.menteeName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{review.sessionType}</span>
                      <span>•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-medium">{review.rating}/5</span>
                  </div>
                </div>
              </div>

              {/* Session-Specific Ratings */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                {Object.entries(review.sessionSpecific).map(([category, rating]) => (
                  <div key={category} className="text-center">
                    <div className="text-xs text-gray-600 capitalize mb-1">{category}</div>
                    <div className="flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${star <= rating ? "fill-blue-400 text-blue-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              {review.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Review Text */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">
                  {isLongReview && !isExpanded ? `${review.review.substring(0, 200)}...` : review.review}
                </p>
                {isLongReview && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(review.id)}
                    className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-800"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Read More
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Mentor Response */}
              {review.mentorResponse && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Mentor Response</span>
                    <span className="text-xs text-blue-600">{review.mentorResponse.date}</span>
                  </div>
                  <p className="text-blue-800 text-sm">{review.mentorResponse.response}</p>
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleHelpfulVote(review.id)}
                    className={`text-sm ${helpfulVotes[review.id] ? "text-green-600" : "text-gray-600"}`}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({review.helpful + (helpfulVotes[review.id] ? 1 : 0)})
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <Flag className="h-4 w-4 mr-1" />
                  Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Load More Button */}
      {!showAll && hasMore && (
        <div className="text-center">
          <Button variant="outline" onClick={onLoadMore} className="bg-transparent">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  )
}
