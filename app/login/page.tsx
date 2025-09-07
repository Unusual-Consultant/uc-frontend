"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { User, GraduationCap } from "lucide-react";
import { api } from "@/lib/api";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("mentee");
  const router = useRouter();

  const handleLogin = (userType: "mentee" | "mentor") => {
    localStorage.setItem(
      "userAuth",
      JSON.stringify({
        isLoggedIn: true,
        userType: userType,
      })
    );
    router.push(`/${userType}/dashboard`);
  };

  const handleSocialLogin = (
    provider: string,
    userType: "mentee" | "mentor"
  ) => {
    if (provider === "google") {
      window.location.href = api.auth.google.login();
      return;
    }
    handleLogin(userType);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-4">
      {/* Mirror Glaze Rectangle with Login Card Inside */}
      <div
        className="absolute w-[509px] h-[685px] top-[110px] left-1/2 -translate-x-1/2
    bg-gradient-to-b from-[#D1EAFF66] to-[#D1EAFF1A]
    backdrop-blur-[75px] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]
    flex items-center justify-center px-6 py-8 z-10"
      >
        {/* Login Card */}
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="font-mulish font-extrabold text-[26px] leading-[140%] tracking-[0px]">
              Welcome Back!
            </h1>
            <p className="font-mulish font-semibold text-[15px] leading-[140%] tracking-[0px] text-black-500">
              Choose your account type to continue
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 p-1 mb-4">
              <TabsTrigger
                value="mentee"
                className="flex items-center gap-2 rounded-2xl
                  data-[state=active]:bg-[#0073CF] 
                  data-[state=active]:text-white 
                  data-[state=active]:shadow-sm"
              >
                <User className="h-4 w-4" />
                <span>Mentee</span>
              </TabsTrigger>
              <TabsTrigger
                value="mentor"
                className="flex items-center gap-2 rounded-2xl
                  data-[state=active]:bg-[#0073CF] 
                  data-[state=active]:text-white 
                  data-[state=active]:shadow-sm"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Mentor</span>
              </TabsTrigger>
            </TabsList>

            {/* Mentee Tab */}
            <TabsContent value="mentee" className="space-y-6">
              <div className="text-center">
                <h3 className="font-semibold">Sign in as Mentee</h3>
                <p className="font-mulish font-semibold text-[15px] leading-[140%] tracking-[0px] text-black-500">
                  Access your learning dashboard and connect with mentors
                </p>
              </div>

              <div className="w-[395px] flex flex-col gap-2">
                <Label
                  htmlFor="mentee-email"
                  className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left"
                >
                  Email
                </Label>
                <Input
                  id="mentee-email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-[450px] px-4 py-3 rounded-2xl border border-black text-gray-800 font-medium"
                />

                <div className="w-[395px] flex flex-col gap-2">
                  <Label
                    htmlFor="mentee-password"
                    className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left"
                  >
                    Password
                  </Label>
                  <Input
                    id="mentee-password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-[450px] px-4 py-3 rounded-2xl border border-black text-gray-800"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-[#0073CF] hover:bg-[#0066B3] text-white rounded-2xl"
                onClick={() => handleLogin("mentee")}
              >
                Sign In as Mentee
              </Button>

              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="font-mulish font-semibold text-[15px] leading-[140%] tracking-[0px] text-black-600 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-black"
                  onClick={() => handleSocialLogin("google", "mentee")}
                  aria-label="Continue with Google"
                >
                  <img src="/google.png" alt="Google" className="h-5 w-5" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-black"
                  onClick={() => handleSocialLogin("linkedin", "mentee")}
                >
                  <img src="/linkedin.png" alt="LinkedIn" className="h-5 w-5" />
                  Continue with LinkedIn
                </Button>
              </div>
            </TabsContent>

            {/* Mentor Tab */}
            <TabsContent value="mentor" className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <h3 className="font-semibold">Sign in as Mentor</h3>
                <p className="font-mulish font-semibold text-[15px] leading-[140%] tracking-[0px] text-black-500">
                  Access your mentor dashboard and manage your sessions
                </p>
              </div>

              {/* Form Fields */}
              <div className="w-[395px] flex flex-col gap-2">
                <Label
                  htmlFor="mentor-email"
                  className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left"
                >
                  Email
                </Label>
                <Input
                  id="mentor-email"
                  type="email"
                  placeholder="mentor@example.com"
                  className="w-[450px] px-4 py-3 rounded-2xl border border-black text-gray-800 font-medium"
                />

                <div className="w-[395px] flex flex-col gap-2">
                  <Label
                    htmlFor="mentor-password"
                    className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left"
                  >
                    Password
                  </Label>
                  <Input
                    id="mentor-password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-[450px] px-4 py-3 rounded-2xl border border-black text-gray-800"
                  />
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                className="w-full bg-[#0073CF] hover:bg-[#0066B3] text-white rounded-2xl"
                onClick={() => handleLogin("mentor")}
              >
                Sign In as Mentor
              </Button>

              {/* Forgot Password */}
              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="font-mulish font-semibold text-[15px] leading-[140%] tracking-[0px] text-black-600 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <Separator />

              {/* Social Logins */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-black"
                  onClick={() => handleSocialLogin("google", "mentor")}
                  aria-label="Continue with Google"
                >
                  <img src="/google.png" alt="Google" className="h-5 w-5" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-black"
                  onClick={() => handleSocialLogin("linkedin", "mentor")}
                >
                  <img src="/linkedin.png" alt="LinkedIn" className="h-5 w-5" />
                  Continue with LinkedIn
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <p className="font-mulish font-semibold text-[15px] leading-[140%] tracking-[0px] text-black-700">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="text-[#0073CF] hover:underline font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}