import { Suspense } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchExamHistory, fetchUserStats } from "@/lib/server-data";
import ExamHistoryServerContent from "./components/ExamHistoryServerContent";
import {
  InitialLoadingState
} from "@/features/exam-history/components";

/**
 * Server Component for Exam History Page
 * Fetches data server-side and passes to client components
 */
export default async function ExamHistoryPage() {
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

  // Fetch data server-side in parallel
  const [examHistoryData, userStats] = await Promise.all([
    fetchExamHistory(emailId),
    fetchUserStats(emailId)
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<InitialLoadingState />}>
          <ExamHistoryServerContent 
            examHistoryData={examHistoryData}
            userStats={userStats}
            userEmail={emailId}
          />
        </Suspense>
      </div>
    </div>
  );
}

// Add metadata for SEO
export const metadata = {
  title: 'Exam History - AWS Quiz Platform',
  description: 'View your exam history, performance analytics, and detailed results',
};