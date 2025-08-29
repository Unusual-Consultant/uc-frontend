"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Trash2, Plus, Video, MessageCircle, FileText, Clock, DollarSign, Users, TrendingUp } from "lucide-react"

export function PackagesPricing() {
  const [globalAvailability, setGlobalAvailability] = useState(true)
  const [editingPackage, setEditingPackage] = useState<number | null>(null)

  const mentorshipPackages = [
    {
      id: 1,
      title: "Career Strategy Session",
      description: "1-on-1 career guidance and strategic planning",
      duration: "60 minutes",
      price: "₹2,500",
      type: "Video Call",
      isActive: true,
      bookings: 45,
      rating: 4.9,
    },
    {
      id: 2,
      title: "Resume Review & Feedback",
      description: "Comprehensive resume analysis with improvement suggestions",
      duration: "30 minutes",
      price: "₹1,200",
      type: "Chat Session",
      isActive: true,
      bookings: 32,
      rating: 4.8,
    },
    {
      id: 3,
      title: "Mock Interview Session",
      description: "Practice interviews with detailed feedback",
      duration: "45 minutes",
      price: "₹2,000",
      type: "Video Call",
      isActive: false,
      bookings: 18,
      rating: 5.0,
    },
  ]

  const freelancePackages = [
    {
      id: 4,
      title: "Complete Resume Makeover",
      description: "Professional resume redesign with ATS optimization",
      deliveryTime: "3-5 days",
      price: "₹8,000",
      type: "Fixed Project",
      isActive: true,
      orders: 28,
      rating: 4.9,
    },
    {
      id: 5,
      title: "Pitch Deck Creation",
      description: "Investor-ready pitch deck with compelling storytelling",
      deliveryTime: "7-10 days",
      price: "₹15,000",
      type: "Fixed Project",
      isActive: true,
      orders: 12,
      rating: 5.0,
    },
  ]

  const pricingGuidelines = [
    { service: "Career Consultation (60 min)", suggested: "₹2,000 - ₹3,500", market: "₹2,800 avg" },
    { service: "Resume Review (30 min)", suggested: "₹1,000 - ₹1,500", market: "₹1,200 avg" },
    { service: "Mock Interview (45 min)", suggested: "₹1,500 - ₹2,500", market: "₹2,000 avg" },
    { service: "Complete Resume Redesign", suggested: "₹6,000 - ₹12,000", market: "₹8,500 avg" },
    { service: "Pitch Deck Creation", suggested: "₹12,000 - ₹20,000", market: "₹15,500 avg" },
  ]

  return (
    <div className="space-y-6">
      {/* Global Availability Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Booking Availability</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="global-availability">Accept New Bookings</Label>
              <Switch id="global-availability" checked={globalAvailability} onCheckedChange={setGlobalAvailability} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {globalAvailability
              ? "You are currently accepting new bookings. Clients can book your available services."
              : "You have paused new bookings. Existing sessions will continue as scheduled."}
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="mentorship" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mentorship">Mentorship Packages</TabsTrigger>
          <TabsTrigger value="freelance">Freelance Services</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="mentorship" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Mentorship Packages</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Package
            </Button>
          </div>

          <div className="grid gap-4">
            {mentorshipPackages.map((pkg) => (
              <Card key={pkg.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-lg">{pkg.title}</h4>
                        <Badge variant={pkg.isActive ? "default" : "secondary"}>
                          {pkg.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{pkg.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{pkg.price}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {pkg.type === "Video Call" ? (
                            <Video className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span>{pkg.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{pkg.bookings} bookings</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mt-3">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">{pkg.rating}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div
                                key={star}
                                className={`w-3 h-3 ${star <= pkg.rating ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                ★
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={pkg.isActive}
                        onCheckedChange={() => {
                          /* Toggle package availability */
                        }}
                      />
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="freelance" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Freelance Services</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </div>

          <div className="grid gap-4">
            {freelancePackages.map((pkg) => (
              <Card key={pkg.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-lg">{pkg.title}</h4>
                        <Badge variant={pkg.isActive ? "default" : "secondary"}>
                          {pkg.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{pkg.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{pkg.deliveryTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{pkg.price}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{pkg.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span>{pkg.orders} orders</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mt-3">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">{pkg.rating}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div
                                key={star}
                                className={`w-3 h-3 ${star <= pkg.rating ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                ★
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={pkg.isActive}
                        onCheckedChange={() => {
                          /* Toggle service availability */
                        }}
                      />
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Guidelines</CardTitle>
              <p className="text-sm text-muted-foreground">
                Competitive pricing recommendations based on market analysis
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pricingGuidelines.map((guideline, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{guideline.service}</div>
                      <div className="text-sm text-muted-foreground">Market Average: {guideline.market}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">{guideline.suggested}</div>
                      <div className="text-xs text-muted-foreground">Suggested Range</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
