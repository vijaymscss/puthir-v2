'use server'

import { prisma } from '@/core/config/prisma'
import { QuizResult, quizResultSchema, ExamHistoryData } from '@/features/quiz/validations/quiz'
import { ApiResponse } from '@/shared/types/api'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

export async function storeQuizResultAction(data: QuizResult): Promise<ApiResponse<ExamHistoryData>> {
  try {
    // Get the authenticated user
    const { userId } = await auth()
    
    if (!userId) {
      return {
        success: false,
        error: 'You must be authenticated to store quiz results'
      }
    }

    // Validate the data using our Zod schema
    const validatedData = quizResultSchema.parse(data)
    
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
    }, null, 2)
    
    // Use a transaction to ensure user exists and create exam history atomically
    const result = await prisma.$transaction(async (tx) => {
      // Ensure user exists in userDetails table
      const userDetails = await tx.userDetails.upsert({
        where: { emailId: validatedData.emailId },
        update: {
          // Update clerkId if it's different (user might have changed accounts)
          clerkId: userId,
        },
        create: {
          emailId: validatedData.emailId,
          clerkId: userId,
          firstName: null,
          lastName: null,
        }
      })
      
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
      })
      
      return examHistory
    })

    // The exam history is created in the transaction above
    const examHistory = result

    // Revalidate relevant pages
    revalidatePath('/dashboard')
    revalidatePath('/exam-history')
    revalidatePath(`/exam-history/${examHistory.id}`)

    return {
      success: true,
      data: examHistory,
      message: 'Quiz results saved successfully!'
    }
  } catch (error) {
    console.error('Error storing quiz result:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return {
        success: false,
        error: 'Invalid quiz result data. Please check the submission format.'
      }
    }
    
    return {
      success: false,
      error: 'Failed to save quiz results. Please try again later.'
    }
  }
}

export async function getExamHistoryAction(emailId?: string): Promise<ApiResponse<ExamHistoryData[]>> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return {
        success: false,
        error: 'You must be authenticated to view exam history'
      }
    }

    // Build query conditions
    const whereCondition: { emailId?: string } = {}
    if (emailId) {
      whereCondition.emailId = emailId
    }

    const examHistory = await prisma.examHistory.findMany({
      where: whereCondition,
      orderBy: { testDateTime: 'desc' },
      take: 50 // Limit to recent 50 results
    })

    return {
      success: true,
      data: examHistory
    }
  } catch (error) {
    console.error('Error fetching exam history:', error)
    return {
      success: false,
      error: 'Failed to fetch exam history'
    }
  }
}

export async function getExamResultByIdAction(id: string): Promise<ApiResponse<ExamHistoryData & { parsedResultSummary?: Record<string, unknown> }>> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return {
        success: false,
        error: 'You must be authenticated to view exam results'
      }
    }

    const examResult = await prisma.examHistory.findUnique({
      where: { id }
    })

    if (!examResult) {
      return {
        success: false,
        error: 'Exam result not found'
      }
    }

    // Parse the result summary JSON
    let parsedResultSummary
    try {
      parsedResultSummary = JSON.parse(examResult.resultSummary)
    } catch (parseError) {
      console.error('Error parsing result summary:', parseError)
    }

    return {
      success: true,
      data: {
        ...examResult,
        parsedResultSummary
      }
    }
  } catch (error) {
    console.error('Error fetching exam result:', error)
    return {
      success: false,
      error: 'Failed to fetch exam result'
    }
  }
}

export async function deleteExamResultAction(id: string): Promise<ApiResponse<{ id: string }>> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return {
        success: false,
        error: 'You must be authenticated to delete exam results'
      }
    }

    // First check if the record exists and belongs to the user
    const existingRecord = await prisma.examHistory.findUnique({
      where: { id },
      include: {
        user: true
      }
    })

    if (!existingRecord) {
      return {
        success: false,
        error: 'Exam result not found'
      }
    }

    // Delete the record
    await prisma.examHistory.delete({
      where: { id }
    })

    // Revalidate relevant pages
    revalidatePath('/dashboard')
    revalidatePath('/exam-history')

    return {
      success: true,
      data: { id },
      message: 'Exam result deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting exam result:', error)
    return {
      success: false,
      error: 'Failed to delete exam result'
    }
  }
}