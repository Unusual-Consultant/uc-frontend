"use client"

import { useState, useEffect } from "react"
import { MentorStep5Enhanced } from "@/components/onboarding/mentor-step5-enhanced"
import { MentorSuccess } from "@/components/onboarding/mentor-success"
import { useRouter, useSearchParams } from "next/navigation"

export default function MentorStep5Page() {
  const [onboardingData, setOnboardingData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
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
      const response = await fetch("http://localhost:8000/api/v1/mentors/onboarding/data", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setOnboardingData(data)
        
        // If already onboarded, show success page
        if (data.is_onboarded) {
          setShowSuccess(true)
        }
      }
    } catch (error) {
      console.error("Error loading existing data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStepComplete = (stepData: any) => {
    // Show success page
    setShowSuccess(true)
  }

  const handleBack = () => {
    // Go back to step 4 with token
    const token = localStorage.getItem("access_token")
    if (token) {
      router.push(`/onboarding/mentor/step-4?token=${token}`)
    } else {
      router.push("/onboarding/mentor/step-4")
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

  if (showSuccess) {
    return <MentorSuccess />
  }

  return (
    <MentorStep5Enhanced 
      onNext={handleStepComplete} 
      onBack={handleBack} 
      initialData={onboardingData.step5_data} 
    />
  )
}
