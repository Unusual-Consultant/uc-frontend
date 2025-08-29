"use client"

import { useState } from "react"
import { ReviewForm } from "@/components/reviews/review-form"
import { ReviewDisplay } from "@/components/reviews/review-display"
import { ReviewSummary } from "@/components/reviews/review-summary"
import { ReviewPrompt } from "@/components/reviews/review-prompt"

// Mock data for demonstration
const mockReviews = [
  {
    id: "1",
    menteeId: "mentee1",
    menteeName: "Arjun Patel",
    rating: 5,
    review:
      "Absolutely fantastic session! Sarah provided incredibly detailed feedback on my product management approach and helped me understand the nuances of working at a large tech company. Her insights into Google's product development process were invaluable, and she gave me specific, actionable advice for my upcoming interviews. I feel much more confident now about pursuing PM roles at top-tier companies.",
    tags: ["Clear Explanations", "Industry Expertise", "Practical Advice", "Great Communication"],
    sessionType: "Career Strategy Call",
    date: "2 days ago",
    verified: true,
    helpful: 12,
    sessionSpecific: {
      punctuality: 5,
      communication: 5,
      expertise: 5,
      helpfulness: 5,
    },
    mentorResponse: {
      response:
        "Thank you so much for the kind words, Arjun! I'm thrilled to hear that our session was helpful. Best of luck with your interviews - you're going to do great! Feel free to reach out if you need any follow-up support.",
      date: "1 day ago",
    },
  },
  {
    id: "2",
    menteeId: "mentee2",
    menteeName: "Priya Sharma",
    rating: 4,
    review:
      "Great session overall! Michael was very knowledgeable about the Amazon interview process and provided good insights. The mock interview was challenging but realistic. I would have liked a bit more time for behavioral questions, but the technical discussion was excellent.",
    tags: ["Industry Expertise", "Well Prepared", "Problem Solver"],
    sessionType: "Mock Interview",
    date: "1 week ago",
    verified: true,
    helpful: 8,
    sessionSpecific: {
      punctuality: 4,
      communication: 4,
      expertise: 5,
      helpfulness: 4,
    },
  },
  {
    id: "3",
    menteeId: "mentee3",
    menteeName: "Rahul Kumar",
    rating: 5,
    review:
      "Exceptional resume review session! David not only identified areas for improvement but also provided specific examples of how to rewrite each section. His knowledge of what tech recruiters look for is spot-on.",
    tags: ["Practical Advice", "Clear Explanations", "Timely Delivery"],
    sessionType: "Resume Review",
    date: "2 weeks ago",
    verified: true,
    helpful: 15,
    sessionSpecific: {
      punctuality: 5,
      communication: 5,
      expertise: 5,
      helpfulness: 5,
    },
  },
]

const mockSummaryData = {
  averageRating: 4.7,
  totalReviews: 127,
  ratingDistribution: {
    5: 89,
    4: 28,
    3: 8,
    2: 2,
    1: 0,
  },
  topTags: [
    { tag: "Clear Explanations", count: 45 },
    { tag: "Industry Expertise", count: 38 },
    { tag: "Practical Advice", count: 35 },
    { tag: "Great Communication", count: 32 },
    { tag: "Well Prepared", count: 28 },
    { tag: "Problem Solver", count: 24 },
  ],
  sessionSpecificAverages: {
    punctuality: 4.8,
    communication: 4.7,
    expertise: 4.9,
    helpfulness: 4.6,
  },
}

export default function ReviewsPage() {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)

  const handleReviewSubmit = async (reviewData: any) => {
    console.log("Review submitted:", reviewData)
    // Here you would submit to your backend
    setShowReviewForm(false)
    setShowPrompt(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
          <p className="text-gray-600">See what mentees are saying about their experiences</p>
        </div>

        {/* Review Prompt */}
        {showPrompt && !showReviewForm && (
          <div className="mb-8">
            <ReviewPrompt
              sessionId="session123"
              mentorName="Sarah Johnson"
              sessionType="Career Strategy Call"
              sessionDate="2024-01-15"
              onReviewClick={() => setShowReviewForm(true)}
              onDismiss={() => setShowPrompt(false)}
            />
          </div>
        )}

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-8">
            <ReviewForm
              mentorName="Sarah Johnson"
              sessionType="Career Strategy Call"
              onSubmit={handleReviewSubmit}
              onCancel={() => setShowReviewForm(false)}
            />
          </div>
        )}

        {/* Review Summary */}
        <div className="mb-8">
          <ReviewSummary {...mockSummaryData} />
        </div>

        {/* Reviews Display */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Reviews</h2>
          <ReviewDisplay reviews={mockReviews} hasMore={true} onLoadMore={() => console.log("Load more reviews")} />
        </div>
      </div>
    </div>
  )
}
