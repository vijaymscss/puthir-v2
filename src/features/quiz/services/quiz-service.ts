export interface QuizRequest {
  examName: string;
  examLevel: string;
  quizType: string;
  selectedTopics: string[];
  questionCount: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  explanation: string;
  difficulty: string;
  topic: string;
}

export interface QuizData {
  questions: QuizQuestion[];
  examInfo: {
    name: string;
    type: string;
    totalQuestions: number;
  };
}

export interface ApiError {
  error: string;
  status?: number;
}

/**
 * Generates a quiz with the provided configuration using the centralized API service
 * @param request - Quiz generation request with exam name, level, type, topics, and count
 * @returns Promise<QuizData> - Generated quiz data with questions and exam info
 * @throws Error if the API call fails
 */
export const generateQuiz = async (request: QuizRequest): Promise<QuizData> => {
  try {
    console.log("🎯 generateQuiz called with request:", request);
    
    // Use the centralized API service
    const { quizApi } = await import('./api');
    const data = await quizApi.generateQuiz({
      examName: request.examName,
      examLevel: request.examLevel,
      quizType: request.quizType,
      selectedTopics: request.selectedTopics,
      questionCount: request.questionCount,
    });
    
    console.log("✅ API response received:", data);
    
    // Validate the response structure
    const typedData = data as QuizData;
    if (!typedData.questions || !Array.isArray(typedData.questions) || !typedData.examInfo) {
      console.error("❌ Invalid quiz data structure:", {
        hasQuestions: !!typedData.questions,
        isArray: Array.isArray(typedData.questions),
        hasExamInfo: !!typedData.examInfo,
        data: typedData
      });
      throw new Error("Invalid quiz data structure received from server");
    }

    console.log("✅ Quiz data validated, returning", typedData.questions.length, "questions");
    return typedData;
  } catch (error) {
    console.error("❌ Error in generateQuiz:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while generating the quiz");
  }
};