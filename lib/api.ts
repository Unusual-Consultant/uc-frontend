export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = {
  auth: {
    google: {
      login: () => `${API_BASE_URL}/auth/google/login`,
      callback: (code: string) => `${API_BASE_URL}/auth/google/callback?code=${code}`,
      
    },
    clientCredentials: () => `${API_BASE_URL}/auth/client-credentials`,
  },
  pdf: {
    toBase64: () => `${API_BASE_URL}/auth/pdf-to-base64`,
  },
}; 