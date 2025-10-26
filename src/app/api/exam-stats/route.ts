import { NextResponse } from 'next/server'
import { getUserExamStats } from '@/lib/database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const emailId = searchParams.get('emailId')

    if (!emailId) {
      return NextResponse.json(
        { error: 'emailId parameter is required' },
        { status: 400 }
      )
    }

    const stats = await getUserExamStats(emailId)
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching exam stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exam stats' },
      { status: 500 }
    )
  }
}