"use client"

import { useRouter } from "next/navigation"
import { CheckCircle, Home, FileText, Mail } from "lucide-react"

export function MentorSuccess() {
  const router = useRouter()

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
          
          <p className="text-gray-700 mb-8">
            Thank you for applying to become a mentor on <span className="text-blue-600 font-semibold">Unusual Consultant</span>. 
            Our team will review your profile and get back to you within <span className="text-blue-600 font-bold">24-48 hours</span>.
          </p>

          {/* What happens next */}
          <div className="text-left mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Mulish, sans-serif' }}>
              What happens next?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Profile Review</h3>
                  <p className="text-gray-600 text-sm">Our team reviews your professional background and expertise</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Verification</h3>
                  <p className="text-gray-600 text-sm">We verify your LinkedIn account and work experience</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Profile goes live</h3>
                  <p className="text-gray-600 text-sm">Once approved, your profile will be visible to mentees</p>
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
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              Return to homepage
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
