"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, CheckCircle, Clock } from "lucide-react"

const progressData = {
  currentLevel: 2,
  totalPoints: 750,
  nextLevelPoints: 1000,
  completedSteps: [
    { id: 1, title: "Profile Setup", points: 100, completed: true },
    { id: 2, title: "First Session Booked", points: 150, completed: true },
    { id: 3, title: "Resume Review", points: 200, completed: true },
    { id: 4, title: "Mock Interview", points: 300, completed: true },
  ],
  nextSteps: [
    { id: 5, title: "System Design Session", points: 250, completed: false },
    { id: 6, title: "Behavioral Interview Prep", points: 200, completed: false },
    { id: 7, title: "Final Resume Review", points: 150, completed: false },
  ],
}

export function ProgressTracker() {
  const progressPercentage = (progressData.totalPoints / progressData.nextLevelPoints) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5" />
          Progress Tracker
        </CardTitle>
        <p className="text-sm text-gray-600">You're 30% closer to your dream role!</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Badge className="bg-purple-100 text-purple-700">Level {progressData.currentLevel}</Badge>
            <span className="text-sm text-gray-600">
              {progressData.totalPoints}/{progressData.nextLevelPoints} points
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3 mb-2" />
          <p className="text-sm text-gray-600">
            {progressData.nextLevelPoints - progressData.totalPoints} points to Level {progressData.currentLevel + 1}
          </p>
        </div>

        {/* Completed Steps */}
        <div>
          <h4 className="font-medium text-green-700 mb-3 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Completed Steps
          </h4>
          <div className="space-y-2">
            {progressData.completedSteps.map((step) => (
              <div key={step.id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  +{step.points} pts
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div>
          <h4 className="font-medium text-blue-700 mb-3 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Next Steps
          </h4>
          <div className="space-y-2">
            {progressData.nextSteps.map((step) => (
              <div key={step.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  +{step.points} pts
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg text-center">
          <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h4 className="font-bold text-purple-900">Career Accelerator</h4>
          <p className="text-sm text-purple-700">Complete 3 more steps to unlock this achievement!</p>
        </div>
      </CardContent>
    </Card>
  )
}
