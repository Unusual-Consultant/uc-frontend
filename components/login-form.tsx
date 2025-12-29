"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyRound, Smartphone, Edit2, ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider";

interface LoginFormProps {
  userType: "mentee" | "mentor";
}

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
  otpContact?: string;
  otpCode?: string;
}

export default function LoginForm({ userType }: LoginFormProps) {
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuthenticatedUser();

  const [loginMethod, setLoginMethod] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Password Login State
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  // OTP Login State
  const [otpStep, setOtpStep] = useState(1); // 1: Contact Input, 2: OTP Input
  const [otpContact, setOtpContact] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(api.auth.login(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Login API Response:", data);

      if (response.ok) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user_info", JSON.stringify(data.user));

        setUser(data.user);
        setIsAuthenticated(true);

        const userRole = data.user.role;
        if (userRole === "mentor") {
          router.push("/mentor/dashboard");
        } else {
          router.push("/mentee/dashboard");
        }
      } else {
        console.error("Login API Error:", data);
        setErrors({ general: data.detail || "Login failed" });
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrors({ general: `Network error: ${error instanceof Error ? error.message : "Please try again."}` });
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Handlers
  const handleSendOtp = () => {
    if (!otpContact.trim()) {
      setErrors({ otpContact: "Please enter your email or phone number" });
      return;
    }
    // Mock sending OTP
    setErrors({});
    setOtpStep(2);
  };

  const handleVerifyOtp = () => {
    if (!otpCode.trim()) {
      setErrors({ otpCode: "Please enter the OTP" });
      return;
    }
    // Mock verify OTP
    console.log("Verifying OTP:", otpCode, "for", otpContact);
    // Simulate successful login
    router.push(`/${userType}/dashboard`);
  };

  return (
    <div className="w-full max-w-form-sm space-y-6 rounded-[30px]">
      {/* Toggle Password / OTP */}
      <Tabs value={loginMethod} onValueChange={setLoginMethod} className="w-full">
        <TabsList
          className="relative grid grid-cols-2 rounded-[30px] bg-transparent border border-black p-1 mb-6 overflow-hidden h-btn"
        >
          <div
            className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#0073CF] rounded-[26px] transition-transform duration-300 ease-out pointer-events-none"
            style={{
              transform:
                loginMethod === "otp"
                  ? "translateX(100%)"
                  : "translateX(0)",
            }}
          />

          <TabsTrigger
            value="password"
            className="relative z-10 flex items-center gap-2 rounded-[30px]
      data-[state=active]:bg-transparent
      data-[state=active]:text-white
      data-[state=inactive]:bg-transparent
      data-[state=inactive]:text-black
      transition-colors duration-300"
          >
            {/* <KeyRound className="h-4 w-4" /> */}
            <span className="font-semibold">Sign in with Password</span>
          </TabsTrigger>

          <TabsTrigger
            value="otp"
            className="relative z-10 flex items-center gap-2 rounded-[30px]
      data-[state=active]:bg-transparent
      data-[state=active]:text-white
      data-[state=inactive]:bg-transparent
      data-[state=inactive]:text-black
      transition-colors duration-300"
          >
            {/* <Smartphone className="h-4 w-4" /> */}
            <span className="font-semibold">Sign in with OTP</span>
          </TabsTrigger>
        </TabsList>


        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.general}
          </div>
        )}

        <TabsContent value="password" className="space-y-6 mt-0">
          <div className="w-full flex flex-col gap-2">
            <Label
              htmlFor={`${userType}-email`}
              className="w-[93%] mx-auto font-mulish font-bold text-fluid-lg leading-[24px] tracking-[0px] text-left"
            >
              Email or Phone Number
            </Label>
            <Input
              id={`${userType}-email`}
              type="email"
              placeholder="Enter your email or phone number"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-[93%] mx-auto h-input px-8 py-3 rounded-[30px] border border-black text-black font-medium bg-transparent placeholder:text-black"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label
              htmlFor={`${userType}-password`}
              className="w-[93%] mx-auto font-mulish font-bold text-fluid-lg leading-[24px] tracking-[0px] text-left"
            >
              Password
            </Label>
            <Input
              id={`${userType}-password`}
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-[93%] mx-auto h-input px-8 py-3 rounded-[30px] border border-black text-gray-800 bg-transparent placeholder:text-black"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <Button
            className="w-[93%] mx-auto bg-[#0073CF] hover:bg-[#0066B3] text-white rounded-[30px] h-input text-fluid-md font-semibold block"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : `Sign In as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
          </Button>
        </TabsContent>

        <TabsContent value="otp" className="space-y-6 mt-0">
          {otpStep === 1 ? (
            <div className="space-y-6">
              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor={`${userType}-otp-contact`}
                  className="w-[97%] mx-auto font-mulish font-bold text-fluid-lg leading-[24px] tracking-[0px] text-left"
                >
                  Email or Phone Number
                </Label>
                <Input
                  id={`${userType}-otp-contact`}
                  type="text"
                  placeholder="Enter your email or phone number"
                  value={otpContact}
                  onChange={(e) => {
                    setOtpContact(e.target.value);
                    if (errors.otpContact) setErrors({ ...errors, otpContact: undefined });
                  }}
                  className="w-[97%] mx-auto h-input px-4 py-3 rounded-[30px] border border-black text-gray-800 font-medium bg-transparent placeholder:text-black"
                />
                {errors.otpContact && <p className="text-red-500 text-sm">{errors.otpContact}</p>}
              </div>

              <Button
                className="w-[93%] mx-auto bg-[#0073CF] hover:bg-[#0066B3] text-white rounded-[30px] h-input text-fluid-md font-semibold block"
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-gray-600 text-sm">
                  Enter the OTP sent to <br />
                  <span className="font-semibold text-black">{otpContact}</span>
                </p>
                <button
                  onClick={() => setOtpStep(1)}
                  className="text-[#0073CF] text-sm font-semibold flex items-center justify-center gap-1 hover:underline mx-auto"
                >
                  <Edit2 className="h-3 w-3" /> Edit email/number
                </button>
              </div>

              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor={`${userType}-otp-code`}
                  className="w-[93%] mx-auto font-mulish font-bold text-fluid-lg leading-[24px] tracking-[0px] text-left"
                >
                  Enter OTP
                </Label>
                <Input
                  id={`${userType}-otp-code`}
                  type="text"
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => {
                    setOtpCode(e.target.value);
                    if (errors.otpCode) setErrors({ ...errors, otpCode: undefined });
                  }}
                  className="w-full px-4 py-3 rounded-[30px] border border-black text-gray-800 font-medium text-center tracking-widest text-lg bg-transparent placeholder:text-black"
                  maxLength={6}
                />
                {errors.otpCode && <p className="text-red-500 text-sm">{errors.otpCode}</p>}
              </div>

              <Button
                className="w-[93%] mx-auto bg-[#0073CF] hover:bg-[#0066B3] text-white rounded-[30px] h-input text-fluid-md font-semibold block"
                onClick={handleVerifyOtp}
              >
                Verify & Login
              </Button>

              <div className="text-center">
                <button
                  onClick={() => {
                    // Mock resend
                    console.log("Resending OTP...");
                  }}
                  className="text-sm text-gray-500 hover:text-gray-800"
                >
                  Didn't receive code? <span className="font-semibold underline">Resend</span>
                </button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
