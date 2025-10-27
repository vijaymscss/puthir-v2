'use client';

interface QuizHeaderProps {
  examName: string;
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  answeredCount: number;
}

/**
 * Displays quiz header with exam name, progress bar, and answer counter
 * Shows which question user is on and overall progress
 */
export function QuizHeader({
  examName,
  currentQuestion,
  totalQuestions,
  progress,
  answeredCount,
}: QuizHeaderProps) {
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-foreground">{examName}</h1>
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Answer Progress Indicator */}
      <div className="flex items-center justify-between mt-2 text-sm">
        <div className="text-muted-foreground">
          Progress: {answeredCount} of {totalQuestions} questions answered
        </div>
        {unansweredCount > 0 && (
          <div className="text-orange-600 font-medium">
            {unansweredCount} questions remaining
          </div>
        )}
      </div>
    </div>
  );
}
