"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { examTopics } from "@/features/exam/constants/examTopics";
import { useState, useEffect, Suspense } from "react";

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
  detailedSyllabus?: Array<{
    domain: string;
    topics: string[];
  }>;
}

function ExamDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const examId = params.examId as string;
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // Check for pre-selected topics from URL parameters (when coming from Update Topics)
  useEffect(() => {
    const selectedTopicsParam = searchParams.get("selectedTopics");
    if (selectedTopicsParam) {
      try {
        const decodedParam = atob(selectedTopicsParam);
        const topics = JSON.parse(decodedParam);
        setSelectedTopics(topics);
      } catch (error) {
        console.error("Error parsing pre-selected topics:", error);
      }
    }
  }, [searchParams]);

  // Find the exam details
  const examData = (() => {
    for (const topic of examTopics) {
      const exam = topic.examTypes.find(exam => exam.id === examId);
      if (exam) {
        return { exam, provider: topic };
      }
    }
    return null;
  })();

  // Get subtopics for category using updated AWS data
  const getSubtopicsForCategory = (category: string, examId: string) => {
    const topicMapping: Record<string, Record<string, string[]>> = {
      'cloud-practitioner': {
        'Cloud Concepts (24%)': [
          'Cloud Benefits',
          'Design Principles', 
          'Migration Strategies',
          'Cloud Economics'
        ],
        'Security and Compliance (30%)': [
          'Shared Responsibility Model',
          'Security Governance & Compliance',
          'Access Management',
          'Security Resources'
        ],
        'Cloud Technology and Services (34%)': [
          'Deployment and Operations',
          'Global Infrastructure',
          'Compute Services',
          'Database Services',
          'Networking Services',
          'Storage Services',
          'AI/ML and Analytics',
          'Other AWS Services'
        ],
        'Billing, Pricing, and Support (12%)': [
          'Pricing Models',
          'Billing and Cost Management',
          'Support and Resources'
        ]
      },
      'developer-associate': {
        'Development with AWS Services (32%)': [
          'Application Development',
          'AWS Lambda Development',
          'Data Store Integration'
        ],
        'Security (26%)': [
          'Authentication & Authorization',
          'Encryption',
          'Sensitive Data Handling'
        ],
        'Deployment (24%)': [
          'Prepare Artifacts',
          'Testing',
          'Automated Testing',
          'CI/CD Deployment'
        ],
        'Troubleshooting and Optimization (18%)': [
          'Root Cause Analysis',
          'Observability',
          'Performance Optimization'
        ]
      },
      'solutions-architect-associate': {
        'Design Secure Architectures (30%)': [
          'Secure Access',
          'Secure Workloads',
          'Data Security'
        ],
        'Design Resilient Architectures (26%)': [
          'Scalable Architectures',
          'Fault Tolerant Architectures'
        ],
        'Design High-Performing Architectures (24%)': [
          'Storage',
          'Compute',
          'Database',
          'Networking',
          'Data Ingestion & Processing'
        ],
        'Design Cost-Optimized Architectures (20%)': [
          'Storage Cost Optimization',
          'Compute Cost Optimization',
          'Database Cost Optimization',
          'Network Cost Optimization'
        ]
      }
    };
    
    return topicMapping[examId]?.[category] || ['Core Concepts', 'Best Practices', 'Implementation'];
  };

  // Handle topic selection
  const toggleTopicSelection = (topic: string, category: string) => {
    const topicId = `${category}|${topic}`;
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(t => t !== topicId)
        : [...prev, topicId]
    );
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedTopics([]);
  };

  // Select all topics
  const selectAllTopics = () => {
    const allTopics: string[] = [];
    if (examData) {
      examData.exam.categories.forEach(category => {
        const subtopics = getSubtopicsForCategory(category, examData.exam.id);
        subtopics.forEach(subtopic => {
          allTopics.push(`${category}|${subtopic}`);
        });
      });
    }
    setSelectedTopics(allTopics);
  };

  // Handle continue with selected topics
  const handleContinueWithTopics = () => {
    if (selectedTopics.length < 3) {
      // Show a toast or alert if less than 3 topics are selected
      alert(`Please select at least 3 topics to continue. You have selected ${selectedTopics.length} topic${selectedTopics.length === 1 ? '' : 's'}.`);
      return;
    }
    
    if (selectedTopics.length > 0) {
      try {
        // Use Base64 encoding to pass selected topics
        const topicsString = JSON.stringify(selectedTopics);
        const encodedTopics = btoa(topicsString);
        router.push(`/quiz-setup/customize?exam=${examId}&selectedTopics=${encodedTopics}`);
      } catch (error) {
        console.error('Error encoding topics:', error);
        // Fallback to direct navigation without topics
        router.push(`/quiz-setup/customize?exam=${examId}`);
      }
    } else {
      // If no topics selected, go to quiz setup without pre-selected topics
      router.push(`/quiz-setup/customize?exam=${examId}`);
    }
  };

  if (!examData) {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Exam Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The requested exam could not be found.
          </p>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  const { exam, provider } = examData;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Image 
                  src={provider.icon} 
                  alt={`${provider.name} logo`}
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <h1 className="text-3xl font-bold text-foreground">{exam.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  exam.level === 'Foundational' || exam.level === 'Fundamentals' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                }`}>
                  {exam.level}
                </span>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                {exam.description}
              </p>
              <div className="flex flex-wrap gap-6 mt-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <strong>Duration:</strong> {exam.duration}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                  <strong>Questions:</strong> {exam.questionCount}
                </span>
                {exam.examCode && (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <strong>Exam Code:</strong> {exam.examCode}
                  </span>
                )}
                {exam.passingScore && (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <strong>Passing Score:</strong> {exam.passingScore}/1000
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                  <strong>Domains:</strong> {exam.categories.length}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Categories and Topics */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {exam.categories.map((category, categoryIndex) => {
              const subtopics = getSubtopicsForCategory(category, exam.id);
              
              return (
                <div 
                  key={categoryIndex}
                  className="bg-card rounded-xl border shadow-lg overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="bg-blue-600 text-white px-6 py-4">
                    <h3 className="text-xl font-semibold">{category}</h3>
                  </div>
                  
                  {/* Topics Grid */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {subtopics.map((subtopic, subtopicIndex) => {
                        const topicId = `${category}|${subtopic}`;
                        const isSelected = selectedTopics.includes(topicId);
                        
                        return (
                          <div 
                            key={subtopicIndex}
                            onClick={() => toggleTopicSelection(subtopic, category)}
                            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                              isSelected 
                                ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 ring-2 ring-blue-200 dark:ring-blue-700' 
                                : 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                isSelected 
                                  ? 'bg-blue-500 border-blue-500 text-white' 
                                  : 'border-blue-400 dark:border-blue-500'
                              }`}>
                                {isSelected && (
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <h4 className="font-medium text-foreground">{subtopic}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {isSelected ? 'Selected for quiz' : 'Click to select for quiz'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="py-8 border-t bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Selected Topics Summary */}
          {selectedTopics.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">
                  Selected Topics ({selectedTopics.length})
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={selectAllTopics}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearSelections}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTopics.map((topicId, index) => {
                  const [category, topic] = topicId.split('|');
                  const categoryShort = category.split('(')[0].trim();
                  
                  return (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm border border-blue-200 dark:border-blue-700"
                    >
                      <span className="font-medium">{categoryShort}:</span>
                      <span>{topic}</span>
                      <button
                        onClick={() => toggleTopicSelection(topic, category)}
                        className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Minimum Selection Notice */}
          {selectedTopics.length > 0 && selectedTopics.length < 3 && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400">ℹ️</span>
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  Please select at least 3 topics to continue with your custom quiz.
                </p>
              </div>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                You have selected {selectedTopics.length} topic{selectedTopics.length === 1 ? '' : 's'}. Select {3 - selectedTopics.length} more to proceed.
              </p>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Link href="/">
              <Button variant="outline" size="lg">
                ← Back to Home
              </Button>
            </Link>
            <Button 
              onClick={handleContinueWithTopics}
              size="lg"
              disabled={selectedTopics.length < 3}
              className={`${
                selectedTopics.length >= 3
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  : 'bg-blue-200 dark:bg-blue-800 text-blue-600 dark:text-blue-300 cursor-not-allowed'
              }`}
            >
              {selectedTopics.length < 3 
                ? `Continue (${selectedTopics.length}/3 topics minimum)` 
                : `Continue (${selectedTopics.length} topics)`} →
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ExamDetailsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </main>
    }>
      <ExamDetailsContent />
    </Suspense>
  );
}