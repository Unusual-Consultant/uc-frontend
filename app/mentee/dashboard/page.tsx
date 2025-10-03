"use client"

import Image from "next/image"
import { SuggestedMentorsCarousel } from "@/components/dashboard/suggested-mentors-carousel"
import { ActionPanel } from "@/components/dashboard/action-panel"
import { UpcomingSessions } from "@/components/dashboard/upcoming-sessions"
import { CareerToolkitSection } from "@/components/dashboard/career-toolkit"
import { SessionHistory } from "@/components/dashboard/session-history"
import { ProgressTracker } from "@/components/dashboard/progress-tracker"
import { PromotionsBanner } from "@/components/dashboard/promotions-banner"
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider"
import { ProfileProgressCircle } from "@/components/dashboard/profile-progress-circle"

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
  },{
    id: 3,
    mentorName: "Brady Ackerman",
    mentorTitle: "Ex-Amazon PM",
    sessionType: "Mock Interview",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "30 mins",
    price: "₹800",
    status: "processing",
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
  const userName =
    user?.firstName ||
    user?.first_name ||
    user?.username ||
    user?.name ||
    "User"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center">
  {/* Background Image */}
  <Image
    src="/hero_background.png"
    alt="Hero Background"
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 " /> {/* overlay for readability */}

  {/* Content Overlay - lifted up */}
  <div className="relative z-10 container mx-auto px-4 flex items-center space-x-8 -translate-y-10 md:-translate-y-24">
    {/* Profile Circle */}
    <ProfileProgressCircle
      progress={30}
      imageSrc={userName.profile_picture_url || "/default_pfp.png"}
      size={120}
    />

    {/* Text Content */}
    <div className="flex-1">
      <h1 className="text-3xl md:text-5xl font-bold text-BLACK mb-2 ">
        Hello, <span className="text-blue-400">{userName}! 👋</span>
      </h1>
      <p className="text-lg md:text-2xl text-black-200 drop-shadow">
        Welcome to your career dashboard
      </p>
      <p className="mt-2 text-black font-semibold drop-shadow">
        {/* need to ftch from db mentee, fill taget role in a form */}
        🎯 Target Role: Product Manager 
       </p>

      <p className="mt-1 text-blue-400 font-medium drop-shadow">{30}% progress to Goal</p>
    </div>
  </div>
</section>


      {/* ✅ Dashboard content overlaps naturally */}
      <div className="-mt-45 md:-mt-60 container mx-auto px-4 py-2 space-y-8 relative z-20">
        <SuggestedMentorsCarousel />
        <ActionPanel />
        <UpcomingSessions sessions={upcomingSessionsData} />

        
          <CareerToolkitSection />
          {/* <ProgressTracker /> */}
        

        <SessionHistory activities={recentActivityData} />
        <PromotionsBanner />
      </div>
    </div>
  )
}
