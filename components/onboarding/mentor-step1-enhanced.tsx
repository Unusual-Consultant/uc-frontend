"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Clock } from "lucide-react"

interface MentorStep1Props {
  onNext: (data: any) => void
}

export function MentorStep1Enhanced({ onNext }: MentorStep1Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    showOTP: false,
  })
  const [otpTimer, setOtpTimer] = useState(0)

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [otpTimer])

  const handleSocialLogin = (provider: string) => {
    const mockData = {
      loginMethod: provider,
      name: provider === "linkedin" ? "John Doe" : "",
      email: provider === "linkedin" ? "john.doe@company.com" : "",
      linkedinUrl: provider === "linkedin" ? "https://linkedin.com/in/johndoe" : "",
    }
    onNext(mockData)
  }

  const handleEmailSignup = () => {
    if (formData.name && formData.email) {
      setFormData({ ...formData, showOTP: true })
      setOtpTimer(60)
    }
  }

  const handleOTPVerify = () => {
    if (formData.otp) {
      onNext({ loginMethod: "email", ...formData })
    }
  }

  const resendOTP = () => {
    setOtpTimer(60)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Join as a Freelance Mentor</CardTitle>
          <CardDescription>Share your expertise and earn money helping others grow</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              <div className="w-6 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Step 1 of 5 • 2 minutes total</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Login Options */}
          <div className="space-y-3">
            <div className="relative">
              <Button onClick={() => handleSocialLogin("linkedin")} className="w-full bg-blue-600 hover:bg-blue-700">
                <img src="/placeholder.svg?height=20&width=20&text=in" alt="LinkedIn" className="w-5 h-5 mr-2" />
                Continue with LinkedIn
              </Button>
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">Mandatory</Badge>
            </div>
            <Button onClick={() => handleSocialLogin("google")} variant="outline" className="w-full bg-transparent">
              <img src="/placeholder.svg?height=20&width=20&text=G" alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">LinkedIn preferred for credibility verification</p>
          </div>

          <Separator />

          {/* Email Signup */}
          {!formData.showOTP ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center">Or signup with email + OTP</p>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
              <Button onClick={handleEmailSignup} className="w-full bg-green-700 hover:bg-green-800">
                <Mail className="mr-2 h-4 w-4" />
                Send OTP
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="otp">Enter 6-Digit OTP</Label>
                <Input
                  id="otp"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-600">Sent to {formData.email}</p>
                  {otpTimer > 0 ? (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {otpTimer}s
                    </div>
                  ) : (
                    <Button variant="link" size="sm" onClick={resendOTP} className="p-0 h-auto">
                      Resend OTP
                    </Button>
                  )}
                </div>
              </div>
              <Button onClick={handleOTPVerify} className="w-full bg-green-700 hover:bg-green-800">
                Verify & Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
