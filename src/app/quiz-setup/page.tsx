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
  const [selectedQuizOption, setSelectedQuizOption] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

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

  // Get current exam data for topic selection
  const getCurrentExamData = () => {
    if (!selectedExam) return null;
    return examTopics.find(topic => topic.id === selectedPlatform)?.examTypes.find(exam => exam.id === selectedExam);
  };

  // Topic mapping for different exams
  const getExamTopics = (examId: string) => {
    const topicMappings: Record<string, Record<string, string[]>> = {
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
          'AI/ML and Analytics'
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
          'Application Deployment',
          'Testing and Automation',
          'CI/CD Pipelines'
        ],
        'Troubleshooting and Optimization (18%)': [
          'Root Cause Analysis',
          'Code Instrumentation',
          'Performance Optimization'
        ]
      },
      'solutions-architect-associate': {
        'Design Secure Architectures (30%)': [
          'Secure Access Design',
          'Secure Workloads',
          'Data Security Controls'
        ],
        'Design Resilient Architectures (26%)': [
          'Scalable Architectures',
          'High Availability',
          'Disaster Recovery'
        ],
        'Design High-Performing Architectures (24%)': [
          'Storage Solutions',
          'Compute Solutions',
          'Database Solutions',
          'Network Architectures'
        ],
        'Design Cost-Optimized Architectures (20%)': [
          'Cost-Optimized Storage',
          'Cost-Optimized Compute',
          'Cost Management'
        ]
      },
      'data-engineer-associate': {
        'Data Ingestion and Transformation (34%)': [
          'Data Ingestion Solutions',
          'Data Processing',
          'Pipeline Orchestration'
        ],
        'Data Store Management (26%)': [
          'Data Store Selection',
          'Data Cataloging',
          'Data Lifecycle'
        ],
        'Data Operations and Support (22%)': [
          'Data Automation',
          'Pipeline Monitoring',
          'Performance Optimization'
        ],
        'Data Security and Governance (18%)': [
          'Data Authentication',
          'Data Encryption',
          'Data Auditing'
        ]
      },
      // Azure exams
      'azure-fundamentals': {
        'Cloud Concepts (25-30%)': [
          'Cloud Computing Benefits',
          'Shared Responsibility',
          'Cloud Service Types',
          'Consumption Models'
        ],
        'Azure Architecture and Services (35-40%)': [
          'Azure Regions and Zones',
          'Azure Compute Services',
          'Azure Networking',
          'Azure Storage',
          'Azure Databases',
          'Azure Identity'
        ],
        'Azure Management and Governance (30-35%)': [
          'Cost Management',
          'Governance Tools',
          'Management Tools',
          'Monitoring Tools'
        ]
      },
      'azure-developer-associate': {
        'Develop Azure compute solutions (25-30%)': [
          'Virtual Machines',
          'ARM Templates',
          'Container Solutions',
          'App Service',
          'Azure Functions'
        ],
        'Develop for Azure storage (15-20%)': [
          'Cosmos DB',
          'Blob Storage',
          'Azure Files',
          'Cognitive Search'
        ],
        'Implement Azure security (20-25%)': [
          'User Authentication',
          'Key Vault',
          'Managed Identities',
          'Multi-factor Authentication'
        ],
        'Monitor, troubleshoot, and optimize (15-20%)': [
          'Application Insights',
          'Azure Monitor',
          'Caching Solutions',
          'Autoscaling'
        ],
        'Connect to and consume services (15-20%)': [
          'API Management',
          'Service Bus',
          'Event Grid',
          'Microsoft Graph'
        ]
      },
      'azure-solutions-architect-expert': {
        'Design identity, governance, and monitoring (25-30%)': [
          'Governance Solutions',
          'Identity Management',
          'Monitoring Strategy',
          'Secret Management'
        ],
        'Design data storage solutions (25-30%)': [
          'Database Solutions',
          'Data Integration',
          'Storage Accounts',
          'Data Protection'
        ],
        'Design business continuity solutions (10-15%)': [
          'Backup and Recovery',
          'High Availability',
          'Disaster Recovery'
        ],
        'Design infrastructure solutions (25-30%)': [
          'Compute Solutions',
          'Application Architecture',
          'Network Solutions',
          'Messaging Architecture'
        ]
      }
    };

    return topicMappings[examId] || {};
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3">
            Quiz Setup
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl mx-auto">
            Configure your cloud certification practice quiz in a few simple steps
          </p>
        </div>

        {/* Step 1: Cloud Platform Selection */}
        <div className="mb-10 mt-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full text-white font-semibold text-sm">
              1
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                Select Cloud Platform
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Choose your preferred cloud service provider
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {cloudPlatforms.map((platform) => (
              <div
                key={platform.id}
                onClick={() => handlePlatformSelection(platform.id)}
                className={`bg-white dark:bg-slate-800 rounded-lg p-4 transition-all duration-200 ${
                  selectedPlatform === platform.id && platform.available
                    ? 'ring-2 ring-blue-500 shadow-lg border-2 border-blue-500 cursor-pointer'
                    : platform.available
                    ? 'hover:shadow-md border border-slate-200 dark:border-slate-700 cursor-pointer'
                    : 'opacity-60 border border-slate-200 dark:border-slate-700 cursor-pointer hover:opacity-70'
                }`}
              >
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="p-2 ">
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
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Ready
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-500 dark:text-slate-500 mb-2 text-sm">
                        Certification quizzes in development
                      </p>
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                        Coming Soon
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Development Message */}
          {showMessage && (
            <div className="mt-10 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
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
          <div className="mb-10 mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full text-white font-semibold text-sm">
                2
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  Select {cloudPlatforms.find(p => p.id === selectedPlatform)?.name} Certification
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Choose the certification exam you want to practice for
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              {(examTopics.find(topic => topic.id === selectedPlatform)?.examTypes || []).map((exam) => (
                <div
                  key={exam.id}
                  onClick={() => handleExamSelection(exam.id)}
                  className={`bg-white dark:bg-slate-800 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    selectedExam === exam.id
                      ? 'ring-2 ring-blue-500 shadow-lg border-2 border-blue-500'
                      : 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                          {exam.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
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
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                          <span className="text-blue-500">📝</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{exam.questionCount}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                          <span className="text-green-500">⏱️</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{exam.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">
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
          <div className="mb-10 mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full text-white font-semibold text-sm">
                3
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  Choose Your Quiz Type
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Select between complete coverage or focused practice
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6 ">
              {/* Complete Quiz Option */}
              <div
                onClick={() => setSelectedQuizOption("complete")}
                className={`bg-white dark:bg-slate-800 rounded-lg px-7 py-15 cursor-pointer transition-all duration-200 ${
                  selectedQuizOption === "complete"
                    ? 'ring-2 ring-blue-500 shadow-lg border-2 border-blue-500'
                    : 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Complete Quiz
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">
                    Take the full certification exam with questions covering all domains and topics according to the official exam blueprint.
                  </p>
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                    <span>📋</span>
                    <span>All domains included</span>
                  </div>
                </div>
              </div>

              {/* Customize Quiz Option */}
              <div
                onClick={() => setSelectedQuizOption("customize")}
                className={`bg-white dark:bg-slate-800 rounded-lg px-7 py-15 cursor-pointer transition-all duration-200 ${
                  selectedQuizOption === "customize"
                    ? 'ring-2 ring-blue-500 shadow-lg border-2 border-blue-500'
                    : 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-5xl">⚙️</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Customize Quiz
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">
                    Select specific exam domains and topics you want to focus on. Perfect for targeted practice and review.
                  </p>
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                    <span>🎯</span>
                    <span>Focus on specific topics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Topic Selection for Customize Option */}
            {selectedQuizOption === "customize" && (
              <div className="mt-15">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Select Topics to Practice
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Choose the specific areas you want to focus on (minimum 3 topics required)
                  </p>
                </div>
                <div className="space-y-4">
                  {Object.entries(getExamTopics(selectedExam)).map(([domain, topics]) => (
                    <div key={domain} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                      <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {domain}
                      </h4>
                      <div className="grid gap-2">
                        {topics.map((topic) => (
                          <label key={topic} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedTopics.includes(topic)}
                              onChange={() => handleTopicToggle(topic)}
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                            />
                            <span className="text-slate-700 dark:text-slate-300 text-sm">
                              {topic}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  {selectedTopics.length > 0 && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <p className="text-blue-800 dark:text-blue-200 font-semibold text-sm">
                          {selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''} selected
                        </p>
                      </div>
                      {selectedTopics.length < 3 && (
                        <p className="text-center text-blue-600 dark:text-blue-400 text-xs">
                          Select at least {3 - selectedTopics.length} more topic{3 - selectedTopics.length !== 1 ? 's' : ''} to continue
                        </p>
                      )}
                      {selectedTopics.length >= 3 && (
                        <p className="text-center text-green-600 dark:text-green-400 text-xs">
                          Great! You're ready to start your customized quiz
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <Link href="/">
                <Button variant="outline" className="px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  ← Back to Home
                </Button>
              </Link>
              
              {selectedQuizOption && (selectedQuizOption === "complete" || (selectedQuizOption === "customize" && selectedTopics.length >= 3)) && (
                <Button 
                  onClick={handleContinue}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {selectedQuizOption === "complete" ? "Start Complete Quiz" : "Start Quiz"}
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Navigation - Show Back to Home when no quiz ready */}
        {(!selectedQuizOption || (selectedQuizOption === "customize" && selectedTopics.length < 3)) && (
          <div className="text-center mt-8">
            <Link href="/">
              <Button variant="outline" className="px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                ← Back to Home
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}