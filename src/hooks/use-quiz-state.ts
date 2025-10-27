import { useState, useRef } from 'react';
import { QuizData, QuizRequest } from '@/lib/services/quiz-service';
import { useGenerateQuiz } from '@/hooks/use-quiz';

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
    if (!examId || !quizType) return;

    if (forceRefresh) {
      hasMadeCall.current = false;
    }

    if (hasMadeCall.current) return;

    hasMadeCall.current = true;
    const sessionKey = getSessionKey();
    const cachedQuizData = !forceRefresh ? sessionStorage.getItem(sessionKey) : null;

    if (cachedQuizData) {
      // Load from session storage
      try {
        const data = JSON.parse(cachedQuizData);
        setQuizData(data);

        // Restore answered questions if they exist
        const cachedAnswers = sessionStorage.getItem(getAnswersSessionKey());
        if (cachedAnswers) {
          try {
            const answers = JSON.parse(cachedAnswers);
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
    setLoading(true);
    setError(null);

    generateNewQuiz(quizRequest, {
      onSuccess: (data: QuizData) => {
        sessionStorage.setItem(sessionKey, JSON.stringify(data));
        setQuizData(data);
        setLoading(false);
      },
      onError: (error: Error) => {
        setError(error.message);
        setLoading(false);
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
