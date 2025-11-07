import { NextResponse } from 'next/server'
import { prisma } from '@/core/config/prisma'

interface QuizQuestion {
  isCorrect: boolean;
  [key: string]: unknown;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const emailId = searchParams.get('emailId')

    let examHistory
    if (emailId) {
      // Get exam history for specific user
      examHistory = await prisma.examHistory.findMany({
        where: { emailId },
        orderBy: { testDateTime: 'desc' }
      })
    } else {
      // Get all exam history
      examHistory = await prisma.examHistory.findMany({
        orderBy: { testDateTime: 'desc' }
      })
    }

    return NextResponse.json(examHistory)
  } catch (error) {
    console.error('Error fetching exam history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exam history' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Handle both old format and new comprehensive format
    let resultSummaryJson = data.resultSummary
    
    // If it's a comprehensive quiz result object, structure it properly
    if (data.questions && Array.isArray(data.questions)) {
      resultSummaryJson = JSON.stringify({
        questions: data.questions,
        quizSettings: data.quizSettings || {},
        timing: {
          startTime: data.startTime,
          endTime: data.endTime,
          totalTimeSpent: data.timeSpent || 0
        },
        performance: {
          score: data.score,
          totalQuestions: data.totalQuestions || data.questions.length,
          percentage: data.percentage,
          correctAnswers: data.questions.filter((q: QuizQuestion) => q.isCorrect).length,
          incorrectAnswers: data.questions.filter((q: QuizQuestion) => !q.isCorrect).length
        },
        metadata: {
          submittedAt: new Date().toISOString(),
          apiSubmission: true
        }
      }, null, 2)
    } else if (typeof data.resultSummary === 'object') {
      resultSummaryJson = JSON.stringify(data.resultSummary)
    }
    
    const examHistory = await prisma.examHistory.create({
      data: {
        emailId: data.emailId,
        testId: data.testId || `quiz-${Date.now()}`,
        certificateName: data.certificateName,
        certificateProvider: data.certificateProvider,
        certificateCode: data.certificateCode,
        testDateTime: new Date(data.testDateTime || data.startTime || new Date()),
        score: data.score,
        percentage: data.percentage,
        resultSummary: resultSummaryJson
      }
    })

    return NextResponse.json({
      success: true,
      data: examHistory,
      message: 'Quiz results saved successfully!'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating exam history:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create exam history' 
      },
      { status: 500 }
    )
  }
}