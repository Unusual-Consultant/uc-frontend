"use client"

import { useEffect, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { api } from "@/lib/api"

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isProcessing = useRef(false)

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code")

      if (!code) {
        // If no code is present, redirect to Google login
        window.location.href = api.auth.google.login()
        return
      }

      if (isProcessing.current) return

      try {
        isProcessing.current = true
        const response = await fetch(api.auth.google.callback(code))

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.token) {
          localStorage.setItem("auth_token", data.token)
          localStorage.setItem("user_info", JSON.stringify(data.user_info))
          router.push("/dashboard")
        } else {
          throw new Error("No token received from server")
        }
      } catch (error) {
        console.error("Error handling Google callback:", error)
        router.push("/")
      } finally {
        isProcessing.current = false
      }
    }

    handleCallback()
  }, [router, searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Processing your login...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  )
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Loading...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}