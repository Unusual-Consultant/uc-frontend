"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { User, GraduationCap } from "lucide-react"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("mentee")
  const router = useRouter()

  const handleLogin = (userType: "mentee" | "mentor") => {
    // Set authentication state
    localStorage.setItem(
      "userAuth",
      JSON.stringify({
        isLoggedIn: true,
        userType: userType,
      }),
    )

    // Redirect to appropriate dashboard
    router.push(`/${userType}/dashboard`)
  }

  const handleSocialLogin = (provider: string, userType: "mentee" | "mentor") => {
    // Handle social login logic here
    handleLogin(userType)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Choose your account type to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mentee" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Mentee</span>
                </TabsTrigger>
                <TabsTrigger value="mentor" className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Mentor</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mentee" className="space-y-6 mt-6">
                <div className="text-center mb-4">
                  <h3 className="font-semibold">Sign in as Mentee</h3>
                  <p className="text-sm text-muted-foreground">
                    Access your learning dashboard and connect with mentors
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mentee-email">Email</Label>
                    <Input id="mentee-email" type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="mentee-password">Password</Label>
                    <Input id="mentee-password" type="password" />
                  </div>
                </div>

                <Button className="w-full" onClick={() => handleLogin("mentee")}>
                  Sign In as Mentee
                </Button>

                <div className="text-center">
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </Link>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => handleSocialLogin("google", "mentee")}
                  >
                    Continue with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => handleSocialLogin("linkedin", "mentee")}
                  >
                    Continue with LinkedIn
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="mentor" className="space-y-6 mt-6">
                <div className="text-center mb-4">
                  <h3 className="font-semibold">Sign in as Mentor</h3>
                  <p className="text-sm text-muted-foreground">Access your mentor dashboard and manage your sessions</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mentor-email">Email</Label>
                    <Input id="mentor-email" type="email" placeholder="mentor@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="mentor-password">Password</Label>
                    <Input id="mentor-password" type="password" />
                  </div>
                </div>

                <Button className="w-full" onClick={() => handleLogin("mentor")}>
                  Sign In as Mentor
                </Button>

                <div className="text-center">
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </Link>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => handleSocialLogin("google", "mentor")}
                  >
                    Continue with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => handleSocialLogin("linkedin", "mentor")}
                  >
                    Continue with LinkedIn
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm mt-6">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
