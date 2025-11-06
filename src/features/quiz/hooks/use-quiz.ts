import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateQuiz, QuizRequest, QuizData } from "@/features/quiz/services/quiz-service";
import { QuizResult, ExamHistoryData } from '@/features/quiz/validations/quiz';
import { 
  storeQuizResultAction, 
  getExamHistoryAction, 
  getExamResultByIdAction,
  deleteExamResultAction 
} from '@/lib/actions';
import { ApiResponse } from '@/shared/types/api';

export const useGenerateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation<QuizData, Error, QuizRequest>({
    mutationFn: (variables) => {
      return generateQuiz(variables);
    },
    onSuccess: (data, variables) => {
      
      // Cache the quiz data with a specific key
      const queryKey = ['quiz', variables.examName, variables.quizType, variables.questionCount];
      queryClient.setQueryData(queryKey, data);
    },
    onError: (error) => {
      console.error("❌ MUTATION ERROR - Quiz generation failed:", error);
    },
  });
};

// Helper hook to get cached quiz data
export const useQuizData = (request?: QuizRequest) => {
  const queryClient = useQueryClient();
  
  if (!request) return null;
  
  const queryKey = ['quiz', request.examName, request.quizType, request.questionCount];
  return queryClient.getQueryData<QuizData>(queryKey);
};

// Query Keys for exam history
export const examHistoryKeys = {
  all: ['examHistory'] as const,
  lists: () => [...examHistoryKeys.all, 'list'] as const,
  list: (emailId?: string) => [...examHistoryKeys.lists(), { emailId }] as const,
  details: () => [...examHistoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...examHistoryKeys.details(), id] as const,
}

// Hook for storing quiz results
export function useStoreQuizResult() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: QuizResult) => storeQuizResultAction(data),
    onSuccess: (result, variables) => {
      if (result.success) {
        // Invalidate and refetch exam history queries
        queryClient.invalidateQueries({ queryKey: examHistoryKeys.all })
        
        // Optimistically update the exam history list
        queryClient.setQueryData(
          examHistoryKeys.list(variables.emailId),
          (oldData: ApiResponse<ExamHistoryData[]> | undefined) => {
            if (oldData?.success && oldData.data && result.data) {
              return {
                ...oldData,
                data: [result.data, ...oldData.data]
              }
            }
            return oldData
          }
        )
      }
    },
    onError: (error) => {
      console.error('Error storing quiz result:', error)
    },
  })
}

// Hook for fetching exam history
export function useExamHistory(emailId?: string) {
  return useQuery({
    queryKey: examHistoryKeys.list(emailId),
    queryFn: () => getExamHistoryAction(emailId),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Hook for fetching a specific exam result
export function useExamResult(id: string) {
  return useQuery({
    queryKey: examHistoryKeys.detail(id),
    queryFn: () => getExamResultByIdAction(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: !!id, // Only run query if id is provided
  })
}

// Combined hook for quiz submission workflow
export function useQuizSubmission() {
  const storeResult = useStoreQuizResult()

  const submitQuizResult = async (quizData: QuizResult) => {
    try {
      const result = await storeResult.mutateAsync(quizData)
      return result
    } catch (error) {
      throw error
    }
  }

  return {
    submitQuizResult,
    isLoading: storeResult.isPending,
    isSuccess: storeResult.isSuccess,
    isError: storeResult.isError,
    error: storeResult.error,
    data: storeResult.data,
    reset: storeResult.reset,
  }
}