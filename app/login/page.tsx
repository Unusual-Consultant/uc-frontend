"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { User, GraduationCap } from "lucide-react";
import { api } from "@/lib/api";
import LoginForm from "@/components/login-form";

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
    // Save who is signing up before redirect
    localStorage.setItem("userType", userType);

    if (provider === "google") {
      // Use the API object for consistency
      window.location.href = api.auth.google.login(userType);
      return;
    }
    handleLogin(userType);
  };

  return (
    <div className="relative flex min-h-screen  items-center justify-center bg-white px-4 overflow-hidden pb-32 pt-0">
      {/* 🔹 Background Infinite Scroll Rows */}
      <div className="absolute top-[150px] left-0 w-full overflow-hidden">
        <div className="flex animate-scroll-left">
          <img src="/image.png" alt="Scrolling profiles" className="h-[245px]" />
          <img src="/image.png" alt="Scrolling profiles" className="h-[245px]" />
          <img src="/image.png" alt="Scrolling profiles" className="h-[245px]" />
          <img src="/image.png" alt="Scrolling profiles" className="h-[245px]" />
        </div>
      </div>
      <div className="absolute top-[425px] left-0 w-full overflow-hidden">
        <div className="flex animate-scroll-right">
          <img src="/image.png" alt="Scrolling profiles" className="h-[245px]" />
          <img src="/image.png" alt="Scrolling profiles" className="h-[245px]" />
          <img src="/image.png" alt="Scrolling profiles" className="h-[245px]" />
          <img src="/image.png" alt="Scrolling profiles" className="h-[245px]" />
        </div>
      </div>

      {/* 🔹 Mirror Glaze Rectangle with Login Card Inside */}
      <div
        className=" bg-gradient-to-b from-[#D1EAFF66] to-[#D1EAFF1A] backdrop-blur-[75px] rounded-[30px] shadow-[0_4px_30px_rgba(0,0,0,0.4)] flex items-center justify-center px-6 py-8 z-10"
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
            className="w-full flex flex-col items-center"
          >
            <TabsList className="relative grid grid-cols-2 rounded-[30px] bg-gray-100 p-1 mb-4 overflow-hidden" style={{ width: "289px", height: "48px", minWidth: "84px", maxWidth: "480px" }}>
              {/* Sliding Blue Background */}
              <div
                className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#0073CF] rounded-[26px] transition-transform duration-300 ease-out pointer-events-none"
                style={{
                  transform: activeTab === "mentor" ? "translateX(100%)" : "translateX(0)",
                }}
              />

              <TabsTrigger
                value="mentee"
                className="relative z-10 flex items-center gap-2 rounded-[30px]
                  data-[state=active]:bg-transparent 
                  data-[state=active]:text-white 
                  data-[state=inactive]:bg-transparent
                  data-[state=inactive]:text-black
                  data-[state=active]:shadow-none
                  transition-colors duration-300"
              >
                <User className="h-4 w-4" />
                <span>Mentee</span>
              </TabsTrigger>
              <TabsTrigger
                value="mentor"
                className="relative z-10 flex items-center gap-2 rounded-[30px]
                  data-[state=active]:bg-transparent 
                  data-[state=active]:text-white 
                  data-[state=inactive]:bg-transparent
                  data-[state=inactive]:text-black
                  data-[state=active]:shadow-none
                  transition-colors duration-300"
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

              <LoginForm userType="mentee" />

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
                  className="w-[93%] mx-auto flex items-center justify-center gap-2 rounded-[30px] border border-black h-[50px]"
                  onClick={() => handleSocialLogin("google", "mentee")}
                  aria-label="Continue with Google"
                >
                  <img src="/google.png" alt="Google" className="h-5 w-5" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-[93%] mx-auto flex items-center justify-center gap-2 rounded-[30px] border border-black h-[50px]"
                  onClick={() => handleSocialLogin("linkedin", "mentee")}
                >
                  <img src="/linkedin.png" alt="LinkedIn" className="h-5 w-5" />
                  Continue with LinkedIn
                </Button>
              </div>
            </TabsContent>

            {/* Mentor Tab */}
            <TabsContent value="mentor" className="space-y-6">
              <div className="text-center">
                <h3 className="font-semibold">Sign in as Mentor</h3>
                <p className="font-mulish font-semibold text-[15px] leading-[140%] tracking-[0px] text-black-500">
                  Access your mentor dashboard and manage your sessions
                </p>
              </div>

              <LoginForm userType="mentor" />

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
                  className="w-[93%] mx-auto flex items-center justify-center gap-2 rounded-[30px] border border-black h-[50px]"
                  onClick={() => handleSocialLogin("google", "mentor")}
                  aria-label="Continue with Google"
                >
                  <img src="/google.png" alt="Google" className="h-5 w-5" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-[93%] mx-auto flex items-center justify-center gap-2 rounded-[30px] border border-black h-[50px]"
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

      {/* 🔹 Keyframes for scrolling */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          display: flex;
          width: 200%;
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          display: flex;
          width: 200%;
          animation: scroll-right 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
