import { prisma } from './prisma'

// Exam History utilities
export async function createExamHistory(data: {
  emailId: string
  testId: string
  certificateName: string
  certificateProvider: string
  certificateCode: string
  testDateTime: Date
  score: number
  percentage: number
  resultSummary: string
}) {
  return await prisma.examHistory.create({ data })
}

export async function getExamHistoryByEmail(emailId: string) {
  return await prisma.examHistory.findMany({
    where: { emailId },
    orderBy: { testDateTime: 'desc' }
  })
}

export async function getUserExamStats(emailId: string) {
  const examHistory = await prisma.examHistory.findMany({
    where: { emailId },
    select: {
      certificateProvider: true,
      percentage: true,
      testDateTime: true
    }
  })

  const totalExams = examHistory.length
  const averageScore = totalExams > 0 
    ? examHistory.reduce((sum: number, exam: any) => sum + exam.percentage, 0) / totalExams 
    : 0

  const providerCounts = examHistory.reduce((acc: Record<string, number>, exam: any) => {
    acc[exam.certificateProvider] = (acc[exam.certificateProvider] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    totalExams,
    averageScore: Math.round(averageScore * 10) / 10,
    providerCounts,
    recentExams: examHistory.slice(0, 5)
  }
}

// Contact utilities
export async function createContact(data: {
  emailId: string
  name: string
  phoneNo?: string
  subject: string
  message: string
}) {
  return await prisma.contactInfo.create({ data })
}

export async function getAllContacts() {
  return await prisma.contactInfo.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

// User utilities
export async function createOrUpdateUser(data: {
  emailId: string
  clerkId: string
  firstName?: string
  lastName?: string
  freeExamCount?: number
  paidExamCount?: number
}) {
  return await prisma.userDetails.upsert({
    where: { emailId: data.emailId },
    create: data,
    update: {
      firstName: data.firstName,
      lastName: data.lastName,
      freeExamCount: data.freeExamCount,
      paidExamCount: data.paidExamCount
    }
  })
}