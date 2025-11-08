/**
 * Server-side API Service Layer
 * All API calls using Axios for server-side rendering
 */
import { httpClient, handleApiError } from '@/lib/http-client';
import { QuizRequest, QuizData } from '@/features/quiz/services/quiz-service';
import { ApiResponse, ContactInfo } from '@/shared/types/api';
import { ContactFormData } from '@/features/contact/validations/contact';
import { ExamHistoryData } from '@/features/quiz/validations/quiz';

/**
 * Quiz API Services - Server-side
 */
export const serverQuizApi = {
  /**
   * Generate a quiz using server-side call
   */
  generateQuiz: async (request: QuizRequest): Promise<QuizData> => {
    try {
      console.log('🎯 [Server] Generating quiz with request:', request);
      const data = await httpClient.post<QuizData>('/generate-quiz', request);
      console.log('✅ [Server] Quiz generated successfully:', data);
      return data;
    } catch (error) {
      console.error('❌ [Server] Quiz generation failed:', error);
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Submit quiz results using server-side call
   */
  submitQuizResult: async (result: any): Promise<ApiResponse<ExamHistoryData>> => {
    try {
      console.log('🎯 [Server] Submitting quiz result');
      const data = await httpClient.post<ApiResponse<ExamHistoryData>>('/exam-history', result);
      console.log('✅ [Server] Quiz result submitted successfully');
      return data;
    } catch (error) {
      console.error('❌ [Server] Quiz result submission failed:', error);
      throw new Error(handleApiError(error));
    }
  },
};

/**
 * Exam History API Services - Server-side
 */
export const serverExamHistoryApi = {
  /**
   * Get exam history for a user
   */
  getExamHistory: async (emailId?: string): Promise<ExamHistoryData[]> => {
    try {
      console.log('🎯 [Server] Fetching exam history for:', emailId);
      const params = emailId ? { email: emailId } : {};
      const data = await httpClient.get<ExamHistoryData[]>('/exam-history', { params });
      console.log('✅ [Server] Exam history fetched successfully');
      return data;
    } catch (error) {
      console.error('❌ [Server] Failed to fetch exam history:', error);
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Get specific exam result by ID
   */
  getExamResult: async (id: string): Promise<ExamHistoryData> => {
    try {
      console.log('🎯 [Server] Fetching exam result:', id);
      const data = await httpClient.get<ExamHistoryData>(`/exam-history/${id}`);
      console.log('✅ [Server] Exam result fetched successfully');
      return data;
    } catch (error) {
      console.error('❌ [Server] Failed to fetch exam result:', error);
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Delete exam result
   */
  deleteExamResult: async (id: string): Promise<{ success: boolean }> => {
    try {
      console.log('🎯 [Server] Deleting exam result:', id);
      await httpClient.delete(`/exam-history/${id}`);
      console.log('✅ [Server] Exam result deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ [Server] Failed to delete exam result:', error);
      throw new Error(handleApiError(error));
    }
  },
};

/**
 * Contact API Services - Server-side
 */
export const serverContactApi = {
  /**
   * Get all contacts
   */
  getContacts: async (): Promise<ContactInfo[]> => {
    try {
      console.log('🎯 [Server] Fetching contacts');
      const data = await httpClient.get<ContactInfo[]>('/contact');
      console.log('✅ [Server] Contacts fetched successfully');
      return data;
    } catch (error) {
      console.error('❌ [Server] Failed to fetch contacts:', error);
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Submit contact form
   */
  submitContact: async (contactData: ContactFormData): Promise<ApiResponse<ContactInfo>> => {
    try {
      console.log('🎯 [Server] Submitting contact form');
      const data = await httpClient.post<ApiResponse<ContactInfo>>('/contact', contactData);
      console.log('✅ [Server] Contact form submitted successfully');
      return data;
    } catch (error) {
      console.error('❌ [Server] Failed to submit contact form:', error);
      throw new Error(handleApiError(error));
    }
  },
};

/**
 * User Stats API Services - Server-side
 */
export const serverUserStatsApi = {
  /**
   * Get user statistics
   */
  getUserStats: async (emailId: string): Promise<any> => {
    try {
      console.log('🎯 [Server] Fetching user stats for:', emailId);
      const data = await httpClient.get(`/exam-stats`, { params: { email: emailId } });
      console.log('✅ [Server] User stats fetched successfully');
      return data;
    } catch (error) {
      console.error('❌ [Server] Failed to fetch user stats:', error);
      throw new Error(handleApiError(error));
    }
  },
};

// Export all services
export const serverApiServices = {
  quiz: serverQuizApi,
  examHistory: serverExamHistoryApi,
  contact: serverContactApi,
  userStats: serverUserStatsApi,
};

export default serverApiServices;