/**
 * Contact Page Content
 * 
 * This file contains all text content for the Contact page.
 * Structure is designed for easy internationalization (i18n).
 * 
 * To add a new language:
 * 1. Create a new file like `contact.content.es.ts` for Spanish
 * 2. Copy this structure and translate all values
 * 3. Update the import logic to select based on locale
 */

export const contactContent = {
  // Header Section
  header: {
    backButton: {
      text: "Back to Home",
      icon: "ChevronLeft",
      href: "/",
    },
    title: "Get in Touch",
    subtitle: "Have questions about cloud certifications? Need technical support? Our team of cloud experts is here to help you succeed in your certification journey.",
  },

  // Email Support Section
  emailSupport: {
    icon: "Mail",
    title: "Email Support",
    description: "Professional assistance",
    email: "support@cloudquizplatform.com",
    responseTime: "Response within 24 hours",
    responseIcon: "Clock",
  },

  // FAQ Section
  faq: {
    icon: "HelpCircle",
    title: "Frequently Asked Questions",
    items: [
      {
        id: 1,
        icon: "Bot",
        question: "How does AI question generation work?",
        answer: "Our Gemini AI creates realistic, exam-level questions tailored to your certification path and skill level, adapting difficulty based on your performance.",
        color: "blue",
      },
      {
        id: 2,
        icon: "BarChart3",
        question: "Can I track my learning progress?",
        answer: "Yes! View detailed analytics, download PDF reports, monitor improvement over time, and access your complete exam history with performance insights.",
        color: "green",
      },
      {
        id: 3,
        icon: "Globe",
        question: "Which cloud platforms are supported?",
        answer: "AWS, Azure, and Google Cloud certifications from foundational to professional levels, including specialty certifications and latest exam updates.",
        color: "purple",
      },
      {
        id: 4,
        icon: "DollarSign",
        question: "What does the platform cost?",
        answer: "Core features are completely free forever. Premium features available for advanced learners with personalized study plans and expert guidance.",
        color: "indigo",
      },
      {
        id: 5,
        icon: "BookOpen",
        question: "How many questions are in each quiz?",
        answer: "Customizable quiz lengths from 10-65 questions, matching real exam formats. Practice with bite-sized sessions or full-length mock exams.",
        color: "orange",
      },
      {
        id: 6,
        icon: "Target",
        question: "How accurate are the practice questions?",
        answer: "Questions are crafted by certified cloud professionals and updated regularly to match current exam patterns and cloud service updates.",
        color: "teal",
      },
      {
        id: 7,
        icon: "Smartphone",
        question: "Can I use this on mobile devices?",
        answer: "Absolutely! Our platform is fully responsive and optimized for smartphones and tablets, enabling study sessions anywhere, anytime.",
        color: "pink",
      },
      {
        id: 8,
        icon: "RefreshCw",
        question: "How often is content updated?",
        answer: "Content is continuously updated to reflect the latest cloud services, exam changes, and industry best practices. New questions added weekly.",
        color: "cyan",
      },
      {
        id: 9,
        icon: "Trophy",
        question: "What's the success rate of your users?",
        answer: "Over 85% of active users pass their certification exams on the first attempt, with significant score improvements after regular practice.",
        color: "amber",
      },
    ],
  },

  // Call to Action Section
  cta: {
    title: "Ready to Accelerate Your Cloud Career?",
    description: "Join thousands of professionals who've advanced their careers with our comprehensive cloud certification preparation platform.",
    buttons: {
      primary: {
        text: "Start Your Journey",
        icon: "Rocket",
        href: "/quiz-setup",
      },
      secondary: {
        text: "Explore Certifications",
        icon: "BookOpen",
        href: "/exam-syllabus",
      },
    },
  },
};

// Type export for TypeScript support
export type ContactContent = typeof contactContent;
