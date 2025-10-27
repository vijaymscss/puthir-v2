# API Services Architecture

## Overview
This document describes the centralized API service architecture implemented to optimize performance and maintain consistency across the application.

## File Structure

```
src/lib/services/
├── api.ts                 # Centralized API service layer with all API calls
├── quiz-service.ts        # Quiz-specific types and business logic
└── [other services...]    # Domain-specific services

src/hooks/
├── use-quiz.ts           # React Query hooks for quiz operations
└── [other hooks...]      # Domain-specific React Query hooks
```

## Key Components

### 1. **Centralized API Service** (`/src/lib/services/api.ts`)

This file provides a consistent interface for all HTTP requests with:

- **Error Handling**: Standardized error messages and network error detection
- **Timeout Management**: 60-second default timeout for all requests
- **Type Safety**: Full TypeScript support with generic types
- **Request Helpers**: `apiGet()`, `apiPost()`, `apiPut()`, `apiDelete()`

#### Usage Example:

```typescript
import { quizApi, contactApi, examHistoryApi } from '@/lib/services/api';

// Quiz API
const quizData = await quizApi.generateQuiz({
  examName: 'AWS Solutions Architect',
  examLevel: 'Professional',
  quizType: 'complete',
  selectedTopics: ['EC2', 'S3'],
  questionCount: 10
});

// Contact API
const contacts = await contactApi.getContacts();
await contactApi.submitContact({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Question',
  message: 'I have a question...'
});

// Exam History API
const history = await examHistoryApi.getExamHistory(userEmail);
const result = await examHistoryApi.getExamResult(resultId);
```

### 2. **Quiz Service** (`/src/lib/services/quiz-service.ts`)

Exports:
- **Types**: `QuizRequest`, `QuizData`, `QuizQuestion`, `ApiError`
- **Function**: `generateQuiz()` - Wraps the centralized API call with validation

#### Features:

- ✅ Response validation
- ✅ Proper error handling
- ✅ Uses centralized API service internally
- ✅ Type-safe request/response

### 3. **React Query Integration** (`/src/hooks/use-quiz.ts`)

Hooks provided:
- `useGenerateQuiz()` - Mutation hook for generating quizzes
- `useStoreQuizResult()` - Mutation hook for storing quiz results
- `useExamHistory()` - Query hook for fetching exam history
- `useExamResult()` - Query hook for fetching specific exam results
- `useQuizSubmission()` - Combined hook for quiz submission workflow

#### Benefits:

- 📊 Automatic caching and reuse of responses
- 🔄 Automatic background refetching
- 💾 Session storage integration
- 🎯 Optimistic updates
- ⚡ Query invalidation and updates

## Performance Optimizations

### 1. **Session Storage**
Quiz questions and answers are cached in `sessionStorage` for instant access on page reload:

```typescript
// Quiz data key format
const sessionKey = `quiz_${examId}_${quizType}_${encodedTopics}`;

// Answers key format
const answersSessionKey = `${sessionKey}_answers`;

// Results key
const resultsKey = 'quiz_results';
```

### 2. **React Query Caching**
- Quiz data cached with smart invalidation
- Stale time: 2-10 minutes depending on endpoint
- Garbage collection: 10-15 minutes after last access

### 3. **Request Optimization**
- Single 60-second timeout for all requests
- Automatic network error detection
- Request deduplication by React Query

### 4. **Progressive Loading**
- Session storage loads instantly
- React Query cache serves from memory
- Fallback to API only when needed

## Migration Guide

### Before (Manual Fetch):
```typescript
// Old way - duplicated fetch logic
fetch("/api/generate-quiz", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(requestData),
})
  .then(res => res.json())
  .then(data => setQuizData(data))
  .catch(err => setError(err.message));
```

### After (Centralized API Service + React Query):
```typescript
// New way - clean and optimized
const { mutate: generateNewQuiz } = useGenerateQuiz();

generateNewQuiz(quizRequest, {
  onSuccess: (data) => setQuizData(data),
  onError: (error) => setError(error.message),
});
```

## Best Practices

### 1. **Always Use React Query Hooks**
- Use `useGenerateQuiz()` instead of calling `generateQuiz()` directly
- Use `useExamHistory()` instead of manual `examHistoryApi.getExamHistory()`
- This enables automatic caching and refetching

### 2. **Leverage Session Storage**
- Quiz data automatically cached between page reloads
- Answers auto-saved during quiz taking
- Results available immediately on results page

### 3. **Error Handling**
```typescript
const { mutate: generateQuiz, isError, error } = useGenerateQuiz();

if (isError) {
  setError(error?.message ?? 'Unknown error occurred');
}
```

### 4. **Loading States**
```typescript
const { mutate: generateQuiz, isPending } = useGenerateQuiz();

if (isPending) {
  return <LoadingSpinner />;
}
```

## API Endpoints

### Quiz
- `POST /api/generate-quiz` - Generate a quiz

### Contact
- `GET /api/contact` - Get all contacts
- `POST /api/contact` - Submit contact form

### Exam History
- `GET /api/exam-history?email=...` - Get exam history for user
- `GET /api/exam-history/:id` - Get specific exam result
- `DELETE /api/exam-history/:id` - Delete exam result

### User Stats
- `GET /api/exam-stats?email=...` - Get user statistics

## Error Handling

All API calls include consistent error handling:

```typescript
try {
  const data = await apiCall(endpoint);
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes("Network error")) {
      // Handle network error
    } else if (error.message.includes("API Error")) {
      // Handle API error
    }
  }
}
```

## Future Enhancements

- [ ] Add retry logic for failed requests
- [ ] Implement request interceptors for auth tokens
- [ ] Add request/response logging
- [ ] Implement rate limiting
- [ ] Add WebSocket support for real-time updates
- [ ] Implement service worker for offline support
