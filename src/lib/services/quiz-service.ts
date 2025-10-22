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

export const generateQuiz = async (request: QuizRequest): Promise<QuizData> => {
  const response = await fetch("/api/generate-quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Failed to generate quiz: ${response.status}`;
    
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error || errorMessage;
    } catch {
      errorMessage = errorText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
};