import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    
    const examHistory = await prisma.examHistory.create({
      data: {
        emailId: data.emailId,
        testId: data.testId,
        certificateName: data.certificateName,
        certificateProvider: data.certificateProvider,
        certificateCode: data.certificateCode,
        testDateTime: new Date(data.testDateTime),
        score: data.score,
        percentage: data.percentage,
        resultSummary: data.resultSummary
      }
    })

    return NextResponse.json(examHistory, { status: 201 })
  } catch (error) {
    console.error('Error creating exam history:', error)
    return NextResponse.json(
      { error: 'Failed to create exam history' },
      { status: 500 }
    )
  }
}