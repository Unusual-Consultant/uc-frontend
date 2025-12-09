"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { User, GraduationCap, Eye, EyeOff } from "lucide-react";
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider";

interface SignupFormProps {
  userType: "mentee" | "mentor";
  onSuccess?: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  otp: string;
  otpMethod: "email" | "phone";
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
    otpMethod: "email",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

    if (activeTab === "PW") {
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
        newErrors.password = "Password must contain uppercase, lowercase, and number";

      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    } else {
      if (!formData.phone.trim() && formData.otpMethod === "phone") newErrors.phone = "Phone number is required for SMS OTP";
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
      const response = await fetch(api.auth.signup.otp(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          role: userType,
          otp_method: formData.otpMethod,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setErrors({});
      } else setErrors({ general: data.detail || "Failed to send OTP" });
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
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone || null,
            role: userType,
            otp_method: formData.otpMethod,
          },
        }),
      });

      const data = await response.json();
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
      } else setErrors({ general: data.detail || "OTP verification failed" });
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
      const response = await fetch(api.auth.signup.password(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          password: formData.password,
          role: userType,
        }),
      });

      const data = await response.json();
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
      } else setErrors({ general: data.detail || "Signup failed" });
    } catch (error) {
      console.error("Network error:", error);
      setErrors({ general: `Network error: ${error instanceof Error ? error.message : "Please try again."}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[425px] space-y-4">
      {errors.general && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{errors.general}</div>}

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "OTP" | "PW")}>
        <TabsList className="grid w-full grid-cols-2 rounded-[30px] bg-transparent border border-black p-1 mb-4">
          <TabsTrigger value="OTP" className="flex items-center gap-2 rounded-[30px] data-[state=active]:bg-[#0073CF] data-[state=active]:text-white data-[state=active]:shadow-sm">
            <User className="h-4 w-4" /> <span>Sign up with OTP</span>
          </TabsTrigger>
          <TabsTrigger value="PW" className="flex items-center gap-1 rounded-[30px] data-[state=active]:bg-[#0073CF] data-[state=active]:text-white data-[state=active]:shadow-sm">
            <GraduationCap className="h-4 w-4" /> <span>Create Password</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="OTP" className="space-y-4">
          <div className="space-y-4">
            <Input placeholder="First Name" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-4 py-3 border-black bg-transparent" />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

            <Input placeholder="Last Name" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-4 py-3 border-black bg-transparent" />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

            <Input placeholder="Email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-4 py-3 border-black bg-transparent" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <Input placeholder="Phone number (optional)" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-4 py-3 border-black bg-transparent" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <p className="text-[12px] text-black-500">Send OTP to:</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-[13px]">
                <input type="radio" name="otp" checked={formData.otpMethod === "email"} onChange={() => handleInputChange("otpMethod", "email")} /> Email
              </label>
              <label className="flex items-center gap-2 text-[13px]">
                <input type="radio" name="otp" checked={formData.otpMethod === "phone"} onChange={() => handleInputChange("otpMethod", "phone")} /> Phone number
              </label>
            </div>

            {otpSent && (
              <div className="flex gap-2">
                <Input placeholder="Enter OTP" value={formData.otp} onChange={(e) => handleInputChange("otp", e.target.value)} className="flex-1 rounded-[30px] border px-4 py-3 border-black bg-transparent h-[50px]" />
                {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
              </div>
            )}

            <Button className="w-[93%] mx-auto h-[50px] rounded-[30px] bg-gray border border-black block" onClick={otpSent ? handleVerifyOTP : handleSendOTP} disabled={isLoading}>
              {isLoading ? "Processing..." : otpSent ? "Verify OTP" : "Get OTP"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="PW" className="space-y-4">
          <div className="space-y-4">
            <Input placeholder="First Name" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-4 py-3 border-black bg-transparent" />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

            <Input placeholder="Last Name" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-4 py-3 border-black bg-transparent" />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

            <Input placeholder="Email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-4 py-3 border-black bg-transparent" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <Input placeholder="Phone number (optional)" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="w-[93%] mx-auto h-[50px] rounded-[30px] border px-4 py-3 border-black bg-transparent" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

            <div className="relative w-[93%] mx-auto">
              <Input type={showPassword ? "text" : "password"} placeholder="Create Password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className="w-full h-[50px] rounded-[30px] border px-4 py-3 pr-10 border-black bg-transparent" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <div className="relative w-[93%] mx-auto">
              <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => handleInputChange("confirmPassword", e.target.value)} className="w-full h-[50px] rounded-[30px] border px-4 py-3 pr-10 border-black bg-transparent" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <Button className="w-[93%] mx-auto h-[50px] rounded-[30px] bg-[#0073CF] text-white block" onClick={handlePasswordSignup} disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Continue"}
          </Button>

          <p className="text-[13px] text-black-500 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-[#0073CF] underline">Sign In</a>
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
