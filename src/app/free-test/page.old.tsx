"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { demoQuestions, getDemoCertifications } from "@/constants/demoQuestions";

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
    setSelectedCertification(""); // Reset certification when platform changes
  };

  const handleCertificationSelection = (certId: string) => {
    setSelectedCertification(certId);
  };

  const handleStartTest = () => {
    if (selectedPlatform && selectedCertification) {
      router.push(`/free-test/quiz?platform=${selectedPlatform}&cert=${selectedCertification}`);
    }
  };

  const selectedPlatformCerts = selectedPlatform 
    ? getDemoCertifications(selectedPlatform)
    : [];

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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Start Button */}
        {selectedPlatform && selectedCertification && (
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
                  <span><strong>Sample Questions:</strong> Try 5 carefully selected questions from each certification</span>
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
