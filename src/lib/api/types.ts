import { ContactFormData } from '@/lib/validations/contact'

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ContactInfo {
  contactId: string
  emailId: string
  name: string
  phoneNo?: string | null
  subject: string
  message: string
  createdAt: Date
  updatedAt: Date
}

export interface UserDetails {
  id: string
  userId: string
  name: string
  emailId: string
  attemptCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ExamHistory {
  id: string
  userId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  examDate: Date
  timeSpent: number
  createdAt: Date
}