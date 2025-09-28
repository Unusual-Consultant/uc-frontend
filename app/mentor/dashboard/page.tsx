"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardOverview } from "@/components/mentor-dashboard/dashboard-overview"
import { MentorshipManagement } from "@/components/mentor-dashboard/mentorship-management"
import { FreelanceProjects } from "@/components/mentor-dashboard/freelance-projects"
import { PackagesPricing } from "@/components/mentor-dashboard/packages-pricing"
import { ReviewsFeedback } from "@/components/mentor-dashboard/reviews-feedback"
import { EarningsWithdrawals } from "@/components/mentor-dashboard/earnings-withdrawals"
import { LayoutDashboard, Calendar, Briefcase, Package, Star, DollarSign } from "lucide-react"
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider"

export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user } = useAuthenticatedUser()
  const userName = user?.firstName || user?.first_name || user?.name || "Mentor"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">Manage your mentorship business and track your success</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
  {/* Outer pill container */}
  <TabsList className="flex bg-white rounded-full p-2 shadow-sm overflow-hidden shadow-md hover:shadow-lg transition">
    {[
      { value: "overview", icon: LayoutDashboard, label: "Overview" },
      { value: "mentorship", icon: Calendar, label: "Sessions" },
      { value: "freelance", icon: Briefcase, label: "Projects" },
      { value: "packages", icon: Package, label: "Packages" },
      { value: "reviews", icon: Star, label: "Reviews" },
      { value: "earnings", icon: DollarSign, label: "Earnings" },
    ].map((tab) => (
      <TabsTrigger
        key={tab.value}
        value={tab.value}
        className="flex items-center justify-center space-x-2 px-4 py-2 text-sm rounded-full transition-all duration-200
          data-[state=active]:bg-blue-600
          data-[state=active]:text-white
          data-[state=active]:shadow-md
          text-gray-600
          hover:bg-blue-100
          "
      >
        <tab.icon className="h-4 w-4 data-[state=active]:text-white text-gray-600" />
        <span className="hidden sm:inline">{tab.label}</span>
      </TabsTrigger>
    ))}
  </TabsList>

  {/* Tab Contents */}
  <div className="mt-6">
    <TabsContent value="overview">
      <DashboardOverview />
    </TabsContent>
    <TabsContent value="mentorship">
      <MentorshipManagement />
    </TabsContent>
    <TabsContent value="freelance">
      <FreelanceProjects />
    </TabsContent>
    <TabsContent value="packages">
      <PackagesPricing />
    </TabsContent>
    <TabsContent value="reviews">
      <ReviewsFeedback />
    </TabsContent>
    <TabsContent value="earnings">
      <EarningsWithdrawals />
    </TabsContent>
  </div>
</Tabs>


    </div>
  )
}
