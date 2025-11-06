"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { examTopics } from "@/features/exam/constants/examTopics";
import { getExamTopics } from "@/features/exam/constants/examTopicMappings";

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
        const awsExams = examTopics.find(topic => topic.id === "aws")?.examTypes || [];
        return { available: awsExams.length > 0, examCount: awsExams.length };
      case 'azure':
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

export default function FreeTestPage() {
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [showMessage, setShowMessage] = useState<string>("");
  const [cloudPlatforms, setCloudPlatforms] = useState<CloudPlatform[]>([]);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Initialize platforms with dynamic availability checking
  useEffect(() => {
    setIsVisible(true);
    const platforms = [
      { id: "aws", name: "Amazon Web Services", icon: "/aws_logo.svg" },
      { id: "azure", name: "Microsoft Azure", icon: "/azure_logo.svg" },
      { id: "gcp", name: "Google Cloud Platform", icon: "/gcp_logo.svg" }
    ];

    const updatedPlatforms: CloudPlatform[] = platforms.map(platform => {
      const { available, examCount} = checkPlatformAvailability(platform.id);
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
      setSelectedQuizOption("");
      setSelectedTopics([]);
      setShowMessage("");
    } else {
      setSelectedPlatform("");
      setSelectedExam("");
      setSelectedQuizOption("");
      setSelectedTopics([]);
      setShowMessage(`${platform?.name || 'This platform'} quiz is under development. Please check back soon!`);
    }
  };

  const handleExamSelection = (examId: string) => {
    setSelectedExam(examId);
    setSelectedQuizOption("");
    setSelectedTopics([]);
  };

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(topic)) {
        return prev.filter(t => t !== topic);
      } else {
        return [...prev, topic];
      }
    });
  };

  // Get current exam data
  const getCurrentExamData = () => {
    if (!selectedExam) return null;
    return examTopics.find(topic => topic.id === selectedPlatform)?.examTypes.find(exam => exam.id === selectedExam);
  };

  const handleStartTest = () => {
    const platform = cloudPlatforms.find(p => p.id === selectedPlatform);
    if (platform?.available && selectedExam && selectedQuizOption) {
      if (selectedQuizOption === "complete") {
        router.push(`/free-test/quiz?platform=${selectedPlatform}&exam=${selectedExam}&type=complete`);
      } else if (selectedQuizOption === "customize" && selectedTopics.length >= 3) {
        const encodedTopics = btoa(JSON.stringify(selectedTopics));
        router.push(`/free-test/quiz?platform=${selectedPlatform}&exam=${selectedExam}&type=custom&topics=${encodedTopics}`);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Back Button */}
        <div className={`mb-8 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Link 
            href="/" 
            className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 mb-6 transition-all duration-200 hover:gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-3">
              <span className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 bg-clip-text text-transparent animate-gradient">
                🎯 Free Demo Test Setup
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base max-w-2xl mx-auto">
              Configure your free demo test with sample questions - experience our complete quiz setup without signup!
            </p>
          </div>
        </div>

        {/* Step 1: Cloud Platform Selection */}
        <div className={`mb-10 mt-5 transition-all duration-1000 ease-out animate-fade-in-up ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                Select Cloud Platform
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Choose your preferred cloud service provider
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {cloudPlatforms.map((platform, index) => (
              <div
                key={platform.id}
                onClick={() => handlePlatformSelection(platform.id)}
                className={`bg-white dark:bg-slate-800 rounded-lg p-4 transition-all duration-300 animate-fade-in-up group cursor-pointer transform hover:scale-105 ${
                  selectedPlatform === platform.id && platform.available
                    ? 'ring-2 ring-emerald-500 shadow-lg border-2 border-emerald-500'
                    : platform.available
                    ? 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    : 'opacity-60 border border-slate-200 dark:border-slate-700 hover:opacity-70'
                }`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="p-2 group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={platform.icon} 
                        alt={`${platform.name} logo`}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                    {platform.name}
                  </h3>
                  {platform.available ? (
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 mb-2 text-sm">
                        {platform.examCount} certification{platform.examCount !== 1 ? 's' : ''} available
                      </p>
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 animate-pulse">
                        ✓ Ready
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-500 dark:text-slate-500 mb-2 text-sm">
                        Demo quizzes in development
                      </p>
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                        ⏳ Coming Soon
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Platform unavailable message */}
          {showMessage && (
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg animate-fade-in-up">
              <p className="text-amber-800 dark:text-amber-300 text-sm">{showMessage}</p>
            </div>
          )}
        </div>

        {/* Step 2: Certification Selection */}
        {selectedPlatform && !showMessage && (
          <div className="mb-10 transition-all duration-1000 ease-out animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  Choose Certification Exam
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Select an exam to practice with demo questions
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {examTopics
                .find(topic => topic.id === selectedPlatform)
                ?.examTypes.map((exam, index) => (
                  <div
                    key={exam.id}
                    onClick={() => handleExamSelection(exam.id)}
                    className={`bg-white dark:bg-slate-800 rounded-lg p-5 transition-all duration-300 animate-fade-in-up cursor-pointer ${
                      selectedExam === exam.id
                        ? 'ring-2 ring-emerald-500 shadow-lg border-2 border-emerald-500'
                        : 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    }`}
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">
                          {exam.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            exam.level === 'Foundational' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                              : exam.level === 'Associate'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                          }`}>
                            {exam.level}
                          </span>
                          {exam.examCode && (
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {exam.examCode}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          {exam.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{exam.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Demo questions</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Step 3: Quiz Type Selection */}
        {selectedExam && (
          <div className="mb-10 transition-all duration-1000 ease-out animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  Choose Quiz Type
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Select how you want to take the demo test
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Complete Quiz Option */}
              <div
                onClick={() => setSelectedQuizOption("complete")}
                className={`bg-white dark:bg-slate-800 rounded-lg p-6 transition-all duration-300 cursor-pointer ${
                  selectedQuizOption === "complete"
                    ? 'ring-2 ring-emerald-500 shadow-lg border-2 border-emerald-500'
                    : 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    selectedQuizOption === "complete"
                      ? 'bg-emerald-100 dark:bg-emerald-900/30'
                      : 'bg-slate-100 dark:bg-slate-700'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                      selectedQuizOption === "complete"
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-600 dark:text-slate-400'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">
                      Complete Demo Test
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Practice with all available demo questions from all exam domains
                    </p>
                    <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>All domains included</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customize Quiz Option */}
              <div
                onClick={() => setSelectedQuizOption("customize")}
                className={`bg-white dark:bg-slate-800 rounded-lg p-6 transition-all duration-300 cursor-pointer ${
                  selectedQuizOption === "customize"
                    ? 'ring-2 ring-emerald-500 shadow-lg border-2 border-emerald-500'
                    : 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    selectedQuizOption === "customize"
                      ? 'bg-emerald-100 dark:bg-emerald-900/30'
                      : 'bg-slate-100 dark:bg-slate-700'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                      selectedQuizOption === "customize"
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-600 dark:text-slate-400'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">
                      Customize by Topics
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Choose specific exam domains/topics you want to practice
                    </p>
                    <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Select at least 3 topics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Topic Selection (for customize option) */}
        {selectedQuizOption === "customize" && getCurrentExamData() && (
          <div className="mb-10 transition-all duration-1000 ease-out animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                4
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  Select Topics
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Choose at least 3 topics to include in your demo test ({selectedTopics.length} selected)
                </p>
              </div>
            </div>

            {/* Display topics by category */}
            <div className="space-y-6">
              {Object.entries(getExamTopics(selectedExam)).map(([category, topics], catIndex) => (
                <div
                  key={category}
                  className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 animate-fade-in-up"
                  style={{ animationDelay: `${0.05 * catIndex}s` }}
                >
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4">
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {topics.map((topic) => {
                      const isSelected = selectedTopics.includes(topic);
                      return (
                        <button
                          key={topic}
                          onClick={() => handleTopicToggle(topic)}
                          className={`text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                            isSelected
                              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 shadow-md'
                              : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                              isSelected
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-sm font-medium ${
                              isSelected 
                                ? 'text-emerald-900 dark:text-emerald-100' 
                                : 'text-slate-700 dark:text-slate-300'
                            }`}>
                              {topic}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {selectedExam && selectedQuizOption && (
          <div className="mt-8 animate-fade-in-up text-center">
            <Button
              onClick={handleStartTest}
              disabled={selectedQuizOption === "customize" && selectedTopics.length < 3}
              size="lg"
              className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 hover:from-emerald-700/90 hover:to-teal-700/90 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 transform hover:scale-105 text-white px-8 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Demo Test
              {selectedQuizOption === "customize" && selectedTopics.length >= 3 && ` (${selectedTopics.length} topics)`}
            </Button>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              No time limits • Review answers immediately • Try different certifications
            </p>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-12 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-slate-900/30 dark:to-slate-800/30 rounded-xl p-6 border border-emerald-200 dark:border-emerald-900/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">
                About Free Demo Tests
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                  <span><strong>Same Setup as Full Quiz:</strong> Experience the exact certification selection and customization options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                  <span><strong>Complete or Customize:</strong> Take full demo or focus on specific exam domains</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                  <span><strong>All Certifications:</strong> Try demos from all available AWS and Azure certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                  <span><strong>No Registration:</strong> Experience our platform instantly without creating an account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                  <span><strong>Unlock More:</strong> Sign up for unlimited AI-generated questions and full quiz lengths</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
