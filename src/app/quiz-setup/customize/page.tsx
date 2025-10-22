"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { examTopics } from "@/utils/constants";

function QuizCustomizeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const examId = searchParams.get("exam");
  const selectedTopicsParam = searchParams.get("selectedTopics");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [preSelectedTopics, setPreSelectedTopics] = useState<string[]>([]);

  // Parse selected topics from URL parameter
  useEffect(() => {
    if (selectedTopicsParam) {
      try {
        // Try Base64 decoding first
        const decodedParam = atob(selectedTopicsParam);
        const topics = JSON.parse(decodedParam);
        setPreSelectedTopics(topics);
        setSelectedOption("customize"); // Auto-select customize option
        
        // Scroll to selected topics section after a short delay to ensure content is rendered
        setTimeout(() => {
          const selectedTopicsSection = document.getElementById('selected-topics-section');
          if (selectedTopicsSection) {
            selectedTopicsSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 500);
        
      } catch (base64Error) {
        console.error("Error parsing selected topics with Base64:", base64Error);
        // Fallback to URI decoding
        try {
          const decodedParam = decodeURIComponent(selectedTopicsParam);
          const topics = JSON.parse(decodedParam);
          setPreSelectedTopics(topics);
          setSelectedOption("customize");
          
          // Scroll to selected topics section
          setTimeout(() => {
            const selectedTopicsSection = document.getElementById('selected-topics-section');
            if (selectedTopicsSection) {
              selectedTopicsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
              });
            }
          }, 500);
          
        } catch (secondError) {
          console.error("URI decoding also failed:", secondError);
          // Last fallback - try direct parsing
          try {
            const topics = JSON.parse(selectedTopicsParam);
            setPreSelectedTopics(topics);
            setSelectedOption("customize");
            
            // Scroll to selected topics section
            setTimeout(() => {
              const selectedTopicsSection = document.getElementById('selected-topics-section');
              if (selectedTopicsSection) {
                selectedTopicsSection.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start' 
                });
              }
            }, 500);
            
          } catch (thirdError) {
            console.error("All parsing attempts failed:", thirdError);
          }
        }
      }
    }
  }, [selectedTopicsParam]);

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

  const handleOptionSelection = (option: string) => {
    setSelectedOption(option);
    
    // Clear selected topics if "complete" quiz is selected
    if (option === "complete") {
      setPreSelectedTopics([]);
    }
  };

  const handleStartQuiz = () => {
    if (selectedOption === "complete") {
      // Route to instructions page for complete quiz
      router.push(`/instructions?exam=${examId}&type=complete`);
    } else if (selectedOption === "customize") {
      if (preSelectedTopics.length > 0) {
        // Route to instructions page for custom quiz with selected topics
        const topicsString = JSON.stringify(preSelectedTopics);
        const encodedTopics = btoa(topicsString); // Use Base64 encoding
        router.push(`/instructions?exam=${examId}&type=custom&topics=${encodedTopics}`);
      } else {
        // If no topics are pre-selected, go to topic selection page
        router.push(`/exam/${examId}`);
      }
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
          <Link href="/quiz-setup">
            <Button variant="outline">Back to Quiz Setup</Button>
          </Link>
        </div>
      </main>
    );
  }

  const { exam, provider } = examData;

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image 
              src={provider.icon} 
              alt={`${provider.name} logo`}
              width={48}
              height={48}
              className="object-contain"
            />
            <h1 className="text-4xl font-bold text-foreground">
              {exam.name}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Choose your quiz preference
          </p>
        </div>

        {/* Exam Info Summary */}
        <div className="bg-card border rounded-xl p-6 mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Exam Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground mb-3">{exam.description}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-sm"><strong>Level:</strong> {exam.level}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span className="text-sm"><strong>Duration:</strong> {exam.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm"><strong>Questions:</strong> {exam.questionCount}</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">Exam Domains:</h3>
              <ul className="space-y-1">
                {exam.categories.map((category, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Do you want to take the complete quiz or customize the exam topics?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Complete Quiz Option */}
            <div
              onClick={() => handleOptionSelection("complete")}
              className={`border rounded-xl p-8 cursor-pointer transition-all duration-200 ${
                selectedOption === "complete"
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-200 dark:ring-blue-800'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg'
              }`}
            >
              <div className="text-center">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Complete Quiz
                </h3>
                <p className="text-muted-foreground mb-4">
                  Take the full certification quiz covering all exam domains and topics
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>All {exam.categories.length} domains included</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Comprehensive assessment</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span>Exam-like experience</span>
                  </div>
                </div>
                {selectedOption === "complete" && (
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      ✓ Selected
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Customize Quiz Option */}
            <div
              onClick={() => handleOptionSelection("customize")}
              className={`border rounded-xl p-8 cursor-pointer transition-all duration-200 ${
                selectedOption === "customize"
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-200 dark:ring-blue-800'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg'
              }`}
            >
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Customize Topics
                </h3>
                <p className="text-muted-foreground mb-4">
                  {preSelectedTopics.length > 0 
                    ? `Start quiz with your ${preSelectedTopics.length} selected topics` 
                    : "Select specific topics and domains you want to focus on"
                  }
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>{preSelectedTopics.length > 0 ? `${preSelectedTopics.length} topics ready` : "Choose specific topics"}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                    <span>Targeted practice</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    <span>Personalized learning</span>
                  </div>
                </div>
                {selectedOption === "customize" && (
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      ✓ Selected
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Topics Display */}
        {preSelectedTopics.length > 0 && selectedOption === "customize" && (
          <div 
            id="selected-topics-section"
            className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Your Selected Topics ({preSelectedTopics.length})
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Encode current topics to pass them back for editing
                  const topicsString = JSON.stringify(preSelectedTopics);
                  const encodedTopics = btoa(topicsString);
                  router.push(`/exam/${examId}?selectedTopics=${encodedTopics}`);
                }}
                className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900"
              >
                Update Topics
              </Button>
            </div>
            <p className="text-muted-foreground mb-4">
              You have pre-selected the following topics for your custom quiz:
            </p>
            <div className="flex flex-wrap gap-2">
              {preSelectedTopics.map((topicId, index) => {
                const [category, topic] = topicId.split('|');
                const categoryShort = category.split('(')[0].trim();
                
                return (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm border border-blue-200 dark:border-blue-700"
                  >
                    <span className="font-medium">{categoryShort}:</span>
                    <span>{topic}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Start Quiz Button */}
        {selectedOption && (
          <div className="text-center mb-8">
            <Button 
              onClick={handleStartQuiz}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
            >
              {selectedOption === "complete" 
                ? "Start Complete Quiz" 
                : preSelectedTopics.length > 0 
                  ? `Start Custom Quiz (${preSelectedTopics.length} topics)` 
                  : "Select Topics"
              }
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center space-x-4">
          <Link href="/quiz-setup">
            <Button variant="outline">
              Back to Setup
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

export default function QuizCustomizePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background py-12">
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
      <QuizCustomizeContent />
    </Suspense>
  );
}