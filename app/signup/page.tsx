"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { User, GraduationCap } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("mentee");
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
    // Pass userType as query parameter to backend
    window.location.href = `http://localhost:8000/api/v1/auth/google/login?user_type=${userType}`;
    return;
  }
  handleSignup(userType);
};
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-4 overflow-hidden pb-24 pt-24 ">
      {/* 🔹 Background Infinite Scroll Rows */}
      <div className="absolute top-[230px] left-0 w-full overflow-hidden">
        <div className="flex animate-scroll-left w-full">
          <img
            src="/image.png"
            alt="Scrolling profiles"
            className="h-[245px] flex-shrink-0"
          />
          <img
            src="/image.png"
            alt="Scrolling profiles"
            className="h-[245px] flex-shrink-0"
          />
          <img
            src="/image.png"
            alt="Scrolling profiles"
            className="h-[245px] flex-shrink-0"
          />
        </div>
      </div>

      <div className="absolute bottom-[230px] left-0 w-full overflow-hidden">
        <div className="flex animate-scroll-right w-full">
          <img
            src="/image.png"
            alt="Scrolling profiles"
            className="h-[245px] flex-shrink-0"
          />
          <img
            src="/image.png"
            alt="Scrolling profiles"
            className="h-[245px] flex-shrink-0"
          />
          <img
            src="/image.png"
            alt="Scrolling profiles"
            className="h-[245px] flex-shrink-0"
          />
        </div>
      </div>

      {/* 🔹 Frosted Glass Signup Box */}
      <div className=" bg-gradient-to-b from-[rgba(209,234,255,0.4)] to-[rgba(209,234,255,0.1)] backdrop-blur-[700px] rounded-[30px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center px-6 py-8 z-10">
        {/* Header + Tabs */}
        <h1 className="font-mulish font-extrabold text-[22px] mb-2">
          {activeTab === "mentee" ? "Mentee Onboarding" : "Mentor Onboarding"}
        </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-3xl bg-gray-100 p-1 mb-4">
            <TabsTrigger
              value="mentee"
              className="flex items-center gap-2 rounded-3xl
                  data-[state=active]:bg-[#0073CF] 
                  data-[state=active]:text-white 
                  data-[state=active]:shadow-sm"
            >
              <User className="h-4 w-4" />
              <span>Mentee</span>
            </TabsTrigger>
            <TabsTrigger
              value="mentor"
              className="flex items-center gap-2 rounded-3xl
                  data-[state=active]:bg-[#0073CF] 
                  data-[state=active]:text-white 
                  data-[state=active]:shadow-sm"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Mentor</span>
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
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
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
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-[400px] flex items-center justify-center gap-2 rounded-full border border-black"
                onClick={() => handleSocialSignup("google", "mentee")}
                aria-label="Continue with Google"
              >
                <img src="/google.png" alt="Google" className="h-5 w-5" />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className=" grid w-full flex items-center justify-center gap-2 rounded-full border border-black"
                onClick={() => handleSocialSignup("linkedin", "mentee")}
              >
                <img src="/linkedin.png" alt="LinkedIn" className="h-5 w-5" />
                Continue with LinkedIn
              </Button>
            </div>

            <p className="text-[15px] text-black-500">
              Recommended for fast signup
            </p>

            {/* OR Divider */}
            <div className="flex items-center w-full max-w-[400px]">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-2 text-black/50 text-[12px]">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* OTP / Password Toggle */}
            <Tabs defaultValue="OTP" className="w-[418px]">
              <TabsList className="grid w-full grid-cols-2 rounded-3xl bg-gray-100 p-1 mb-4">
                <TabsTrigger
                  value="OTP"
                  className="flex items-center gap-2 rounded-2xl
                  data-[state=active]:bg-[#0073CF] 
                  data-[state=active]:text-white 
                  data-[state=active]:shadow-sm"
                >
                  <User className="h-4 w-4" />
                  <span>Sign up with OTP</span>
                </TabsTrigger>
                <TabsTrigger
                  value="PW"
                  className="flex items-center gap-1 rounded-2xl
                  data-[state=active]:bg-[#0073CF] 
                  data-[state=active]:text-white 
                  data-[state=active]:shadow-sm"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Create Password</span>
                </TabsTrigger>
              </TabsList>

              {/* OTP signup content */}
              <TabsContent value="OTP" className="space-y-4">
                <div className="w-full max-w-[425px] space-y-4">
                  <Input
                    placeholder="Full Name"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                  <Input
                    placeholder="Phone number"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                  <Input
                    placeholder="Email"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                </div>

                <div className="w-full max-w-[400px] space-y-2">
                  <p className="text-[12px] text-black-500">Send OTP to:</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-[13px]">
                      <input type="radio" name="otp" /> Phone number
                    </label>
                    <label className="flex items-center gap-2 text-[13px]">
                      <input type="radio" name="otp" /> Email
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter OTP"
                      className="flex-1 rounded-3xl border px-4 py-3 border border-black"
                    />
                    <Button className="rounded-3xl bg-gray border border-black">
                      Get OTP
                    </Button>
                  </div>
                </div>

                <Button className="w-full max-w-[400px] rounded-3xl bg-gray-400 text-white">
                  Verify OTP
                </Button>
              </TabsContent>

              {/* Password signup content */}
              <TabsContent value="PW" className="space-y-4">
                <div className="w-full max-w-[400px] space-y-4">
                  <Input
                    placeholder="Full Name"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                  <Input
                    placeholder="Phone number"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                  <Input
                    placeholder="Email"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                  <Input
                    type="password"
                    placeholder="Create Password"
                    className="rounded-3xl border px-4 py-3  border border-black"
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                </div>

                <Button className="w-full max-w-[400px] rounded-3xl bg-[#0073CF] text-white">
                  Continue
                </Button>
                <p className="text-[13px] text-black-500 text-center">
                  {" "}
                  Already have an account?
                  <a href="/login" className="text-[#0073CF] underline">
                    {" "}
                    Sign In
                  </a>
                </p>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Mentor Tab */}
          <TabsContent
            value="mentor"
            className="space-y-4 flex flex-col items-center"
          >
            <p className="text-[23px] font-semibold">
              Join as a Freelance Mentor
            </p>
            <p className="text-[13px] text-black-500 font-semibold">
              Share your expertise & earn money helping grow others
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              {[1, 2, 3, 4, 5].map((step) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
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
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-[400px] flex items-center justify-center gap-2 rounded-full border border-black"
                onClick={() => handleSocialSignup("google", "mentor")}
                aria-label="Continue with Google"
              >
                <img src="/google.png" alt="Google" className="h-5 w-5" />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className=" grid w-full flex items-center justify-center gap-2 rounded-full border border-black"
                onClick={() => handleSocialSignup("linkedin", "mentor")}
              >
                <img src="/linkedin.png" alt="LinkedIn" className="h-5 w-5" />
                Continue with LinkedIn
              </Button>
            </div>

            <p className="text-[15px] text-black-500">
              Recommended for fast signup
            </p>

            {/* OR Divider */}
            <div className="flex items-center w-full max-w-[400px]">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-2 text-black/50 text-[12px]">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* OTP / Password Toggle */}
            <Tabs defaultValue="OTP" className="w-[418px]">
              <TabsList className="grid w-full grid-cols-2 rounded-3xl bg-gray-100 p-1 mb-4">
                <TabsTrigger
                  value="OTP"
                  className="flex items-center gap-2 rounded-2xl
                  data-[state=active]:bg-[#0073CF] 
                  data-[state=active]:text-white 
                  data-[state=active]:shadow-sm"
                >
                  <User className="h-4 w-4" />
                  <span>Sign up with OTP</span>
                </TabsTrigger>
                <TabsTrigger
                  value="PW"
                  className="flex items-center gap-1 rounded-2xl
                  data-[state=active]:bg-[#0073CF] 
                  data-[state=active]:text-white 
                  data-[state=active]:shadow-sm"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Create Password</span>
                </TabsTrigger>
              </TabsList>

              {/* OTP signup content */}
              <TabsContent value="OTP" className="space-y-4">
                <div className="w-full max-w-[425px] space-y-4">
                  <Input
                    placeholder="Full Name"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                  <Input
                    placeholder="Phone number"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                  <Input
                    placeholder="Email"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                </div>

                <div className="w-full max-w-[400px] space-y-2">
                  <p className="text-[12px] text-black-500">Send OTP to:</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-[13px]">
                      <input type="radio" name="mentor-otp" /> Phone number
                    </label>
                    <label className="flex items-center gap-2 text-[13px]">
                      <input type="radio" name="mentor-otp" /> Email
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter OTP"
                      className="flex-1 rounded-3xl border px-4 py-3 border border-black"
                    />
                    <Button className="rounded-3xl bg-gray border border-black">
                      Get OTP
                    </Button>
                  </div>
                </div>

                <Button className="w-full max-w-[400px] rounded-3xl bg-gray-400 text-white">
                  Verify OTP
                </Button>
              </TabsContent>

              {/* Password signup content */}
              <TabsContent value="PW" className="space-y-4">
                <div className="w-full max-w-[400px] space-y-4">
                  <Input
                    placeholder="Full Name"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                  <Input
                    placeholder="Phone number"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                  <Input
                    placeholder="Email"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                  <Input
                    type="password"
                    placeholder="Create Password"
                    className="rounded-3xl border px-4 py-3  border border-black"
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="rounded-3xl border px-4 py-3 border border-black"
                  />
                </div>

                <Button className="w-full max-w-[400px] rounded-3xl bg-[#0073CF] text-white">
                  Continue
                </Button>
                <p className="text-[13px] text-black-500 text-center">
                  {" "}
                  Already have an account?
                  <a href="/login" className="text-[#0073CF] underline">
                    {" "}
                    Sign In
                  </a>
                </p>
              </TabsContent>
            </Tabs>
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
