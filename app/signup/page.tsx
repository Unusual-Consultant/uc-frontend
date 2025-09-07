"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAccount = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/onboarding/mentee");
  };

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/onboarding/mentee");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-4">
      {/* Frosted Glass Rectangle */}
      <div
        className="absolute w-[509px] h-auto top-[110px] left-1/2 -translate-x-1/2
        bg-gradient-to-b from-[rgba(209,234,255,0.4)] to-[rgba(209,234,255,0.1)]
        backdrop-blur-[75px] rounded-[30px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
        flex items-center justify-center px-6 py-8 z-10"
      >
        {/* Signup Content */}
        <div className="w-full space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="font-mulish font-extrabold text-[26px] leading-[140%]">
              Create Your Account
            </h1>
            <p className="font-mulish font-semibold text-[15px] text-black-500">
              Join thousands of professionals growing their careers
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="font-mulish font-bold text-[17px]">
                  First Name
                </Label>
                <Input id="firstName" placeholder="John" className="px-4 py-3 rounded-2xl border border-black text-gray-800" />
              </div>
              <div>
                <Label htmlFor="lastName" className="font-mulish font-bold text-[17px]">
                  Last Name
                </Label>
                <Input id="lastName" placeholder="Doe" className="px-4 py-3 rounded-2xl border border-black text-gray-800" />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="font-mulish font-bold text-[17px]">
                Email
              </Label>
              <Input id="email" type="email" placeholder="john@example.com" className="px-4 py-3 rounded-2xl border border-black text-gray-800" />
            </div>
            <div>
              <Label htmlFor="password" className="font-mulish font-bold text-[17px]">
                Password
              </Label>
              <Input id="password" type="password" placeholder="Enter your password" className="px-4 py-3 rounded-2xl border border-black text-gray-800" />
            </div>
          </div>

          {/* CTA */}
          <Button
            className="w-full bg-[#0073CF] hover:bg-[#0066B3] text-white rounded-2xl"
            onClick={handleCreateAccount}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Social Signup */}
          <Separator />
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-black"
              onClick={() => handleSocialSignup("google")}
              disabled={isLoading}
            >
              <img src="/google.png" alt="Google" className="h-5 w-5" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-black"
              onClick={() => handleSocialSignup("linkedin")}
              disabled={isLoading}
            >
              <img src="/linkedin.png" alt="LinkedIn" className="h-5 w-5" />
              Continue with LinkedIn
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="font-mulish font-semibold text-[15px] text-black-700">
              Already have an account?{" "}
              <Link href="/login" className="text-[#0073CF] hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}