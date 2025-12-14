// API Configuration and Types
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://uc-backend-210202864965.europe-west1.run.app/api/v1";

// Reschedule Booking
export interface RescheduleBookingRequest {
  booking_id: string;
  new_scheduled_start: string; // ISO datetime string
  new_scheduled_end: string; // ISO datetime string
  reason?: string;
}

export interface RescheduleBookingResponse {
  id: string;
  mentor_id: string;
  mentor_name: string;
  session_type_name: string;
  scheduled_start: string;
  scheduled_end: string;
  status: string;
  session_price: number;
  platform_fee: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  meeting_link?: string;
  notes?: string;
  created_at: string;
}

export async function rescheduleBooking(
  authToken: string | null,
  bookingId: string,
  newScheduledStart: string,
  newScheduledEnd: string,
  reason?: string
): Promise<RescheduleBookingResponse | null> {
  if (!authToken) {
    throw new Error("Authentication required");
  }

  const response = await fetch(`${API_BASE_URL}/bookings/reschedule`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      booking_id: bookingId,
      new_scheduled_start: newScheduledStart,
      new_scheduled_end: newScheduledEnd,
      reason: reason || null,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "Failed to reschedule booking" }));
    throw new Error(errorData.detail || `Failed to reschedule booking: ${response.status}`);
  }

  return await response.json();
}

export interface CancelBookingRequest {
  booking_id: string;
  reason?: string;
}

export interface CancelBookingResponse {
  id: string;
  mentor_id: string;
  mentor_name: string;
  session_type_name: string;
  scheduled_start: string;
  scheduled_end: string;
  status: string;
  session_price: number;
  platform_fee: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  meeting_link?: string;
  notes?: string;
  created_at: string;
}

export async function cancelBooking(
  authToken: string | null,
  bookingId: string,
  reason?: string
): Promise<CancelBookingResponse | null> {
  if (!authToken) {
    throw new Error("Authentication required");
  }

  const response = await fetch(`${API_BASE_URL}/bookings/cancel`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      booking_id: bookingId,
      reason: reason || null,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "Failed to cancel booking" }));
    throw new Error(errorData.detail || `Failed to cancel booking: ${response.status}`);
  }

  return await response.json();
}

// Progress Tracker
export interface ProgressStep {
  id: number;
  title: string;
  points: number;
  completed: boolean;
}

export interface ProgressTrackerResponse {
  currentLevel: number;
  totalPoints: number;
  nextLevelPoints: number;
  progressPercentage: number;
  completedSteps: ProgressStep[];
  nextSteps: ProgressStep[];
}

export async function fetchProgressTracker(
  authToken: string | null
): Promise<ProgressTrackerResponse | null> {
  if (!authToken) {
    throw new Error("Authentication required");
  }

  const response = await fetch(`${API_BASE_URL}/mentee-dashboard/progress-tracker`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "Failed to fetch progress tracker" }));
    throw new Error(errorData.detail || `Failed to fetch progress tracker: ${response.status}`);
  }

  return await response.json();
}

// Chatbot
export interface ChatMessageRequest {
  message: string;
  conversation_id?: string;
  user_id?: string;
}

export interface ChatMessageResponse {
  response: string;
  conversation_id?: string;
  suggestions?: string[];
  action_type?: string;
  action_data?: Record<string, unknown>;
}

export async function sendChatMessage(
  message: string,
  conversationId?: string,
  authToken?: string | null
): Promise<ChatMessageResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/chatbot/chat`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      message,
      conversation_id: conversationId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "Failed to send message" }));
    throw new Error(errorData.detail || `Failed to send message: ${response.status}`);
  }

  return await response.json();
}

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

// Recommended Mentor Types
export interface RecommendedMentor {
  id: string;
  name: string;
  role: string;
  company?: string;
  location?: string;
  rating: number;
  reviews: number;
  price: number; // in paise
  tags: string[];
  image: string;
  expertise?: string;
  experience?: string;
  responseTime?: string;
  totalMentees?: number;
  successRate?: string;
}

// API Functions for Recommended Mentors
export async function fetchRecommendedMentors(
  authToken: string | null,
  limit: number = 6
): Promise<RecommendedMentor[]> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    
    const response = await fetch(
      `${API_BASE_URL}/mentee-dashboard/recommended-mentors?limit=${limit}`,
      { headers }
    );
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Authentication required");
      }
      throw new Error(`Failed to fetch recommended mentors: ${response.status}`);
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching recommended mentors:", error);
    return [];
  }
}

// Message Types
export interface Message {
  id: string;
  mentor: string;
  mentor_id: string;
  time: string;
  postTime: string;
  message: string;
  subject?: string;
  title?: string;
  profile?: string;
  notifications: number;
  message_type: string;
  session_id?: string;
}

export interface MessageListResponse {
  messages: Message[];
  total: number;
  unread_count: number;
}

// API Functions for Messages
export async function fetchMessages(
  authToken: string | null,
  filterType: string = "all"
): Promise<MessageListResponse | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    
    const response = await fetch(
      `${API_BASE_URL}/messages/messages?filter_type=${filterType}`,
      { headers }
    );
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Authentication required");
      }
      throw new Error(`Failed to fetch messages: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return null;
  }
}

export async function sendMessage(
  authToken: string | null,
  receiverId: string,
  content: string,
  sessionId?: string
): Promise<Message | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    
    const response = await fetch(
      `${API_BASE_URL}/messages/messages`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          receiver_id: receiverId,
          content: content,
          session_id: sessionId || null,
        }),
      }
    );
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Authentication required");
      }
      throw new Error(`Failed to send message: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
}

export async function markMessageAsRead(
  authToken: string | null,
  messageId: string
): Promise<boolean> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    
    const response = await fetch(
      `${API_BASE_URL}/messages/messages/${messageId}/read`,
      {
        method: "PUT",
        headers,
      }
    );
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Authentication required");
      }
      throw new Error(`Failed to mark message as read: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error("Error marking message as read:", error);
    return false;
  }
}

// Main API object
export const api = {
  auth: {
    google: googleAuth,
    login: authApi.login,
    signup: authApi.signup
  }
};