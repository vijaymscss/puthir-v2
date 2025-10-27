/**
 * Centralized API Service Layer
 * All fetch calls and API interactions should go through this service
 * This ensures consistent error handling, logging, and caching strategies
 */

// Constants
const API_BASE_URL = "/api";
const DEFAULT_TIMEOUT = 60000; // 60 seconds

/**
 * Helper function to make fetch requests with consistent error handling
 */
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Add timeout if not already specified
    if (!options.signal) {
      options.signal = AbortSignal.timeout(DEFAULT_TIMEOUT);
    }

    // Set default content type if not specified
    if (!options.headers) {
      options.headers = {};
    }
    
    if (!(options.headers instanceof Headers)) {
      options.headers = new Headers(options.headers);
    }

    if (!options.headers.has("Content-Type") && options.method !== "GET") {
      options.headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `API Error: ${response.status}`;

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error("Network error: Unable to connect to the server");
    }
    throw error;
  }
}

/**
 * GET request helper
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiCall<T>(endpoint, { method: "GET" });
}

/**
 * POST request helper
 */
export async function apiPost<T>(
  endpoint: string,
  data?: Record<string, unknown>
): Promise<T> {
  return apiCall<T>(endpoint, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request helper
 */
export async function apiPut<T>(
  endpoint: string,
  data?: Record<string, unknown>
): Promise<T> {
  return apiCall<T>(endpoint, {
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request helper
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  return apiCall<T>(endpoint, { method: "DELETE" });
}

/**
 * Quiz API Services
 */
export const quizApi = {
  /**
   * Generate a new quiz with the provided configuration
   */
  generateQuiz: async (request: {
    examName: string;
    examLevel: string;
    quizType: string;
    selectedTopics: string[];
    questionCount: number;
  }) => {
    return apiPost("/generate-quiz", request);
  },
};

/**
 * Contact API Services
 */
export const contactApi = {
  /**
   * Get all contact information
   */
  getContacts: async () => {
    return apiGet("/contact");
  },

  /**
   * Submit a contact form
   */
  submitContact: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    return apiPost("/contact", data);
  },
};

/**
 * Exam History API Services
 */
export const examHistoryApi = {
  /**
   * Get exam history for a specific email
   */
  getExamHistory: async (emailId?: string) => {
    if (!emailId) {
      throw new Error("Email ID is required to fetch exam history");
    }
    return apiGet(`/exam-history?email=${encodeURIComponent(emailId)}`);
  },

  /**
   * Get a specific exam result by ID
   */
  getExamResult: async (resultId: string) => {
    if (!resultId) {
      throw new Error("Result ID is required");
    }
    return apiGet(`/exam-history/${resultId}`);
  },

  /**
   * Delete an exam result
   */
  deleteExamResult: async (resultId: string) => {
    if (!resultId) {
      throw new Error("Result ID is required");
    }
    return apiDelete(`/exam-history/${resultId}`);
  },
};

/**
 * User Stats API Services
 */
export const userStatsApi = {
  /**
   * Get statistics for a specific user
   */
  getUserStats: async (emailId?: string) => {
    if (!emailId) {
      throw new Error("Email ID is required to fetch user stats");
    }
    return apiGet(`/exam-stats?email=${encodeURIComponent(emailId)}`);
  },
};
