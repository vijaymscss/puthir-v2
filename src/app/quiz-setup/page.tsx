"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { examTopics } from "@/features/exam/constants/examTopics";
import { getExamTopics } from "@/features/exam/constants/examTopicMappings";

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
      setSelectedQuizOption(""); // Reset quiz option when platform changes
      setSelectedTopics([]); // Reset selected topics when platform changes
      setShowMessage("");
    } else {
      // Clear all selections when selecting a disabled platform
      setSelectedPlatform("");
      setSelectedExam("");
      setSelectedQuizOption("");
      setSelectedTopics([]);
      setShowMessage(`${platform?.name || 'This platform'} quiz is under development. Please check back soon!`);
    }
  };

  const handleExamSelection = (examId: string) => {
    setSelectedExam(examId);
    setSelectedQuizOption(""); // Reset quiz option when exam changes
    setSelectedTopics([]); // Reset selected topics when exam changes
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

  const handleContinue = () => {
    const platform = cloudPlatforms.find(p => p.id === selectedPlatform);
    if (platform?.available && selectedExam && selectedQuizOption) {
      if (selectedQuizOption === "complete") {
        router.push(`/instructions?exam=${selectedExam}&type=complete`);
      } else if (selectedQuizOption === "customize" && selectedTopics.length >= 3) {
        const encodedTopics = btoa(JSON.stringify(selectedTopics));
        router.push(`/instructions?exam=${selectedExam}&type=custom&topics=${encodedTopics}`);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-3 animate-fade-in-up">
            🚀 Quiz Setup
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Configure your cloud certification practice quiz in a few simple steps
          </p>
        </div>

        {/* Step 1: Cloud Platform Selection */}
        <div className={`mb-10 mt-5 transition-all duration-1000 ease-out animate-fade-in-up ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-6">
            
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                1. Select Cloud Platform
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
                    ? 'ring-2 ring-blue-500 shadow-lg border-2 border-blue-500'
                    : platform.available
                    ? 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-blue-300'
                    : 'opacity-60 border border-slate-200 dark:border-slate-700 hover:opacity-70'
                }`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="p-2 group-hover:scale-110 transition-transform duration-300">
                      <Image 
                        src={platform.icon} 
                        alt={`${platform.name} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
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
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 animate-pulse">
                        ✓ Ready
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-500 dark:text-slate-500 mb-2 text-sm">
                        Certification quizzes in development
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

          {/* Development Message */}
          {showMessage && (
            <div className="mt-10 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg animate-fade-in-up">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-sm">⚠️</span>
                </div>
                <p className="text-amber-800 dark:text-amber-200 font-medium text-sm">
                  {showMessage}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Exam Selection (Show for any selected platform with available exams) */}
        {selectedPlatform && cloudPlatforms.find(p => p.id === selectedPlatform)?.available && (
          <div className="mb-10 mt-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-6">
              
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  2. Select {cloudPlatforms.find(p => p.id === selectedPlatform)?.name} Certification
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Choose the certification exam you want to practice for
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              {(examTopics.find(topic => topic.id === selectedPlatform)?.examTypes || []).map((exam, index) => (
                <div
                  key={exam.id}
                  onClick={() => handleExamSelection(exam.id)}
                  className={`bg-white dark:bg-slate-800 rounded-lg p-4 cursor-pointer transition-all duration-300 animate-fade-in-up transform hover:scale-102 hover:shadow-lg group ${
                    selectedExam === exam.id
                      ? 'ring-2 ring-blue-500 shadow-lg border-2 border-blue-500'
                      : 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {exam.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold animate-pulse ${
                          exam.level === 'Foundational' 
                            ? 'bg-green-500 text-white' 
                            : exam.level === 'Associate'
                            ? 'bg-blue-500 text-white'
                            : 'bg-purple-500 text-white'
                        }`}>
                          {exam.level}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">
                        {exam.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                          <span className="text-blue-500">📝</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{exam.questionCount}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                          <span className="text-green-500">⏱️</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{exam.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                          <span className="text-purple-500">🎯</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{exam.examCode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Quiz Options */}
        {selectedPlatform && selectedExam && cloudPlatforms.find(p => p.id === selectedPlatform)?.available && (
          <div className="mb-10 mt-20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-3 mb-6">
              
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  3. Choose Your Quiz Type
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Select between complete coverage or focused practice
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Complete Quiz Option */}
              <div
                onClick={() => setSelectedQuizOption("complete")}
                className={`bg-white dark:bg-slate-800 rounded-lg px-7 py-15 cursor-pointer transition-all duration-300 animate-fade-in-up transform hover:scale-101 group ${
                  selectedQuizOption === "complete"
                    ? 'ring-2 ring-blue-500 shadow-lg border-2 border-blue-500'
                    : 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
                style={{ animationDelay: '0.7s' }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-4xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    📝
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Complete Quiz
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">
                    Take the full certification exam with questions covering all domains and topics according to the official exam blueprint.
                  </p>
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium animate-pulse">
                    <span>📋</span>
                    <span>All domains included</span>
                  </div>
                </div>
              </div>

              {/* Customize Quiz Option */}
              <div
                onClick={() => setSelectedQuizOption("customize")}
                className={`bg-white dark:bg-slate-800 rounded-lg px-7 py-15 cursor-pointer transition-all duration-300 animate-fade-in-up transform hover:scale-102 group ${
                  selectedQuizOption === "customize"
                    ? 'ring-2 ring-blue-500 shadow-lg border-2 border-blue-500'
                    : 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
                style={{ animationDelay: '0.8s' }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-5xl group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300">
                    ⚙️
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Customize Quiz
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">
                    Select specific exam domains and topics you want to focus on. Perfect for targeted practice and review.
                  </p>
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium animate-pulse">
                    <span>🎯</span>
                    <span>Focus on specific topics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Topic Selection for Customize Option */}
            {selectedQuizOption === "customize" && (
              <div className="mt-15 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-8 mb-8 border border-blue-200/30 dark:border-blue-800/30">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center justify-center gap-2">
                      <span className="text-3xl">🎯</span>
                      Select Topics to Practice
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
                      Choose the specific areas you want to focus on. Select at least <strong>3 topics</strong> to get started with your customized practice session.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  {Object.entries(getExamTopics(selectedExam)).map(([domain, topics], domainIndex) => (
                    <div key={domain} className="bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-6 border border-slate-200 dark:border-slate-700 animate-fade-in-up transform hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${1.0 + domainIndex * 0.05}s` }}>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {domainIndex + 1}
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex-1">
                          {domain}
                        </h4>
                        <div className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          {topics.length} topics
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {topics.map((topic) => {
                          const isSelected = selectedTopics.includes(topic);
                          return (
                            <label key={topic} className={`flex items-start gap-3 cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 group ${
                              isSelected
                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-600'
                                : 'bg-slate-50/50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                            }`}>
                              <div className="flex-shrink-0 pt-1">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleTopicToggle(topic)}
                                  className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer accent-blue-600 transition-all duration-200"
                                />
                              </div>
                              <div className="flex-1">
                                <span className={`text-sm font-medium transition-colors duration-200 ${
                                  isSelected
                                    ? 'text-blue-700 dark:text-blue-300'
                                    : 'text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                }`}>
                                  {topic}
                                </span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  
                  {/* Selection Status */}
                  {selectedTopics.length > 0 && (
                    <div className={`mt-8 p-6 rounded-xl border-2 transition-all duration-300 animate-fade-in-up ${
                      selectedTopics.length >= 3
                        ? 'bg-green-50/50 dark:bg-green-900/10 border-green-300 dark:border-green-800'
                        : 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-300 dark:border-amber-800'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                            selectedTopics.length >= 3
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                          }`}>
                            {selectedTopics.length}
                          </div>
                          <div>
                            <p className={`font-semibold text-sm ${
                              selectedTopics.length >= 3
                                ? 'text-green-800 dark:text-green-200'
                                : 'text-amber-800 dark:text-amber-200'
                            }`}>
                              {selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''} selected
                            </p>
                            {selectedTopics.length < 3 && (
                              <p className={`text-xs ${
                                'text-amber-700 dark:text-amber-300'
                              }`}>
                                {3 - selectedTopics.length} more needed to start
                              </p>
                            )}
                          </div>
                        </div>
                        <div className={`text-2xl ${selectedTopics.length >= 3 ? 'animate-bounce' : ''}`}>
                          {selectedTopics.length >= 3 ? '✅' : '⏳'}
                        </div>
                      </div>
                      
                      {selectedTopics.length >= 3 && (
                        <div className="mt-4 pt-4 border-t-2 border-green-200 dark:border-green-800">
                          <p className="text-green-700 dark:text-green-300 font-semibold text-sm flex items-center gap-2">
                            <span className="inline-block">✨</span>
                            Great! You&apos;re all set. Click &quot;Start Quiz&quot; to begin your customized practice session.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6 animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
              <Link href="/">
                <Button variant="outline" className="px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300 transform hover:scale-105">
                  ← Back to Home
                </Button>
              </Link>
              
              {selectedQuizOption && (selectedQuizOption === "complete" || (selectedQuizOption === "customize" && selectedTopics.length >= 3)) && (
                <Button 
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-700/90 hover:to-purple-700/90 text-white px-6 py-2 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/20"
                >
                  {selectedQuizOption === "complete" ? "Start Complete Quiz" : "Start Quiz"}
                  <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Navigation - Show Back to Home when no quiz ready */}
        {(!selectedQuizOption || (selectedQuizOption === "customize" && selectedTopics.length < 3)) && (
          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <Link href="/">
              <Button variant="outline" className="px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300 transform hover:scale-105">
                ← Back to Home
              </Button>
            </Link>
          </div>
        )}

        {/* Decorative Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-200/5 dark:bg-blue-800/5 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-200/5 dark:bg-purple-800/5 blur-3xl animate-pulse animation-delay-500"></div>
        </div>
      </div>
    </main>
  );
}