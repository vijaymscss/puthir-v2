import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

interface ExamHistoryHeaderProps {
  totalExams: number;
}

export function ExamHistoryHeader({ totalExams }: ExamHistoryHeaderProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-slate-300 dark:hover:text-slate-100 mb-4 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                  <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">
                    Exam History
                  </h1>
                  <p className="text-gray-600 dark:text-slate-300 text-base">
                    Monitor your progress and performance across all exams
                  </p>
                </div>
              </div>
            </div>
            
            {totalExams > 0 && (
              <div className="mt-4 lg:mt-0 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800/50 px-3 py-2 rounded-lg border dark:border-slate-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-slate-200 font-medium">
                    {totalExams} Total Exams
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
