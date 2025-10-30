"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import { examTopics } from "@/utils/constants";
import { ChevronLeft, Clock, FileText, Target, BookOpen, ArrowLeft, CheckCircle } from "lucide-react";

interface ExamDomain {
  domain: string;
  topics: string[];
}

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
  detailedSyllabus?: ExamDomain[];
}

export default function ExamSyllabusPage() {
  const [viewingDetailedSyllabus, setViewingDetailedSyllabus] = useState<string | null>(null);

  const getBadgeClass = (level: string) => {
    switch (level.toLowerCase()) {
      case "foundational":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "associate":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "professional":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-slate-800/50 dark:text-slate-300";
    }
  };

  // Find the detailed exam for the syllabus view
  const detailedExam = viewingDetailedSyllabus 
    ? examTopics.flatMap(provider => provider.examTypes).find(exam => exam.id === viewingDetailedSyllabus)
    : null;

  // If viewing detailed syllabus, show that view
  if (viewingDetailedSyllabus && detailedExam) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Button 
              onClick={() => setViewingDetailedSyllabus(null)}
              variant="ghost" 
              className="mb-4 text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 hover:gap-3 inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 hover:-translate-x-1" />
              Back to All Exams
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {detailedExam.name}
              </h1>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getBadgeClass(detailedExam.level)}`}>
                {detailedExam.level}
              </div>
            </div>
            
            <div className="gap-4 mb-6 flex justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{detailedExam.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" />
                <span className="font-medium">{detailedExam.questionCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                <span className="font-medium">Score: {detailedExam.passingScore}</span>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground">{detailedExam.description}</p>
          </div>

          {/* Detailed Syllabus */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Detailed Exam Domains</h2>
            
            {detailedExam.detailedSyllabus?.map((domain: ExamDomain, index: number) => (
              <Card 
                key={index} 
                className="overflow-hidden bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-slate-800/70 dark:to-slate-700/70">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {domain.domain}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {domain.topics.map((topic: string, topicIndex: number) => (
                      <div key={topicIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )) || (
              <Card className="bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-900 border-gray-200 dark:border-slate-700">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">
                    Detailed syllabus information is being updated. Please check back soon.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link href={`/quiz-setup?exam=${detailedExam.id}`}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600/90 to-purple-600/90
                           hover:from-blue-700/90 hover:to-purple-700/90 transition-all 
                           duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                Start Practice Quiz
              </Button>
            </Link>
            <Button 
              onClick={() => setViewingDetailedSyllabus(null)}
              variant="outline" 
              size="lg"
              className="transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              Browse Other Exams
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200 hover:gap-2">
            <ChevronLeft className="w-4 h-4 mr-1 transition-transform duration-200" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 bg-clip-text text-transparent animate-gradient">
              Cloud Certification
            </span>{" "}
            Exam Syllabus
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore comprehensive certification exam details from multiple cloud providers including AWS, Azure, and GCP. 
            Get detailed syllabus breakdown, exam format, and key topics for your certification journey across different platforms.
          </p>
        </div>

        {/* Certification Providers Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {examTopics.map((provider, index) => (
            <AccordionItem 
              key={provider.id} 
              value={provider.id} 
              className="border rounded-lg bg-gradient-to-br from-white/80 to-gray-50/60 dark:from-slate-900/90 dark:to-slate-800/70 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gradient-to-br hover:from-gray-50/80 hover:to-gray-100/60 dark:hover:from-slate-800/80 dark:hover:to-slate-700/60 transition-all duration-300 bg-gradient-to-br from-white/80 to-gray-50/60 dark:from-slate-900/90 dark:to-slate-800/70 group">
                <div className="flex items-center gap-4 w-full">
                  <Image 
                    src={provider.icon} 
                    alt={`${provider.name} logo`}
                    width={48}
                    height={48}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="text-left flex-1">
                    <h2 className="text-xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{provider.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{provider.description}</p>
                  </div>
                  <div className="text-right">
                    {provider.examTypes.length > 0 ? (
                      <div className="flex items-center gap-2 ">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          ✓ {provider.examTypes.length} exam{provider.examTypes.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                        🚧 Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 bg-gradient-to-br from-white/70 to-gray-50/50 dark:from-slate-900/80 dark:to-slate-800/60 animate-fade-in">
                {provider.examTypes.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b p-2 mt-2">
                      <p className="text-sm text-muted-foreground">
                        Available certification tracks for {provider.name}
                      </p>
                      <Link 
                        href="/quiz-setup" 
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-all duration-200 hover:gap-1 inline-flex items-center"
                      >
                        Start Practice <span className="transition-transform duration-200 hover:translate-x-1">→</span>
                      </Link>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {provider.examTypes.map((exam, examIndex) => (
                  <Card 
                    key={exam.id}
                    className="transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:transform hover:scale-[1.02] bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 animate-fade-in-up group"
                    style={{ animationDelay: `${(examIndex + 1) * 150}ms` }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{exam.name}</CardTitle>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 transition-transform duration-200 group-hover:scale-105 ${getBadgeClass(exam.level)}`}>
                          {exam.level}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4 transition-colors duration-200 group-hover:text-blue-500" />
                        <span>{exam.examCode}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {exam.description}
                      </p>
                      
                      {/* Exam Details */}
                      <div className="grid gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{exam.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-green-500" />
                          <span>{exam.questionCount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-orange-500" />
                          <span>Score: {exam.passingScore}</span>
                        </div>
                      </div>

                      

                      {/* Action Button */}
                      <div className="pt-4">
                        <Button 
                          onClick={() => setViewingDetailedSyllabus(exam.id)}
                          className="w-full bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-700/90 hover:to-purple-700/90 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:scale-[1.02]"
                        >
                          View Detailed Syllabus
                        </Button>
                      </div>


                    </CardContent>
                  </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Certification exams for this platform are coming soon!</p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom CTA */}
        
      </div>
    </main>
  );
}