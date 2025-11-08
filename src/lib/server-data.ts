/**
 * Server-side data fetching functions for components
 * These functions run on the server and provide data to server components
 */
import { serverApiServices } from '@/lib/server-api';
import { prisma } from '@/core/config/prisma';
import { auth } from '@clerk/nextjs/server';
import { cache } from 'react';
import { ExamHistoryData } from '@/features/quiz/validations/quiz';

/**
 * Cached server-side data fetching for exam history
 */
export const getExamHistoryData = cache(async (emailId?: string): Promise<ExamHistoryData[]> => {
  try {
    console.log('🎯 [Server Data] Fetching exam history for:', emailId);
    
    const { userId } = await auth();
    if (!userId) {
      throw new Error('Authentication required');
    }

    const whereCondition: { emailId?: string } = {};
    if (emailId) {
      whereCondition.emailId = emailId;
    }

    const examHistory = await prisma.examHistory.findMany({
      where: whereCondition,
      orderBy: { testDateTime: 'desc' },
      take: 50,
    });

    console.log('✅ [Server Data] Exam history fetched:', examHistory.length, 'records');
    return examHistory;
  } catch (error) {
    console.error('❌ [Server Data] Failed to fetch exam history:', error);
    return [];
  }
});

/**
 * Cached server-side data fetching for specific exam result
 */
export const getExamResultData = cache(async (id: string): Promise<ExamHistoryData | null> => {
  try {
    console.log('🎯 [Server Data] Fetching exam result:', id);
    
    const { userId } = await auth();
    if (!userId) {
      throw new Error('Authentication required');
    }

    const examResult = await prisma.examHistory.findUnique({
      where: { id }
    });

    if (!examResult) {
      console.log('⚠️ [Server Data] Exam result not found:', id);
      return null;
    }

    console.log('✅ [Server Data] Exam result fetched successfully');
    return examResult;
  } catch (error) {
    console.error('❌ [Server Data] Failed to fetch exam result:', error);
    return null;
  }
});

/**
 * Cached server-side data fetching for user statistics
 */
export const getUserStatsData = cache(async (emailId: string): Promise<any> => {
  try {
    console.log('🎯 [Server Data] Fetching user stats for:', emailId);
    
    const { userId } = await auth();
    if (!userId) {
      throw new Error('Authentication required');
    }

    // Calculate stats from exam history
    const examHistory = await prisma.examHistory.findMany({
      where: { emailId },
      orderBy: { testDateTime: 'desc' },
    });

    const stats = {
      totalExams: examHistory.length,
      averageScore: examHistory.length > 0 
        ? Math.round(examHistory.reduce((sum, exam) => sum + exam.score, 0) / examHistory.length)
        : 0,
      averagePercentage: examHistory.length > 0 
        ? Math.round(examHistory.reduce((sum, exam) => sum + exam.percentage, 0) / examHistory.length)
        : 0,
      recentExams: examHistory.slice(0, 5),
      bestScore: examHistory.length > 0 
        ? Math.max(...examHistory.map(exam => exam.score))
        : 0,
    };

    console.log('✅ [Server Data] User stats calculated:', stats);
    return stats;
  } catch (error) {
    console.error('❌ [Server Data] Failed to fetch user stats:', error);
    return {
      totalExams: 0,
      averageScore: 0,
      averagePercentage: 0,
      recentExams: [],
      bestScore: 0,
    };
  }
});

/**
 * Server-side contact data fetching
 */
export const getContactsData = cache(async (): Promise<any[]> => {
  try {
    console.log('🎯 [Server Data] Fetching contacts');
    
    // For now, return empty array as contacts are typically submitted, not fetched
    return [];
  } catch (error) {
    console.error('❌ [Server Data] Failed to fetch contacts:', error);
    return [];
  }
});

/**
 * Server-side quiz data for active quiz session
 */
export const getActiveQuizData = cache(async (): Promise<any | null> => {
  try {
    console.log('🎯 [Server Data] Fetching active quiz data');
    
    const { userId } = await auth();
    if (!userId) {
      return null;
    }

    // For now, return null. In a real app, you might store active quiz state in Redis or similar
    // This would be where you fetch the current quiz session data
    return null;
  } catch (error) {
    console.error('❌ [Server Data] Failed to fetch active quiz data:', error);
    return null;
  }
});

/**
 * Prefetch and cache data for multiple components
 */
export const prefetchUserData = cache(async (emailId: string) => {
  try {
    console.log('🎯 [Server Data] Prefetching user data for:', emailId);
    
    const [examHistory, userStats] = await Promise.all([
      getExamHistoryData(emailId),
      getUserStatsData(emailId),
    ]);

    return {
      examHistory,
      userStats,
    };
  } catch (error) {
    console.error('❌ [Server Data] Failed to prefetch user data:', error);
    return {
      examHistory: [],
      userStats: {
        totalExams: 0,
        averageScore: 0,
        averagePercentage: 0,
        recentExams: [],
        bestScore: 0,
      },
    };
  }
});

export {
  getExamHistoryData as fetchExamHistory,
  getExamResultData as fetchExamResult,
  getUserStatsData as fetchUserStats,
  getContactsData as fetchContacts,
  getActiveQuizData as fetchActiveQuiz,
  prefetchUserData as fetchUserData,
};