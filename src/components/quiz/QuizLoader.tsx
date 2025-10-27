'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export interface QuizLoaderProps {
  state: 'loading' | 'error' | 'empty';
  error?: string;
  onRetry?: () => void;
}

/**
 * Displays loading, error, and empty states for quiz
 * Used during initial quiz generation and error handling
 */
export function QuizLoader({ state, error, onRetry }: QuizLoaderProps) {
  if (state === 'loading') {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Generating Your Quiz
          </h2>
          <p className="text-muted-foreground">
            Creating personalized questions using AI...
          </p>
        </div>
      </main>
    );
  }

  if (state === 'error') {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Error Generating Quiz
          </h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="space-x-4">
            <Button onClick={onRetry}>Try Again</Button>
            <Link href="/quiz-setup">
              <Button variant="outline">Back to Setup</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (state === 'empty') {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            No Quiz Data
          </h2>
          <p className="text-muted-foreground">
            Unable to load quiz questions.
          </p>
        </div>
      </main>
    );
  }

  return null;
}
