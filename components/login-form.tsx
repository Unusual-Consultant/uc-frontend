"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
}

export default function LoginForm({ userType }: LoginFormProps) {
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuthenticatedUser();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

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
    // Clear error when user starts typing
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
        // Store user data and token
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user_info", JSON.stringify(data.user));
        
        setUser(data.user);
        setIsAuthenticated(true);
        
        // Redirect based on user role
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

  return (
    <div className="w-full max-w-[450px] space-y-6">
      {/* Error Message */}
      {errors.general && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errors.general}
        </div>
      )}

      <div className="w-full flex flex-col gap-2">
        <Label
          htmlFor={`${userType}-email`}
          className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left"
        >
          Email
        </Label>
        <Input
          id={`${userType}-email`}
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full px-4 py-3 rounded-3xl border border-black text-gray-800 font-medium"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label
          htmlFor={`${userType}-password`}
          className="font-mulish font-bold text-[17px] leading-[24px] tracking-[0px] text-left"
        >
          Password
        </Label>
        <Input
          id={`${userType}-password`}
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          className="w-full px-4 py-3 rounded-3xl border border-black text-gray-800"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <Button
        className="w-full bg-[#0073CF] hover:bg-[#0066B3] text-white rounded-3xl"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Signing In..." : `Sign In as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
      </Button>
    </div>
  );
}
