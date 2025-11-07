// Test file to verify Prisma client setup
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    const userCount = await prisma.userDetails.count()
    console.log(`✅ Prisma connection successful! Found ${userCount} users.`)
    return true
  } catch (error) {
    console.error('❌ Prisma connection failed:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

// Uncomment the line below to test the connection
// testConnection()

export { testConnection }