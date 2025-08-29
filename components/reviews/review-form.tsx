"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, Send, X } from "lucide-react"

interface ReviewFormProps {
  mentorName: string
  sessionType: string
  onSubmit: (review: ReviewData) => void
  onCancel: () => void
}

interface ReviewData {
  rating: number
  review: string
  tags: string[]
  sessionSpecific: {
    punctuality: number
    communication: number
    expertise: number
    helpfulness: number
  }
}

const skillTags = [
  "Clear Explanations",
  "Timely Delivery",
  "Great Communication",
  "Industry Expertise",
  "Practical Advice",
  "Patient Teaching",
  "Well Prepared",
  "Motivational",
  "Problem Solver",
  "Good Listener",
]

export function ReviewForm({ mentorName, sessionType, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sessionRatings, setSessionRatings] = useState({
    punctuality: 0,
    communication: 0,
    expertise: 0,
    helpfulness: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleSessionRating = (category: keyof typeof sessionRatings, value: number) => {
    setSessionRatings((prev) => ({ ...prev, [category]: value }))
  }

  const handleSubmit = async () => {
    if (rating === 0) return

    setIsSubmitting(true)

    const reviewData: ReviewData = {
      rating,
      review,
      tags: selectedTags,
      sessionSpecific: sessionRatings,
    }

    try {
      await onSubmit(reviewData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValid = rating > 0 && review.trim().length >= 10

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Rate Your Session</CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            {sessionType} with {mentorName}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">Overall Rating *</label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
            <span className="ml-3 text-sm text-gray-600">
              {rating > 0 && (
                <>
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </>
              )}
            </span>
          </div>
        </div>

        {/* Session-Specific Ratings */}
        <div>
          <label className="block text-sm font-medium mb-3">Rate Specific Aspects</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(sessionRatings).map(([category, value]) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm capitalize">{category}</span>
                  <span className="text-sm text-gray-500">{value}/5</span>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleSessionRating(category as keyof typeof sessionRatings, star)}
                    >
                      <Star className={`h-4 w-4 ${star <= value ? "fill-blue-400 text-blue-400" : "text-gray-300"}`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">What did they do well? (Select all that apply)</label>
          <div className="flex flex-wrap gap-2">
            {skillTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedTags.includes(tag) ? "bg-green-600 hover:bg-green-700" : "hover:bg-gray-100"
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Written Review */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Written Review * <span className="text-gray-500">(minimum 10 characters)</span>
          </label>
          <Textarea
            placeholder="Share your experience with this mentor. What did you learn? How did they help you? Be specific and constructive..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="text-right text-xs text-gray-500 mt-1">{review.length}/500 characters</div>
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Review Guidelines</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be honest and constructive in your feedback</li>
            <li>• Focus on the mentor's skills and session quality</li>
            <li>• Avoid personal attacks or inappropriate language</li>
            <li>• Your review helps other mentees make informed decisions</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="bg-green-700 hover:bg-green-800"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
