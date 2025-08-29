"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Clock } from "lucide-react"

interface MenteeStep1Props {
  onNext: (data: any) => void
}

export function MenteeStep1({ onNext }: MenteeStep1Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    showOTP: false,
  })
  const [otpTimer, setOtpTimer] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [otpTimer])

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      console.log(`Starting ${provider} login...`)

      // Simulate social login with mock data
      const mockData = {
        loginMethod: provider,
        name: provider === "linkedin" ? "Jane Doe" : provider === "google" ? "John Smith" : "Alex Johnson",
        email:
          provider === "linkedin"
            ? "jane.doe@email.com"
            : provider === "google"
              ? "john.smith@gmail.com"
              : "alex.johnson@icloud.com",
      }

      console.log("Social login successful, calling onNext with:", mockData)

      // Add small delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Ensure onNext is called properly
      if (typeof onNext === "function") {
        onNext(mockData)
      } else {
        console.error("onNext is not a function:", onNext)
      }
    } catch (error) {
      console.error("Social login error:", error)
      alert("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignup = () => {
    if (!formData.name.trim()) {
      alert("Please enter your full name")
      return
    }
    if (!formData.email.trim()) {
      alert("Please enter your email address")
      return
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address")
      return
    }

    console.log("Email signup initiated for:", formData.email)
    setFormData({ ...formData, showOTP: true })
    setOtpTimer(60)
  }

  const handleOTPVerify = () => {
    if (!formData.otp.trim()) {
      alert("Please enter the OTP")
      return
    }
    if (formData.otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP")
      return
    }

    console.log("OTP verification successful, calling onNext with:", { loginMethod: "email", ...formData })

    if (typeof onNext === "function") {
      onNext({ loginMethod: "email", ...formData })
    } else {
      console.error("onNext is not a function:", onNext)
    }
  }

  const resendOTP = () => {
    setOtpTimer(60)
    // Simulate OTP resend
  }

  console.log("MenteeStep1 rendered, onNext function:", typeof onNext) // Debug logging

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Get Started in 30 Seconds</CardTitle>
          <CardDescription>Join thousands of professionals growing their careers</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Step 1 of 3 • 10-15 seconds</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Login Options */}
          <div className="space-y-3">
            <div className="relative">
              <Button
                onClick={() => handleSocialLogin("google")}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                <img src="/placeholder.svg?height=20&width=20&text=G" alt="Google" className="w-5 h-5 mr-2" />
                {isLoading ? "Signing in..." : "Continue with Google"}
              </Button>
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">One-Tap</Badge>
            </div>
            <Button
              onClick={() => handleSocialLogin("linkedin")}
              variant="outline"
              className="w-full bg-transparent"
              disabled={isLoading}
            >
              <img src="/placeholder.svg?height=20&width=20&text=in" alt="LinkedIn" className="w-5 h-5 mr-2" />
              {isLoading ? "Signing in..." : "Continue with LinkedIn"}
            </Button>
            <Button
              onClick={() => handleSocialLogin("apple")}
              variant="outline"
              className="w-full bg-transparent"
              disabled={isLoading}
            >
              <img src="/placeholder.svg?height=20&width=20&text=🍎" alt="Apple" className="w-5 h-5 mr-2" />
              {isLoading ? "Signing in..." : "Continue with Apple"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">Recommended for fastest signup</p>
          </div>

          <Separator />

          {/* Email Signup */}
          {!formData.showOTP ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center">Or create account with email</p>
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
              <Button
                onClick={handleEmailSignup}
                className="w-full bg-green-700 hover:bg-green-800"
                disabled={isLoading}
              >
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
                    <Button variant="link" size="sm" onClick={resendOTP} className="p-0 h-auto" disabled={isLoading}>
                      Resend OTP
                    </Button>
                  )}
                </div>
              </div>
              <Button onClick={handleOTPVerify} className="w-full bg-green-700 hover:bg-green-800" disabled={isLoading}>
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
