"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, CheckCircle, Clock, TrendingUp } from "lucide-react"
import Image from "next/image"

const progressData = {
  currentLevel: 2,
  totalPoints: 750,
  nextLevelPoints: 1000,
  pointsToNextLevel: 250,
  completedSteps: [
    { id: 1, title: "Profile Setup", points: 100 },
    { id: 2, title: "First Session booked", points: 150 },
    { id: 3, title: "Resume Review", points: 200 },
    { id: 4, title: "Mock Interview", points: 300 },
  ],
  nextSteps: [
    { id: 5, title: "System Design Session", points: 250 },
    { id: 6, title: "Behavioral Interview prep", points: 200 },
    { id: 7, title: "Final Resume Review", points: 150 },
  ],
  avgTimeToGoal: "4-6 months",
}

export function ProgressTracker() {
  const progressPercentage = (progressData.totalPoints / progressData.nextLevelPoints) * 100

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
                    {progressData.pointsToNextLevel} points to Level {progressData.currentLevel + 1}
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
                  {progressData.completedSteps.map((step) => (
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
                  {progressData.nextSteps.map((step) => (
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
                  Avg time to reach Goal: {progressData.avgTimeToGoal}
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
