"use client";

import { useState } from "react";
import { ExamHistoryData } from "@/features/quiz/validations/quiz";
import ExamDetailsModal from "@/features/exam/components/ExamDetailsModal";
import {
  ExamHistoryHeader,
  PerformanceOverview,
  ExamTableRow,
  EmptyState,
} from "@/features/exam-history/components";

interface ExamHistoryServerContentProps {
  examHistoryData: ExamHistoryData[];
  userStats: any;
  userEmail: string;
}

/**
 * Client component that receives server-side fetched data
 * Handles interactive features while data comes from server
 */
export default function ExamHistoryServerContent({ 
  examHistoryData, 
  userStats, 
  userEmail 
}: ExamHistoryServerContentProps) {
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

  // Calculate performance stats from server data
  const totalExams = examHistoryData.length;
  const averageScore = totalExams > 0 
    ? Math.round(examHistoryData.reduce((sum, exam) => sum + exam.score, 0) / totalExams)
    : 0;
  const averagePercentage = totalExams > 0 
    ? Math.round(examHistoryData.reduce((sum, exam) => sum + exam.percentage, 0) / totalExams)
    : 0;
  const bestScore = totalExams > 0 
    ? Math.max(...examHistoryData.map(exam => exam.score))
    : 0;

  const performanceStats = {
    totalExams,
    averageScore,
    averagePercentage,
    bestScore,
  };

  return (
    <>
      {/* Header */}
      <ExamHistoryHeader totalExams={totalExams} />

      {/* Performance Overview */}
      <PerformanceOverview 
        examHistory={examHistoryData}
      />

      {/* Exam History Table or Empty State */}
      {totalExams === 0 ? (
        <EmptyState />
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600 font-medium text-sm text-slate-600 dark:text-slate-300">
            <div className="col-span-4">Exam Details</div>
            <div className="col-span-2 text-center">Score</div>
            <div className="col-span-2 text-center">Percentage</div>
            <div className="col-span-2 text-center">Date</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {examHistoryData.map((exam, index) => (
              <ExamTableRow
                key={exam.id}
                exam={exam}
                index={index}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      )}

      {/* Exam Details Modal */}
      {selectedExamId && (
        <ExamDetailsModal
          examId={selectedExamId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}