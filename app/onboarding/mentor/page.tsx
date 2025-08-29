"use client"

import { useState } from "react"
import { MentorStep1Enhanced } from "@/components/onboarding/mentor-step1-enhanced"
import { MentorStep2Enhanced } from "@/components/onboarding/mentor-step2-enhanced"
import { MentorStep3Enhanced } from "@/components/onboarding/mentor-step3-enhanced"
import { MentorStep4Enhanced } from "@/components/onboarding/mentor-step4-enhanced"
import { MentorStep5Enhanced } from "@/components/onboarding/mentor-step5-enhanced"
import { useRouter } from "next/navigation"

export default function MentorOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState({})
  const router = useRouter()

  const handleStepComplete = (stepData: any) => {
    const updatedData = { ...onboardingData, ...stepData }
    setOnboardingData(updatedData)

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      // Onboarding complete - redirect to profile pending verification
      console.log("Mentor onboarding complete:", updatedData)
      router.push("/mentor/profile-pending")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {currentStep === 1 && <MentorStep1Enhanced onNext={handleStepComplete} />}
        {currentStep === 2 && (
          <MentorStep2Enhanced onNext={handleStepComplete} onBack={handleBack} initialData={onboardingData} />
        )}
        {currentStep === 3 && <MentorStep3Enhanced onNext={handleStepComplete} onBack={handleBack} />}
        {currentStep === 4 && <MentorStep4Enhanced onNext={handleStepComplete} onBack={handleBack} />}
        {currentStep === 5 && <MentorStep5Enhanced onNext={handleStepComplete} onBack={handleBack} />}
      </div>
    </div>
  )
}
