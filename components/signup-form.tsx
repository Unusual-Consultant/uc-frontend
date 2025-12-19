"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { User, GraduationCap, Eye, EyeOff } from "lucide-react";
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider";

interface SignupFormProps {
  userType: "mentee" | "mentor";
  onSuccess?: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  otp: string;
  otpMethod: "email" | "phone";
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
  otpMethod?: string;
  general?: string;
}

export default function SignupForm({ userType, onSuccess }: SignupFormProps) {
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuthenticatedUser();

  const [activeTab, setActiveTab] = useState<"OTP" | "PW">("OTP");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
    otpMethod: "email",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    if (activeTab === "PW") {
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
        newErrors.password = "Password must contain uppercase, lowercase, and number";

      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    } else {
      if (otpSent && !formData.otp.trim()) newErrors.otp = "OTP is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSendOTP = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || firstName; // Use first name as last name if not provided
      
      const response = await fetch(api.auth.signup.otp(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: formData.email,
          phone: formData.phone || null,
          role: userType,
          otp_method: formData.otpMethod,
        }),
      });

      const data = await response.json();
      console.log('OTP Send Response:', data);
      if (response.ok) {
        setOtpSent(true);
        setErrors({});
      } else {
        // Handle validation errors array
        let errorMessage = "Failed to send OTP";
        if (Array.isArray(data.detail)) {
          errorMessage = data.detail.map((err: any) => err.msg || JSON.stringify(err)).join(', ');
        } else if (typeof data.detail === 'string') {
          errorMessage = data.detail;
        } else if (data.detail?.msg) {
          errorMessage = data.detail.msg;
        } else if (data.message) {
          errorMessage = data.message;
        }
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrors({ general: `Network error: ${error instanceof Error ? error.message : "Please try again."}` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const response = await fetch(api.auth.signup.verifyOtp(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp_data: {
            email: formData.email,
            otp: formData.otp,
            otp_method: formData.otpMethod,
          },
          user_data: {
            first_name: firstName,
            last_name: lastName,
            email: formData.email,
            phone: formData.phone || null,
            role: userType,
            otp_method: formData.otpMethod,
          },
        }),
      });

      const data = await response.json();
      console.log('OTP Verify Response:', data);
      if (response.ok) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user_info", JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);

        if (onSuccess) onSuccess();
        else {
          // Redirect to appropriate onboarding flow based on user type
          if (userType === "mentor") {
            router.push(`/onboarding/mentor/step-2?email=${encodeURIComponent(formData.email)}&token=${data.token}`);
          } else {
            router.push(`/signup/step2?email=${encodeURIComponent(formData.email)}&userType=${userType}`);
          }
        }
      } else {
        // Handle validation errors array
        let errorMessage = "OTP verification failed";
        if (Array.isArray(data.detail)) {
          errorMessage = data.detail.map((err: any) => err.msg || JSON.stringify(err)).join(', ');
        } else if (typeof data.detail === 'string') {
          errorMessage = data.detail;
        } else if (data.detail?.msg) {
          errorMessage = data.detail.msg;
        } else if (data.message) {
          errorMessage = data.message;
        }
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrors({ general: `Network error: ${error instanceof Error ? error.message : "Please try again."}` });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || firstName; // Use first name as last name if not provided
      
      const requestBody = {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone: formData.phone || null,
        password: formData.password,
        role: userType,
      };
      
      console.log('Signup Request:', requestBody);
      
      const response = await fetch(api.auth.signup.password(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Signup Response:', data);
      if (response.ok) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user_info", JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);

        if (onSuccess) onSuccess();
        else {
          // Redirect to appropriate onboarding flow based on user type
          if (userType === "mentor") {
            router.push(`/onboarding/mentor/step-2?email=${encodeURIComponent(formData.email)}&token=${data.token}`);
          } else {
            router.push(`/signup/step2?email=${encodeURIComponent(formData.email)}&userType=${userType}`);
          }
        }
      } else {
        // Handle validation errors array
        let errorMessage = "Signup failed";
        if (Array.isArray(data.detail)) {
          errorMessage = data.detail.map((err: any) => err.msg || JSON.stringify(err)).join(', ');
        } else if (typeof data.detail === 'string') {
          errorMessage = data.detail;
        } else if (data.detail?.msg) {
          errorMessage = data.detail.msg;
        } else if (data.message) {
          errorMessage = data.message;
        }
        console.error('Signup Error:', errorMessage);
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrors({ general: `Network error: ${error instanceof Error ? error.message : "Please try again."}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[450px] space-y-4">
      {errors.general && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{errors.general}</div>}

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "OTP" | "PW")}>
        <TabsList
          className="relative mx-auto grid max-w-[371px] w-full grid-cols-2 rounded-[30px] bg-transparent border border-black p-1 mb-4 h-[48px] overflow-hidden"
        >
          {/* Sliding Blue Background */}
          <div
            className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#0073CF] rounded-[26px] transition-transform duration-300 ease-out pointer-events-none"
            style={{
              transform: activeTab === "PW" ? "translateX(100%)" : "translateX(0)",
            }}
          />

          <TabsTrigger
            value="OTP"
            className="relative z-10 flex items-center justify-center h-full gap-2 rounded-[30px] text-[14px] transition-colors duration-300 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=inactive]:text-black"
          >
            <User className="h-4 w-4" /> <span>Sign up with OTP</span>
          </TabsTrigger>

          <TabsTrigger
            value="PW"
            className="relative z-10 flex items-center justify-center h-full gap-2 rounded-[30px] text-[14px] transition-colors duration-300 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=inactive]:text-black"
          >
            <GraduationCap className="h-4 w-4" /> <span>Create Password</span>
          </TabsTrigger>
        </TabsList>


        <TabsContent value="OTP" className="space-y-4">
          <div className="space-y-4">
            <div className="w-full flex flex-col gap-2">
              <Label className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left">
                Full Name
              </Label>
              <Input placeholder="Enter your Full Name" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-8 py-3 border-black text-black font-medium bg-transparent placeholder:text-black" />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div className="w-full flex flex-col gap-2">
              <Label className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left">
                Phone Number
              </Label>
              <Input placeholder="Enter yourPhone Number" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-8 py-3 border-black text-black font-medium bg-transparent placeholder:text-black" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="w-full flex flex-col gap-2">
              <Label className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left">
                Email
              </Label>
              <Input placeholder="Enter your Email address" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-8 py-3 border-black text-black font-medium bg-transparent placeholder:text-black" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[14px] text-black-700 font-medium">Send OTP to:</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-[14px] cursor-pointer">
                <input
                  type="radio"
                  name="otp"
                  checked={formData.otpMethod === "phone"}
                  onChange={() => handleInputChange("otpMethod", "phone")}
                  className="w-4 h-4"
                />
                Phone number
              </label>
              <label className="flex items-center gap-2 text-[14px] cursor-pointer">
                <input
                  type="radio"
                  name="otp"
                  checked={formData.otpMethod === "email"}
                  onChange={() => handleInputChange("otpMethod", "email")}
                  className="w-4 h-4"
                />
                Email
              </label>
            </div>

            {/* OTP Input and Get OTP Button side by side */}
            <div className="flex gap-2 w-[93%] mx-auto">
              <Input
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={(e) => handleInputChange("otp", e.target.value)}
                className="flex-1 rounded-[30px] border px-8 py-3 border-black text-black font-medium bg-transparent placeholder:text-black h-[50px]"
                disabled={!otpSent}
              />
              <Button
                className="px-6 h-[50px] rounded-[30px] bg-white border border-black text-black hover:bg-gray-50"
                onClick={handleSendOTP}
                disabled={isLoading || otpSent}
              >
                {isLoading ? "Sending..." : "Get OTP"}
              </Button>
            </div>
            {errors.otp && <p className="text-red-500 text-sm text-center">{errors.otp}</p>}

            {/* Verify OTP Button */}
            <Button
              className="w-[93%] mx-auto h-[50px] rounded-[30px] bg-gray-400 hover:bg-gray-500 text-white block disabled:opacity-50"
              onClick={handleVerifyOTP}
              disabled={isLoading || !otpSent}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>

            {/* Sign in link */}
            <p className="text-[14px] text-black-700 text-center">
              Already have an account?{" "}
              <a href={`/login?type=${userType}`} className="text-[#0073CF] font-semibold hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </TabsContent>

        <TabsContent value="PW" className="space-y-4">
          <div className="space-y-4">
            <div className="w-full flex flex-col gap-2">
              <Label className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left">
                Full Name
              </Label>
              <Input placeholder="Enter your Full Name" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-8 py-3 border-black text-black font-medium bg-transparent placeholder:text-black" />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div className="w-full flex flex-col gap-2">
              <Label className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left">
                Phone Number
              </Label>
              <Input placeholder="Enter your Phone Number" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-8 py-3 border-black text-black font-medium bg-transparent placeholder:text-black" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="w-full flex flex-col gap-2">
              <Label className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left">
                Email
              </Label>
              <Input placeholder="Enter your Email address" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-8 py-3 border-black text-black font-medium bg-transparent placeholder:text-black" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="w-full flex flex-col gap-2">
              <Label className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left">
                Create Password
              </Label>
              <div className="relative w-[93%] mx-auto">
                <Input type={showPassword ? "text" : "password"} placeholder="Create a new Password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className="w-full h-[50px] rounded-[30px] border px-8 py-3 pr-10 border-black text-black font-medium bg-transparent placeholder:text-black" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="w-full flex flex-col gap-2">
              <Label className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left">
                Confirm Password
              </Label>
              <div className="relative w-[93%] mx-auto">
                <Input type={showConfirmPassword ? "text" : "password"} placeholder="Re-enter your Password" value={formData.confirmPassword} onChange={(e) => handleInputChange("confirmPassword", e.target.value)} className="w-full h-[50px] rounded-[30px] border px-8 py-3 pr-10 border-black text-black font-medium bg-transparent placeholder:text-black" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>

          <Button className="w-[93%] mx-auto h-[50px] rounded-[30px] bg-[#0073CF] text-white block" onClick={handlePasswordSignup} disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Continue"}
          </Button>

          <p className="text-[13px] text-black-500 text-center">
            Already have an account?{" "}
            <a href={`/login?type=${userType}`} className="text-[#0073CF] underline">Sign In</a>
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
