"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import jsPDF from 'jspdf';
import Link from "next/link";

interface QuestionResult {
  question: string;
  options: string[];
  userAnswers: number[];
  correctAnswers: number[];
  explanation: string;
  difficulty: string;
  topic: string;
  isCorrect: boolean;
}

interface QuizResultsData {
  score: number;
  totalQuestions: number;
  examName: string;
  examType: string;
  questions: QuestionResult[];
}

export default function QuizResultsPage() {
  const [showDetailedSummary, setShowDetailedSummary] = useState(false);
  const [resultsData, setResultsData] = useState<QuizResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pdfContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Restore results from session storage
    const sessionKey = "quiz_results";
    const cachedResults = sessionStorage.getItem(sessionKey);
    
    if (cachedResults) {
      try {
        const data = JSON.parse(cachedResults);
        setResultsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing quiz results:", error);
        setLoading(false);
      }
    } else {
      // No results found, redirect back to quiz setup
      setTimeout(() => {
        router.push("/quiz-setup");
      }, 2000);
    }

    // Cleanup: Remove results from session when leaving this page
    return () => {
      sessionStorage.removeItem(sessionKey);
    };
  }, [router]);

  const downloadPDF = () => {
    if (!resultsData) return;

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      // Title
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Quiz Summary Report', pageWidth / 2, 25, { align: 'center' });

      // Subtitle
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Detailed review of all questions and answers', pageWidth / 2, 35, { align: 'center' });

      // Quiz info
      pdf.setFontSize(10);
      const percentage = Math.round((resultsData.score / resultsData.totalQuestions) * 100);
      const examInfo = [
        `Exam: ${resultsData.examName}`,
        `Date: ${new Date().toLocaleDateString()}`,
        `Total Questions: ${resultsData.totalQuestions}`,
        `Score: ${resultsData.score}/${resultsData.totalQuestions} (${percentage}%)`
      ];

      let yPos = 50;
      examInfo.forEach(info => {
        pdf.text(info, pageWidth / 2, yPos, { align: 'center' });
        yPos += 5;
      });

      yPos += 10;
      pdf.setDrawColor(200);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 15;

      // Questions
      resultsData.questions.forEach((question, questionIndex) => {
        const isCorrect = question.isCorrect;

        if (yPos > pageHeight - 80) {
          pdf.addPage();
          yPos = margin;
        }

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

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        const questionLines = pdf.splitTextToSize(question.question, contentWidth - 10);
        questionLines.forEach((line: string) => {
          if (yPos > pageHeight - 20) {
            pdf.addPage();
            yPos = margin;
          }
          pdf.text(line, margin + 5, yPos);
          yPos += 5;
        });

        yPos += 5;
        pdf.setFontSize(10);
        question.options.forEach((option, optionIndex) => {
          if (yPos > pageHeight - 15) {
            pdf.addPage();
            yPos = margin;
          }

          const isUserAnswer = question.userAnswers.includes(optionIndex);
          const isCorrectAnswer = question.correctAnswers.includes(optionIndex);

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

          const cleanOption = option.replace(/^[A-D]\.\s*/, '');
          const optionText = prefix + cleanOption + suffix;
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
        pdf.setFontSize(8);
        pdf.setTextColor(100);
        pdf.text(`Difficulty: ${question.difficulty} | Topic: ${question.topic}`, margin + 5, yPos);
        yPos += 10;

        pdf.setTextColor(0);
      });

      pdf.setFontSize(8);
      pdf.setTextColor(150);
      pdf.text(`Generated on ${new Date().toLocaleString()}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

      const examName = resultsData.examName || 'Quiz';
      const timestamp = new Date().toISOString().split('T')[0];
      pdf.save(`${examName}_Summary_${timestamp}.pdf`);
    } catch (error) {
      alert(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Loading Results</h2>
          <p className="text-muted-foreground">Please wait...</p>
        </div>
      </main>
    );
  }

  if (!resultsData) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">No Results Found</h2>
          <p className="text-muted-foreground mb-6">Unable to load quiz results. Redirecting...</p>
          <Link href="/quiz-setup">
            <Button variant="outline">
              Back to Setup
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const percentage = Math.round((resultsData.score / resultsData.totalQuestions) * 100);
  const passed = percentage >= 70;

  // Detailed Summary View
  if (showDetailedSummary) {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={pdfContentRef}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Quiz Summary
              </h1>
              <p className="text-xl text-muted-foreground">
                Detailed review of all questions and answers
              </p>
            </div>

            <div className="mb-6 text-center space-x-4">
              <Button
                onClick={() => setShowDetailedSummary(false)}
                variant="outline"
              >
                ← Back to Results
              </Button>
              <Button
                onClick={downloadPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                📄 Download PDF Summary
              </Button>
            </div>

            <div className="space-y-6">
              {resultsData.questions.map((question, questionIndex) => {
                const isCorrect = question.isCorrect;

                return (
                  <Card key={questionIndex} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">
                            Question {questionIndex + 1}
                          </CardTitle>
                          <p className="text-foreground font-medium">
                            {question.question}
                          </p>
                        </div>
                        <div
                          className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                            isCorrect
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        {/* Answer Options */}
                        <div>
                          <h4 className="font-semibold mb-3 text-foreground">
                            Answer Options:
                          </h4>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => {
                              const isUserAnswer =
                                question.userAnswers.includes(optionIndex);
                              const isCorrectAnswer =
                                question.correctAnswers.includes(optionIndex);

                              let optionClass =
                                "p-3 rounded-lg border ";
                              if (
                                isCorrectAnswer &&
                                isUserAnswer
                              ) {
                                optionClass +=
                                  "border-green-500 bg-green-50 dark:bg-green-950";
                              } else if (isCorrectAnswer) {
                                optionClass +=
                                  "border-green-500 bg-green-50 dark:bg-green-950";
                              } else if (isUserAnswer) {
                                optionClass +=
                                  "border-red-500 bg-red-50 dark:bg-red-950";
                              } else {
                                optionClass +=
                                  "border-gray-200 dark:border-gray-700 bg-card";
                              }

                              return (
                                <div key={optionIndex} className={optionClass}>
                                  <div className="flex items-center gap-3">
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                      {option.match(/^[A-D]\.\s*/)
                                        ? ""
                                        : `${String.fromCharCode(65 + optionIndex)}. `}
                                    </span>
                                    <span className="flex-1">
                                      {option.replace(/^[A-D]\.\s*/, "")}
                                    </span>
                                    <div className="flex gap-2">
                                      {isUserAnswer && (
                                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                          Your Answer
                                        </span>
                                      )}
                                      {isCorrectAnswer && (
                                        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                          Correct
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Explanation */}
                        <div>
                          <h4 className="font-semibold mb-2 text-foreground">
                            Explanation:
                          </h4>
                          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <p className="text-muted-foreground leading-relaxed">
                              {question.explanation}
                            </p>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              Difficulty:
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                question.difficulty === "Easy"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : question.difficulty ===
                                    "Medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {question.difficulty}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              Topic:
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {question.topic}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={() => setShowDetailedSummary(false)}
                variant="outline"
              >
                ← Back to Results
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Main Results View
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className={`text-6xl mb-4 ${passed ? "text-green-500" : "text-red-500"}`}>
            {passed ? "🎉" : "📚"}
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Quiz {passed ? "Completed!" : "Results"}
          </h1>
          <p className="text-xl text-muted-foreground">
            You scored {resultsData.score} out of {resultsData.totalQuestions}{" "}
            questions correct
          </p>
          <p
            className="text-3xl font-bold mt-4"
            style={{ color: passed ? "#22c55e" : "#ef4444" }}
          >
            {percentage}%
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quiz Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Performance</h3>
                <ul className="space-y-1 text-sm">
                  <li>Correct Answers: {resultsData.score}/{resultsData.totalQuestions}</li>
                  <li>Accuracy: {percentage}%</li>
                  <li>Status: {passed ? "Passed ✅" : "Needs Improvement 📖"}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Exam Details</h3>
                <ul className="space-y-1 text-sm">
                  <li>Exam: {resultsData.examName}</li>
                  <li>Type: {resultsData.examType}</li>
                  <li>Questions: {resultsData.totalQuestions}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-x-4 flex flex-wrap justify-center gap-4">
          <Button onClick={() => setShowDetailedSummary(true)}>
            View Detailed Summary
          </Button>
          <Link href="/quiz-setup">
            <Button variant="outline">
              Try Different Quiz
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">
              Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
