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
  const userName = user?.first_name || user?.name || "Mentor"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">Manage your mentorship business and track your success</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="mentorship" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Sessions</span>
          </TabsTrigger>
          <TabsTrigger value="freelance" className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
          <TabsTrigger value="packages" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Packages</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center space-x-2">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Reviews</span>
          </TabsTrigger>
          <TabsTrigger value="earnings" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Earnings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <DashboardOverview />
        </TabsContent>

        <TabsContent value="mentorship" className="mt-6">
          <MentorshipManagement />
        </TabsContent>

        <TabsContent value="freelance" className="mt-6">
          <FreelanceProjects />
        </TabsContent>

        <TabsContent value="packages" className="mt-6">
          <PackagesPricing />
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <ReviewsFeedback />
        </TabsContent>

        <TabsContent value="earnings" className="mt-6">
          <EarningsWithdrawals />
        </TabsContent>
      </Tabs>
    </div>
  )
}
