import { Trophy, Target, Calendar, Clock } from "lucide-react";

interface ExamHistoryItem {
  percentage: number;
}

interface PerformanceOverviewProps {
  examHistory: ExamHistoryItem[];
}

export function PerformanceOverview({ examHistory }: PerformanceOverviewProps) {
  if (examHistory.length === 0) return null;

  const passedExams = examHistory.filter(exam => exam.percentage >= 70).length;
  const averageScore = Math.round(
    examHistory.reduce((acc, exam) => acc + exam.percentage, 0) / examHistory.length
  );
  const bestScore = Math.max(...examHistory.map(exam => exam.percentage));
  const successRate = Math.round((passedExams / examHistory.length) * 100);

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-4">
        Performance Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Passed Exams */}
        <div className="bg-white dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-300">
                Passed Exams
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {passedExams}
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                of {examHistory.length} total
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        {/* Average Score */}
        <div className="bg-white dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-300">
                Average Score
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {averageScore}%
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                across all exams
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        
        {/* Best Score */}
        <div className="bg-white dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-300">
                Best Score
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {bestScore}%
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                personal record
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        
        {/* Success Rate */}
        <div className="bg-white dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-300">
                Success Rate
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {successRate}%
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                pass percentage
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
