import { ContactFormData } from '@/lib/validations/contact'
import { ApiResponse, ContactInfo } from './types'

const API_BASE_URL = '/api'

export class ContactService {
  static async getContacts(): Promise<ApiResponse<ContactInfo[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch contacts'
      }
    }
  }

  static async createContact(contactData: ContactFormData): Promise<ApiResponse<ContactInfo>> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      const data = await response.json()
      return {
        success: true,
        data,
        message: 'Message sent successfully!'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send message'
      }
    }
  }
}