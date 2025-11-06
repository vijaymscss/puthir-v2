'use client';

import { Button } from '@/shared/components/ui/button';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  hasSelectedAnswer: boolean;
  allQuestionsAnswered: boolean;
  isSaving: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

/**
 * Displays navigation buttons for quiz (Previous/Next/Submit)
 * Handles button states based on quiz progress
 */
export function QuizNavigation({
  currentQuestion,
  totalQuestions,
  hasSelectedAnswer,
  allQuestionsAnswered,
  isSaving,
  onPrevious,
  onNext,
  onSubmit,
}: QuizNavigationProps) {
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div className="flex justify-between items-center">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstQuestion}
      >
        ← Previous
      </Button>

      <div className="flex gap-4">
        {isLastQuestion ? (
          <div className="flex flex-col items-center">
            <Button
              onClick={onSubmit}
              className="bg-green-600 hover:bg-green-700"
              disabled={!allQuestionsAnswered || isSaving}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Saving Results...
                </>
              ) : (
                'Submit Quiz'
              )}
            </Button>
            {!allQuestionsAnswered && (
              <p className="text-xs text-orange-600 mt-1 text-center">
                Answer all questions to submit
              </p>
            )}
          </div>
        ) : (
          <Button onClick={onNext} disabled={!hasSelectedAnswer}>
            Next →
          </Button>
        )}
      </div>
    </div>
  );
}
