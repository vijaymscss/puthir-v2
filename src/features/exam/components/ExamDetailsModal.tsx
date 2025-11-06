"use client";

import { useState } from "react";
import { useExamResult } from "@/features/quiz/hooks/use-quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  Trophy, 
  Target, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  X
} from "lucide-react";
import { format } from "date-fns";
import jsPDF from 'jspdf';

interface QuestionDetail {
  questionId: string;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string;
  options: string[];
}

interface ParsedResultSummary {
  questions: QuestionDetail[];
  performance: {
    score: number;
    totalQuestions: number;
    percentage: number;
    correctAnswers: number;
    incorrectAnswers: number;
  };
  timing: {
    startTime: string;
    endTime: string;
    totalTimeSpent: number;
  };
}

interface ExamDetailsModalProps {
  examId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExamDetailsModal({ examId, isOpen, onClose }: ExamDetailsModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { data: examData, isLoading } = useExamResult(examId);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  const downloadPDF = () => {
    if (!examData?.success || !examData.data) return;

    setIsDownloading(true);
    
    try {
      const exam = examData.data;
      let parsedSummary: ParsedResultSummary | null = null;
      
      try {
        parsedSummary = exam.parsedResultSummary || JSON.parse(exam.resultSummary);
      } catch (e) {
        console.error("Failed to parse result summary:", e);
      }

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPos = 25;

      // Header - matching quiz summary structure
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Quiz Summary Report', pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 10;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Detailed review of all questions and answers', pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 15;
      pdf.setFontSize(10);
      
      // Quiz info - matching structure
      const examInfo = [
        `Exam: ${exam.certificateName}`,
        `Provider: ${exam.certificateProvider}`,
        `Code: ${exam.certificateCode}`,
        `Date: ${format(new Date(exam.testDateTime), 'MMM dd, yyyy')}`,
        `Total Questions: ${parsedSummary?.performance?.totalQuestions || exam.score}`,
        `Score: ${exam.score}/${parsedSummary?.performance?.totalQuestions || 'N/A'}`,
        `Percentage: ${exam.percentage}%`,
        `Status: ${exam.percentage >= 70 ? 'PASSED' : 'FAILED'}`
      ];
      
      examInfo.forEach(info => {
        pdf.text(info, pageWidth / 2, yPos, { align: 'center' });
        yPos += 5;
      });
      
      yPos += 10;
      pdf.setDrawColor(200);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 15;

      // Questions Section - matching quiz summary format
      if (parsedSummary?.questions && parsedSummary.questions.length > 0) {
        parsedSummary.questions.forEach((question, questionIndex) => {
          // Determine correct/incorrect status
          const isCorrect = question.isCorrect;
          
          // Check if we need a new page
          if (yPos > pageHeight - 80) {
            pdf.addPage();
            yPos = margin;
          }

          // Question header with background color (like quiz summary)
          pdf.setFillColor(isCorrect ? 220 : 255, isCorrect ? 255 : 220, isCorrect ? 220 : 220);
          pdf.rect(margin, yPos - 5, contentWidth, 12, 'F');
          
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(0);
          pdf.text(`Question ${questionIndex + 1}`, margin + 5, yPos + 3);
          
          const statusText = `[${isCorrect ? 'CORRECT' : 'INCORRECT'}]`;
          const statusWidth = pdf.getTextWidth(statusText);
          pdf.text(statusText, pageWidth - margin - statusWidth, yPos + 3);
          yPos += 20;

          // Question text
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          const questionLines = pdf.splitTextToSize(question.questionText, contentWidth - 10);
          questionLines.forEach((line: string) => {
            if (yPos > pageHeight - 20) {
              pdf.addPage();
              yPos = margin;
            }
            pdf.text(line, margin + 5, yPos);
            yPos += 5;
          });
          yPos += 5;

          // Options - matching quiz summary format
          pdf.setFontSize(10);
          question.options.forEach((option, optionIndex) => {
            if (yPos > pageHeight - 15) {
              pdf.addPage();
              yPos = margin;
            }
            
            const isUserAnswer = question.userAnswer.includes(option);
            const isCorrectAnswer = question.correctAnswer.includes(option);
            
            const prefix = `${String.fromCharCode(65 + optionIndex)}. `;
            let suffix = '';
            
            if (isUserAnswer && isCorrectAnswer) {
              suffix = ' [ YOUR ANSWER ]';
              pdf.setTextColor(0, 150, 0);
            } else if (isUserAnswer && !isCorrectAnswer) {
              suffix = ' [ YOUR ANSWER ]';
              pdf.setTextColor(200, 0, 0);
            } else if (isCorrectAnswer) {
              suffix = ' [ CORRECT ANSWER ]';
              pdf.setTextColor(0, 100, 0);
            } else {
              pdf.setTextColor(0);
            }
            
            const optionText = prefix + option + suffix;
            const optionLines = pdf.splitTextToSize(optionText, contentWidth - 20);
            
            optionLines.forEach((line: string) => {
              pdf.text(line, margin + 10, yPos);
              yPos += 4;
            });
            yPos += 2;
            
            pdf.setTextColor(0);
          });

          yPos += 5;
          if (yPos > pageHeight - 30) {
            pdf.addPage();
            yPos = margin;
          }

          // Explanation section with background (like quiz summary)
          if (question.explanation) {
            pdf.setFillColor(245, 245, 245);
            const explanationLines = pdf.splitTextToSize(question.explanation, contentWidth - 20);
            const boxHeight = (explanationLines.length * 4) + 10;
            pdf.rect(margin + 5, yPos - 2, contentWidth - 10, boxHeight, 'F');
            
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Explanation:', margin + 10, yPos + 3);
            yPos += 8;
            
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            explanationLines.forEach((line: string) => {
              pdf.text(line, margin + 10, yPos);
              yPos += 4;
            });
            
            yPos += 15;
          }

          // Add question metadata (simplified since we don't have difficulty/topic in stored data)
          pdf.setFontSize(8);
          pdf.setTextColor(100);
          pdf.text(`Question ID: ${question.questionId}`, margin + 5, yPos);
          yPos += 10;
          
          pdf.setTextColor(0);
        });
      }

      // Footer (matching quiz summary format)
      pdf.setFontSize(8);
      pdf.setTextColor(150);
      pdf.text(`Generated on ${new Date().toLocaleString()}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

      // Generate filename (matching quiz summary format)
      const examName = exam.certificateName || 'Exam';
      const timestamp = format(new Date(exam.testDateTime), 'yyyy-MM-dd');
      const filename = `${examName}_Summary_${timestamp}.pdf`;
      
      // Download PDF
      pdf.save(filename);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Loading Exam Details</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading exam details...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!examData?.success || !examData.data) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Error Loading Exam</DialogTitle>
          </DialogHeader>
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Failed to Load Exam</h3>
            <p className="text-muted-foreground">The exam details could not be loaded.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const exam = examData.data;
  let parsedSummary: ParsedResultSummary | null = null;
  
  try {
    parsedSummary = exam.parsedResultSummary || JSON.parse(exam.resultSummary);
  } catch (e) {
    console.error("Failed to parse result summary:", e);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{exam.certificateName}</h2>
              <p className="text-sm text-muted-foreground">{exam.certificateProvider} • {exam.certificateCode}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                onClick={downloadPDF} 
                disabled={isDownloading}
                variant="outline"
                size="sm"
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
              <Badge variant={exam.percentage >= 70 ? "default" : "destructive"}>
                {exam.percentage >= 70 ? "Passed" : "Failed"}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)] space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="text-lg font-bold text-foreground">
                      {exam.score}/{parsedSummary?.performance?.totalQuestions || 'N/A'}
                    </p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  <div>
                    <p className="text-lg font-bold text-foreground">{exam.percentage}%</p>
                    <p className="text-xs text-muted-foreground">Percentage</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {format(new Date(exam.testDateTime), 'MMM dd, yyyy')}
                    </p>
                    <p className="text-xs text-muted-foreground">Date</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-purple-500" />
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {parsedSummary?.timing?.totalTimeSpent 
                        ? formatDuration(parsedSummary.timing.totalTimeSpent)
                        : 'N/A'}
                    </p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questions */}
          {parsedSummary?.questions && parsedSummary.questions.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Question Review</h3>
              
              {parsedSummary.questions.map((question, index) => (
                <Card key={question.questionId} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base text-foreground">
                        Question {index + 1}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {question.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <Badge variant={question.isCorrect ? "default" : "destructive"} className="text-xs">
                          {question.isCorrect ? "Correct" : "Incorrect"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {/* Question Text */}
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg border dark:border-slate-700">
                      <p className="text-sm text-foreground font-medium leading-relaxed">{question.questionText}</p>
                    </div>
                    
                    {/* Options */}
                    <div className="space-y-1">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = question.userAnswer.includes(option);
                        const isCorrectAnswer = question.correctAnswer.includes(option);
                        
                        return (
                          <div 
                            key={optionIndex}
                            className={`p-3 rounded text-sm ${
                              isCorrectAnswer 
                                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300' 
                                : isUserAnswer && !isCorrectAnswer
                                ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300'
                                : 'bg-background border border-border'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {isCorrectAnswer && <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />}
                              {isUserAnswer && !isCorrectAnswer && <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />}
                              <span className="font-medium">{String.fromCharCode(65 + optionIndex)}. {option}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Answer Summary */}
                    <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg">
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">Your Answer:</p>
                        <p className={`font-semibold ${
                          question.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                        }`}>
                          {question.userAnswer || 'No answer'}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">Correct Answer:</p>
                        <p className="font-semibold text-green-700 dark:text-green-400">{question.correctAnswer}</p>
                      </div>
                    </div>
                    
                    {/* Explanation */}
                    {question.explanation && (
                      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-blue-800 dark:text-blue-200 text-sm mb-1">Explanation:</p>
                            <p className="text-blue-700 dark:text-blue-300 text-sm">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Detailed Results</h3>
                <p className="text-muted-foreground text-sm">
                  Detailed question results are not available for this exam.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}