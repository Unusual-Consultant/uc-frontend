"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Trophy, Star, TrendingUp, Users, Target, Zap } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  year: string
  category: "performance" | "leadership" | "innovation" | "mentorship" | "growth"
  impact?: string
  verified?: boolean
}

interface AchievementsSectionProps {
  achievements?: Achievement[]
  showCategories?: boolean
  compact?: boolean
}

const defaultAchievements: Achievement[] = [
  {
    id: "1",
    title: "Team Velocity Improvement",
    description: "Improved team velocity by 30% through process optimization and agile methodologies",
    year: "2023",
    category: "performance",
    impact: "30% increase in delivery speed",
    verified: true
  },
  {
    id: "2", 
    title: "Deployment Time Reduction",
    description: "Reduced deployment time by 50% through CI/CD improvements and automation",
    year: "2022",
    category: "innovation",
    impact: "50% faster deployments",
    verified: true
  },
  {
    id: "3",
    title: "System Architecture Excellence", 
    description: "Designed microservices handling 1M+ requests per second with 99.9% uptime",
    year: "2021",
    category: "innovation",
    impact: "1M+ RPS, 99.9% uptime",
    verified: true
  },
  {
    id: "4",
    title: "Mentor of the Year",
    description: "Recognized as top mentor for helping 50+ engineers advance their careers",
    year: "2023",
    category: "mentorship",
    impact: "50+ mentees helped",
    verified: true
  },
  {
    id: "5",
    title: "Leadership Excellence",
    description: "Led cross-functional team of 15 engineers across 3 product areas",
    year: "2022",
    category: "leadership",
    impact: "15 engineers managed",
    verified: true
  },
  {
    id: "6",
    title: "Revenue Growth Driver",
    description: "Contributed to 40% revenue growth through strategic product decisions",
    year: "2021",
    category: "growth",
    impact: "40% revenue increase",
    verified: true
  }
]

const categoryIcons = {
  performance: TrendingUp,
  leadership: Users,
  innovation: Zap,
  mentorship: Star,
  growth: Target
}

const categoryColors = {
  performance: "bg-green-100 text-green-800 border-green-200",
  leadership: "bg-blue-100 text-blue-800 border-blue-200", 
  innovation: "bg-purple-100 text-purple-800 border-purple-200",
  mentorship: "bg-yellow-100 text-yellow-800 border-yellow-200",
  growth: "bg-orange-100 text-orange-800 border-orange-200"
}

export function AchievementsSection({ 
  achievements = defaultAchievements,
  showCategories = true,
  compact = false 
}: AchievementsSectionProps) {
  const groupedAchievements = showCategories 
    ? achievements.reduce((acc, achievement) => {
        if (!acc[achievement.category]) {
          acc[achievement.category] = []
        }
        acc[achievement.category].push(achievement)
        return acc
      }, {} as Record<string, Achievement[]>)
    : { all: achievements }

  if (compact) {
    return (
      <div className="space-y-3">
        {achievements.slice(0, 3).map((achievement) => {
          const IconComponent = categoryIcons[achievement.category]
          return (
            <div key={achievement.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <IconComponent className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-sm text-gray-900 truncate">{achievement.title}</h4>
                  {achievement.verified && (
                    <Award className="h-3 w-3 text-blue-500" />
                  )}
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{achievement.description}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">{achievement.year}</span>
                  {achievement.impact && (
                    <Badge variant="outline" className="text-xs">
                      {achievement.impact}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
        <div key={category}>
          {showCategories && category !== "all" && (
            <div className="flex items-center space-x-2 mb-4">
              <div className={`p-2 rounded-lg ${categoryColors[category as keyof typeof categoryColors]}`}>
                {React.createElement(categoryIcons[category as keyof typeof categoryIcons], {
                  className: "h-5 w-5"
                })}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <Badge variant="secondary" className="ml-2">
                {categoryAchievements.length}
              </Badge>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryAchievements.map((achievement) => {
              const IconComponent = categoryIcons[achievement.category]
              return (
                <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${categoryColors[achievement.category]}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                          <div className="flex items-center space-x-2">
                            {achievement.verified && (
                              <Award className="h-4 w-4 text-blue-500" />
                            )}
                            <span className="text-sm text-gray-500">{achievement.year}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{achievement.description}</p>
                        {achievement.impact && (
                          <Badge variant="outline" className="text-xs">
                            {achievement.impact}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// Timeline version
export function AchievementsTimeline({ achievements = defaultAchievements }: { achievements?: Achievement[] }) {
  const sortedAchievements = [...achievements].sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime())

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h3 className="text-xl font-semibold text-gray-900">Achievement Timeline</h3>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-8">
          {sortedAchievements.map((achievement, index) => {
            const IconComponent = categoryIcons[achievement.category]
            return (
              <div key={achievement.id} className="relative flex items-start space-x-4">
                {/* Timeline dot */}
                <div className="relative z-10 w-8 h-8 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center">
                  <IconComponent className="h-4 w-4 text-blue-600" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                        <div className="flex items-center space-x-2">
                          {achievement.verified && (
                            <Award className="h-4 w-4 text-blue-500" />
                          )}
                          <span className="text-sm text-gray-500">{achievement.year}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{achievement.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${categoryColors[achievement.category]}`}
                        >
                          {achievement.category.replace(/([A-Z])/g, ' $1').trim()}
                        </Badge>
                        {achievement.impact && (
                          <span className="text-xs text-gray-600 font-medium">
                            {achievement.impact}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
