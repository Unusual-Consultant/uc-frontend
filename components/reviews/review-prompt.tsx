"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Clock, X } from "lucide-react"

interface ReviewPromptProps {
  sessionId: string
  mentorName: string
  sessionType: string
  sessionDate: string
  onReviewClick: () => void
  onDismiss: () => void
}

export function ReviewPrompt({
  sessionId,
  mentorName,
  sessionType,
  sessionDate,
  onReviewClick,
  onDismiss,
}: ReviewPromptProps) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    // Calculate time left (7 days from session date)
    const sessionDateTime = new Date(sessionDate)
    const deadline = new Date(sessionDateTime.getTime() + 7 * 24 * 60 * 60 * 1000)

    const updateTimeLeft = () => {
      const now = new Date()
      const diff = deadline.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft("Expired")
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

      if (days > 0) {
        setTimeLeft(`${days} day${days > 1 ? "s" : ""} left`)
      } else {
        setTimeLeft(`${hours} hour${hours > 1 ? "s" : ""} left`)
      }
    }

    updateTimeLeft()
    const interval = setInterval(updateTimeLeft, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [sessionDate])

  return (
    <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-yellow-900 mb-1">How was your session with {mentorName}?</h3>
              <p className="text-sm text-yellow-800 mb-2">
                {sessionType} • {sessionDate}
              </p>
              <p className="text-xs text-yellow-700 mb-3">
                Your feedback helps other mentees and improves our community
              </p>
              <div className="flex items-center space-x-3">
                <Button size="sm" onClick={onReviewClick} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Leave Review
                </Button>
                <div className="flex items-center text-xs text-yellow-600">
                  <Clock className="h-3 w-3 mr-1" />
                  {timeLeft}
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onDismiss} className="text-yellow-600">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
