import { Button } from "@/components/ui/button";
import ContactForm from '@/components/forms/ContactForm';
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: 1,
    emoji: "🤖",
    question: "How does AI question generation work?",
    answer: "Our Gemini AI creates realistic, exam-level questions tailored to your certification path and skill level, adapting difficulty based on your performance.",
    color: "blue"
  },
  {
    id: 2,
    emoji: "📊",
    question: "Can I track my learning progress?",
    answer: "Yes! View detailed analytics, download PDF reports, monitor improvement over time, and access your complete exam history with performance insights.",
    color: "green"
  },
  {
    id: 3,
    emoji: "🌐",
    question: "Which cloud platforms are supported?",
    answer: "AWS, Azure, and Google Cloud certifications from foundational to professional levels, including specialty certifications and latest exam updates.",
    color: "purple"
  },
  {
    id: 4,
    emoji: "💰",
    question: "What does the platform cost?",
    answer: "Core features are completely free forever. Premium features available for advanced learners with personalized study plans and expert guidance.",
    color: "indigo"
  },
  {
    id: 5,
    emoji: "📚",
    question: "How many questions are in each quiz?",
    answer: "Customizable quiz lengths from 10-65 questions, matching real exam formats. Practice with bite-sized sessions or full-length mock exams.",
    color: "orange"
  },
  {
    id: 6,
    emoji: "🎯",
    question: "How accurate are the practice questions?",
    answer: "Questions are crafted by certified cloud professionals and updated regularly to match current exam patterns and cloud service updates.",
    color: "teal"
  },
  {
    id: 7,
    emoji: "📱",
    question: "Can I use this on mobile devices?",
    answer: "Absolutely! Our platform is fully responsive and optimized for smartphones and tablets, enabling study sessions anywhere, anytime.",
    color: "pink"
  },
  {
    id: 8,
    emoji: "🔄",
    question: "How often is content updated?",
    answer: "Content is continuously updated to reflect the latest cloud services, exam changes, and industry best practices. New questions added weekly.",
    color: "cyan"
  },
  {
    id: 9,
    emoji: "🏆",
    question: "What's the success rate of your users?",
    answer: "Over 85% of active users pass their certification exams on the first attempt, with significant score improvements after regular practice.",
    color: "amber"
  }
];

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { summary: string; content: string }> = {
    blue: {
      summary: "from-blue-50/50 to-blue-50/30 dark:from-blue-900/20 dark:to-blue-900/10 group-hover/item:bg-blue-50/70 dark:group-hover/item:from-blue-900/30",
      content: "from-white/50 to-blue-50/20 dark:from-slate-900/30 dark:to-blue-900/10"
    },
    green: {
      summary: "from-green-50/50 to-green-50/30 dark:from-green-900/20 dark:to-green-900/10 group-hover/item:bg-green-50/70 dark:group-hover/item:from-green-900/30",
      content: "from-white/50 to-green-50/20 dark:from-slate-900/30 dark:to-green-900/10"
    },
    purple: {
      summary: "from-purple-50/50 to-purple-50/30 dark:from-purple-900/20 dark:to-purple-900/10 group-hover/item:bg-purple-50/70 dark:group-hover/item:from-purple-900/30",
      content: "from-white/50 to-purple-50/20 dark:from-slate-900/30 dark:to-purple-900/10"
    },
    indigo: {
      summary: "from-indigo-50/50 to-indigo-50/30 dark:from-indigo-900/20 dark:to-indigo-900/10 group-hover/item:bg-indigo-50/70 dark:group-hover/item:from-indigo-900/30",
      content: "from-white/50 to-indigo-50/20 dark:from-slate-900/30 dark:to-indigo-900/10"
    },
    orange: {
      summary: "from-orange-50/50 to-orange-50/30 dark:from-orange-900/20 dark:to-orange-900/10 group-hover/item:bg-orange-50/70 dark:group-hover/item:from-orange-900/30",
      content: "from-white/50 to-orange-50/20 dark:from-slate-900/30 dark:to-orange-900/10"
    },
    teal: {
      summary: "from-teal-50/50 to-teal-50/30 dark:from-teal-900/20 dark:to-teal-900/10 group-hover/item:bg-teal-50/70 dark:group-hover/item:from-teal-900/30",
      content: "from-white/50 to-teal-50/20 dark:from-slate-900/30 dark:to-teal-900/10"
    },
    pink: {
      summary: "from-pink-50/50 to-pink-50/30 dark:from-pink-900/20 dark:to-pink-900/10 group-hover/item:bg-pink-50/70 dark:group-hover/item:from-pink-900/30",
      content: "from-white/50 to-pink-50/20 dark:from-slate-900/30 dark:to-pink-900/10"
    },
    cyan: {
      summary: "from-cyan-50/50 to-cyan-50/30 dark:from-cyan-900/20 dark:to-cyan-900/10 group-hover/item:bg-cyan-50/70 dark:group-hover/item:from-cyan-900/30",
      content: "from-white/50 to-cyan-50/20 dark:from-slate-900/30 dark:to-cyan-900/10"
    },
    amber: {
      summary: "from-amber-50/50 to-amber-50/30 dark:from-amber-900/20 dark:to-amber-900/10 group-hover/item:bg-amber-50/70 dark:group-hover/item:from-amber-900/30",
      content: "from-white/50 to-amber-50/20 dark:from-slate-900/30 dark:to-amber-900/10"
    }
  };
  return colorMap[color] || colorMap.blue;
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-all duration-200 hover:gap-2 group">
            <ChevronLeft className="w-4 h-4 mr-1 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 bg-clip-text text-transparent animate-gradient">
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions about cloud certifications? Need technical support? 
              Our team of <strong>cloud experts</strong> is here to help you succeed in your certification journey.
            </p>
          </div>
        </div>

        {/* Email Support Card */}
        <div className="mb-12">
          <div className="w-full bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up group cursor-pointer" style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500/80 to-blue-600/80 flex items-center justify-center text-white text-2xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                📧
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">Professional assistance</p>
              <p className="font-medium text-blue-600 dark:text-blue-400 text-sm mb-3">support@cloudquizplatform.com</p>
              <p className="text-xs text-muted-foreground bg-blue-50/30 dark:bg-blue-900/10 rounded-lg py-2 px-3">
                📅 Response within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Section - Form and FAQ */}
        <div className="grid lg:grid-cols-2 gap-8"> 
          {/* Contact Form Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <ContactForm />
          </div>

          {/* FAQ Section - Redesigned */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-8 border shadow-sm">
              <div className="flex items-center gap-3 mb-8 group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500/70 to-green-600/70 flex items-center justify-center text-white text-lg transition-transform duration-300 group-hover:scale-110">
                  ❓
                </div>
                <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">FAQ</h3>
              </div>
              
              <div className="space-y-3">
                {FAQ_ITEMS.map((item) => {
                  const colors = getColorClasses(item.color);
                  return (
                    <details key={item.id} className="group/item border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
                      <summary className={`cursor-pointer bg-gradient-to-r ${colors.summary} px-4 py-3 font-medium text-sm flex items-center justify-between transition-colors`}>
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{item.emoji}</span>
                          {item.question}
                        </span>
                        <span className="transition-transform duration-300 group-open/item:rotate-180">▼</span>
                      </summary>
                      <div className={`px-4 py-3 border-t border-gray-200 dark:border-slate-700 text-sm text-muted-foreground bg-gradient-to-br ${colors.content}`}>
                        {item.answer}
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-blue-50/40 to-purple-50/40 dark:from-slate-900/30 dark:to-slate-800/30 rounded-xl p-8 mb-8 border hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Accelerate Your Cloud Career?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who've advanced their careers with our comprehensive cloud certification preparation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz-setup">
                <Button size="lg" className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-700/90 hover:to-purple-700/90 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:scale-105">
                  🚀 Start Your Journey
                </Button>
              </Link>
              <Link href="/exam-syllabus">
                <Button variant="outline" size="lg" className="transition-all duration-300 hover:shadow-lg transform hover:scale-105 hover:border-purple-300 dark:hover:border-purple-600">
                  📚 Explore Certifications
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}