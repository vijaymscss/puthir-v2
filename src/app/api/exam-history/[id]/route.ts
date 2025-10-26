import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const examResult = await prisma.examHistory.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            emailId: true
          }
        }
      }
    })

    if (!examResult) {
      return NextResponse.json(
        { error: 'Exam result not found' },
        { status: 404 }
      )
    }

    // Parse the result summary JSON
    let parsedResultSummary = null
    try {
      parsedResultSummary = JSON.parse(examResult.resultSummary)
    } catch (parseError) {
      console.error('Error parsing result summary:', parseError)
    }

    return NextResponse.json({
      success: true,
      data: {
        ...examResult,
        parsedResultSummary
      }
    })
  } catch (error) {
    console.error('Error fetching exam result:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exam result' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if the record exists
    const existingRecord = await prisma.examHistory.findUnique({
      where: { id }
    })

    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Exam result not found' },
        { status: 404 }
      )
    }

    // Delete the record
    await prisma.examHistory.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Exam result deleted successfully',
      data: { id }
    })
  } catch (error) {
    console.error('Error deleting exam result:', error)
    return NextResponse.json(
      { error: 'Failed to delete exam result' },
      { status: 500 }
    )
  }
}