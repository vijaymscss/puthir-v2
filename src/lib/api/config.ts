// Query client configuration constants
export const QUERY_KEYS = {
  CONTACTS: 'contacts',
  USER_DETAILS: 'userDetails',
  EXAM_HISTORY: 'examHistory',
} as const

// API endpoint constants
export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
  USER_DETAILS: '/api/users',
  EXAM_HISTORY: '/api/exam-history',
  EXAM_STATS: '/api/exam-stats',
} as const

// Default query options
export const DEFAULT_QUERY_OPTIONS = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  GC_TIME: 10 * 60 * 1000,   // 10 minutes (cache time)
  RETRY_COUNT: 3,
} as const