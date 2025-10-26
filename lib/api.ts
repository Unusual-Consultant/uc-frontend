// API Configuration and Types
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// Types for API responses
export interface FeaturedMentor {
  id: string;
  mentor_id: string;
  featured_since?: string;
  mentor: {
    id: string;
    user_id: string;
    bio?: string;
    headline?: string;
    location?: string;
    rating?: number;
    total_sessions?: number;
    company?: string;
    years_experience?: number;
  };
}

export interface FeaturedTestimonial {
  id: string;
  testimonial_id: string;
  priority: number;
  featured_at?: string;
  expires_at?: string;
  created_at: string;
  testimonial: {
    id: string;
    content?: string;
    rating?: number;
    created_at: string;
  };
}

// Transform backend mentor data to match frontend structure
export function transformMentorData(backendMentor: FeaturedMentor) {
  return {
    id: backendMentor.mentor_id,
    name: backendMentor.mentor.bio?.split(' at ')[0] || "Mentor",
    title: backendMentor.mentor.bio?.split(' at ')[0] || "",
    company: backendMentor.mentor.company || "",
    image: "/placeholder.svg?height=80&width=80",
    rating: backendMentor.mentor.rating || 0,
    sessions: backendMentor.mentor.total_sessions || 0,
    location: backendMentor.mentor.location || "",
    skills: [backendMentor.mentor.headline || "Mentor"],
    price: 100,
    available: true,
  };
}

// API Functions
export async function fetchFeaturedMentors(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/featured-mentors/`);
    if (!response.ok) throw new Error("Failed to fetch featured mentors");
    const data = await response.json();
    return data.featured_mentors || [];
  } catch (error) {
    console.error("Error fetching featured mentors:", error);
    return [];
  }
}

export async function fetchFeaturedTestimonials(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/featured-testimonials/`);
    if (!response.ok) throw new Error("Failed to fetch featured testimonials");
    const data = await response.json();
    return data.featured_testimonials || [];
  } catch (error) {
    console.error("Error fetching featured testimonials:", error);
    return [];
  }
}

export async function fetchStatisticsOverview() {
  try {
    const response = await fetch(`${API_BASE_URL}/statistics/overview`);
    if (!response.ok) throw new Error("Failed to fetch statistics");
    return await response.json();
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return null;
  }
}

// Google OAuth API functions
export const googleAuth = {
  login: (userType?: string) => {
    const baseUrl = `${API_BASE_URL}/auth/google/login`;
    return userType ? `${baseUrl}?user_type=${userType}` : baseUrl;
  },
  callback: (code: string) => {
    return `${API_BASE_URL}/auth/google/callback?code=${code}`;
  }
};

// Authentication API functions
export const authApi = {
  login: () => `${API_BASE_URL}/auth/login`,
  signup: {
    otp: () => `${API_BASE_URL}/auth/signup/otp`,
    verifyOtp: () => `${API_BASE_URL}/auth/signup/verify-otp`,
    password: () => `${API_BASE_URL}/auth/signup/password`
  }
};

// Main API object
export const api = {
  auth: {
    google: googleAuth,
    login: authApi.login,
    signup: authApi.signup
  }
};