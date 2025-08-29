"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Award } from "lucide-react"

interface ReviewSummaryProps {
  averageRating: number
  totalReviews: number
  ratingDistribution: Record<number, number>
  topTags: Array<{ tag: string; count: number }>
  sessionSpecificAverages: {
    punctuality: number
    communication: number
    expertise: number
    helpfulness: number
  }
}

export function ReviewSummary({
  averageRating,
  totalReviews,
  ratingDistribution,
  topTags,
  sessionSpecificAverages,
}: ReviewSummaryProps) {
  const getRatingPercentage = (rating: number) => {
    return totalReviews > 0 ? (ratingDistribution[rating] / totalReviews) * 100 : 0
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Overall Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-400" />
            Overall Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 mt-1">{totalReviews} reviews</div>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{rating}★</span>
                  <Progress value={getRatingPercentage(rating)} className="flex-1 h-2" />
                  <span className="text-sm text-gray-600 w-12">{ratingDistribution[rating] || 0}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Badges */}
          <div className="flex flex-wrap gap-2">
            {averageRating >= 4.8 && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <Award className="h-3 w-3 mr-1" />
                Top Rated
              </Badge>
            )}
            {totalReviews >= 50 && (
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                Experienced
              </Badge>
            )}
            {averageRating >= 4.5 && (
              <Badge className="bg-green-100 text-green-800 border-green-200">Highly Recommended</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Session-Specific Ratings */}
      <Card>
        <CardHeader>
          <CardTitle>Session Quality Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(sessionSpecificAverages).map(([category, average]) => (
              <div key={category}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium capitalize">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(average) ? "fill-blue-400 text-blue-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{average.toFixed(1)}</span>
                  </div>
                </div>
                <Progress value={(average / 5) * 100} className="h-2" />
              </div>
            ))}
          </div>

          {/* Top Tags */}
          <div className="mt-6">
            <h4 className="font-medium mb-3">Most Mentioned Strengths</h4>
            <div className="flex flex-wrap gap-2">
              {topTags.slice(0, 6).map((item) => (
                <Badge key={item.tag} variant="outline" className="text-xs">
                  {item.tag} ({item.count})
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
