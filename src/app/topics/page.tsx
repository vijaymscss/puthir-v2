"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import Link from "next/link";
import { examTopics } from "@/features/exam/constants/examTopics";

export default function TopicsPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Exam Topics & Certifications
          </h1>
          <p className="text-muted-foreground">
            Explore available cloud certification exams and their exam types
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {examTopics.map((topic) => (
            <AccordionItem 
              key={topic.id} 
              value={topic.id}
              className="bg-card rounded-xl border shadow-sm overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4 text-left">
                  <div className="text-3xl">{topic.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{topic.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                <div className="grid gap-6 pt-4">
                  {topic.examTypes.map((examType) => (
                    <div 
                      key={examType.id}
                      className="bg-accent/30 rounded-lg p-6 border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg font-semibold">{examType.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              examType.level === 'Foundational' || examType.level === 'Fundamentals' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                            }`}>
                              {examType.level}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {examType.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              {examType.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                              {examType.questionCount}
                            </span>
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          <Link href={`/exam/${examType.id}`}>
                            <Button size="sm" className="whitespace-nowrap">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium mb-3 text-foreground">
                          Exam Categories:
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {examType.categories.map((category, categoryIndex) => (
                            <div 
                              key={categoryIndex}
                              className="bg-background/80 rounded-md p-3 border-l-2 border-l-primary/20"
                            >
                              <span className="text-sm font-medium">{category}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}