"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, CheckCircle, Clock, TrendingUp, Loader2 } from "lucide-react"
import Image from "next/image"
import { fetchProgressTracker, ProgressTrackerResponse } from "@/lib/api"
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider"

export function ProgressTracker() {
  const { user } = useAuthenticatedUser()
  const [progressData, setProgressData] = useState<ProgressTrackerResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProgressData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const authToken = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null
        if (!authToken) {
          setError("Please sign in to view progress")
          return
        }

        const data = await fetchProgressTracker(authToken)
        if (data) {
          setProgressData(data)
        } else {
          setError("Failed to load progress data")
        }
      } catch (err) {
        console.error("Error loading progress tracker:", err)
        setError(err instanceof Error ? err.message : "Failed to load progress")
      } finally {
        setIsLoading(false)
      }
    }

    loadProgressData()
  }, [user])

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <Card className="rounded-[16px] shadow-lg overflow-hidden border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Loading progress...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !progressData) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <Card className="rounded-[16px] shadow-lg overflow-hidden border-0">
          <CardContent className="p-6">
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error || "Failed to load progress"}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Retry
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progressPercentage = progressData.progressPercentage
  const pointsToNextLevel = progressData.nextLevelPoints - progressData.totalPoints

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="rounded-[16px] shadow-lg overflow-hidden border-0">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Main Progress Tracker Content */}
            <div className="lg:col-span-2 space-y-6 flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-gray-900">Progress Tracker</h3>
              </div>

              {/* Level and Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-semibold text-gray-800">Level {progressData.currentLevel}</span>
                  <span className="text-base font-medium text-gray-700">
                    {progressData.totalPoints}/{progressData.nextLevelPoints} points
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                  {/* Progress fill */}
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                  {/* Milestone dots */}
                  <div className="absolute top-1/2 left-[25%] transform -translate-y-1/2 w-2 h-2 bg-white rounded-full z-10"></div>
                  <div className="absolute top-1/2 left-[50%] transform -translate-y-1/2 w-2 h-2 bg-white rounded-full z-10"></div>
                  <div className="absolute top-1/2 left-[75%] transform -translate-y-1/2 w-2 h-2 bg-white rounded-full z-10"></div>
                </div>
                
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-600">
                    {pointsToNextLevel} points to Level {progressData.currentLevel + 1}
                  </span>
                </div>
              </div>

              {/* Completed Steps */}
              <div>
                <h4 className="text-base font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Completed Steps
                </h4>
                <div className="space-y-2">
                  {progressData.completedSteps.filter(step => step.completed).map((step) => (
                    <div
                      key={step.id}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-800">{step.title}</span>
                      </div>
                      <span className="text-sm font-semibold text-green-700">+{step.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h4 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Next Steps
                </h4>
                <div className="space-y-2">
                  {progressData.nextSteps.filter(step => !step.completed).map((step) => (
                    <div
                      key={step.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-800">{step.title}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">+{step.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avg Time to Goal */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-gray-600">
                  Avg time to reach Goal: 4-6 months
                </span>
              </div>
            </div>

            {/* Career Accelerator Card - Inside the same card */}
            <div className="lg:col-span-1 flex items-stretch py-20">
              <Card className="rounded-none shadow-lg overflow-hidden border-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 w-full flex-1 p-0 h-full">
                <div className="relative w-full h-full" style={{ minHeight: '100%' }}>
                  <Image
                    src="/career-accelerator.png"
                    alt="Career Accelerator"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white text-center">Career Accelerator</h3>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-sm font-medium text-white text-center">
                      Complete 3 more steps to unlock this achievement
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
