/**
 * About Page Content
 * 
 * This file contains all text content for the About page.
 * Structure is designed for easy internationalization (i18n).
 * 
 * To add a new language:
 * 1. Create a new file like `about.content.es.ts` for Spanish
 * 2. Copy this structure and translate all values
 * 3. Update the import logic to select based on locale
 */

export const aboutContent = {
  // Hero Section
  hero: {
    title: "About Cloud Practice Test",
    subtitle: "Master cloud certifications with our AI-powered practice platform. Prepare for AWS, Azure, and Google Cloud exams with intelligent question generation, detailed explanations, and comprehensive performance tracking.",
  },

  // Mission Section
  mission: {
    icon: "Target",
    title: "Our Mission",
    paragraphs: [
      "We empower aspiring and experienced cloud professionals to achieve certification success through intelligent practice and preparation. Our platform combines advanced AI technology with comprehensive question databases to deliver realistic exam experiences for AWS, Azure, and Google Cloud Platform certifications.",
      "From foundational certifications like AWS Cloud Practitioner and Azure Fundamentals to advanced roles including Solutions Architect Professional, DevOps Engineer, and Security Specialist, our platform provides targeted preparation tailored to your certification goals.",
    ],
  },

  // Features Section
  features: {
    icon: "Zap",
    title: "Key Platform Features",
    items: [
      {
        icon: "Bot",
        title: "AI-Powered Questions",
        description: "Generate unlimited practice questions using advanced AI and extensive certification databases",
        color: "blue",
      },
      {
        icon: "BarChart3",
        title: "Performance Analytics",
        description: "Track your progress with detailed statistics, score history, and domain-specific performance metrics",
        color: "green",
      },
      {
        icon: "FileText",
        title: "Detailed Reports & PDF Export",
        description: "Download comprehensive quiz results with answer explanations and performance breakdown",
        color: "purple",
      },
      {
        icon: "Navigation",
        title: "Smart Navigation",
        description: "Jump between questions effortlessly with sidebar navigation and question flagging system",
        color: "orange",
      },
      {
        icon: "BookOpen",
        title: "Exam Syllabi Library",
        description: "Access detailed exam blueprints covering all domains for AWS, Azure, and GCP certifications",
        color: "indigo",
      },
      {
        icon: "Settings",
        title: "Customizable Quiz Settings",
        description: "Tailor your practice sessions with custom question counts, topics, and difficulty levels",
        color: "teal",
      },
    ],
  },

  // Technology Stack Section
  technology: {
    icon: "Wrench",
    title: "Built with Modern Technology",
    stack: [
      {
        icon: "Atom",
        name: "Next.js 15 & React 19",
        subtitle: "Modern Framework",
        color: "blue",
      },
      {
        icon: "BrainCircuit",
        name: "AI Integration",
        subtitle: "Smart Questions",
        color: "green",
      },
      {
        icon: "Palette",
        name: "Tailwind CSS",
        subtitle: "Beautiful UI",
        color: "purple",
      },
      {
        icon: "Shield",
        name: "Clerk Auth",
        subtitle: "Secure Login",
        color: "orange",
      },
    ],
  },

  // Why Choose Us Section
  whyChoose: {
    icon: "Star",
    title: "Why Choose Our Platform?",
    reasons: [
      {
        icon: "Target",
        title: "Realistic Exam Experience",
        description: "Practice with questions that mirror actual certification exam format and difficulty",
        color: "emerald",
      },
      {
        icon: "TrendingUp",
        title: "Track Your Progress",
        description: "Monitor improvement with detailed analytics and historical performance data",
        color: "blue",
      },
      {
        icon: "Zap",
        title: "Study Efficiently",
        description: "Focus on weak areas with targeted practice and comprehensive answer explanations",
        color: "purple",
      },
    ],
  },

  // Call to Action Section
  cta: {
    title: "Ready to Ace Your Cloud Certification?",
    description: "Begin your certification journey with Cloud Practice Test. Practice with AI-generated questions, track your performance, and gain the confidence you need to pass AWS, Azure, or GCP exams.",
    buttons: {
      primary: {
        text: "Start Practice Quiz",
        icon: "Rocket",
        href: "/quiz-setup",
      },
      secondary: {
        text: "Browse Exam Syllabi",
        icon: "BookOpen",
        href: "/exam-syllabus",
      },
    },
    backButton: {
      text: "Back to Home",
      icon: "ArrowLeft",
      href: "/",
    },
  },
};

// Type export for TypeScript support
export type AboutContent = typeof aboutContent;
