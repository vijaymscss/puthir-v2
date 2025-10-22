import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateQuiz, QuizRequest, QuizData } from "@/lib/services/quiz-service";

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