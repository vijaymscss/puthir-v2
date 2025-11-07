'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { QuizQuestion } from '@/lib/services/quiz-service';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  selectedAnswers: number[];
  isMultipleChoice: boolean;
  onAnswerSelect: (optionIndex: number) => void;
}

/**
 * Displays a single quiz question with options
 * Handles both multiple-choice (radio) and multiple-response (checkbox) questions
 */
export function QuestionCard({
  question,
  questionNumber,
  selectedAnswers,
  isMultipleChoice,
  onAnswerSelect,
}: QuestionCardProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{question.question}</CardTitle>
          <div className="flex gap-2 text-xs">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
              {question.difficulty}
            </span>
          </div>
        </div>
        {!isMultipleChoice && (
          <p className="text-sm text-muted-foreground">
            Select all correct answers
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {question.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswers.includes(index)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-card hover:bg-blue-50 dark:hover:bg-blue-950'
              }`}
            >
              <div className="flex items-center gap-3">
                {isMultipleChoice ? (
                  /* Radio button style - circle */
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers.includes(index)
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400'
                    }`}
                  >
                    {selectedAnswers.includes(index) && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                ) : (
                  /* Checkbox style - square */
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      selectedAnswers.includes(index)
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400'
                    }`}
                  >
                    {selectedAnswers.includes(index) && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                )}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {option.match(/^[A-D]\.\s*/) ? '' : `${String.fromCharCode(65 + index)}. `}
                </span>
                <span>{option.replace(/^[A-D]\.\s*/, '')}</span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
