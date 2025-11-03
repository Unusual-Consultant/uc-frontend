"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
import { Loader2 } from "lucide-react"

export default function MenteeDashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, makeAuthenticatedRequest } = useAuthenticatedUser()
  const [targetRole, setTargetRole] = useState<string | null>(null)
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [isLoadingHeader, setIsLoadingHeader] = useState(true)

  // Handle token from URL (Google OAuth redirect)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tokenParam = urlParams.get("token")
    
    if (tokenParam && !localStorage.getItem("auth_token")) {
      // Token in URL but not in localStorage - store it
      localStorage.setItem("auth_token", tokenParam)
      // Remove token from URL
      router.replace("/mentee/dashboard")
      // Let AuthenticatedUserProvider process the token
      return
    }
  }, [router])

  // Redirect to login if not authenticated (but wait a bit for token processing)
  useEffect(() => {
    // Give AuthenticatedUserProvider time to process token
    const timeout = setTimeout(() => {
      const token = localStorage.getItem("auth_token")
      if (!token || (!isAuthenticated && !user)) {
        router.push("/login")
      }
    }, 1000) // Wait 1 second for auth processing
    
    return () => clearTimeout(timeout)
  }, [isAuthenticated, user, router])

  // Get user name - now properly transformed in AuthenticatedUserProvider
  const userName =
    user?.firstName ||
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "User"

  useEffect(() => {
    const fetchDashboardHeader = async () => {
      // Don't fetch if not authenticated
      const token = localStorage.getItem("auth_token")
      if (!token || !isAuthenticated || !user) {
        setIsLoadingHeader(false)
        return
      }

      try {
        setIsLoadingHeader(true)

        const response = await makeAuthenticatedRequest(
          `/mentee-dashboard/dashboard-header`
        )

        if (!response.ok) {
          // If unauthorized, redirect to login
          if (response.status === 401 || response.status === 403) {
            router.push("/login")
            return
          }
          throw new Error(`Failed to fetch dashboard header: ${response.status}`)
        }

        const data: {
          targetRole: string | null
          progressPercentage: number
        } = await response.json()

        setTargetRole(data.targetRole)
        setProgressPercentage(data.progressPercentage)
      } catch (err) {
        console.error("Error fetching dashboard header:", err)
        // Don't set default values - leave as 0 or null
        setTargetRole(null)
        setProgressPercentage(0)
      } finally {
        setIsLoadingHeader(false)
      }
    }

    fetchDashboardHeader()
  }, [makeAuthenticatedRequest, isAuthenticated, user, router])

  // Show loading state or redirect if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

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
      progress={Math.round(progressPercentage)}
      imageSrc={user?.profile_picture_url || "/default_pfp.png"}
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
      {targetRole && (
        <p className="mt-2 text-black font-semibold drop-shadow">
          🎯 Target Role: {targetRole}
        </p>
      )}
      {isLoadingHeader ? (
        <p className="mt-1 text-blue-400 font-medium drop-shadow">
          Loading...
        </p>
      ) : (
        <p className="mt-1 text-blue-400 font-medium drop-shadow">
          {Math.round(progressPercentage)}% progress to Goal
        </p>
      )}
    </div>
  </div>
</section>


      {/* ✅ Dashboard content overlaps naturally */}
      <div className="-mt-45 md:-mt-60 container mx-auto px-4 py-2 space-y-8 relative z-20">
        <SuggestedMentorsCarousel />
        <ActionPanel />
        <UpcomingSessions />

        
          <CareerToolkitSection />
          {/* <ProgressTracker /> */}
        

        <SessionHistory />
        <PromotionsBanner />
      </div>
    </div>
  )
}
