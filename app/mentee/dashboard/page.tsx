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
import EditProfileDrawer from "@/components/EditProfileDrawer"

export default function MenteeDashboardPage() {
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const router = useRouter()
  const { user, isAuthenticated, makeAuthenticatedRequest } = useAuthenticatedUser()
  const [targetRole, setTargetRole] = useState<string | null>(null)
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [isLoadingHeader, setIsLoadingHeader] = useState(true)
  const [showProgressTracker, setShowProgressTracker] = useState(false)

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

          {/* Text Content + Edit Button */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl md:text-5xl font-bold text-BLACK">
                Hello, <span className="text-blue-400">{userName}! 👋</span>
              </h1>
              <button
  className="ml-2 flex items-center gap-2 text-[16px] px-4 py-2 bg-[#0073CF] text-white rounded-full font-[700] hover:bg-blue-600 transition w-[142px] h-[40px]"
  onClick={() => setEditDrawerOpen(true)}
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.2187 1.71567C12.3594 1.57507 12.5501 1.49609 12.749 1.49609C12.9478 1.49609 13.1385 1.57507 13.2792 1.71567L16.2789 4.71544C16.4195 4.85607 16.4985 5.04679 16.4985 5.24565C16.4985 5.44451 16.4195 5.63522 16.2789 5.77586L6.52968 15.5251C6.38907 15.6658 6.19835 15.7448 5.99947 15.7448H2.9997C2.8008 15.7448 2.61005 15.6658 2.46941 15.5252C2.32877 15.3846 2.24976 15.1938 2.24976 14.9949V11.9951C2.2498 11.7963 2.32884 11.6055 2.46949 11.4649L9.96892 3.9655L12.2187 1.71567ZM10.4991 5.55612L3.74964 12.3056V14.245H5.68899L12.4385 7.49548L10.4991 5.55612ZM13.4989 6.43506L14.6883 5.24565L12.749 3.3063L11.5595 4.4957L13.4989 6.43506Z"
      fill="white"
    />
  </svg>
  Edit Profile
</button>

            </div>
            {/* Profile + Target Role */}
            <div className="flex items-center gap-6">
              {targetRole ? (
                <div className="text-black font-semibold flex items-center gap-2">
                  🎯 Target Role: {targetRole}
                </div>
              ) : (
                <div className="text-gray-600 font-medium flex items-center gap-2">
                  🎯 Target Role: <span className="text-gray-400 italic">Not set - Add in Edit Profile</span>
                </div>
              )}

            </div>
            {isLoadingHeader ? (
              <p className="mt-1 text-blue-400 font-medium drop-shadow">
                Loading...
              </p>
            ) : (
              <p
                onClick={() => setShowProgressTracker(!showProgressTracker)}
                className="mt-1 text-blue-400 font-medium drop-shadow cursor-pointer hover:underline transition-all"
              >
                {Math.round(progressPercentage)}% progress to Goal
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Edit Profile Drawer */}
      <EditProfileDrawer
        open={editDrawerOpen}
        onClose={() => setEditDrawerOpen(false)}
        user={user}
        targetRole={targetRole}
        onSave={async (data) => {
          // Profile is already saved in EditProfileDrawer component
          // Refresh dashboard header to get updated targetRole
          try {
            const response = await makeAuthenticatedRequest(
              `/mentee-dashboard/dashboard-header`
            );
            if (response.ok) {
              const headerData = await response.json();
              setTargetRole(headerData.targetRole);
              setProgressPercentage(headerData.progressPercentage);
            }
          } catch (err) {
            console.error("Error refreshing dashboard header:", err);
          }
        }}
      />

      {/* Progress Tracker Card - appears when progress text is clicked */}
      {showProgressTracker && (
        <div className="w-full relative z-20 -mt-40 md:-mt-52 mb-8">
          <div className="container mx-auto px-4 pt-6 pb-6">
            <ProgressTracker />
          </div>
        </div>
      )}

      {/* ✅ Dashboard content - adjusts position based on tracker visibility */}
      <div className={`container mx-auto px-4 py-2 space-y-8 relative z-20 ${showProgressTracker ? '' : '-mt-45 md:-mt-60'}`}>
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
