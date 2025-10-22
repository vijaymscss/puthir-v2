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
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "associate":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "professional":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  // Find the detailed exam for the syllabus view
  const detailedExam = viewingDetailedSyllabus 
    ? examTopics.flatMap(provider => provider.examTypes).find(exam => exam.id === viewingDetailedSyllabus)
    : null;

  // If viewing detailed syllabus, show that view
  if (viewingDetailedSyllabus && detailedExam) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Button 
              onClick={() => setViewingDetailedSyllabus(null)}
              variant="ghost" 
              className="mb-4 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
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
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
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
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
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
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">
                    Detailed syllabus information is being updated. Please check back soon.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/quiz-setup?exam=${detailedExam.id}`}>
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Start Practice Quiz
              </Button>
            </Link>
            <Button 
              onClick={() => setViewingDetailedSyllabus(null)}
              variant="outline" 
              size="lg"
            >
              Browse Other Exams
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
          {examTopics.map((provider) => (
            <AccordionItem key={provider.id} value={provider.id} className="border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-800">
                <div className="flex items-center gap-4 w-full">
                  <Image 
                    src={provider.icon} 
                    alt={`${provider.name} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                  <div className="text-left flex-1">
                    <h2 className="text-xl font-bold text-foreground">{provider.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{provider.description}</p>
                  </div>
                  <div className="text-right">
                    {provider.examTypes.length > 0 ? (
                      <div className="flex items-center gap-2 ">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          ✓ {provider.examTypes.length} exam{provider.examTypes.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                        🚧 Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 bg-white dark:bg-gray-800">
                {provider.examTypes.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b p-2 mt-2">
                      <p className="text-sm text-muted-foreground">
                        Available certification tracks for {provider.name}
                      </p>
                      <Link 
                        href="/quiz-setup" 
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                      >
                        Start Practice →
                      </Link>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {provider.examTypes.map((exam) => (
                  <Card 
                    key={exam.id}
                    className="transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.01]"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg font-semibold">{exam.name}</CardTitle>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 ${getBadgeClass(exam.level)}`}>
                          {exam.level}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
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
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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