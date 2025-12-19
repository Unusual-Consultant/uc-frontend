"use client"

import React from "react";
import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation"
import { api } from "@/lib/api"

declare global {
  interface Window {
    __oauthProcessing?: {
      blocked: boolean;
      lastCode: string | null;
    };
  }
}

type AuthenticatedUserContext = {
  user: User | null;
  setUser: (user: User | null) => void;
  processOAuthCallback: (code: string) => Promise<void>
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  makeAuthenticatedRequest: (url: string, options?: RequestInit) => Promise<Response>;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
};

const AuthenticatedUserContext = createContext<AuthenticatedUserContext | undefined>(undefined);

export type User = {
  id: string;
  name: string;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
  username: string;
  firstName?: string;
  lastName?: string;
  profile_picture_url?: string;
  is_email_verified: boolean;
  is_phone_number_verified: boolean;
  is_two_factor_enabled: boolean;
  is_active: boolean;
  is_admin: boolean;
  email: string;
  mobile_number?: string;
  token: string;
};

export type AuthenticatedUserProviderProps = {
  children: React.ReactNode;
};

const AuthenticatedUserProvider: React.FC<AuthenticatedUserProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isProcessing = useRef(false);
  const lastProcessedCode = useRef<string | null>(null);
  const globallyBlockOAuth = useRef(false);

  if (typeof window !== 'undefined') {
    if (!window.__oauthProcessing) {
      window.__oauthProcessing = { blocked: false, lastCode: null };
    }
  }

  const router = useRouter();
  const searchParams = useSearchParams();

  const hasValidToken = useCallback(() => {
    const authToken = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
    const userInfo = typeof window !== 'undefined' ? localStorage.getItem("user_info") : null;
    return !!(authToken && userInfo);
  }, []);

  const makeAuthenticatedRequest = useCallback(async (url: string, options: RequestInit = {}) => {
    const authToken = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://uc-backend-210202864965.europe-west1.run.app/api/v1';
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

    const headers = {
      'Content-Type': 'application/json',
      ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
      ...options.headers,
    };

    const response = await fetch(fullUrl, { ...options, headers });

    if (response.status === 401 || response.status === 403) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
        localStorage.removeItem('userID');
      }
      setUser(null);
      setIsAuthenticated(false);
      router.push('/');
      throw new Error('Authentication failed');
    }

    return response;
  }, [router]);

  const processOAuthCallback = useCallback(async (code: string) => {
    console.log("Processing OAuth callback with code:", code);
    try {
      if (!isAuthenticated) {
        const callbackUrl = api.auth.google.callback(code);
        console.log("Calling callback URL:", callbackUrl);

        const response = await fetch(callbackUrl);
        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorMessage;
          } catch {
            errorMessage = response.statusText || errorMessage;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Callback response data:", data);

        if (data.token && data.user_info) {
          // ✅ Transform backend response to include camelCase fields
          const transformedUserInfo = {
            ...data.user_info,
            firstName: data.user_info.first_name || data.user_info.firstName,
            lastName: data.user_info.last_name || data.user_info.lastName,
            name: data.user_info.first_name && data.user_info.last_name
              ? `${data.user_info.first_name} ${data.user_info.last_name}`.trim()
              : data.user_info.first_name || data.user_info.firstName || data.user_info.name || data.user_info.email?.split("@")[0],
          };

          // ✅ merge token into user object
          const userWithToken = { ...transformedUserInfo, token: data.token };

          // ✅ save both in localStorage
          localStorage.setItem("auth_token", data.token);
          localStorage.setItem("user_info", JSON.stringify(userWithToken));

          // ✅ update state
          setToken(data.token);
          setUser(userWithToken);
          setIsAuthenticated(true);

          console.log("Authentication successful, redirecting to dashboard...");
          router.push("/dashboard");
        } else {
          throw new Error("No token received from server");
        }
      }
    } catch (error) {
      console.error("Error handling Google callback:", error);

      lastProcessedCode.current = null;
      globallyBlockOAuth.current = false;
      if (typeof window !== "undefined" && window.__oauthProcessing) {
        window.__oauthProcessing.blocked = false;
        window.__oauthProcessing.lastCode = null;
      }

      const errorMessage = error instanceof Error ? error.message : "Authentication failed";
      alert(`Login failed: ${errorMessage}. Please try again.`);
      router.push("/");
    } finally {
      isProcessing.current = false;
    }
  }, [router, isAuthenticated]);


  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_info");
    localStorage.removeItem("userID");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    lastProcessedCode.current = null;
    globallyBlockOAuth.current = false;
    if (typeof window !== 'undefined' && window.__oauthProcessing) {
      window.__oauthProcessing.blocked = false;
      window.__oauthProcessing.lastCode = null;
    }
    router.push("/");
  }, [router]);

  const getCurrentUser = useCallback(async () => {
    console.log("getCurrentUser called - making request to /auth/me");
    try {
      const response = await makeAuthenticatedRequest('/auth/me');
      if (response.ok) {
        const userInfo = await response.json();
        // Transform snake_case to camelCase and add name field
        const transformedUser = {
          ...userInfo,
          firstName: userInfo.first_name || userInfo.firstName,
          lastName: userInfo.last_name || userInfo.lastName,
          profile_picture_url: userInfo.profile_image_url || userInfo.profile_picture_url,
          name: userInfo.first_name && userInfo.last_name
            ? `${userInfo.first_name} ${userInfo.last_name}`.trim()
            : userInfo.first_name || userInfo.firstName || userInfo.name || userInfo.email?.split("@")[0],
        };
        // Store both original and transformed
        localStorage.setItem("user_info", JSON.stringify(transformedUser));
        setUser(transformedUser);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      if (error instanceof Error && error.message === 'Authentication failed') {
        logout();
      } else {
        const authToken = localStorage.getItem("auth_token");
        const userInfo = localStorage.getItem("user_info");
        if (authToken && userInfo) {
          try {
            const userData = JSON.parse(userInfo);
            // Transform if needed (in case it's raw backend response)
            const transformedUser = {
              ...userData,
              firstName: userData.first_name || userData.firstName,
              lastName: userData.last_name || userData.lastName,
              name: userData.first_name && userData.last_name
                ? `${userData.first_name} ${userData.last_name}`.trim()
                : userData.first_name || userData.firstName || userData.name || userData.email?.split("@")[0],
            };
            setUser(transformedUser);
            setToken(authToken);
            setIsAuthenticated(true);
          } catch {
            logout();
          }
        } else {
          logout();
        }
      }
    }
  }, [makeAuthenticatedRequest, logout]);

  useEffect(() => {
    // Check if token is in URL (from Google OAuth redirect)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenParam = urlParams.get("token");

      if (tokenParam && !localStorage.getItem("auth_token")) {
        // Token from URL - store it and fetch user info
        localStorage.setItem("auth_token", tokenParam);
        getCurrentUser();
        return;
      }
    }

    if (hasValidToken()) {
      const authToken = localStorage.getItem("auth_token")!;
      const userInfo = localStorage.getItem("user_info")!;
      try {
        const userData = JSON.parse(userInfo);
        // Transform if needed (in case it's raw backend response)
        const transformedUser = {
          ...userData,
          firstName: userData.first_name || userData.firstName,
          lastName: userData.last_name || userData.lastName,
          name: userData.first_name && userData.last_name
            ? `${userData.first_name} ${userData.last_name}`.trim()
            : userData.first_name || userData.firstName || userData.name || userData.email?.split("@")[0],
        };
        setUser(transformedUser);
        setToken(authToken);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_info");
        setIsAuthenticated(false);
      }
    } else {
      const authToken = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
      if (authToken && !user) {
        getCurrentUser();
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [getCurrentUser]);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (!code) return;

    const windowOAuth = typeof window !== 'undefined' ? window.__oauthProcessing : null;
    if (isProcessing.current || globallyBlockOAuth.current || (windowOAuth && windowOAuth.blocked)) return;
    if (lastProcessedCode.current === code || (windowOAuth && windowOAuth.lastCode === code)) return;

    isProcessing.current = true;
    globallyBlockOAuth.current = true;
    lastProcessedCode.current = code;
    if (windowOAuth) {
      windowOAuth.blocked = true;
      windowOAuth.lastCode = code;
    }

    if (!state || state === "oauth_login") {
      processOAuthCallback(code);
    } else {
      isProcessing.current = false;
      globallyBlockOAuth.current = false;
      lastProcessedCode.current = null;
      if (windowOAuth) {
        windowOAuth.blocked = false;
        windowOAuth.lastCode = null;
      }
    }
  }, [searchParams, isAuthenticated, processOAuthCallback]);

  useEffect(() => {
    if (isAuthenticated && lastProcessedCode.current) {
      lastProcessedCode.current = null;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      if (lastProcessedCode.current) {
        lastProcessedCode.current = null;
      }
    }, 10 * 60 * 1000);
    return () => clearInterval(cleanupInterval);
  }, []);

  const contextValue = {
    user,
    setUser,
    processOAuthCallback,
    isAuthenticated,
    setIsAuthenticated,
    makeAuthenticatedRequest,
    logout,
    getCurrentUser,
  };

  return (
    <AuthenticatedUserContext.Provider value={contextValue}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}

function useAuthenticatedUser() {
  const context = React.useContext(AuthenticatedUserContext);
  if (context === undefined) {
    throw new Error("useAuthenticatedUser must be used within a AuthenticatedUserProvider");
  }
  return context;
}

export { AuthenticatedUserProvider, useAuthenticatedUser };
