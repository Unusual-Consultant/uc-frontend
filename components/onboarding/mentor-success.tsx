"use client"

import { useRouter } from "next/navigation"
import { CheckCircle, Home, FileText, Mail } from "lucide-react"
import { useEffect, useState } from "react"

export function MentorSuccess() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/mentor/dashboard")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-sm font-semibold">UC</span>
            </div>
            <span className="font-medium text-gray-800">Unusual Consultant</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Mulish, sans-serif' }}>
            Profile Submitted Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your mentor application is under review
          </p>
          
          <p className="text-gray-700 mb-4">
            Thank you for completing your mentor profile on <span className="text-blue-600 font-semibold">Unusual Consultant</span>! 
            Your profile is now live and ready to help mentees.
          </p>
          
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-800 font-medium">
              🎉 Redirecting to your dashboard in {countdown} seconds...
            </p>
          </div>

          {/* What you can do now */}
          <div className="text-left mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Mulish, sans-serif' }}>
              What you can do now?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Profile is Live</h3>
                  <p className="text-gray-600 text-sm">Your profile is now visible to mentees and ready for bookings</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Manage Sessions</h3>
                  <p className="text-gray-600 text-sm">View and manage your mentorship sessions from the dashboard</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Track Earnings</h3>
                  <p className="text-gray-600 text-sm">Monitor your earnings and manage payouts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stay in touch */}
          <div className="bg-blue-50 p-4 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 mb-2">Stay in touch</h3>
                <p className="text-gray-700 text-sm">
                  We'll send you an email confirmation once your profile is approved. If you have any questions reach out to us at{" "}
                  <a href="mailto:mentors@unusualconsultant.com" className="text-blue-600 hover:underline">
                    mentors@unusualconsultant.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/mentor/dashboard")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              Go to Dashboard
            </button>
            <button
              onClick={() => router.push("/mentor/resources")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Mentor Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
