"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { getDemoQuestions, DemoQuestion } from "@/features/free-test/constants/demoQuestions";

function FreeTestQuizContent() {
  const searchParams = useSearchParams();
  
  const platform = searchParams.get("platform");
  const exam = searchParams.get("exam");
  const quizType = searchParams.get("type");
  const encodedTopics = searchParams.get("topics");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<DemoQuestion[]>([]);

  useEffect(() => {
    if (platform && exam) {
      // Decode selected topics if available
      let selectedTopics: string[] | undefined = undefined;
      if (quizType === "custom" && encodedTopics) {
        try {
          const decodedTopics = atob(encodedTopics);
          selectedTopics = JSON.parse(decodedTopics);
        } catch (error) {
          console.error("Error decoding topics:", error);
        }
      }

      // Get questions with optional topic filtering
      const demoQuestions = getDemoQuestions(platform, exam, selectedTopics);
      setQuestions(demoQuestions);
    }
  }, [platform, exam, quizType, encodedTopics]);

  if (!platform || !exam || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            No questions available
          </h2>
          <Link href="/free-test">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600">
              Back to Setup
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = (answeredCount / questions.length) * 100;

  const handleAnswerSelect = (optionIndex: number) => {
    if (!showResults) {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestion]: optionIndex
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (answeredCount === questions.length) {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: (correct / questions.length) * 100 };
  };

  const score = showResults ? calculateScore() : null;

  // Difficulty color mapping
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  if (showResults) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              <span className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 bg-clip-text text-transparent">
                Demo Test Results
              </span>
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">
                  {score?.percentage.toFixed(0)}%
                </div>
                <p className="text-slate-600 dark:text-slate-400">Score</p>
              </div>
              <div className="text-center border-l-2 border-slate-300 dark:border-slate-700 pl-4">
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                  {score?.correct} / {score?.total}
                </div>
                <p className="text-slate-600 dark:text-slate-400">Correct</p>
              </div>
            </div>
          </div>

          {/* Question Review */}
          <div className="space-y-4 mb-8">
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div key={q.id} className="bg-white dark:bg-slate-800 rounded-lg p-6 border shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                          Question {index + 1}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(q.difficulty)}`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
                        {q.question}
                      </h3>
                    </div>
                    <div className={`flex-shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center ${
                      isCorrect 
                        ? 'bg-green-100 dark:bg-green-900/30' 
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {isCorrect ? (
                        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {q.options.map((option: string, optIndex: number) => {
                      const isUserAnswer = userAnswer === optIndex;
                      const isCorrectAnswer = q.correctAnswer === optIndex;
                      
                      let bgColor = 'bg-slate-50 dark:bg-slate-700/50';
                      if (isCorrectAnswer) {
                        bgColor = 'bg-green-100 dark:bg-green-900/30 border-green-500';
                      } else if (isUserAnswer && !isCorrect) {
                        bgColor = 'bg-red-100 dark:bg-red-900/30 border-red-500';
                      }
                      
                      return (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg border-2 ${bgColor} ${
                            isCorrectAnswer || (isUserAnswer && !isCorrect) ? '' : 'border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isCorrectAnswer && (
                              <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            {isUserAnswer && !isCorrect && (
                              <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                            <span className={`text-sm ${
                              isCorrectAnswer ? 'text-green-900 dark:text-green-100 font-semibold' :
                              isUserAnswer && !isCorrect ? 'text-red-900 dark:text-red-100' :
                              'text-slate-700 dark:text-slate-300'
                            }`}>
                              {option}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
                      📚 Explanation:
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleRestart}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </Button>
            <Link href="/free-test">
              <Button variant="outline" size="lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Try Another Test
              </Button>
            </Link>
            <Link href="/quiz-setup">
              <Button variant="outline" size="lg" className="border-emerald-300 hover:bg-emerald-50 dark:border-emerald-700 dark:hover:bg-emerald-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Full Quiz
              </Button>
            </Link>
          </div>

          {/* Upgrade CTA */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold text-center mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ready for Unlimited Practice?
            </h3>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-4">
              Sign up to access AI-generated questions, full-length practice exams, progress tracking, and more!
            </p>
            <div className="flex justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/free-test" 
            className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 mb-4 transition-all duration-200 hover:gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Setup
          </Link>

          {/* Progress Bar */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Progress: {answeredCount} / {questions.length} answered
              </span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {progress.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty}
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
              {question.category}
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option: string, index: number) => {
              const isSelected = selectedAnswer === index;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${
                      isSelected 
                        ? 'text-emerald-900 dark:text-emerald-100 font-semibold' 
                        : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            size="lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>

          {currentQuestion === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={answeredCount !== questions.length}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              Submit Test
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Question Navigator
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((_, index) => {
              const isAnswered = selectedAnswers.hasOwnProperty(index);
              const isCurrent = index === currentQuestion;
              
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                    isCurrent
                      ? 'bg-emerald-500 text-white shadow-lg scale-110'
                      : isAnswered
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function FreeTestQuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading quiz...</p>
        </div>
      </div>
    }>
      <FreeTestQuizContent />
    </Suspense>
  );
}
