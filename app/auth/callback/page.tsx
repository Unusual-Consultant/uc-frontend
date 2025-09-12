"use client"

import { useEffect, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

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
          `http://localhost:8000/api/v1/auth/google/callback?code=${code}&state=${state}`,
          {
            method: 'GET',
            redirect: 'manual' // Don't follow redirects automatically
          }
        )

        // Check if it's a redirect response (new user)
        if (response.type === 'opaqueredirect' || response.status === 302 || response.redirected) {
          // New user - backend is redirecting to step 2
          const userType = localStorage.getItem("userType") || state || "mentee"
          router.push(`/signup/step2?userType=${userType}`)
          return
        }

        // Check if response is ok for existing user
        if (response.ok) {
          const data = await response.json()
          
          if (data.token) {
            // Existing user - store token and redirect to dashboard
            localStorage.setItem("auth_token", data.token)
            localStorage.setItem("user_info", JSON.stringify(data.user_info))
            
            const userType = data.user_info.role || localStorage.getItem("userType") || "mentee"
            router.push(`/${userType}/dashboard`)
            return
          }
        }

        throw new Error(`HTTP error! status: ${response.status}`)

      } catch (error) {
        console.error("Error handling Google callback:", error)
        
        // Fallback: redirect to step 2 for new users
        const userType = localStorage.getItem("userType") || state || "mentee"
        router.push(`/signup/step2?userType=${userType}`)
        
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