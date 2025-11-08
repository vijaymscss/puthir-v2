import { useState, useRef } from 'react';
import { QuizData, QuizRequest } from '@/features/quiz/services/quiz-service';
import { useGenerateQuiz } from './use-quiz';

/**
 * Custom hook to manage quiz state
 * Handles: quiz data, loading, errors, current question, selected answers
 */
export const useQuizState = (examId: string | null, quizType: string | null, encodedTopics: string | null) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number[] }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [quizStartTime] = useState(new Date().toISOString());
  
  const hasMadeCall = useRef(false);
  const { mutate: generateNewQuiz, isPending: isGenerating } = useGenerateQuiz();

  /**
   * Get session storage key for quiz data
   */
  const getSessionKey = () => {
    return `quiz_${examId}_${quizType}${encodedTopics ? `_${encodedTopics}` : ''}`;
  };

  /**
   * Get session storage key for answers
   */
  const getAnswersSessionKey = () => {
    return `${getSessionKey()}_answers`;
  };

  /**
   * Load quiz from session storage or API
   */
  const loadQuiz = (quizRequest: QuizRequest, forceRefresh: boolean = false) => {
    console.log("🔄 loadQuiz called with:", { examId, quizType, forceRefresh, quizRequest });
    
    if (!examId || !quizType) {
      console.log("❌ Missing examId or quizType");
      return;
    }

    if (forceRefresh) {
      hasMadeCall.current = false;
    }

    if (hasMadeCall.current) {
      console.log("⏭️ Skipping loadQuiz - already made call");
      return;
    }

    hasMadeCall.current = true;
    const sessionKey = getSessionKey();
    console.log("🔑 Session key:", sessionKey);
    
    const cachedQuizData = !forceRefresh ? sessionStorage.getItem(sessionKey) : null;

    if (cachedQuizData) {
      // Load from session storage
      console.log("📦 Loading from session storage");
      try {
        const data = JSON.parse(cachedQuizData);
        console.log("✅ Loaded quiz data from cache:", data);
        setQuizData(data);

        // Restore answered questions if they exist
        const cachedAnswers = sessionStorage.getItem(getAnswersSessionKey());
        if (cachedAnswers) {
          try {
            const answers = JSON.parse(cachedAnswers);
            console.log("✅ Restored answers from cache:", answers);
            setSelectedAnswers(answers);
          } catch {
            console.error('Error parsing cached answers');
          }
        }

        setLoading(false);
        return;
      } catch {
        console.error('Error parsing cached quiz data');
      }
    }

    // Fetch new questions
    console.log("🌐 Fetching new quiz from API");
    setLoading(true);
    setError(null);

    generateNewQuiz(quizRequest, {
      onSuccess: (data: QuizData) => {
        console.log("🎊 [Quiz State] onSuccess callback received data:", data);
        console.log("📋 [Quiz State] Quiz data structure:", {
          questionsCount: data?.questions?.length,
          examInfo: data?.examInfo?.name,
          hasQuestions: Array.isArray(data?.questions)
        });
        
        sessionStorage.setItem(sessionKey, JSON.stringify(data));
        setQuizData(data);
        setLoading(false);
        
        console.log("🔄 [Quiz State] State updated: loading=false, quizData set");
      },
      onError: (error: Error) => {
        console.error("❌ [Quiz State] onError callback triggered:", error);
        setError(error.message);
        setLoading(false);
        
        console.log("🔄 [Quiz State] Error state updated: loading=false, error set");
      },
    });
  };

  /**
   * Save answers to session storage
   */
  const saveAnswers = () => {
    if (Object.keys(selectedAnswers).length > 0) {
      sessionStorage.setItem(getAnswersSessionKey(), JSON.stringify(selectedAnswers));
    }
  };

  /**
   * Clear quiz from session storage
   */
  const clearQuizSession = () => {
    sessionStorage.removeItem(getSessionKey());
    sessionStorage.removeItem(getAnswersSessionKey());
  };

  /**
   * Reset quiz state
   */
  const resetQuiz = () => {
    hasMadeCall.current = false;
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizData(null);
    setError(null);
  };

  return {
    // State
    currentQuestion,
    selectedAnswers,
    loading,
    error,
    quizData,
    quizStartTime,
    isGenerating,

    // Setters
    setCurrentQuestion,
    setSelectedAnswers,
    setError,

    // Methods
    loadQuiz,
    saveAnswers,
    clearQuizSession,
    resetQuiz,
    getSessionKey,
    getAnswersSessionKey,
  };
};
