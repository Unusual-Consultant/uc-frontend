"use client"

import { useState, useEffect } from "react"
import { MentorStep2Enhanced } from "@/components/onboarding/mentor-step2-enhanced"
import { useRouter, useSearchParams } from "next/navigation"
import { API_BASE_URL } from "@/lib/api"

export default function MentorStep2Page() {
  const [onboardingData, setOnboardingData] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if token is in URL parameters and store it
    const token = searchParams.get('token')
    if (token) {
      localStorage.setItem("access_token", token)
      localStorage.setItem("auth_token", token)
      console.log("Token stored from URL:", token)
    }
    
    loadExistingData()
  }, [searchParams])

  const loadExistingData = async () => {
    const token = localStorage.getItem("auth_token") || localStorage.getItem("access_token")
    console.log("Loading data with token:", token ? token.substring(0, 20) + "..." : "null")
    
    if (!token) {
      console.warn("No token found, cannot load existing data")
      setIsLoading(false)
      return
    }
    
    try {
      // Fetch both onboarding data and user info
      const [onboardingResponse, userResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/mentors/onboarding/data`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }),
        fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
      ])

      const data: any = {}
      
      if (onboardingResponse.ok) {
        const onboardingData = await onboardingResponse.json()
        data.step2_data = onboardingData.step2_data || {}
      } else {
        console.error("Failed to load onboarding data:", onboardingResponse.status, onboardingResponse.statusText)
        data.step2_data = {}
      }

      // If we have user data but no full_name in step2_data, use user's name
      if (userResponse.ok) {
        const userData = await userResponse.json()
        if (userData.first_name || userData.last_name) {
          const fullName = `${userData.first_name || ""} ${userData.last_name || ""}`.trim()
          if (fullName && !data.step2_data.full_name) {
            data.step2_data.full_name = fullName
          }
        }
      }

      setOnboardingData(data)
    } catch (error) {
      console.error("Error loading existing data:", error)
      // Set empty data so form can still be used
      setOnboardingData({ step2_data: {} })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStepComplete = (stepData: any) => {
    // Move to step 3 with token
    const token = localStorage.getItem("auth_token") || localStorage.getItem("access_token")
    if (token) {
      router.push(`/onboarding/mentor/step-3?token=${token}`)
    } else {
      router.push("/onboarding/mentor/step-3")
    }
  }

  const handleBack = () => {
    // Go back to signup page
    router.push("/signup")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your data...</p>
        </div>
      </div>
    )
  }

  return (
    <MentorStep2Enhanced 
      onNext={handleStepComplete} 
      onBack={handleBack} 
      initialData={onboardingData.step2_data} 
    />
  )
}
