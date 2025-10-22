"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { examTopics } from "@/utils/constants";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="space-y-6">
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight transition-all duration-1200 ease-out delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                 Challenge Your Cloud Knowledge
                </span>
                <br />
                <span className="text-foreground">
                  with Practical AI Quizzes
                </span>
              </h1>
              
              <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed transition-all duration-1000 ease-out delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Technical quizzes help learners deepen their knowledge of AWS concepts and cloud technologies in an interactive, engaging way — encouraging practical understanding, problem-solving skills, and continuous learning to better prepare for certification exams.
              </p>
            </div>
            
        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center mt-16 transition-all duration-1000 ease-out delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Link href="/quiz-setup">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:text-white"
            >
              Start Quiz
            </Button>
          </Link>
          <Link href="/exam-syllabus">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Browse All Exams
            </Button>
          </Link>
        </div>          </div>

          {/* Right Content - Interactive Elements */}
          <div className={`relative flex items-center justify-center transition-all duration-1200 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-12 rotate-12'
          }`}>
            {/* Central Circle */}
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl flex items-center justify-center text-white animate-pulse-slow hover:scale-105 transition-transform duration-500">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-white/20 flex items-center justify-center animate-bounce">
                    🎓
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Learn & Test</h3>
                  <p className="text-lg opacity-90">Your Knowledge</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-yellow-400 shadow-lg flex items-center justify-center text-white text-2xl animate-spin-slow hover:animate-bounce">
                ⭐
              </div>
              
              <div className="absolute -top-8 -left-12 w-14 h-14 rounded-full bg-blue-400 shadow-lg flex items-center justify-center text-white text-xl animate-bounce hover:animate-pulse">
                🚀
              </div>
              
              <div className="absolute top-1/2 -right-16 transform -translate-y-1/2 w-12 h-12 rounded-full bg-red-400 shadow-lg flex items-center justify-center text-white animate-ping-slow hover:animate-spin">
                🎯
              </div>
              
              <div className="absolute -bottom-4 right-8 w-18 h-18 rounded-full bg-green-400 shadow-lg flex items-center justify-center text-white text-2xl animate-pulse hover:animate-bounce">
                ✓
              </div>
              
              <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-purple-400 shadow-lg flex items-center justify-center text-white text-xl animate-pulse hover:animate-ping">
                💡
              </div>
              
              <div className="absolute top-1/4 -left-20 w-14 h-14 rounded-full bg-indigo-400 shadow-lg flex items-center justify-center text-white animate-spin-slow hover:animate-bounce">
                ⏰
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-200/30 dark:bg-blue-800/30 blur-xl animate-pulse-slow"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-purple-200/30 dark:bg-purple-800/30 blur-xl animate-pulse-slow animation-delay-500"></div>
              <div className="absolute top-1/2 right-1/2 w-24 h-24 rounded-full bg-indigo-200/30 dark:bg-indigo-800/30 blur-xl animate-pulse-slow animation-delay-1000"></div>
            </div>
          </div>
        </div>

        
      </div>
    </main>
  );
}
