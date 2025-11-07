"use client";

import { useUser } from "@clerk/nextjs";
import { useExamHistory } from "@/features/quiz/hooks/use-quiz";
import ExamDetailsModal from "@/features/exam/components/ExamDetailsModal";
import { useState } from "react";
import {
  ExamHistoryHeader,
  PerformanceOverview,
  ExamTableRow,
  EmptyState,
  LoadingState,
  AuthRequiredState,
  ErrorState,
  InitialLoadingState
} from "@/features/exam-history/components";

export default function ExamHistoryPage() {
  const { user, isLoaded } = useUser();
  const { data: examHistoryData, isLoading, error } = useExamHistory(
    user?.primaryEmailAddress?.emailAddress
  );
  
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (examId: string) => {
    setSelectedExamId(examId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExamId(null);
  };

  if (!isLoaded) {
    return <InitialLoadingState />;
  }

  if (!user) {
    return <AuthRequiredState />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !examHistoryData?.success) {
    return <ErrorState error={examHistoryData?.error} />;
  }

  const examHistory = examHistoryData.data || [];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <ExamHistoryHeader totalExams={examHistory.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PerformanceOverview examHistory={examHistory} />

        {examHistory.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Exam Results
              </h2>
            </div>
            
            <div className="bg-white dark:bg-slate-900/30 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
              {/* Table Header - Hidden on Mobile */}
              <div className="hidden lg:grid lg:grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-slate-950/50 border-b border-gray-200 dark:border-slate-800 text-sm font-medium text-gray-600 dark:text-slate-300">
                <div className="col-span-4">Exam Details</div>
                <div className="col-span-2 text-center">Score</div>
                <div className="col-span-2 text-center">Percentage</div>
                <div className="col-span-2 text-center">Date</div>
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-1 text-center">Actions</div>
              </div>

              {/* Exam Rows */}
              <div className="divide-y divide-gray-100 dark:divide-slate-800">
                {examHistory.map((exam, index) => (
                  <ExamTableRow
                    key={exam.id}
                    exam={exam}
                    index={index}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        
        {selectedExamId && (
          <ExamDetailsModal
            examId={selectedExamId}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </main>
  );
}