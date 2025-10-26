"use client"

import { useState, useEffect } from "react"
import { MentorStep4Enhanced } from "@/components/onboarding/mentor-step4-enhanced"
import { useRouter, useSearchParams } from "next/navigation"
import { API_BASE_URL } from "@/lib/api"

export default function MentorStep4Page() {
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
    }
    
    loadExistingData()
  }, [searchParams])

  const loadExistingData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/mentors/onboarding/data`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setOnboardingData(data)
      }
    } catch (error) {
      console.error("Error loading existing data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStepComplete = (stepData: any) => {
    // Move to step 5 with token
    const token = localStorage.getItem("access_token")
    if (token) {
      router.push(`/onboarding/mentor/step-5?token=${token}`)
    } else {
      router.push("/onboarding/mentor/step-5")
    }
  }

  const handleBack = () => {
    // Go back to step 3 with token
    const token = localStorage.getItem("access_token")
    if (token) {
      router.push(`/onboarding/mentor/step-3?token=${token}`)
    } else {
      router.push("/onboarding/mentor/step-3")
    }
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
    <MentorStep4Enhanced 
      onNext={handleStepComplete} 
      onBack={handleBack} 
      initialData={onboardingData.step4_data} 
    />
  )
}
