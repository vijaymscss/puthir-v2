"use client";

import { useUser } from "@clerk/nextjs";
import { useExamHistory } from "@/hooks/use-quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock, Trophy, BookOpen, Target, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import ExamDetailsModal from "@/components/ExamDetailsModal";
import { useState } from "react";

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
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-blue-500 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">Please sign in to view your exam history.</p>
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Loading Exam History</h2>
            <p className="text-muted-foreground">Fetching your quiz results...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !examHistoryData?.success) {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Error Loading History</h2>
            <p className="text-muted-foreground mb-6">
              {examHistoryData?.error || "Failed to load exam history"}
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </main>
    );
  }

  const examHistory = examHistoryData.data || [];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Modern Header Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-slate-300 dark:hover:text-slate-100 mb-4 text-sm font-medium">
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
              
              {examHistory.length > 0 && (
                <div className="mt-4 lg:mt-0 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800/50 px-3 py-2 rounded-lg border dark:border-slate-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-slate-200 font-medium">{examHistory.length} Total Exams</span>
                  </div>
                 
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Dashboard */}
        {examHistory.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-4">Performance Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-slate-300">Passed Exams</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {examHistory.filter(exam => exam.percentage >= 70).length}
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
              
              <div className="bg-white dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-slate-300">Average Score</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {Math.round(examHistory.reduce((acc, exam) => acc + exam.percentage, 0) / examHistory.length)}%
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
              
              <div className="bg-white dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-slate-300">Best Score</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {Math.max(...examHistory.map(exam => exam.percentage))}%
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
              
              <div className="bg-white dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-slate-300">Success Rate</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {Math.round((examHistory.filter(exam => exam.percentage >= 70).length / examHistory.length) * 100)}%
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
        )}

        {/* Exam History List */}
        {examHistory.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
            <CardContent className="p-16 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-3">Ready to Start Learning?</h3>
              <p className="text-gray-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
                Your exam history will appear here. Take your first quiz to begin tracking your progress and achievements.
              </p>
              <Link href="/quiz-setup">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  🚀 Start Your First Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Exam Results
              </h2>
            </div>
            
            {/* Table-like Layout for Desktop, Card for Mobile */}
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
                  <div key={exam.id} className="p-4 lg:p-6 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
                      <div className="col-span-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                            exam.percentage >= 70 
                              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                              : 'bg-gradient-to-br from-red-500 to-rose-600'
                          }`}>
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
                          {exam.score}/{exam.resultSummary ? 
                            JSON.parse(exam.resultSummary)?.performance?.totalQuestions || 'N/A' : 'N/A'}
                        </div>
                      </div>
                      
                      <div className="col-span-2 text-center">
                        <div className={`inline-flex items-center gap-1 font-bold text-lg ${
                          exam.percentage >= 70 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {exam.percentage >= 70 ? '🎉' : '📚'} {exam.percentage}%
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
                          variant={exam.percentage >= 70 ? "default" : "destructive"}
                          className="text-xs font-medium"
                        >
                          {exam.percentage >= 70 ? "Pass" : "Fail"}
                        </Badge>
                      </div>
                      
                      <div className="col-span-1 text-center">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(exam.id)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30 "
                        >
                          View
                        </Button>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                          exam.percentage >= 70 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                            : 'bg-gradient-to-br from-red-500 to-rose-600'
                        }`}>
                          {exam.percentage >= 70 ? '✓' : '✗'}
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
                          variant={exam.percentage >= 70 ? "default" : "destructive"}
                          className="text-xs shrink-0"
                        >
                          {exam.percentage >= 70 ? "Pass" : "Fail"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-gray-900 dark:text-slate-50">
                            {exam.score}/{exam.resultSummary ? 
                              JSON.parse(exam.resultSummary)?.performance?.totalQuestions || 'N/A' : 'N/A'}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-slate-300">Score</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-bold ${exam.percentage >= 70 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
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
                        onClick={() => handleViewDetails(exam.id)}
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Modal for exam details */}
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