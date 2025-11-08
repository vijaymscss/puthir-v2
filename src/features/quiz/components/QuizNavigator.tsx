'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: Set<number>;
  onQuestionSelect: (index: number) => void;
}

/**
 * Displays a grid of question buttons for navigation
 * Shows answered/unanswered/current status with color coding
 */
export function QuestionNavigator({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onQuestionSelect,
}: QuestionNavigatorProps) {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="text-lg">Questions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Click any question to navigate
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2 mb-6">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            const isAnswered = answeredQuestions.has(index);
            const isCurrent = index === currentQuestion;

            return (
              <button
                key={index}
                onClick={() => onQuestionSelect(index)}
                className={`
                  w-9 h-9 rounded-lg border-2 text-xs font-medium transition-all duration-200
                  ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-500 text-white shadow-lg'
                      : isAnswered
                        ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900'
                        : 'border-gray-300 dark:border-gray-600 bg-card hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950'
                  }
                `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-50 dark:bg-green-950 border border-green-500 rounded"></div>
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-card border border-gray-300 dark:border-gray-600 rounded"></div>
            <span>Unanswered</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
