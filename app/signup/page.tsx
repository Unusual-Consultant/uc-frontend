"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api, API_BASE_URL } from "@/lib/api";
import { User, GraduationCap } from "lucide-react";
import SignupForm from "@/components/signup-form";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get('type');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(userType === 'mentor' ? 'mentor' : 'mentee');
  const [currentStep, setCurrentStep] = useState(1);
  const [step, setStep] = useState(2);

  const handleSignup = (userType: "mentee" | "mentor") => {
    localStorage.setItem(
      "userAuth",
      JSON.stringify({
        isLoggedIn: true,
        userType: userType,
      })
    );
    router.push(`/${userType}/dashboard`);
  };

  const handleSocialSignup = (
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
  handleSignup(userType);
};
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-4 overflow-hidden pb-24">
      {/* 🔹 Background Infinite Scroll Rows */}
      <div className="absolute top-[230px] left-0 w-full overflow-hidden">
        <div className="flex animate-scroll-left w-full">
          <img
            src="/image1.png"
            alt="Scrolling profiles"
            className="h-[245px] flex-shrink-0"
          />
          <img
            src="/image1.png"
            alt="Scrolling profiles"
            className="h-[245px] flex-shrink-0"
          />
          <img
            src="/image1.png"
            alt="Scrolling profiles"
            className="h-[245px] flex-shrink-0"
          />
        </div>
      </div>

      <div className="absolute bottom-[230px] left-0 w-full overflow-hidden">
        <div className="flex animate-scroll-right w-full">
          <img
            src="/image1.png"
            alt="Scrolling profiles"
            className="h-[245px] flex-shrink-0"
          />
          <img
            src="/image1.png"
            alt="Scrolling profiles"
            className="h-[245px] flex-shrink-0"
          />
          <img
            src="/image1.png"
            alt="Scrolling profiles"
            className="h-[245px] flex-shrink-0"
          />
        </div>
      </div>

      {/* 🔹 Frosted Glass Signup Box */}
      <div className="bg-gradient-to-b from-[#D1EAFF66] to-[#D1EAFF1A] backdrop-blur-[75px] rounded-[30px] shadow-[4px_8px_20px_rgba(159,157,157,0.25)] flex flex-col items-center px-16 py-8 z-10">
        {/* Header + Tabs */}
        <h1 className="font-mulish font-extrabold text-[22px] mb-2">
          {activeTab === "mentee" ? "Mentee Onboarding" : "Mentor Onboarding"}
        </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col items-center">
          <TabsList className="relative grid grid-cols-2 rounded-[30px] bg-gray-100 p-1 mb-4 overflow-hidden" style={{ width: "289px", height: "48px", minWidth: "84px", maxWidth: "480px" }}>
            {/* Sliding Blue Background */}
            <div
              className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#0073CF] rounded-[26px] transition-transform duration-300 ease-out pointer-events-none"
              style={{
                transform: activeTab === "mentor" ? "translateX(calc(100% + 4px))" : "translateX(0)",
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
              <User className="h-4 w-4 font-bold" />
              <span className="font-bold">Mentee</span>
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
              <GraduationCap className="h-4 w-4 font-bold" />
              <span className="font-bold">Mentor</span>
            </TabsTrigger>
          </TabsList>

          {/* Mentee Tab */}
          <TabsContent
            value="mentee"
            className="space-y-4 flex flex-col items-center"
          >
            <p className="text-[23px] font-semibold">
              Get Started in 30 seconds
            </p>
            <p className="text-[15px] text-black-500 font-medium">
              Join thousands of professionals growing their careers
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all duration-300
            ${
              currentStep === step
                ? "bg-[#0073CF] scale-110"
                : "border border-[#0073CF] bg-transparent"
            }`}
                />
              ))}
            </div>
            <p className="text-[15px] text-black-500">Step 1 of 3</p>

            {/* Social Buttons */}
            <div className="space-y-3 w-[418px]">
              <Button
                variant="outline"
                className="relative w-[93%] mx-auto h-[50px] flex items-center justify-center gap-2 rounded-full border border-black"
                onClick={() => handleSocialSignup("google", "mentee")}
                aria-label="Continue with Google"
              >
                <img src="/google.png" alt="Google" className="h-5" />
                <span className="font-bold">Continue with Google</span>
              </Button>
              <Button
                variant="outline"
                className="relative w-[93%] mx-auto h-[50px] flex items-center justify-center gap-2 rounded-full border border-black"
                onClick={() => handleSocialSignup("linkedin", "mentee")}
              >
                <img src="/linkedin.png" alt="LinkedIn" className="h-5 w-5" />
                <span className="font-bold">Continue with LinkedIn</span>
              </Button>
            </div>

            <p className="text-[15px] py-2 text-black-500">
              Recommended for fast signup
            </p>

            {/* OR Divider */}
            <div className="flex items-center w-full max-w-[400px]">
              <div className="flex-grow h-px bg-gray-400"></div>
              <span className="px-2 text-black text-[14px] font-semibold">OR</span>
              <div className="flex-grow h-px bg-gray-400"></div>
            </div>

            {/* Signup Form */}
            <SignupForm userType={activeTab as "mentee" | "mentor"} />
          </TabsContent>

          {/* Mentor Tab */}
          <TabsContent
            value="mentor"
            className="space-y-4 flex flex-col items-center"
          >
            <p className="text-[23px] font-semibold">
              Join as a Freelance Mentor
            </p>
            <p className="text-[15px] text-black-500 font-medium">
              Share your expertise & earn money helping grow others
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all duration-300
            ${
              currentStep === step
                ? "bg-[#0073CF] scale-110"
                : "border border-[#0073CF] bg-transparent"
            }`}
                />
              ))}
            </div>
            <p className="text-[15px] text-black-500">Step 1 of 5</p>

            {/* Social Buttons */}
            <div className="space-y-3 w-[418px]">
              <Button
                variant="outline"
                className="relative w-[93%] mx-auto h-[50px] flex items-center justify-center gap-2 rounded-full border border-black"
                onClick={() => handleSocialSignup("google", "mentor")}
                aria-label="Continue with Google"
              >
                <img src="/google.png" alt="Google" className="h-5 w-5" />
                <span className="font-bold">Continue with Google</span>
              </Button>
              <Button
                variant="outline"
                className="relative w-[93%] mx-auto h-[50px] flex items-center justify-center gap-2 rounded-full border border-black"
                onClick={() => handleSocialSignup("linkedin", "mentor")}
              >
                <img src="/linkedin.png" alt="LinkedIn" className="h-5 w-5" />
                <span className="font-bold">Continue with LinkedIn</span>
              </Button>
            </div>

            <p className="text-[15px] py-2 text-black-500">
              Recommended for fast signup
            </p>

            {/* OR Divider */}
            <div className="flex items-center w-full max-w-[400px]">
              <div className="flex-grow h-px bg-gray-400"></div>
              <span className="px-2 text-black text-[14px] font-semibold">OR</span>
              <div className="flex-grow h-px bg-gray-400"></div>
            </div>

            {/* Signup Form */}
            <SignupForm userType={activeTab as "mentee" | "mentor"} />
          </TabsContent>
        </Tabs>
        {/* 🔹 Keyframes for scrolling */}
        <style jsx global>{`
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
    </div>
  );
}
