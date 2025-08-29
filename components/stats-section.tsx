"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, ResponsiveContainer, LineChart, Line, BarChart, Bar } from "recharts"

const monthlyGrowth = [
  { month: "Jan", clicks: 12500, sessions: 450, courses: 120, goals: 89 },
  { month: "Feb", clicks: 18600, sessions: 680, courses: 180, goals: 134 },
  { month: "Mar", clicks: 24200, sessions: 920, courses: 240, goals: 187 },
  { month: "Apr", clicks: 32100, sessions: 1200, courses: 320, goals: 245 },
  { month: "May", clicks: 42800, sessions: 1580, courses: 420, goals: 312 },
  { month: "Jun", clicks: 52000, sessions: 1950, courses: 520, goals: 389 },
]

const performanceKPIs = [
  {
    category: "User Engagement",
    "Mentor Response Rate": 96,
    "Session Completion": 94,
    "User Satisfaction": 92,
  },
  {
    category: "Platform Performance",
    "Platform Uptime": 99.9,
    "Course Completion": 87,
    "Goal Achievement": 89,
  },
]

const successMetrics = [
  { metric: "Career Growth", percentage: 89 },
  { metric: "Skill Development", percentage: 94 },
  { metric: "Salary Increase", percentage: 76 },
  { metric: "Job Satisfaction", percentage: 92 },
]

// Function to get color based on percentage (red to green transition)
const getPercentageColor = (percentage: number) => {
  if (percentage <= 25) return "#EF4444" // Red
  if (percentage <= 50) return "#F59E0B" // Orange
  if (percentage <= 75) return "#EAB308" // Yellow
  return "#10B981" // Green
}

export function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Platform Statistics</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our platform is growing and helping professionals achieve their goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Monthly Growth Chart */}
          <Card className="shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-xl font-semibold mb-4">Monthly Growth Metrics</h3>
              <div className="overflow-hidden">
                <ChartContainer
                  config={{
                    clicks: { label: "Platform Clicks", color: "#3B82F6" },
                    sessions: { label: "Sessions Booked", color: "#10B981" },
                    courses: { label: "Courses Enrolled", color: "#F59E0B" },
                    goals: { label: "Goals Achieved", color: "#8B5CF6" },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="clicks" stroke="var(--color-clicks)" strokeWidth={3} />
                      <Line type="monotone" dataKey="sessions" stroke="var(--color-sessions)" strokeWidth={3} />
                      <Line type="monotone" dataKey="courses" stroke="var(--color-courses)" strokeWidth={3} />
                      <Line type="monotone" dataKey="goals" stroke="var(--color-goals)" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance KPIs */}
          <Card className="shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-xl font-semibold mb-4">Key Performance Indicators</h3>
              <div className="overflow-hidden">
                <ChartContainer
                  config={{
                    "Mentor Response Rate": { label: "Mentor Response Rate", color: "#3B82F6" },
                    "Session Completion": { label: "Session Completion", color: "#10B981" },
                    "User Satisfaction": { label: "User Satisfaction", color: "#F59E0B" },
                    "Platform Uptime": { label: "Platform Uptime", color: "#8B5CF6" },
                    "Course Completion": { label: "Course Completion", color: "#EF4444" },
                    "Goal Achievement": { label: "Goal Achievement", color: "#06B6D4" },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceKPIs} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} interval={0} />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 border rounded shadow-lg">
                                <p className="font-medium mb-2">{label}</p>
                                {payload.map((entry, index) => (
                                  <p key={index} className="text-sm" style={{ color: entry.color }}>
                                    {entry.dataKey}: {entry.value}%
                                  </p>
                                ))}
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="Mentor Response Rate" stackId="a" fill="var(--color-mentor-response-rate)" />
                      <Bar dataKey="Session Completion" stackId="a" fill="var(--color-session-completion)" />
                      <Bar dataKey="User Satisfaction" stackId="a" fill="var(--color-user-satisfaction)" />
                      <Bar dataKey="Platform Uptime" stackId="b" fill="var(--color-platform-uptime)" />
                      <Bar dataKey="Course Completion" stackId="b" fill="var(--color-course-completion)" />
                      <Bar dataKey="Goal Achievement" stackId="b" fill="var(--color-goal-achievement)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Metrics */}
        <Card className="shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold mb-6 text-center">Success Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {successMetrics.map((item) => (
                <div key={item.metric} className="text-center">
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={getPercentageColor(item.percentage)}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${item.percentage * 2.51} 251`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">{item.percentage}%</span>
                    </div>
                  </div>
                  <p className="font-medium text-blue-900 text-lg">{item.metric}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">52K+</div>
            <div className="text-gray-600">Monthly Clicks</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1950+</div>
            <div className="text-gray-600">Sessions Booked</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">520+</div>
            <div className="text-gray-600">Courses Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">389+</div>
            <div className="text-gray-600">Goals Achieved</div>
          </div>
        </div>
      </div>
    </section>
  )
}
