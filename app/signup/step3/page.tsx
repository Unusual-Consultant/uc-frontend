"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function SignupStep3() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  
  const email = searchParams.get("email") || localStorage.getItem("google_email") || ""
  const userType = searchParams.get("userType") || localStorage.getItem("userType") || "mentee"
  
  useEffect(() => {
    // Extract first name from email or use a default
    const name = email.split("@")[0] || "User"
    setUserName(name.charAt(0).toUpperCase() + name.slice(1))
    setIsLoading(false)
  }, [email])

  const handleFindMentors = () => {
    router.push(`/mentees/suggested-mentors`)
  }

  const handleGoToDashboard = () => {
    router.push(`/${userType}/dashboard`)
  }

  const handleSkip = () => {
    router.push(`/${userType}/dashboard`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Loading...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0073CF] mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0073CF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">UC</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Unusual Consultant</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          {/* Skip option */}
          <div className="flex justify-end mb-6">
            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Skip
            </button>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {userName}! 🎉
            </h1>
            <p className="text-gray-600 mb-6">
              Your profile is ready. Where would you like to go?
            </p>
            
            {/* Step Indicator */}
            <div className="flex justify-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-[#0073CF]"></div>
            </div>
            <p className="text-sm text-gray-500">Step 3 of 3</p>
          </div>

          {/* Option Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Find Mentors Card */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#0073CF] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Mentors</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get personalized mentor recommendations based on your goals
                </p>
                <button
                  onClick={handleFindMentors}
                  className="w-full bg-[#0073CF] text-white py-2 px-4 rounded-lg hover:bg-[#005fa3] transition-colors"
                >
                  View Suggested Mentors
                </button>
              </div>
            </div>

            {/* Go to Dashboard Card */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#0073CF] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Go to Dashboard</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Track your progress and manage your mentorship journey
                </p>
                <button
                  onClick={handleGoToDashboard}
                  className="w-full border-2 border-[#0073CF] text-[#0073CF] py-2 px-4 rounded-lg hover:bg-[#0073CF] hover:text-white transition-colors"
                >
                  Open Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-500">
            You can always access both anytime from your dashboard
          </p>
        </div>
      </div>
    </div>
  )
}
