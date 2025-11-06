import { z } from 'zod'

// Individual question result schema
export const questionResultSchema = z.object({
  questionId: z.string(),
  questionText: z.string(),
  userAnswer: z.string(),
  correctAnswer: z.string(),
  isCorrect: z.boolean(),
  explanation: z.string().optional(),
  options: z.array(z.string()),
  timeSpent: z.number().optional(), // in seconds
})

// Complete quiz result schema
export const quizResultSchema = z.object({
  // Quiz metadata
  testId: z.string(),
  certificateName: z.string(),
  certificateProvider: z.string(),
  certificateCode: z.string(),
  
  // User information
  emailId: z.string().email(),
  
  // Quiz performance
  score: z.number().int().min(0),
  totalQuestions: z.number().int().min(1),
  percentage: z.number().min(0).max(100),
  timeSpent: z.number().min(0), // total time in seconds
  
  // Detailed results
  questions: z.array(questionResultSchema),
  
  // Quiz timing
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  
  // Additional metadata
  quizSettings: z.object({
    timeLimit: z.number().optional(),
    shuffleQuestions: z.boolean().default(false),
    showCorrectAnswers: z.boolean().default(true),
  }).optional(),
})

// Exam history display schema (for retrieving data)
export const examHistorySchema = z.object({
  id: z.string(),
  emailId: z.string(),
  testId: z.string(),
  certificateName: z.string(),
  certificateProvider: z.string(),
  certificateCode: z.string(),
  testDateTime: z.date(),
  score: z.number(),
  percentage: z.number(),
  resultSummary: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Type exports
export type QuestionResult = z.infer<typeof questionResultSchema>
export type QuizResult = z.infer<typeof quizResultSchema>
export type ExamHistoryData = z.infer<typeof examHistorySchema>