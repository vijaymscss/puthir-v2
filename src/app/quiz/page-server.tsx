import { Suspense } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchActiveQuiz } from "@/lib/server-data";
import QuizServerContent from "./components/QuizServerContent";
import { Card, CardContent } from "@/shared/components/ui/card";

/**
 * Server Component for Quiz Page
 * Handles server-side data fetching and authentication
 */
export default async function QuizPageServer() {
  // Check authentication server-side
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  // Get user data server-side
  const user = await currentUser();
  const emailId = user?.primaryEmailAddress?.emailAddress;
  
  if (!emailId) {
    redirect('/sign-in');
  }

  // Fetch active quiz data server-side
  const activeQuizData = await fetchActiveQuiz();

  // If no active quiz, redirect to quiz setup
  if (!activeQuizData) {
    redirect('/quiz-setup?message=no-active-quiz');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<QuizLoadingFallback />}>
          <QuizServerContent 
            quizData={activeQuizData}
            userEmail={emailId}
          />
        </Suspense>
      </div>
    </div>
  );
}

/**
 * Loading fallback component
 */
function QuizLoadingFallback() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Add metadata for SEO
export const metadata = {
  title: 'Active Quiz - AWS Quiz Platform',
  description: 'Take your AWS certification practice quiz',
};