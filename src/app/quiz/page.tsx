"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { examTopics } from "@/features/exam/constants/examTopics";
import { useUser } from "@clerk/nextjs";

import { QuizRequest } from "@/features/quiz/services/quiz-service";
import { useQuizState } from "@/features/quiz/hooks/use-quiz-state";
import { useQuizLogic } from "@/features/quiz/hooks/use-quiz-logic";

import { QuizLoader } from "@/features/quiz/components/QuizLoader";
import { QuizHeader } from "@/features/quiz/components/QuizHeader";
import { QuestionCard } from "@/features/quiz/components/QuestionCard";
import { QuizNavigation } from "@/features/quiz/components/QuizNavigation";
import { QuestionNavigator } from "@/features/quiz/components/QuizNavigator";

function QuizContent() {
  const { user } = useUser();
  const searchParams = useSearchParams();

  const examId = searchParams.get("exam");
  const quizType = searchParams.get("type");
  const encodedTopics = searchParams.get("topics");

  // Get exam data from constants
  const examData = (() => {
    if (!examId) return null;
    for (const topic of examTopics) {
      const exam = topic.examTypes.find((exam) => exam.id === examId);
      if (exam) {
        return { exam, provider: topic };
      }
    }
    return null;
  })();

  // Decode selected topics
  let selectedTopics: string[] = [];
  if (encodedTopics) {
    try {
      const decodedTopics = atob(encodedTopics);
      selectedTopics = JSON.parse(decodedTopics);
    } catch {
      // Silently ignore decode errors
    }
  }

  // Build quiz request
  const quizRequest: QuizRequest | null = examData
    ? {
        examName: examData.exam.name,
        examLevel: examData.exam.level,
        quizType: quizType || "complete",
        selectedTopics:
          quizType === "custom"
            ? selectedTopics
            : examData.exam.categories,
        questionCount: 10,
      }
    : null;

  // Use state and logic hooks
  const {
    currentQuestion,
    selectedAnswers,
    loading,
    error,
    quizData,
    quizStartTime,
    isGenerating,
    setCurrentQuestion,
    setSelectedAnswers,
    setError,
    loadQuiz,
    saveAnswers,
  } = useQuizState(examId, quizType, encodedTopics);

  const {
    handleAnswerSelect: handleSelectAnswer,
    goToNext,
    goToPrevious,
    jumpToQuestion,
    areAllQuestionsAnswered,
    calculateProgress,
    getAnsweredCount,
    submitQuiz,
    isSavingResults,
  } = useQuizLogic();

  // Initialize quiz on mount
  useEffect(() => {
    if (examData && quizRequest) {
      loadQuiz(quizRequest);
    }
  }, [examId, quizType, encodedTopics, examData, quizRequest, loadQuiz]);

  // Auto-save answers to session storage
  useEffect(() => {
    if (Object.keys(selectedAnswers).length > 0) {
      saveAnswers();
    }
  }, [selectedAnswers, saveAnswers]);

  // Handle loading states - check both local loading and mutation pending
  if (loading || isGenerating) {
    return <QuizLoader state="loading" />;
  }

  if (error) {
    return (
      <QuizLoader
        state="error"
        error={error}
        onRetry={() => {
          setError(null);
          loadQuiz(quizRequest!);
        }}
      />
    );
  }

  const questions = quizData?.questions;

  if (!questions || questions.length === 0) {
    return <QuizLoader state="empty" />;
  }

  // Prepare data for rendering
  const question = questions[currentQuestion];
  const userAnswers = selectedAnswers[currentQuestion] || [];
  const isMultipleChoice = typeof question.correctAnswer === "number";
  const answeredCount = getAnsweredCount(selectedAnswers);
  const progress = calculateProgress(selectedAnswers, questions.length);
  const answeredQuestionsSet = new Set(
    Object.keys(selectedAnswers)
      .filter((key) => (selectedAnswers[parseInt(key)] || []).length > 0)
      .map(Number)
  );

  // Handle answer selection
  const handleAnswerClick = (optionIndex: number) => {
    handleSelectAnswer(
      optionIndex,
      currentQuestion,
      question,
      selectedAnswers,
      setSelectedAnswers
    );
  };

  // Handle navigation
  const handlePreviousClick = () => {
    goToPrevious(currentQuestion, setCurrentQuestion);
  };

  const handleNextClick = () => {
    goToNext(currentQuestion, questions.length, setCurrentQuestion);
  };

  const handleQuestionClick = (index: number) => {
    jumpToQuestion(index, setCurrentQuestion);
  };

  // Handle quiz submission
  const handleSubmitClick = async () => {
    if (!quizData || !user?.primaryEmailAddress?.emailAddress) return;

    if (!areAllQuestionsAnswered(selectedAnswers, questions.length)) {
      alert("Please answer all questions before submitting the quiz.");
      return;
    }

    try {
      await submitQuiz(
        quizData,
        selectedAnswers,
        quizStartTime,
        user.primaryEmailAddress.emailAddress,
        examId!,
        quizType!,
        encodedTopics
      );
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Error submitting quiz. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuizHeader
          examName={quizData.examInfo.name}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          progress={progress}
          answeredCount={answeredCount}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Content - Left Side */}
          <div className="lg:col-span-3">
            <QuestionCard
              question={question}
              questionNumber={currentQuestion}
              selectedAnswers={userAnswers}
              isMultipleChoice={isMultipleChoice}
              onAnswerSelect={handleAnswerClick}
            />

            <QuizNavigation
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              hasSelectedAnswer={userAnswers.length > 0}
              allQuestionsAnswered={areAllQuestionsAnswered(
                selectedAnswers,
                questions.length
              )}
              isSaving={isSavingResults}
              onPrevious={handlePreviousClick}
              onNext={handleNextClick}
              onSubmit={handleSubmitClick}
            />
          </div>

          {/* Question Navigator - Right Side */}
          <div className="lg:col-span-1">
            <QuestionNavigator
              totalQuestions={questions.length}
              currentQuestion={currentQuestion}
              answeredQuestions={answeredQuestionsSet}
              onQuestionSelect={handleQuestionClick}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </main>
    }>
      <QuizContent />
    </Suspense>
  );
}