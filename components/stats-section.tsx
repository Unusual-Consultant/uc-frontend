"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Tooltip,
} from "recharts"

// These will be replaced by API data
const monthlyGrowthFallback = [
  { month: "Jan", clicks: 12500, sessions: 450, courses: 120, goals: 89 },
  { month: "Feb", clicks: 18600, sessions: 680, courses: 180, goals: 134 },
  { month: "Mar", clicks: 24200, sessions: 920, courses: 240, goals: 187 },
  { month: "Apr", clicks: 32100, sessions: 1200, courses: 320, goals: 245 },
  { month: "May", clicks: 42800, sessions: 1580, courses: 420, goals: 312 },
  { month: "Jun", clicks: 52000, sessions: 1950, courses: 520, goals: 389 },
]

const performanceKPIsFallback = [
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

const successMetricsFallback = [
  { metric: "Career Growth", percentage: 89 },
  { metric: "Skill Development", percentage: 94 },
  { metric: "Salary Increase", percentage: 76 },
  { metric: "Job Satisfaction", percentage: 92 },
]

const getPercentageColor = (percentage: number) => {
  if (percentage <= 25) return "#EF4444"
  if (percentage <= 50) return "#F59E0B"
  if (percentage <= 75) return "#EAB308"
  return "#10B981"
}

// Safe tooltip without Redux
const SafeTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="bg-white p-3 border rounded shadow-lg">
      <p className="font-medium mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-sm" style={{ color: entry.color }}>
          {entry.dataKey}: {entry.value}
        </p>
      ))}
    </div>
  )
}

interface MonthlyGrowth {
  month: string
  clicks: number
  sessions: number
  courses: number
  goals: number
}

interface KPI {
  category: string
  "Mentor Response Rate"?: number
  "Session Completion"?: number
  "User Satisfaction"?: number
  "Platform Uptime"?: number
  "Course Completion"?: number
  "Goal Achievement"?: number
}

interface SuccessMetric {
  metric: string
  percentage: number
}

interface StatsData {
  platform: {
    total_users: number
    active_mentors: number
    total_sessions: number
    total_revenue: number
    average_rating: number
  }
  featured_content: {
    featured_mentors: number
    featured_testimonials: number
    hero_mentors: number
    pricing_plans: number
  }
  growth: {
    new_users_this_month: number
    new_mentors_this_month: number
    sessions_this_month: number
  }
}

