"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp } from "lucide-react"

interface WelcomeHeaderProps {
  userName: string
  currentGoal: string
  avgTimeToReach: string
  progressPercentage: number
}

export function WelcomeHeader({ userName, currentGoal, avgTimeToReach, progressPercentage }: WelcomeHeaderProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Hi {userName} 👋 Ready to accelerate your career today?
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <div className="flex items-center">
                <Target className="h-4 w-4 mr-2" />
                <span className="font-medium">Target Role: {currentGoal}</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span className="text-sm">Avg time to reach: {avgTimeToReach}</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{progressPercentage}%</div>
            <div className="text-sm opacity-90 mb-2">Progress to Goal</div>
            <Progress value={progressPercentage} className="w-32 h-2 bg-white/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
