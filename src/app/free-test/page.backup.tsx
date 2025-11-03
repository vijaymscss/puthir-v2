"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { demoQuestions, getDemoCertifications, getCertificationTopics } from "@/constants/demoQuestions";

interface CloudPlatform {
  id: string;
  name: string;
  icon: string;
  certCount: number;
}

export default function FreeTestPage() {
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [selectedCertification, setSelectedCertification] = useState<string>("");
  const [selectedQuizOption, setSelectedQuizOption] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const cloudPlatforms: CloudPlatform[] = demoQuestions.map(platform => ({
    id: platform.id,
    name: platform.name,
    icon: platform.icon,
    certCount: platform.certifications.length
  }));

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePlatformSelection = (platformId: string) => {
    setSelectedPlatform(platformId);
    setSelectedCertification("");
    setSelectedQuizOption("");
    setSelectedTopics([]);
  };

  const handleCertificationSelection = (certId: string) => {
    setSelectedCertification(certId);
    setSelectedQuizOption("");
    setSelectedTopics([]);
  };

  const handleQuizOptionSelection = (option: string) => {
    setSelectedQuizOption(option);
    if (option === "complete") {
      setSelectedTopics([]);
    }
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

  const handleStartTest = () => {
    if (selectedPlatform && selectedCertification && selectedQuizOption) {
      if (selectedQuizOption === "complete") {
        router.push(`/free-test/quiz?platform=${selectedPlatform}&cert=${selectedCertification}&type=complete`);
      } else if (selectedQuizOption === "customize" && selectedTopics.length >= 2) {
        const encodedTopics = btoa(JSON.stringify(selectedTopics));
        router.push(`/free-test/quiz?platform=${selectedPlatform}&cert=${selectedCertification}&type=custom&topics=${encodedTopics}`);
      }
    }
  };

  const selectedPlatformCerts = selectedPlatform 
    ? getDemoCertifications(selectedPlatform)
    : [];

  const availableTopics = (selectedPlatform && selectedCertification)
    ? getCertificationTopics(selectedPlatform, selectedCertification)
    : [];

  const canProceed = selectedPlatform && selectedCertification && selectedQuizOption &&
    (selectedQuizOption === "complete" || (selectedQuizOption === "customize" && selectedTopics.length >= 2));

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
                🎯 Free Demo Test
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl mx-auto">
              Try our platform with sample questions from various cloud certifications - no signup required!
            </p>
          </div>
        </div>

        {/* Step 1: Cloud Platform Selection */}
        <div className={`mb-10 transition-all duration-1000 ease-out animate-fade-in-up ${
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
                  selectedPlatform === platform.id
                    ? 'ring-2 ring-emerald-500 shadow-lg border-2 border-emerald-500'
                    : 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-emerald-300'
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
                  <p className="text-slate-600 dark:text-slate-400 mb-2 text-sm">
                    {platform.certCount} demo certification{platform.certCount !== 1 ? 's' : ''}
                  </p>
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                    ✓ Available
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Certification Selection */}
        {selectedPlatform && (
          <div className={`mb-10 transition-all duration-1000 ease-out animate-fade-in-up`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  Choose Certification Level
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Select a certification to preview sample questions
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {selectedPlatformCerts.map((cert, index) => (
                <div
                  key={cert.id}
                  onClick={() => handleCertificationSelection(cert.id)}
                  className={`bg-white dark:bg-slate-800 rounded-lg p-5 transition-all duration-300 animate-fade-in-up cursor-pointer ${
                    selectedCertification === cert.id
                      ? 'ring-2 ring-emerald-500 shadow-lg border-2 border-emerald-500'
                      : 'hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                  }`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">
                        {cert.name}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        cert.level === 'Foundational' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                      }`}>
                        {cert.level}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{cert.questions.length} demo questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span>{cert.categories.length} categories</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Quiz Type Selection */}
        {selectedPlatform && selectedCertification && (
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
              {/* Complete Test Option */}
              <div
                onClick={() => handleQuizOptionSelection("complete")}
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
                      Complete Test
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Practice with all available demo questions from all topics
                    </p>
                    <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>All {availableTopics.length} topics included</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customize Test Option */}
              <div
                onClick={() => handleQuizOptionSelection("customize")}
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
                      Choose specific topics you want to practice
                    </p>
                    <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Select at least 2 topics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Topic Selection (if customize is selected) */}
        {selectedQuizOption === "customize" && availableTopics.length > 0 && (
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
                  Choose at least 2 topics to include in your demo test ({selectedTopics.length} selected)
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {availableTopics.map((topic, index) => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    onClick={() => handleTopicToggle(topic)}
                    className={`text-left p-4 rounded-lg border-2 transition-all duration-200 animate-fade-in-up ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 shadow-md'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10'
                    }`}
                    style={{ animationDelay: `${0.05 * index}s` }}
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
        )}

        {/* Start Button */}
        {canProceed && (
          <div className="mt-8 animate-fade-in-up text-center">
            <Button
              onClick={handleStartTest}
              size="lg"
              className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 hover:from-emerald-700/90 hover:to-teal-700/90 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 transform hover:scale-105 text-white px-8 py-6 text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Demo Test
              {selectedQuizOption === "customize" && ` (${selectedTopics.length} topics)`}
            </Button>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              No time limits • Review answers immediately • Try different configurations
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
                  <span><strong>Sample Questions:</strong> Try carefully selected questions from each certification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                  <span><strong>Complete or Customize:</strong> Take the full demo or focus on specific topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                  <span><strong>No Registration:</strong> Experience our platform instantly without creating an account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                  <span><strong>Full Features:</strong> Explore question formats, difficulty levels, and detailed explanations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                  <span><strong>Unlock More:</strong> Sign up for unlimited AI-generated questions and advanced features</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
