import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Cloud Quiz Platform
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI-powered quiz platform for multiple cloud certification providers including AWS, Azure, and GCP - 
            from Foundational to Professional levels
          </p>
        </div>

        <div className="space-y-8">
          {/* Mission Section */}
          <div className="bg-card rounded-xl p-8 border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl">
                🎯
              </div>
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
              We empower aspiring cloud professionals to master cloud technologies across multiple platforms through intelligent, 
              AI-generated practice questions. Our platform covers comprehensive certification journeys for AWS, Azure, and GCP, 
              from foundational concepts to professional-level expertise.
            </p>
            <p className="text-muted-foreground">
              Whether you&apos;re starting with foundational certifications or advancing to specialized roles like Solutions Architect, 
              Developer, or Data Engineer, we provide personalized learning experiences that adapt to your knowledge level across different cloud platforms.
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-card rounded-xl p-8 border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white text-xl">
                ⚡
              </div>
              <h2 className="text-2xl font-semibold">Platform Features</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">AI-Powered Question Generation</h3>
                    <p className="text-sm text-muted-foreground">Advanced Gemini AI creates realistic, exam-appropriate questions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Comprehensive Quiz Validation</h3>
                    <p className="text-sm text-muted-foreground">Complete all questions before submission with progress tracking</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">PDF Summary Export</h3>
                    <p className="text-sm text-muted-foreground">Download detailed quiz results for offline review</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Interactive Navigation</h3>
                    <p className="text-sm text-muted-foreground">Jump to any question with sidebar navigation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Detailed Exam Syllabi</h3>
                    <p className="text-sm text-muted-foreground">Browse comprehensive domain breakdowns for each certification</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Responsive Design</h3>
                    <p className="text-sm text-muted-foreground">Perfect experience across desktop, tablet, and mobile devices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

  

          {/* Technology Stack Section */}
          <div className="bg-card rounded-xl p-8 border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl">
                🛠️
              </div>
              <h2 className="text-2xl font-semibold">Built with Modern Technology</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-accent/30">
                <div className="text-2xl mb-2">⚛️</div>
                <h3 className="font-medium">Next.js 15</h3>
                <p className="text-sm text-muted-foreground">React Framework</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/30">
                <div className="text-2xl mb-2">🤖</div>
                <h3 className="font-medium">Gemini AI</h3>
                <p className="text-sm text-muted-foreground">Question Generation</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/30">
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="font-medium">Tailwind CSS</h3>
                <p className="text-sm text-muted-foreground">Modern Styling</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/30">
                <div className="text-2xl mb-2">📄</div>
                <h3 className="font-medium">PDF Export</h3>
                <p className="text-sm text-muted-foreground">Quiz Results</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Cloud Certification Journey?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of cloud professionals who have advanced their careers with our comprehensive multi-platform certification preparation platform covering AWS, Azure, and GCP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz-setup">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Start Practice Quiz
                </Button>
              </Link>
              <Link href="/exam-syllabus">
                <Button variant="outline" size="lg">
                  Browse Exam Syllabi
                </Button>
              </Link>
            </div>
          </div>
          
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}