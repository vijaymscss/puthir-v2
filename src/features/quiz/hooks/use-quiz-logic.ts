import { useRouter } from 'next/navigation';
import { useQuizSubmission } from './use-quiz';
import { QuizData, QuizQuestion } from '@/features/quiz/services/quiz-service';
import { QuizResult, QuestionResult } from '@/features/quiz/validations/quiz';

/**
 * Custom hook to manage quiz logic
 * Handles: answer selection, navigation, submission, score calculation
 */
export const useQuizLogic = () => {
  const router = useRouter();
  const { submitQuizResult, isLoading: isSavingResults } = useQuizSubmission();

  /**
   * Check if answer is correct
   */
  const isAnswerCorrect = (
    userAnswers: number[],
    correctAnswer: number | number[],
  ): boolean => {
    if (typeof correctAnswer === 'number') {
      return userAnswers.length === 1 && userAnswers[0] === correctAnswer;
    }

    const sortedUserAnswers = [...userAnswers].sort();
    const sortedCorrectAnswers = [...correctAnswer].sort();

    return (
      sortedUserAnswers.length === sortedCorrectAnswers.length &&
      sortedUserAnswers.every((answer, idx) => answer === sortedCorrectAnswers[idx])
    );
  };

  /**
   * Handle answer selection based on question type
   */
  const handleAnswerSelect = (
    optionIndex: number,
    currentQuestion: number,
    question: QuizQuestion,
    selectedAnswers: { [key: number]: number[] },
    setSelectedAnswers: (answers: { [key: number]: number[] }) => void,
  ) => {
    const currentAnswers = selectedAnswers[currentQuestion] || [];
    const isMultipleChoice = typeof question.correctAnswer === 'number';

    if (isMultipleChoice) {
      // Single answer - replace previous selection
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: [optionIndex],
      });
    } else {
      // Multiple answers - toggle selection
      const newAnswers = currentAnswers.includes(optionIndex)
        ? currentAnswers.filter((idx) => idx !== optionIndex)
        : [...currentAnswers, optionIndex];

      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: newAnswers,
      });
    }
  };

  /**
   * Navigate to next question
   */
  const goToNext = (
    currentQuestion: number,
    totalQuestions: number,
    setCurrentQuestion: (q: number) => void,
  ) => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  /**
   * Navigate to previous question
   */
  const goToPrevious = (
    currentQuestion: number,
    setCurrentQuestion: (q: number) => void,
  ) => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  /**
   * Jump to specific question
   */
  const jumpToQuestion = (
    questionIndex: number,
    setCurrentQuestion: (q: number) => void,
  ) => {
    setCurrentQuestion(questionIndex);
  };

  /**
   * Check if all questions are answered
   */
  const areAllQuestionsAnswered = (
    selectedAnswers: { [key: number]: number[] },
    totalQuestions: number,
  ): boolean => {
    for (let i = 0; i < totalQuestions; i++) {
      const userAnswers = selectedAnswers[i] || [];
      if (userAnswers.length === 0) {
        return false;
      }
    }
    return true;
  };

  /**
   * Calculate quiz score and prepare results
   */
  const calculateResults = (
    quizData: QuizData,
    selectedAnswers: { [key: number]: number[] },
    quizStartTime: string,
  ) => {
    const endTime = new Date().toISOString();
    let correctCount = 0;
    const questionResults: QuestionResult[] = [];

    quizData.questions.forEach((question: QuizQuestion, index: number) => {
      const userAnswers = selectedAnswers[index] || [];
      const correctAnswer = question.correctAnswer;
      const isCorrect = isAnswerCorrect(userAnswers, correctAnswer);

      if (isCorrect) correctCount++;

      questionResults.push({
        questionId: `q${index + 1}`,
        questionText: question.question,
        userAnswer: userAnswers.map((idx) => question.options[idx]).join(', '),
        correctAnswer: Array.isArray(correctAnswer)
          ? correctAnswer.map((idx) => question.options[idx]).join(', ')
          : question.options[correctAnswer],
        isCorrect,
        explanation: question.explanation || '',
        options: question.options,
      });
    });

    const percentage = Math.round(
      (correctCount / quizData.questions.length) * 100,
    );

    const timeSpentSeconds = Math.round(
      (new Date(endTime).getTime() - new Date(quizStartTime).getTime()) / 1000,
    );

    return {
      correctCount,
      percentage,
      timeSpentSeconds,
      questionResults,
      endTime,
    };
  };

  /**
   * Prepare quiz result for database
   */
  const prepareQuizResult = (
    quizData: QuizData,
    userEmail: string,
    correctCount: number,
    percentage: number,
    timeSpentSeconds: number,
    questionResults: QuestionResult[],
    quizStartTime: string,
    endTime: string,
  ): QuizResult => {
    return {
      testId: `quiz-${Date.now()}`,
      certificateName: quizData.examInfo.name,
      certificateProvider: 'AWS',
      certificateCode: quizData.examInfo.type.toUpperCase(),
      emailId: userEmail,
      score: correctCount,
      totalQuestions: quizData.questions.length,
      percentage,
      timeSpent: timeSpentSeconds,
      questions: questionResults,
      startTime: quizStartTime,
      endTime,
      quizSettings: {
        timeLimit: undefined,
        shuffleQuestions: false,
        showCorrectAnswers: true,
      },
    };
  };

  /**
   * Prepare results for results page
   */
  const prepareResultsPageData = (
    quizData: QuizData,
    selectedAnswers: { [key: number]: number[] },
    correctCount: number,
  ) => {
    return {
      score: correctCount,
      totalQuestions: quizData.questions.length,
      examName: quizData.examInfo.name,
      examType: quizData.examInfo.type,
      questions: quizData.questions.map((question, index) => {
        const userAnswers = selectedAnswers[index] || [];
        const correctAnswers = Array.isArray(question.correctAnswer)
          ? question.correctAnswer
          : [question.correctAnswer];
        return {
          question: question.question,
          options: question.options,
          userAnswers,
          correctAnswers,
          explanation: question.explanation,
          difficulty: question.difficulty,
          topic: question.topic,
          isCorrect:
            userAnswers.length === correctAnswers.length &&
            userAnswers.every((idx) => correctAnswers.includes(idx)),
        };
      }),
    };
  };

  /**
   * Submit quiz and redirect to results
   */
  const submitQuiz = async (
    quizData: QuizData,
    selectedAnswers: { [key: number]: number[] },
    quizStartTime: string,
    userEmail: string,
    examId: string,
    quizType: string,
    encodedTopics: string | null,
  ) => {
    // Calculate results
    const results = calculateResults(quizData, selectedAnswers, quizStartTime);

    // Prepare quiz result for database
    const quizResultData = prepareQuizResult(
      quizData,
      userEmail,
      results.correctCount,
      results.percentage,
      results.timeSpentSeconds,
      results.questionResults,
      quizStartTime,
      results.endTime,
    );

    try {
      // Store quiz results in database
      const result = await submitQuizResult(quizResultData);

      if (result.success) {
        console.log('Quiz results saved successfully:', result.data);

        // Clear quiz session
        const sessionKey = `quiz_${examId}_${quizType}${encodedTopics ? `_${encodedTopics}` : ''}`;
        sessionStorage.removeItem(sessionKey);
        sessionStorage.removeItem(`${sessionKey}_answers`);

        // Prepare and store results for results page
        const resultsPageData = prepareResultsPageData(
          quizData,
          selectedAnswers,
          results.correctCount,
        );

        sessionStorage.setItem('quiz_results', JSON.stringify(resultsPageData));
        router.push('/quiz/results');
      } else {
        console.error('Failed to save quiz results:', result.error);
        throw new Error(result.error || 'Failed to save quiz results');
      }
    } catch (error) {
      console.error('Error saving quiz results:', error);
      throw error;
    }
  };

  /**
   * Calculate progress percentage
   */
  const calculateProgress = (
    selectedAnswers: { [key: number]: number[] },
    totalQuestions: number,
  ): number => {
    const answeredCount = Object.keys(selectedAnswers).filter((key) => {
      const answers = selectedAnswers[parseInt(key)] || [];
      return answers.length > 0;
    }).length;

    return (answeredCount / totalQuestions) * 100;
  };

  /**
   * Get answered questions count
   */
  const getAnsweredCount = (selectedAnswers: { [key: number]: number[] }): number => {
    return Object.keys(selectedAnswers).filter((key) => {
      const answers = selectedAnswers[parseInt(key)] || [];
      return answers.length > 0;
    }).length;
  };

  return {
    handleAnswerSelect,
    goToNext,
    goToPrevious,
    jumpToQuestion,
    areAllQuestionsAnswered,
    calculateResults,
    prepareQuizResult,
    prepareResultsPageData,
    submitQuiz,
    calculateProgress,
    getAnsweredCount,
    isAnswerCorrect,
    isSavingResults,
  };
};
