"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams, useRouter } from "next/navigation";
import { examTopics } from "@/utils/constants";
import Link from "next/link";
import { QuizQuestion, QuizData } from "@/lib/services/quiz-service";
import jsPDF from 'jspdf';

function QuizContent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number[]}>({});
  const [showResults, setShowResults] = useState(false);
  const [showDetailedSummary, setShowDetailedSummary] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  
  const hasMadeCall = useRef(false);
  const pdfContentRef = useRef<HTMLDivElement>(null);
  const downloadPDF = () => {
    if (!quizData) return;
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Quiz Summary Report', pageWidth / 2, 25, { align: 'center' });
      
      // Quiz info
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Detailed review of all questions and answers', pageWidth / 2, 35, { align: 'center' });
      pdf.setFontSize(10);
      const examInfo = [
        `Exam: ${quizData.examInfo.name}`,
        `Date: ${new Date().toLocaleDateString()}`,
        `Total Questions: ${quizData.questions.length}`,
        `Score: ${Object.keys(selectedAnswers).filter(key => {
          const questionIndex = parseInt(key);
          const userAnswers = selectedAnswers[questionIndex] || [];
          const correctAnswers = Array.isArray(quizData.questions[questionIndex].correctAnswer) 
            ? quizData.questions[questionIndex].correctAnswer 
            : [quizData.questions[questionIndex].correctAnswer];
          return userAnswers.length === correctAnswers.length &&
            userAnswers.every(idx => correctAnswers.includes(idx));
        }).length}/${quizData.questions.length}`
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
      
      const quizQuestions = quizData.questions;
      
      quizQuestions.forEach((question, questionIndex) => {
        const userAnswerIndices = selectedAnswers[questionIndex] || [];
        const correctAnswerIndices = Array.isArray(question.correctAnswer) 
          ? question.correctAnswer 
          : [question.correctAnswer];
        
        const isCorrect = userAnswerIndices.length === correctAnswerIndices.length &&
          userAnswerIndices.every(idx => correctAnswerIndices.includes(idx));
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
          
          const isUserAnswer = userAnswerIndices.includes(optionIndex);
          const isCorrectAnswer = correctAnswerIndices.includes(optionIndex);
          
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
      const examName = quizData.examInfo.name || 'Quiz';
      const timestamp = new Date().toISOString().split('T')[0];
      pdf.save(`${examName}_Summary_${timestamp}.pdf`);
      
    } catch (error) {
      alert(`Error generating simple PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };


  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const examId = searchParams.get("exam");
  const quizType = searchParams.get("type");
  const encodedTopics = searchParams.get("topics");

  const examData = (() => {
    if (!examId) return null;
    for (const topic of examTopics) {
      const exam = topic.examTypes.find(exam => exam.id === examId);
      if (exam) {
        return { exam, provider: topic };
      }
    }
    return null;
  })();

  let selectedTopics: string[] = [];
  if (encodedTopics) {
    try {
      const decodedTopics = atob(encodedTopics);
      selectedTopics = JSON.parse(decodedTopics);
    } catch (error) {
    }
  }

  useEffect(() => {
    if (!examData) {
      return;
    }

    if (!hasMadeCall.current && !loading && !quizData) {
      hasMadeCall.current = true;
      setLoading(true);
      setError(null);
      
      const requestData = {
        examName: examData.exam.name,
        examLevel: examData.exam.level,
        quizType: quizType || "complete",
        selectedTopics: quizType === "custom" ? selectedTopics : examData.exam.categories,
        questionCount: 10
      };

      fetch("/api/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: QuizData) => {
          setQuizData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [examData?.exam?.id, quizType]);

  const handleQuestionJump = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const currentAnswers = selectedAnswers[currentQuestion] || [];
    const question = quizData?.questions[currentQuestion];
    
    if (!question) return;

    // Check if it's a multiple-choice (single answer) or multiple-response question
    const isMultipleChoice = typeof question.correctAnswer === "number";
    
    if (isMultipleChoice) {
      // Single answer - replace previous selection
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestion]: [optionIndex]
      }));
    } else {
      // Multiple answers - toggle selection
      const newAnswers = currentAnswers.includes(optionIndex)
        ? currentAnswers.filter(idx => idx !== optionIndex)
        : [...currentAnswers, optionIndex];
      
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestion]: newAnswers
      }));
    }
  };

  const handleNext = () => {
    if (quizData && currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const areAllQuestionsAnswered = () => {
    if (!quizData) return false;
    
    for (let i = 0; i < quizData.questions.length; i++) {
      const userAnswers = selectedAnswers[i] || [];
      if (userAnswers.length === 0) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!quizData) return;

    // Double-check all questions are answered before submitting
    if (!areAllQuestionsAnswered()) {
      alert('Please answer all questions before submitting the quiz.');
      return;
    }

    let correctCount = 0;
    
    quizData.questions.forEach((question: QuizQuestion, index: number) => {
      const userAnswers = selectedAnswers[index] || [];
      const correctAnswer = question.correctAnswer;
      
      if (typeof correctAnswer === "number") {
        // Single correct answer
        if (userAnswers.length === 1 && userAnswers[0] === correctAnswer) {
          correctCount++;
        }
      } else {
        // Multiple correct answers
        const sortedUserAnswers = [...userAnswers].sort();
        const sortedCorrectAnswers = [...correctAnswer].sort();
        
        if (sortedUserAnswers.length === sortedCorrectAnswers.length &&
            sortedUserAnswers.every((answer, idx) => answer === sortedCorrectAnswers[idx])) {
          correctCount++;
        }
      }
    });
    
    setScore(correctCount);
    setShowResults(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Generating Your Quiz</h2>
          <p className="text-muted-foreground">Creating personalized questions using AI...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Error Generating Quiz</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="space-x-4">
            <Button onClick={() => {
              setError(null);
              hasMadeCall.current = false;
            }}>
              Try Again
            </Button>
            <Link href="/quiz-setup">
              <Button variant="outline">
                Back to Setup
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Detailed Summary View - Check this BEFORE regular results
  if (showDetailedSummary && showResults && quizData) {
    const quizQuestions = quizData.questions;
    
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
            {quizQuestions.map((question, questionIndex) => {
              const userAnswerIndices = selectedAnswers[questionIndex] || [];
              const correctAnswerIndices = Array.isArray(question.correctAnswer) 
                ? question.correctAnswer 
                : [question.correctAnswer];
              
              const isCorrect = userAnswerIndices.length === correctAnswerIndices.length &&
                userAnswerIndices.every(idx => correctAnswerIndices.includes(idx));

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
                      <div className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                        isCorrect 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {/* Answer Options */}
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Answer Options:</h4>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => {
                            const isUserAnswer = userAnswerIndices.includes(optionIndex);
                            const isCorrectAnswer = correctAnswerIndices.includes(optionIndex);
                            
                            let optionClass = "p-3 rounded-lg border ";
                            if (isCorrectAnswer && isUserAnswer) {
                              optionClass += "border-green-500 bg-green-50 dark:bg-green-950";
                            } else if (isCorrectAnswer) {
                              optionClass += "border-green-500 bg-green-50 dark:bg-green-950";
                            } else if (isUserAnswer) {
                              optionClass += "border-red-500 bg-red-50 dark:bg-red-950";
                            } else {
                              optionClass += "border-gray-200 dark:border-gray-700 bg-card";
                            }
                            
                            return (
                              <div key={optionIndex} className={optionClass}>
                                <div className="flex items-center gap-3">
                                  <span className="font-medium text-gray-800 dark:text-gray-200">
                                    {option.match(/^[A-D]\.\s*/) ? '' : `${String.fromCharCode(65 + optionIndex)}. `}
                                  </span>
                                  <span className="flex-1">{option.replace(/^[A-D]\.\s*/, '')}</span>
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
                        <h4 className="font-semibold mb-2 text-foreground">Explanation:</h4>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <p className="text-muted-foreground leading-relaxed">
                            {question.explanation}
                          </p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">Difficulty:</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            question.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {question.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">Topic:</span>
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
            <Button onClick={() => setShowDetailedSummary(false)} variant="outline">
              ← Back to Results
            </Button>
          </div>
          </div> {/* End of ref wrapper */}
        </div>
      </main>
    );
  }

  if (showResults && quizData) {
    const quizQuestions = quizData.questions;
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const passed = percentage >= 70; // 70% passing threshold
    
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className={`text-6xl mb-4 ${passed ? 'text-green-500' : 'text-red-500'}`}>
              {passed ? '🎉' : '📚'}
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Quiz {passed ? 'Completed!' : 'Results'}
            </h1>
            <p className="text-xl text-muted-foreground">
              You scored {score} out of {quizQuestions.length} questions correct
            </p>
            <p className="text-3xl font-bold mt-4" style={{color: passed ? '#22c55e' : '#ef4444'}}>
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
                    <li>Correct Answers: {score}/{quizQuestions.length}</li>
                    <li>Accuracy: {percentage}%</li>
                    <li>Status: {passed ? 'Passed ✅' : 'Needs Improvement 📖'}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Exam Details</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Exam: {quizData.examInfo.name}</li>
                    <li>Type: {quizData.examInfo.type}</li>
                    <li>Questions: {quizData.examInfo.totalQuestions}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-x-4">
            <Button onClick={() => {
              setShowDetailedSummary(true);
            }}>
              View Detailed Summary {showDetailedSummary ? "(Active)" : ""}
            </Button>
            <Button onClick={() => window.location.reload()}>
              Retake Quiz
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

  const questions = quizData?.questions;

  if (!questions || questions.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">No Quiz Data</h2>
          <p className="text-muted-foreground">Unable to load quiz questions.</p>
        </div>
      </main>
    );
  }

  const question = questions[currentQuestion];
  const userAnswers = selectedAnswers[currentQuestion] || [];
  const isMultipleChoice = typeof question.correctAnswer === "number";
  
  // Calculate answered questions
  const answeredCount = Object.keys(selectedAnswers).filter(key => {
    const answers = selectedAnswers[parseInt(key)] || [];
    return answers.length > 0;
  }).length;
  
  // Progress bar based on answered questions, not current question number
  const progress = (answeredCount / questions.length) * 100;

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">
              {quizData?.examInfo.name}
            </h1>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Answer Progress Indicator */}
          <div className="flex items-center justify-between mt-2 text-sm">
            <div className="text-muted-foreground">
              Progress: {answeredCount} of {questions.length} questions answered
            </div>
            {!areAllQuestionsAnswered() && (
              <div className="text-orange-600 font-medium">
                {questions.length - answeredCount} questions remaining
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Content - Left Side */}
          <div className="lg:col-span-3">
            {/* Question Card */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">
                    {question.question}
                  </CardTitle>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {question.difficulty}
                    </span>
                  </div>
                </div>
                {!isMultipleChoice && (
                  <p className="text-sm text-muted-foreground">
                    Select all correct answers
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {question.options.map((option: string, index: number) => {
                    const isMultipleChoice = typeof question.correctAnswer === "number";
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          userAnswers.includes(index)
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-card hover:bg-blue-50 dark:hover:bg-blue-950'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isMultipleChoice ? (
                            /* Radio button style - circle */
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              userAnswers.includes(index)
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-400'
                            }`}>
                              {userAnswers.includes(index) && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                          ) : (
                            /* Checkbox style - square */
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                              userAnswers.includes(index)
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-400'
                            }`}>
                              {userAnswers.includes(index) && (
                                <span className="text-white text-xs">✓</span>
                              )}
                            </div>
                          )}
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {option.match(/^[A-D]\.\s*/) ? '' : `${String.fromCharCode(65 + index)}. `}
                          </span>
                          <span>{option.replace(/^[A-D]\.\s*/, '')}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </Button>
              
              <div className="flex gap-4">
                {currentQuestion === questions.length - 1 ? (
                  <div className="flex flex-col items-center">
                    <Button
                      onClick={handleSubmit}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!areAllQuestionsAnswered()}
                    >
                      Submit Quiz
                    </Button>
                    {!areAllQuestionsAnswered() && (
                      <p className="text-xs text-orange-600 mt-1 text-center">
                        Answer all questions to submit
                      </p>
                    )}
                  </div>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={userAnswers.length === 0}
                  >
                    Next →
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Question Navigator - Right Side */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Questions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Click any question to navigate
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                  {questions.map((_, index) => {
                    const isAnswered = selectedAnswers[index] && selectedAnswers[index].length > 0;
                    const isCurrent = index === currentQuestion;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleQuestionJump(index)}
                        className={`
                          w-10 h-10 rounded-lg border-2 text-sm font-medium transition-all duration-200
                          ${isCurrent 
                            ? 'border-blue-500 bg-blue-500 text-white shadow-lg' 
                            : isAnswered
                              ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900'
                              : 'border-gray-300 dark:border-gray-600 bg-card hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950'
                          }
                        `}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
                
                {/* Legend */}
                <div className="mt-6 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-50 dark:bg-green-950 border border-green-500 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-card border border-gray-300 dark:border-gray-600 rounded"></div>
                    <span>Unanswered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </main>
    }>
      <QuizContent />
    </Suspense>
  );
}