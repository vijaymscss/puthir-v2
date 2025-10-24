import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample user details (upsert to handle existing data)
  const user1 = await prisma.userDetails.upsert({
    where: { emailId: 'john.doe@example.com' },
    create: {
      emailId: 'john.doe@example.com',
      clerkId: 'user_123456789',
      firstName: 'John',
      lastName: 'Doe',
      freeExamCount: 3,
      paidExamCount: 0
    },
    update: {}
  })

  const user2 = await prisma.userDetails.upsert({
    where: { emailId: 'jane.smith@example.com' },
    create: {
      emailId: 'jane.smith@example.com',
      clerkId: 'user_987654321',
      firstName: 'Jane',
      lastName: 'Smith',
      freeExamCount: 2,
      paidExamCount: 5
    },
    update: {}
  })

  // Create sample exam history
  const examHistory1 = await prisma.examHistory.create({
    data: {
      emailId: 'john.doe@example.com',
      testId: 'TEST_001',
      certificateName: 'AWS Solutions Architect Associate',
      certificateProvider: 'AWS',
      certificateCode: 'SAA-C03',
      testDateTime: new Date('2024-10-15T10:30:00Z'),
      score: 75,
      percentage: 85.2,
      resultSummary: JSON.stringify({
        totalQuestions: 65,
        correctAnswers: 55,
        incorrectAnswers: 10,
        domains: {
          'Design Resilient Architectures': { correct: 15, total: 18 },
          'Design High-Performing Architectures': { correct: 12, total: 15 },
          'Design Secure Applications': { correct: 18, total: 20 },
          'Design Cost-Optimized Architectures': { correct: 10, total: 12 }
        },
        passed: true,
        certificateEarned: true
      })
    }
  })

  const examHistory2 = await prisma.examHistory.create({
    data: {
      emailId: 'jane.smith@example.com',
      testId: 'TEST_002',
      certificateName: 'Azure Fundamentals',
      certificateProvider: 'Microsoft',
      certificateCode: 'AZ-900',
      testDateTime: new Date('2024-10-20T14:00:00Z'),
      score: 68,
      percentage: 92.1,
      resultSummary: JSON.stringify({
        totalQuestions: 40,
        correctAnswers: 37,
        incorrectAnswers: 3,
        domains: {
          'Cloud Concepts': { correct: 12, total: 13 },
          'Azure Services': { correct: 15, total: 16 },
          'Security and Compliance': { correct: 10, total: 11 }
        },
        passed: true,
        certificateEarned: true
      })
    }
  })

  // Create sample contact info
  const contact1 = await prisma.contactInfo.create({
    data: {
      emailId: 'support@example.com',
      name: 'Alice Johnson',
      phoneNo: '+1-555-0123',
      subject: 'Question about exam scheduling',
      message: 'Hi, I would like to know more about the availability of AWS certification exams. Can you help me understand the scheduling process and any preparation materials you recommend?'
    }
  })

  const contact2 = await prisma.contactInfo.create({
    data: {
      emailId: 'feedback@example.com',
      name: 'Bob Wilson',
      subject: 'Feedback on exam experience',
      message: 'I recently completed the Azure fundamentals exam and wanted to provide some feedback on the experience. Overall it was great, but I have some suggestions for improvement.'
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log(`Created users:`)
  console.log(`- ${user1.firstName} ${user1.lastName} (ID: ${user1.id})`)
  console.log(`- ${user2.firstName} ${user2.lastName} (ID: ${user2.id})`)
  console.log(`\nCreated exam history:`)
  console.log(`- ${examHistory1.certificateName} for ${examHistory1.emailId} (${examHistory1.percentage}%)`)
  console.log(`- ${examHistory2.certificateName} for ${examHistory2.emailId} (${examHistory2.percentage}%)`)
  console.log(`\nCreated contacts:`)
  console.log(`- ${contact1.name} - ${contact1.subject}`)
  console.log(`- ${contact2.name} - ${contact2.subject}`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })