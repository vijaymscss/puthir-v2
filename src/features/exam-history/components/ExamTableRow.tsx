import { format } from "date-fns";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

interface ExamTableRowProps {
  exam: {
    id: string;
    certificateName: string;
    certificateProvider: string;
    certificateCode: string;
    score: number;
    percentage: number;
    testDateTime: Date | string;
    resultSummary: string | null;
  };
  index: number;
  onViewDetails: (examId: string) => void;
}

export function ExamTableRow({ exam, index, onViewDetails }: ExamTableRowProps) {
  const getTotalQuestions = () => {
    if (!exam.resultSummary) return 'N/A';
    try {
      const summary = JSON.parse(exam.resultSummary);
      return summary?.performance?.totalQuestions || 'N/A';
    } catch {
      return 'N/A';
    }
  };

  const isPassed = exam.percentage >= 70;

  return (
    <div className="p-4 lg:p-6 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
        <div className="col-span-4">
          <div className="flex items-start gap-3">
            <div 
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                isPassed
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                  : 'bg-gradient-to-br from-red-500 to-rose-600'
              }`}
            >
              {index + 1}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-slate-50 text-sm leading-tight">
                {exam.certificateName}
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-1">
                {exam.certificateProvider} • {exam.certificateCode}
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-span-2 text-center">
          <div className="font-semibold text-gray-900 dark:text-slate-50">
            {exam.score}/{getTotalQuestions()}
          </div>
        </div>
        
        <div className="col-span-2 text-center">
          <div 
            className={`inline-flex items-center gap-1 font-bold text-lg ${
              isPassed ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPassed ? '🎉' : '📚'} {exam.percentage}%
          </div>
        </div>
        
        <div className="col-span-2 text-center text-sm">
          <div className="font-medium text-gray-900 dark:text-slate-50">
            {format(new Date(exam.testDateTime), 'MMM dd, yyyy')}
          </div>
          <div className="text-xs text-gray-600 dark:text-slate-300">
            {format(new Date(exam.testDateTime), 'HH:mm')}
          </div>
        </div>
        
        <div className="col-span-1 text-center">
          <Badge 
            variant={isPassed ? "default" : "destructive"}
            className="text-xs font-medium"
          >
            {isPassed ? "Pass" : "Fail"}
          </Badge>
        </div>
        
        <div className="col-span-1 text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewDetails(exam.id)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
          >
            View
          </Button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex items-start gap-3 mb-3">
          <div 
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
              isPassed
                ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                : 'bg-gradient-to-br from-red-500 to-rose-600'
            }`}
          >
            {isPassed ? '✓' : '✗'}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-slate-50">
              {exam.certificateName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              {exam.certificateProvider} • {exam.certificateCode}
            </p>
          </div>
          <Badge 
            variant={isPassed ? "default" : "destructive"}
            className="text-xs shrink-0"
          >
            {isPassed ? "Pass" : "Fail"}
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-gray-900 dark:text-slate-50">
              {exam.score}/{getTotalQuestions()}
            </div>
            <div className="text-xs text-gray-600 dark:text-slate-300">Score</div>
          </div>
          <div className="text-center">
            <div 
              className={`font-bold ${
                isPassed 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {exam.percentage}%
            </div>
            <div className="text-xs text-gray-600 dark:text-slate-300">Percentage</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900 dark:text-slate-50">
              {format(new Date(exam.testDateTime), 'MMM dd')}
            </div>
            <div className="text-xs text-gray-600 dark:text-slate-300">
              {format(new Date(exam.testDateTime), 'HH:mm')}
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails(exam.id)}
          className="w-full"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