export function StatsSection() {
  const [statsData, setStatsData] = useState<StatsData | null>(null)
  const [monthlyGrowth, setMonthlyGrowth] = useState<MonthlyGrowth[]>(monthlyGrowthFallback)
  const [performanceKPIs, setPerformanceKPIs] = useState<KPI[]>(performanceKPIsFallback)
  const [successMetrics, setSuccessMetrics] = useState<SuccessMetric[]>(successMetricsFallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch overview stats
      const overviewResponse = await fetch("http://127.0.0.1:8000/api/v1/statistics/overview")
      if (!overviewResponse.ok) throw new Error("Failed to fetch overview stats")
      const overviewData = await overviewResponse.json()
      setStatsData(overviewData)

      // Fetch monthly growth
      const monthlyResponse = await fetch("http://127.0.0.1:8000/api/v1/statistics/monthly?months=6")
      if (monthlyResponse.ok) {
        const monthlyData = await monthlyResponse.json()
        if (monthlyData.monthly_stats) {
          setMonthlyGrowth(monthlyData.monthly_stats)
        }
      }

      // Fetch KPIs
      const kpisResponse = await fetch("http://127.0.0.1:8000/api/v1/statistics/kpis")
      if (kpisResponse.ok) {
        const kpisData = await kpisResponse.json()
        // Transform KPI data to match chart format
        const kpis = [
          {
            category: "User Engagement",
            "Mentor Response Rate": kpisData.user_engagement?.mentor_response_rate || 96,
            "Session Completion": kpisData.user_engagement?.session_completion || 94,
            "User Satisfaction": kpisData.user_engagement?.user_satisfaction || 92,
          },
          {
            category: "Platform Performance",
            "Platform Uptime": kpisData.platform_performance?.platform_uptime || 99.9,
            "Course Completion": kpisData.platform_performance?.course_completion || 87,
            "Goal Achievement": kpisData.platform_performance?.goal_achievement || 89,
          },
        ]
        setPerformanceKPIs(kpis)
      }

      // Fetch success metrics
      const successResponse = await fetch("http://127.0.0.1:8000/api/v1/statistics/success-metrics")
      if (successResponse.ok) {
        const successData = await successResponse.json()
        if (successData.metrics) {
          setSuccessMetrics(successData.metrics)
        }
      }
    } catch (error) {
      console.error("Error fetching statistics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="relative -mt-32 pb-20">
        <div className="max-w-[1159px] mx-auto bg-white rounded-[40px] shadow-[0_20px_40px_#9F9D9D40] p-10">
          <p className="text-center text-gray-600">Loading statistics...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative -mt-32 pb-20">
      <div className="max-w-[1159px] mx-auto bg-white rounded-[40px] shadow-[0_20px_40px_#9F9D9D40] p-10">
        {/* Header */}
        <div className="text-left mb-16">
  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
    Platform <span className="text-[#0073CF]">Statistics</span>
  </h2>
  <p className="text-xl text-gray-600 max-w-3xl">
    See how our platform is growing and helping professionals achieve their goals
  </p>
</div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Monthly Growth Chart */}
          <Card>
  <CardContent className="p-4 sm:p-6">
    <h3 className="text-xl font-semibold mb-4">Monthly Growth Metrics</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={monthlyGrowth}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <XAxis dataKey="month" stroke="#000" />
        <YAxis stroke="#000" />
        <Tooltip content={<SafeTooltip />} />
        <Line type="monotone" dataKey="clicks" stroke="#000" strokeWidth={2.5} />
        <Line type="monotone" dataKey="sessions" stroke="#000" strokeWidth={2.5} />
        <Line type="monotone" dataKey="courses" stroke="#000" strokeWidth={2.5} />
        <Line type="monotone" dataKey="goals" stroke="#000" strokeWidth={2.5} />
      </LineChart>
    </ResponsiveContainer>
  </CardContent>
</Card>


          {/* Performance KPIs */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-xl font-semibold mb-4">Key Performance Indicators</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={performanceKPIs}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<SafeTooltip />} />
                  <Bar dataKey="Mentor Response Rate" stackId="a" fill="var(--color-mentor-response-rate)" />
                  <Bar dataKey="Session Completion" stackId="a" fill="var(--color-session-completion)" />
                  <Bar dataKey="User Satisfaction" stackId="a" fill="var(--color-user-satisfaction)" />
                  <Bar dataKey="Platform Uptime" stackId="b" fill="var(--color-platform-uptime)" />
                  <Bar dataKey="Course Completion" stackId="b" fill="var(--color-course-completion)" />
                  <Bar dataKey="Goal Achievement" stackId="b" fill="var(--color-goal-achievement)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Success Metrics */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold mb-6 text-center">Success Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {successMetrics.map((item) => (
                <div key={item.metric} className="text-center">
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="15" fill="none" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={getPercentageColor(item.percentage)}
                        strokeWidth="13"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] p-6 text-center rounded-bl-[48px]">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {statsData ? `${statsData.platform.total_users}+` : "0+"}
            </div>
            <div className="text-black">Total Users</div>
          </div>
          <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] p-6 text-center rounded-tl-[48px] rounded-tr-[48px]">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {statsData ? `${statsData.platform.active_mentors}+` : "0+"}
            </div>
            <div className="text-black">Expert Mentors</div>
          </div>
          <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] p-6 text-center rounded-tl-[48px] rounded-tr-[48px]">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {statsData ? statsData.featured_content.pricing_plans : "3"}
            </div>
            <div className="text-black">Pricing Plans</div>
          </div>
          <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] p-6 text-center rounded-br-[48px]">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {statsData ? `${Math.round(statsData.platform.average_rating * 10)}%` : "0%"}
            </div>
            <div className="text-black">Avg Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
