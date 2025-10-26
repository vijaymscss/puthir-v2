import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 bg-clip-text text-transparent animate-gradient">
              About Cloud Quiz Platform
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your ultimate destination for mastering cloud certifications across <strong>AWS</strong>, <strong>Azure</strong>, and <strong>Google Cloud Platform</strong>. 
            From foundational knowledge to professional expertise, we provide AI-powered preparation tools that adapt to your learning journey.
          </p>
        </div>

        <div className="space-y-8">
          {/* Mission Section */}
          <div className="bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up cursor-pointer" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/80 to-purple-600/80 flex items-center justify-center text-white text-xl transition-transform duration-300 group-hover:scale-110">
                🎯
              </div>
              <h2 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Our Mission</h2>
            </div>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
              We <strong>empower cloud professionals</strong> to achieve certification success through cutting-edge AI technology. 
              Our platform delivers <em>intelligent, adaptive practice experiences</em> across <strong>AWS</strong>, <strong>Azure</strong>, and <strong>Google Cloud</strong>, 
              covering every certification level from foundational to expert.
            </p>
            <p className="text-muted-foreground">
              Whether you&apos;re beginning your cloud journey with foundational certifications or advancing to specialized roles like 
              <strong> Solutions Architect</strong>, <strong>DevOps Engineer</strong>, or <strong>Data Specialist</strong>, 
              our adaptive learning system evolves with your expertise across all major cloud platforms.
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up cursor-pointer" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500/70 to-blue-600/70 flex items-center justify-center text-white text-xl transition-transform duration-300 group-hover:scale-110">
                ⚡
              </div>
              <h2 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-400">Advanced Platform Features</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 rounded-lg p-3 -m-3 transition-all duration-200 cursor-pointer">
                  <div>
                    <h3 className="font-medium mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">🤖 AI-Powered Question Generation</h3>
                    <p className="text-sm text-muted-foreground">Advanced AI and powerful DB creates realistic, exam-appropriate questions tailored to your skill level</p>
                  </div>
                </div>
                <div className="group hover:bg-green-50/30 dark:hover:bg-green-900/10 rounded-lg p-3 -m-3 transition-all duration-200 cursor-pointer">
                  <div>
                    <h3 className="font-medium mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">📊 Smart Progress Tracking</h3>
                    <p className="text-sm text-muted-foreground">Complete validation system with real-time progress monitoring and performance analytics</p>
                  </div>
                </div>
                <div className="group hover:bg-purple-50/30 dark:hover:bg-purple-900/10 rounded-lg p-3 -m-3 transition-all duration-200 cursor-pointer">
                  <div>
                    <h3 className="font-medium mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">📄 Detailed PDF Reports</h3>
                    <p className="text-sm text-muted-foreground">Export comprehensive quiz results with explanations for offline study and review</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="group hover:bg-orange-50/30 dark:hover:bg-orange-900/10 rounded-lg p-3 -m-3 transition-all duration-200 cursor-pointer">
                  <div>
                    <h3 className="font-medium mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">🧭 Interactive Navigation</h3>
                    <p className="text-sm text-muted-foreground">Seamless question jumping with intuitive sidebar navigation and bookmarking</p>
                  </div>
                </div>
                <div className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 rounded-lg p-3 -m-3 transition-all duration-200 cursor-pointer">
                  <div>
                    <h3 className="font-medium mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">📚 Comprehensive Syllabi</h3>
                    <p className="text-sm text-muted-foreground">Detailed exam domain breakdowns for AWS, Azure, and GCP certifications</p>
                  </div>
                </div>
                <div className="group hover:bg-teal-50/30 dark:hover:bg-teal-900/10 rounded-lg p-3 -m-3 transition-all duration-200 cursor-pointer">
                  <div>
                    <h3 className="font-medium mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">📱 Universal Design</h3>
                    <p className="text-sm text-muted-foreground">Flawless experience across all devices - desktop, tablet, and mobile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

  

          {/* Technology Stack Section */}
          <div className="bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up cursor-pointer" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500/70 to-purple-600/70 flex items-center justify-center text-white text-xl transition-transform duration-300 group-hover:scale-110">
                🛠️
              </div>
              <h2 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Built with Modern Technology</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50/80 to-blue-100/40 dark:from-blue-900/20 dark:to-blue-800/10 hover:shadow-lg hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="text-2xl mb-2 transition-transform duration-300 group-hover:scale-110">⚛️</div>
                <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Next.js 15</h3>
                <p className="text-sm text-muted-foreground">React Framework</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50/80 to-green-100/40 dark:from-green-900/20 dark:to-green-800/10 hover:shadow-lg hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="text-2xl mb-2 transition-transform duration-300 group-hover:scale-110">🤖</div>
                <h3 className="font-medium group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">AI</h3>
                <p className="text-sm text-muted-foreground">Question Generation</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50/80 to-purple-100/40 dark:from-purple-900/20 dark:to-purple-800/10 hover:shadow-lg hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="text-2xl mb-2 transition-transform duration-300 group-hover:scale-110">🎨</div>
                <h3 className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Tailwind CSS</h3>
                <p className="text-sm text-muted-foreground">Modern Styling</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-50/80 to-orange-100/40 dark:from-orange-900/20 dark:to-orange-800/10 hover:shadow-lg hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="text-2xl mb-2 transition-transform duration-300 group-hover:scale-110">📄</div>
                <h3 className="font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">PDF Export</h3>
                <p className="text-sm text-muted-foreground">Quiz Results</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up cursor-pointer" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500/70 to-teal-600/70 flex items-center justify-center text-white text-xl transition-transform duration-300 group-hover:scale-110">
                🌟
              </div>
              <h2 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Why Choose Our Platform?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center group hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 rounded-lg p-4 -m-4 transition-all duration-300 cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110">
                  🎓
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Expert-Level Content</h3>
                <p className="text-sm text-muted-foreground">Questions crafted by cloud professionals with real-world certification experience</p>
              </div>
              <div className="text-center group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 rounded-lg p-4 -m-4 transition-all duration-300 cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110">
                  📈
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Adaptive Learning</h3>
                <p className="text-sm text-muted-foreground">AI adjusts difficulty based on your performance to optimize learning efficiency</p>
              </div>
              <div className="text-center group hover:bg-purple-50/30 dark:hover:bg-purple-900/10 rounded-lg p-4 -m-4 transition-all duration-300 cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110">
                  🚀
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Proven Results</h3>
                <p className="text-sm text-muted-foreground">Join thousands who've successfully passed their cloud certifications using our platform</p>
              </div>
            </div>
          </div>

        
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50/40 to-purple-50/40 dark:from-slate-900/30 dark:to-slate-800/30 rounded-xl p-8 mb-8 animate-fade-in-up border hover:shadow-lg transition-all duration-300" style={{ animationDelay: '1.2s' }}>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">Ready to Start Your Cloud Certification Journey?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-lg leading-relaxed">
              Join <strong>thousands of cloud professionals</strong> who have advanced their careers with our comprehensive multi-platform certification preparation covering <strong>AWS</strong>, <strong>Azure</strong>, and <strong>Google Cloud</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz-setup">
                <Button size="lg" className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-700/90 hover:to-purple-700/90 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:scale-105">
                  🚀 Start Practice Quiz
                </Button>
              </Link>
              <Link href="/exam-syllabus">
                <Button variant="outline" size="lg" className="transition-all duration-300 hover:shadow-lg transform hover:scale-105 hover:border-purple-300 dark:hover:border-purple-600">
                  📚 Browse Exam Syllabi
                </Button>
              </Link>
            </div>
          </div>
          
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:gap-2 inline-flex items-center animate-fade-in" style={{ animationDelay: '1.4s' }}>
              <span className="transition-transform duration-200 hover:-translate-x-1">←</span> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}