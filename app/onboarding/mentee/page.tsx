"use client"

import { useState } from "react"
import { MenteeStep1 } from "@/components/onboarding/mentee-step1"
import { MenteeStep2 } from "@/components/onboarding/mentee-step2"
import { MenteeStep3 } from "@/components/onboarding/mentee-step3"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, LayoutDashboard } from "lucide-react"

export default function MenteeOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState({})
  const [showCompletion, setShowCompletion] = useState(false)
  const router = useRouter()

  const handleStepComplete = (stepData: any) => {
    console.log("Step completed with data:", stepData)
    console.log("Current step:", currentStep)

    const updatedData = { ...onboardingData, ...stepData }
    setOnboardingData(updatedData)

    console.log("Updated onboarding data:", updatedData)

    if (currentStep < 3) {
      console.log("Moving to next step:", currentStep + 1)
      setCurrentStep(currentStep + 1)
    } else {
      // Onboarding complete - show completion options
      console.log("Mentee onboarding complete:", updatedData)
      setShowCompletion(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleRedirect = (destination: string) => {
    router.push(destination)
  }

  // Error boundary and fallback
  if (typeof handleStepComplete !== "function") {
    console.error("handleStepComplete is not a function")
    return <div>Error: Handler not properly initialized</div>
  }

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">🎉 Welcome to Unusual Consultant!</CardTitle>
                <CardDescription>Your profile is ready. Where would you like to go?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500"
                    onClick={() => handleRedirect("/mentee/suggested-mentors")}
                  >
                    <CardContent className="p-6 text-center">
                      <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">Find Mentors</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        See personalized mentor recommendations based on your goals
                      </p>
                      <Button className="w-full bg-green-700 hover:bg-green-800">View Suggested Mentors</Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500"
                    onClick={() => handleRedirect("/mentee/dashboard")}
                  >
                    <CardContent className="p-6 text-center">
                      <LayoutDashboard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">Go to Dashboard</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Track your progress and manage your mentorship journey
                      </p>
                      <Button variant="outline" className="w-full bg-transparent">
                        Open Dashboard
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">You can always access both from your dashboard later</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {currentStep === 1 && <MenteeStep1 onNext={handleStepComplete} />}
        {currentStep === 2 && <MenteeStep2 onNext={handleStepComplete} onBack={handleBack} />}
        {currentStep === 3 && <MenteeStep3 onNext={handleStepComplete} onBack={handleBack} />}
      </div>
    </div>
  )
}
