"use client"

import { useEffect, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { API_BASE_URL } from "@/lib/api"

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isProcessing = useRef(false)

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code")
      const state = searchParams.get("state") || "mentee"

      if (!code) {
        console.error("No authorization code found")
        router.push("/signup")
        return
      }

      if (isProcessing.current) return

      try {
        isProcessing.current = true
        
        // Call backend callback endpoint - let it handle redirects naturally
        const response = await fetch(
          `${API_BASE_URL}/auth/google/callback?code=${code}&state=${state}`,
          {
            method: 'GET',
            redirect: 'follow' // Follow redirects to let backend handle the flow
          }
        )

        // If we get here, it means the backend redirected us to the frontend
        // The current URL should be the target page with token parameters
        const currentUrl = window.location.href
        console.log("Current URL after redirect:", currentUrl)
        
        // Check if we're on a step page with token
        if (currentUrl.includes('/signup/step') || currentUrl.includes('/onboarding/mentor/step')) {
          console.log("Successfully redirected to onboarding step")
          return
        }
        
        // If we're still on the callback page, something went wrong
        if (currentUrl.includes('/auth/callback')) {
          throw new Error("Redirect failed")
        }

      } catch (error) {
        console.error("Error handling Google callback:", error)
        
        // Fallback: redirect based on user type for new users
        const userType = localStorage.getItem("userType") || state || "mentee"
        if (userType === "mentor") {
          router.push("/onboarding/mentor/step-2")
        } else {
          router.push(`/signup/step2?userType=${userType}`)
        }
        
      } finally {
        isProcessing.current = false
      }
    }

    handleCallback()
  }, [router, searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold mb-2">Processing your login...</h1>
        <p className="text-gray-600">Please wait while we set up your account</p>
      </div>
    </div>
  )
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold">Loading...</h1>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}