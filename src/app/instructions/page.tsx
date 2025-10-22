"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { examTopics } from "@/utils/constants";

export default function InstructionsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  
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
      console.error("Error decoding topics:", error);
    }
  }

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getQuizStartUrl = () => {
    if (!examId) return "/quiz-setup";
    
    if (quizType === "complete") {
      return `/quiz?exam=${examId}&type=complete`;
    } else if (quizType === "custom" && encodedTopics) {
      return `/quiz?exam=${examId}&type=custom&topics=${encodedTopics}`;
    }
    return `/quiz-setup`;
  };

  const getBackUrl = () => {
    if (examId && quizType) {
      return `/quiz-setup/customize?exam=${examId}`;
    }
    return "/quiz-setup";
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Quiz Instructions
          </h1>
          {examData && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {examData.exam.name}
              </h2>
              <p className="text-muted-foreground">
                {quizType === "complete" 
                  ? "Complete Quiz - All Topics" 
                  : `Custom Quiz - ${selectedTopics.length} Selected Topics`
                }
              </p>
            </div>
          )}
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Please read the following instructions carefully before starting your AWS certification quiz.
          </p>
        </div>

        {/* Quiz Summary */}
        {examData && (
          <div className={`bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Your Quiz Setup
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-blue-800 dark:text-blue-200">
              <div>
                <h3 className="font-semibold mb-2">Exam Details</h3>
                <ul className="space-y-1 text-sm">
                  <li><strong>Exam:</strong> {examData.exam.name}</li>
                  <li><strong>Duration:</strong> {examData.exam.duration}</li>
                  <li><strong>Questions:</strong> {examData.exam.questionCount}</li>
                  <li><strong>Passing Score:</strong> {examData.exam.passingScore}/1000</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Quiz Configuration</h3>
                <ul className="space-y-1 text-sm">
                  <li><strong>Type:</strong> {quizType === "complete" ? "Complete Quiz" : "Custom Quiz"}</li>
                  {quizType === "custom" && (
                    <li><strong>Selected Topics:</strong> {selectedTopics.length}</li>
                  )}
                  <li><strong>Format:</strong> Practice Mode</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Instructions Content */}
        <div className={`space-y-8 transition-all duration-1000 ease-out delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* General Instructions */}
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              General Instructions
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Read each question carefully before selecting your answer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>You can select one or multiple answers depending on the question type</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Use the "Next" and "Previous" buttons to navigate between questions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>You can review and change your answers before submitting</span>
              </li>
            </ul>
          </div>

          {/* Quiz Format */}
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              Quiz Format
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Question Types</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                    Multiple Choice (Single Answer)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                    Multiple Response (Multiple Answers)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Quiz Features</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                    Immediate Feedback
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                    Detailed Explanations
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Important Notes
            </h2>
            <div className="space-y-3 text-green-800 dark:text-green-200">
              <div className="flex items-start gap-3">
                <span className="text-green-600 dark:text-green-400 text-lg">🎯</span>
                <div>
                  <strong>Practice Mode:</strong> This is a practice quiz to help you prepare for the actual certification exam.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 dark:text-green-400 text-lg">�</span>
                <div>
                  <strong>Learning Focus:</strong> Pay attention to explanations and understand the reasoning behind correct answers.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 dark:text-green-400 text-lg">🔄</span>
                <div>
                  <strong>Retake:</strong> You can retake this quiz multiple times to reinforce your learning.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mt-12 transition-all duration-1000 ease-out delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Link href={getBackUrl()}>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3 text-lg"
            >
              ← Back to Setup
            </Button>
          </Link>
          <Link href={getQuizStartUrl()}>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
            >
              Start Quiz →
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}