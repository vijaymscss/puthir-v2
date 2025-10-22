import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About AWS Quiz Platform
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI-powered quiz platform for all AWS certification levels - 
            from Foundational to Professional certifications
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
              We empower aspiring cloud professionals to master AWS technologies through intelligent, 
              AI-generated practice questions. Our platform covers the complete AWS certification journey, 
              from foundational concepts to professional-level expertise.
            </p>
            <p className="text-muted-foreground">
              Whether you're starting with Cloud Practitioner or advancing to Solutions Architect and Developer 
              certifications, we provide personalized learning experiences that adapt to your knowledge level.
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

          {/* Certification Coverage Section */}
          <div className="bg-card rounded-xl p-8 border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white text-xl">
                📚
              </div>
              <h2 className="text-2xl font-semibold">AWS Certification Coverage</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6 border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    F
                  </div>
                  <h3 className="font-semibold">Foundational Level</h3>
                </div>
                <h4 className="font-medium mb-2">AWS Cloud Practitioner</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cloud Concepts (24%)</li>
                  <li>• Security & Compliance (30%)</li>
                  <li>• Cloud Technology & Services (34%)</li>
                  <li>• Billing, Pricing & Support (12%)</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-6 border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  <h3 className="font-semibold">Associate Level</h3>
                </div>
                <h4 className="font-medium mb-2">Developer Associate</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Development with AWS Services (32%)</li>
                  <li>• Security (26%)</li>
                  <li>• Deployment (24%)</li>
                  <li>• Troubleshooting & Optimization (18%)</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg p-6 border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  <h3 className="font-semibold">Associate Level</h3>
                </div>
                <h4 className="font-medium mb-2">Solutions Architect Associate</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Design Secure Architectures (30%)</li>
                  <li>• Design Resilient Architectures (26%)</li>
                  <li>• Design High-Performing Architectures (24%)</li>
                  <li>• Design Cost-Optimized Architectures (20%)</li>
                </ul>
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
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your AWS Journey?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of cloud professionals who have advanced their careers with our comprehensive AWS certification preparation platform.
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