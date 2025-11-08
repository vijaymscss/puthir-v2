/**
 * Server-side HTTP Client with Axios
 * Centralized configuration for all server-side API calls
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Base configuration for internal API calls
const API_BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

// Create axios instance for internal API calls
export const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create axios instance for external API calls (if needed)
export const externalApiClient: AxiosInstance = axios.create({
  timeout: 60000, // 60 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and authentication
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🔵 [HTTP] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ [HTTP] Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ [HTTP] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ [HTTP] ${error.response?.status} ${error.config?.url}:`, error.message);
    return Promise.reject(error);
  }
);

// Generic HTTP methods with proper typing
export const httpClient = {
  /**
   * GET request
   */
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },

  /**
   * POST request
   */
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },

  /**
   * PUT request
   */
  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },

  /**
   * DELETE request
   */
  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },

  /**
   * External API GET request
   */
  externalGet: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await externalApiClient.get<T>(url, config);
    return response.data;
  },

  /**
   * External API POST request
   */
  externalPost: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await externalApiClient.post<T>(url, data, config);
    return response.data;
  },
};

// Error handling utility
export const handleApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      return error.response.data?.message || error.response.data?.error || `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Network error
      return 'Network error: Unable to connect to server';
    }
  }
  return error.message || 'An unexpected error occurred';
};

export default httpClient;