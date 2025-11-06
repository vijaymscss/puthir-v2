import { NextResponse } from 'next/server'
import { prisma } from '@/core/config/prisma'

export async function GET() {
  try {
    const contacts = await prisma.contactInfo.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const contact = await prisma.contactInfo.create({
      data: {
        emailId: data.emailId,
        name: data.name,
        phoneNo: data.phoneNo || null, // Optional field
        subject: data.subject,
        message: data.message
      }
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    )
  }
}