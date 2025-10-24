'use server'

import { prisma } from '@/lib/prisma'
import { ContactFormData, contactFormSchema } from '@/lib/validations/contact'
import { ApiResponse, ContactInfo } from '@/lib/api/types'
import { revalidatePath } from 'next/cache'

export async function createContactAction(data: ContactFormData): Promise<ApiResponse<ContactInfo>> {
  try {
    // Validate the data using our Zod schema
    const validatedData = contactFormSchema.parse(data)

    const contact = await prisma.contactInfo.create({
      data: {
        emailId: validatedData.emailId,
        name: validatedData.name,
        phoneNo: validatedData.phoneNo || null,
        subject: validatedData.subject,
        message: validatedData.message
      }
    })

    // Revalidate any pages that might display contact data
    revalidatePath('/admin/contacts')
    
    return {
      success: true,
      data: contact,
      message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
    }
  } catch (error) {
    console.error('Error creating contact:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return {
        success: false,
        error: 'Invalid form data. Please check your inputs and try again.'
      }
    }
    
    return {
      success: false,
      error: 'Failed to send your message. Please try again later.'
    }
  }
}

export async function getContactsAction(): Promise<ApiResponse<ContactInfo[]>> {
  try {
    const contacts = await prisma.contactInfo.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return {
      success: true,
      data: contacts
    }
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return {
      success: false,
      error: 'Failed to fetch contacts'
    }
  }
}