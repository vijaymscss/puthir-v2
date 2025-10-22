"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { examTopics } from "@/utils/constants";

interface ExamType {
  id: string;
  name: string;
  level: string;
  description: string;
  duration: string;
  questionCount: string;
  examCode?: string;
  passingScore?: number;
  categories: string[];
}

const cloudPlatforms = [
  { id: "aws", name: "AWS (Amazon Web Services)", icon: "☁️", available: true },
  { id: "azure", name: "Microsoft Azure", icon: "🔵", available: false },
  { id: "gcp", name: "Google Cloud Platform", icon: "🌐", available: false }
];

export default function QuizSetupPage() {
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [showMessage, setShowMessage] = useState<string>("");

  const handlePlatformSelection = (platformId: string) => {
    setSelectedPlatform(platformId);
    setSelectedExam("");
    
    if (platformId === "azure") {
      setShowMessage("Azure quiz is under development. Please check back soon!");
    } else if (platformId === "gcp") {
      setShowMessage("GCP quiz is under development. Please check back soon!");
    } else {
      setShowMessage("");
    }
  };

  const handleExamSelection = (examId: string) => {
    setSelectedExam(examId);
  };

  const handleContinue = () => {
    if (selectedPlatform === "aws" && selectedExam) {
      router.push(`/quiz-setup/customize?exam=${selectedExam}`);
    }
  };

  const awsExams = examTopics.find(topic => topic.id === "aws")?.examTypes || [];

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Quiz Setup
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose your cloud platform and certification exam
          </p>
        </div>

        {/* Step 1: Cloud Platform Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            1. Select Cloud Platform
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {cloudPlatforms.map((platform) => (
              <div
                key={platform.id}
                onClick={() => platform.available && handlePlatformSelection(platform.id)}
                className={`border rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                  selectedPlatform === platform.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-200 dark:ring-blue-800'
                    : platform.available
                    ? 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                    : 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{platform.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {platform.name}
                  </h3>
                  {!platform.available && (
                    <span className="text-sm text-muted-foreground">
                      Coming Soon
                    </span>
                  )}
                  {selectedPlatform === platform.id && platform.available && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        Selected
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Development Message */}
          {showMessage && (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                  {showMessage}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Exam Selection (Only show if AWS is selected) */}
        {selectedPlatform === "aws" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              2. Select AWS Certification Exam
            </h2>
            <div className="grid gap-4">
              {awsExams.map((exam) => (
                <div
                  key={exam.id}
                  onClick={() => handleExamSelection(exam.id)}
                  className={`border rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                    selectedExam === exam.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-200 dark:ring-blue-800'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {exam.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          exam.level === 'Foundational' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                        }`}>
                          {exam.level}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        {exam.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>📝 {exam.questionCount}</span>
                        <span>⏱️ {exam.duration}</span>
                        <span>🎯 {exam.examCode}</span>
                      </div>
                    </div>
                    {selectedExam === exam.id && (
                      <div className="ml-4">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Continue Button */}
        {selectedPlatform === "aws" && selectedExam && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              3. Ready to Continue
            </h2>
            <div className="text-center">
              <Button 
                onClick={handleContinue}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
              >
                Continue to Quiz Options
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center">
          <Link href="/">
            <Button variant="outline">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}