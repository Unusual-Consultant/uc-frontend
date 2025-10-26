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
        
        // Call backend callback endpoint
        const response = await fetch(
          `${API_BASE_URL}/auth/google/callback?code=${code}&state=${state}`,
          {
            method: 'GET',
            redirect: 'manual' // Don't follow redirects automatically
          }
        )

        // Check if it's a redirect response (new user)
        if (response.type === 'opaqueredirect' || response.status === 302 || response.redirected) {
          console.log("New user detected - redirect response")
          // For new users, we need to get the token from the redirect URL
          // The backend should include the token in the redirect URL for new users
          const urlParams = new URLSearchParams(window.location.search)
          const token = urlParams.get('token')
          
          console.log("URL search params:", window.location.search)
          console.log("Token from URL:", token)
          
          if (token) {
            localStorage.setItem("access_token", token)
            localStorage.setItem("auth_token", token)
            console.log("Token stored in localStorage")
          } else {
            console.log("No token found in URL parameters")
          }
          
          // New user - redirect based on user type
          const userType = localStorage.getItem("userType") || state || "mentee"
          console.log("User type for new user:", userType)
          
          if (userType === "mentor") {
            if (token) {
              console.log("Redirecting new mentor to step-2 with token")
              router.push(`/onboarding/mentor/step-2?token=${token}`)
            } else {
              console.log("Redirecting new mentor to step-2 without token")
              router.push("/onboarding/mentor/step-2")
            }
          } else {
            if (token) {
              console.log("Redirecting new mentee to step2 with token")
              router.push(`/signup/step2?userType=${userType}&token=${token}`)
            } else {
              console.log("Redirecting new mentee to step2 without token")
              router.push(`/signup/step2?userType=${userType}`)
            }
          }
          return
        }

        // Check if response is ok for existing user
        if (response.ok) {
          const data = await response.json()
          console.log("Existing user response:", data)
          
          if (data.token) {
            // Existing user - store token and redirect to dashboard
            localStorage.setItem("access_token", data.token)
            localStorage.setItem("auth_token", data.token) // Keep both for compatibility
            localStorage.setItem("user_info", JSON.stringify(data.user_info))
            
            const userType = data.user_info.role || localStorage.getItem("userType") || "mentee"
            console.log("Redirecting existing user to:", `/${userType}/dashboard`)
            router.push(`/${userType}/dashboard`)
            return
          }
        }

        throw new Error(`HTTP error! status: ${response.status}`)

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