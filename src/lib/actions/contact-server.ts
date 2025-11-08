'use server'

import { ContactFormData, contactFormSchema } from '@/features/contact/validations/contact';
import { ApiResponse } from '@/shared/types/api';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/core/config/prisma';

/**
 * Server Action: Submit Contact Form
 * Handles contact form submission server-side
 */
export async function submitContactFormServerAction(data: ContactFormData): Promise<ApiResponse<{ id: string }>> {
  try {
    console.log('🎯 [Server Action] Submitting contact form');

    // Validate the data using Zod schema
    const validatedData = contactFormSchema.parse(data);

    // Store in database
    const contactRecord = await prisma.contactInfo.create({
      data: {
        name: validatedData.name,
        emailId: validatedData.emailId,
        phoneNo: validatedData.phoneNo,
        subject: validatedData.subject,
        message: validatedData.message,
      }
    });

    // Revalidate contact page
    revalidatePath('/contact');

    console.log('✅ [Server Action] Contact form submitted successfully');

    return {
      success: true,
      data: { id: contactRecord.contactId },
      message: 'Thank you for your message! We\'ll get back to you soon.'
    };
  } catch (error) {
    console.error('❌ [Server Action] Failed to submit contact form:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return {
        success: false,
        error: 'Please check all fields and try again.'
      };
    }

    return {
      success: false,
      error: 'Failed to submit your message. Please try again later.'
    };
  }
}

/**
 * Server Action: Get Contact Messages (Admin only)
 */
export async function getContactMessagesServerAction(): Promise<ApiResponse<any[]>> {
  try {
    console.log('🎯 [Server Action] Fetching contact messages');

    // In a real app, you'd check admin permissions here
    const contacts = await prisma.contactInfo.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return {
      success: true,
      data: contacts
    };
  } catch (error) {
    console.error('❌ [Server Action] Failed to fetch contact messages:', error);
    return {
      success: false,
      error: 'Failed to fetch contact messages'
    };
  }
}