"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MentorStep1Props {
  onNext: (data: any) => void
}

export function MentorStep1({ onNext }: MentorStep1Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const handleSocialLogin = (provider: string) => {
    // Simulate social login with auto-filled data
    const mockData = {
      loginMethod: provider,
      name: provider === "linkedin" ? "John Doe" : "",
      email: provider === "linkedin" ? "john.doe@company.com" : "",
      linkedinUrl: provider === "linkedin" ? "https://linkedin.com/in/johndoe" : "",
    }
    onNext(mockData)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Join as a Mentor</CardTitle>
          <CardDescription>Share your expertise and help others grow</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Login Options */}
          <div className="space-y-3">
            <Button onClick={() => handleSocialLogin("linkedin")} className="w-full bg-blue-600 hover:bg-blue-700">
              <img src="/placeholder.svg?height=20&width=20&text=in" alt="LinkedIn" className="w-5 h-5 mr-2" />
              Continue with LinkedIn (Recommended)
            </Button>
            <Button onClick={() => handleSocialLogin("google")} variant="outline" className="w-full bg-transparent">
              <img src="/placeholder.svg?height=20&width=20&text=G" alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">LinkedIn login is preferred for credibility verification</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
