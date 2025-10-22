"use client";

import { useState, useEffect } from "react";
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

interface CloudPlatform {
  id: string;
  name: string;
  icon: string;
  available: boolean;
  examCount: number;
}

// Function to check if platform data is available
const checkPlatformAvailability = (platformId: string): { available: boolean; examCount: number } => {
  try {
    switch (platformId) {
      case 'aws':
        // Check AWS data from examTopics
        const awsExams = examTopics.find(topic => topic.id === "aws")?.examTypes || [];
        return { available: awsExams.length > 0, examCount: awsExams.length };
      case 'azure':
        // Check Azure data from examTopics
        const azureExams = examTopics.find(topic => topic.id === "azure")?.examTypes || [];
        return { available: azureExams.length > 0, examCount: azureExams.length };
      case 'gcp':
        // Currently no GCP data available
        return { available: false, examCount: 0 };
      default:
        return { available: false, examCount: 0 };
    }
  } catch (error) {
    console.error(`Error checking availability for ${platformId}:`, error);
    return { available: false, examCount: 0 };
  }
};

export default function QuizSetupPage() {
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [showMessage, setShowMessage] = useState<string>("");
  const [cloudPlatforms, setCloudPlatforms] = useState<CloudPlatform[]>([]);

  // Initialize platforms with dynamic availability checking
  useEffect(() => {
    const platforms = [
      { id: "aws", name: "Amazon Web Services", icon: "/aws_logo.svg" },
      { id: "azure", name: "Microsoft Azure", icon: "/azure_logo.svg" },
      { id: "gcp", name: "Google Cloud Platform", icon: "/gcp_logo.svg" }
    ];

    const updatedPlatforms: CloudPlatform[] = platforms.map(platform => {
      const { available, examCount } = checkPlatformAvailability(platform.id);
      return {
        ...platform,
        available,
        examCount
      };
    });

    setCloudPlatforms(updatedPlatforms);
  }, []);

  const handlePlatformSelection = (platformId: string) => {
    const platform = cloudPlatforms.find(p => p.id === platformId);
    
    if (platform?.available) {
      setSelectedPlatform(platformId);
      setSelectedExam("");
      setShowMessage("");
    } else {
      setShowMessage(`${platform?.name || 'This platform'} quiz is under development. Please check back soon!`);
    }
  };

  const handleExamSelection = (examId: string) => {
    setSelectedExam(examId);
  };

  const handleContinue = () => {
    const platform = cloudPlatforms.find(p => p.id === selectedPlatform);
    if (platform?.available && selectedExam) {
      router.push(`/quiz-setup/customize?exam=${selectedExam}`);
    }
  };

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
                onClick={() => handlePlatformSelection(platform.id)}
                className={`border rounded-xl p-6 transition-all duration-200 ${
                  selectedPlatform === platform.id && platform.available
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-200 dark:ring-blue-800 cursor-pointer'
                    : platform.available
                    ? 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md cursor-pointer'
                    : 'border-gray-200 dark:border-gray-700 opacity-60 cursor-pointer hover:opacity-70'
                }`}
              >
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <img 
                      src={platform.icon} 
                      alt={`${platform.name} logo`}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {platform.name}
                  </h3>
                  {platform.available ? (
                    <span className="text-sm text-muted-foreground">
                      {platform.examCount} exam{platform.examCount !== 1 ? 's' : ''} available
                    </span>
                  ) : (
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

        {/* Step 2: Exam Selection (Show for any selected platform with available exams) */}
        {selectedPlatform && cloudPlatforms.find(p => p.id === selectedPlatform)?.available && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              2. Select {cloudPlatforms.find(p => p.id === selectedPlatform)?.name} Certification Exam
            </h2>
            <div className="grid gap-4">
              {(examTopics.find(topic => topic.id === selectedPlatform)?.examTypes || []).map((exam) => (
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
        {selectedPlatform && selectedExam && cloudPlatforms.find(p => p.id === selectedPlatform)?.available && (
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