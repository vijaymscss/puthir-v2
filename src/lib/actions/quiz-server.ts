'use server'

import { serverApiServices } from '@/lib/server-api';
import { QuizRequest, QuizData } from '@/features/quiz/services/quiz-service';
import { QuizResult, quizResultSchema, ExamHistoryData } from '@/features/quiz/validations/quiz';
import { ApiResponse } from '@/shared/types/api';
import { revalidatePath, revalidateTag } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/core/config/prisma';
import { redirect } from 'next/navigation';

/**
 * Server Action: Generate Quiz using Axios
 */
export async function generateQuizServerAction(request: QuizRequest): Promise<ApiResponse<QuizData>> {
  try {
    console.log('🎯 [Server Action] Generate Quiz called with:', request);
    
    // Validate user authentication
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        error: 'Authentication required to generate quiz'
      };
    }

    // Call API route directly with proper NextRequest simulation
    console.log('🔧 [Server Action] Creating proper NextRequest...');
    
    const mockNextRequest = {
      json: async () => {
        console.log('🔧 [Server Action] Returning request data:', request);
        return request;
      }
    };
    
    console.log('🔧 [Server Action] Importing and calling API route...');
    
    // Import the API route function dynamically
    const apiRoute = await import('@/app/api/generate-quiz/route');
    console.log('🔧 [Server Action] API route imported successfully');
    
    const response = await apiRoute.POST(mockNextRequest as any);
    console.log('🔧 [Server Action] API route executed, parsing response...');
    
    const quizData = await response.json();
    console.log('✅ [Server Action] Quiz data received:', {
      type: typeof quizData,
      hasQuestions: !!quizData?.questions,
      questionCount: quizData?.questions?.length
    });
    
    if (!quizData || !quizData.questions) {
      throw new Error('Invalid quiz data received from API route');
    }
    
    // Cache the result with tags for revalidation
    revalidateTag(`quiz-${userId}`);
    
    return {
      success: true,
      data: quizData,
      message: 'Quiz generated successfully'
    };
  } catch (error) {
    console.error('❌ [Server Action] Quiz generation failed:', error);
    console.error('❌ [Server Action] Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate quiz'
    };
  }
}

/**
 * Server Action: Store Quiz Result (Enhanced with Axios)
 */
export async function storeQuizResultServerAction(data: QuizResult): Promise<ApiResponse<ExamHistoryData>> {
  try {
    console.log('🎯 [Server Action] Storing quiz result');
    
    // Get the authenticated user
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        error: 'You must be authenticated to store quiz results'
      };
    }

    // Validate the data using our Zod schema
    const validatedData = quizResultSchema.parse(data);
    
    // Convert the complete quiz result to JSON for storage
    const resultSummaryJson = JSON.stringify({
      questions: validatedData.questions,
      quizSettings: validatedData.quizSettings,
      timing: {
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
        totalTimeSpent: validatedData.timeSpent
      },
      performance: {
        score: validatedData.score,
        totalQuestions: validatedData.totalQuestions,
        percentage: validatedData.percentage,
        correctAnswers: validatedData.questions.filter(q => q.isCorrect).length,
        incorrectAnswers: validatedData.questions.filter(q => !q.isCorrect).length
      },
      metadata: {
        submittedAt: new Date().toISOString(),
        userId: userId
      }
    }, null, 2);
    
    // Use a transaction to ensure user exists and create exam history atomically
    const result = await prisma.$transaction(async (tx) => {
      // Ensure user exists in userDetails table
      await tx.userDetails.upsert({
        where: { emailId: validatedData.emailId },
        update: {
          clerkId: userId,
        },
        create: {
          emailId: validatedData.emailId,
          clerkId: userId,
          firstName: null,
          lastName: null,
        }
      });
      
      // Create exam history record
      const examHistory = await tx.examHistory.create({
        data: {
          emailId: validatedData.emailId,
          testId: validatedData.testId,
          certificateName: validatedData.certificateName,
          certificateProvider: validatedData.certificateProvider,
          certificateCode: validatedData.certificateCode,
          testDateTime: new Date(validatedData.startTime),
          score: validatedData.score,
          percentage: validatedData.percentage,
          resultSummary: resultSummaryJson
        }
      });
      
      return examHistory;
    });

    // Revalidate relevant pages and cache tags
    revalidatePath('/dashboard');
    revalidatePath('/exam-history');
    revalidatePath(`/exam-history/${result.id}`);
    revalidateTag('exam-history');
    revalidateTag(`user-stats-${validatedData.emailId}`);

    return {
      success: true,
      data: result,
      message: 'Quiz results saved successfully!'
    };
  } catch (error) {
    console.error('❌ [Server Action] Error storing quiz result:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return {
        success: false,
        error: 'Invalid quiz result data. Please check the submission format.'
      };
    }
    
    return {
      success: false,
      error: 'Failed to save quiz results. Please try again later.'
    };
  }
}

/**
 * Server Action: Get Exam History using Server-side data fetching
 */
export async function getExamHistoryServerAction(emailId?: string): Promise<ApiResponse<ExamHistoryData[]>> {
  try {
    console.log('🎯 [Server Action] Fetching exam history');
    
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        error: 'You must be authenticated to view exam history'
      };
    }

    // Fetch from database directly (server-side)
    const whereCondition: { emailId?: string } = {};
    if (emailId) {
      whereCondition.emailId = emailId;
    }

    const examHistory = await prisma.examHistory.findMany({
      where: whereCondition,
      orderBy: { testDateTime: 'desc' },
      take: 50 // Limit to recent 50 results
    });

    return {
      success: true,
      data: examHistory
    };
  } catch (error) {
    console.error('❌ [Server Action] Error fetching exam history:', error);
    return {
      success: false,
      error: 'Failed to fetch exam history'
    };
  }
}

/**
 * Server Action: Delete Exam Result with revalidation
 */
export async function deleteExamResultServerAction(id: string): Promise<ApiResponse<{ id: string }>> {
  try {
    console.log('🎯 [Server Action] Deleting exam result:', id);
    
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        error: 'You must be authenticated to delete exam results'
      };
    }

    // First check if the record exists
    const existingRecord = await prisma.examHistory.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!existingRecord) {
      return {
        success: false,
        error: 'Exam result not found'
      };
    }

    // Delete the record
    await prisma.examHistory.delete({
      where: { id }
    });

    // Revalidate relevant pages and cache tags
    revalidatePath('/dashboard');
    revalidatePath('/exam-history');
    revalidateTag('exam-history');

    return {
      success: true,
      data: { id },
      message: 'Exam result deleted successfully'
    };
  } catch (error) {
    console.error('❌ [Server Action] Error deleting exam result:', error);
    return {
      success: false,
      error: 'Failed to delete exam result'
    };
  }
}

/**
 * Server Action: Redirect to Quiz with Server-side data
 */
export async function startQuizServerAction(quizRequest: QuizRequest) {
  try {
    console.log('🎯 [Server Action] Starting quiz with server-side generation');
    
    const { userId } = await auth();
    if (!userId) {
      redirect('/sign-in');
    }

    // Generate quiz server-side
    const result = await generateQuizServerAction(quizRequest);
    
    if (result.success && result.data) {
      // Store quiz data in session or cache for the quiz page
      revalidateTag(`quiz-data-${userId}`);
      redirect('/quiz');
    } else {
      throw new Error(result.error || 'Failed to generate quiz');
    }
  } catch (error) {
    console.error('❌ [Server Action] Failed to start quiz:', error);
    redirect('/quiz-setup?error=failed-to-generate');
  }
}