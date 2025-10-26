"use client"

import { useState, useEffect } from "react"
import { MentorStep1Enhanced } from "@/components/onboarding/mentor-step1-enhanced"
import { MentorStep2Enhanced } from "@/components/onboarding/mentor-step2-enhanced"
import { MentorStep3Enhanced } from "@/components/onboarding/mentor-step3-enhanced"
import { MentorStep4Enhanced } from "@/components/onboarding/mentor-step4-enhanced"
import { MentorStep5Enhanced } from "@/components/onboarding/mentor-step5-enhanced"
import { MentorSuccess } from "@/components/onboarding/mentor-success"
import { useRouter } from "next/navigation"
import { API_BASE_URL } from "@/lib/api"

export default function MentorOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadExistingData()
  }, [])

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
        
        // If already onboarded, show success page
        if (data.is_onboarded) {
          setCurrentStep(6)
        }
      }
    } catch (error) {
      console.error("Error loading existing data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStepComplete = (stepData: any) => {
    const updatedData = { ...onboardingData, ...stepData }
    setOnboardingData(updatedData)

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      // Onboarding complete - show success page
      setCurrentStep(6)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {currentStep === 1 && <MentorStep1Enhanced onNext={handleStepComplete} />}
        {currentStep === 2 && (
          <MentorStep2Enhanced onNext={handleStepComplete} onBack={handleBack} initialData={onboardingData.step2_data} />
        )}
        {currentStep === 3 && (
          <MentorStep3Enhanced onNext={handleStepComplete} onBack={handleBack} initialData={onboardingData.step3_data} />
        )}
        {currentStep === 4 && (
          <MentorStep4Enhanced onNext={handleStepComplete} onBack={handleBack} initialData={onboardingData.step4_data} />
        )}
        {currentStep === 5 && (
          <MentorStep5Enhanced onNext={handleStepComplete} onBack={handleBack} initialData={onboardingData.step5_data} />
        )}
        {currentStep === 6 && <MentorSuccess />}
      </div>
    </div>
  )
}
