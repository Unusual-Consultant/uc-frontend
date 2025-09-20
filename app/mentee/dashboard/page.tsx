"use client"

import { WelcomeHeader } from "@/components/dashboard/welcome-header"
import { SuggestedMentorsCarousel } from "@/components/dashboard/suggested-mentors-carousel"
import { ActionPanel } from "@/components/dashboard/action-panel"
import { UpcomingSessions } from "@/components/dashboard/upcoming-sessions"
import { CareerToolkit } from "@/components/dashboard/career-toolkit"
import { SessionHistory } from "@/components/dashboard/session-history"
import { ProgressTracker } from "@/components/dashboard/progress-tracker"
import { PromotionsBanner } from "@/components/dashboard/promotions-banner"
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider"

const upcomingSessionsData = [
  {
    id: 1,
    mentorName: "Sarah Johnson",
    mentorTitle: "Senior PM at Google",
    sessionType: "Career Strategy Call",
    date: "Today",
    time: "4:00 PM",
    duration: "45 mins",
    price: "₹1500",
    status: "confirmed",
  },
  {
    id: 2,
    mentorName: "Michael Chen",
    mentorTitle: "Ex-Amazon PM",
    sessionType: "Resume Review",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "30 mins",
    price: "₹800",
    status: "pending",
  },
]

const recentActivityData = [
  {
    id: 1,
    type: "session_completed",
    title: "Completed mock interview with David Kim",
    time: "2 days ago",
    rating: 5,
  },
  {
    id: 2,
    type: "goal_progress",
    title: "Updated career goal progress - 75% complete",
    time: "3 days ago",
  },
  {
    id: 3,
    type: "mentor_match",
    title: "3 new mentor matches found",
    time: "1 week ago",
  },
]

export default function MenteeDashboardPage() {
  const { user } = useAuthenticatedUser()
  const userName =  user?.firstName || user?.first_name
  || user?.username 
  || user?.name 
  || "User"
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Above the Fold */}
        <div className="space-y-8">
          {/* Welcome Header */}
          <WelcomeHeader
            userName={userName}
            currentGoal="Product Manager"
            avgTimeToReach="4–6 months"
            progressPercentage={30}
          />

          {/* Suggested Mentors Carousel */}
          <SuggestedMentorsCarousel />

          {/* Action Panel */}
          <ActionPanel />

          {/* Upcoming Sessions */}
          <UpcomingSessions sessions={upcomingSessionsData} />
        </div>

        {/* Below the Fold */}
        <div className="mt-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Career Toolkit */}
            <CareerToolkit />

            {/* Progress Tracker */}
            <ProgressTracker />
          </div>

          {/* Session History */}
          <SessionHistory activities={recentActivityData} />

          {/* Promotions Banner */}
          <PromotionsBanner />
        </div>
      </div>
    </div>
  )
}
