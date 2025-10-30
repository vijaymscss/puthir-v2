import { Button } from "@/components/ui/button";
import ContactForm from '@/components/forms/ContactForm';
import Link from "next/link";
import { contactContent } from "@/content/contact.content";
import * as Icons from "lucide-react";

// Icon mapper component
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const Icon = Icons[name as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
  return Icon ? <Icon className={className} /> : null;
};

// Color mapper for proper Tailwind classes
const getColorClasses = (color: string) => {
  const colorMap: Record<string, { 
    summary: string; 
    summaryHover: string;
    content: string;
    icon: string;
  }> = {
    blue: {
      summary: "bg-gradient-to-r from-blue-50/50 to-blue-50/30 dark:from-blue-900/20 dark:to-blue-900/10",
      summaryHover: "hover:from-blue-50/70 hover:to-blue-50/50 dark:hover:from-blue-900/30 dark:hover:to-blue-900/20",
      content: "bg-gradient-to-br from-white/50 to-blue-50/20 dark:from-slate-900/30 dark:to-blue-900/10",
      icon: "text-blue-600 dark:text-blue-400",
    },
    green: {
      summary: "bg-gradient-to-r from-green-50/50 to-green-50/30 dark:from-green-900/20 dark:to-green-900/10",
      summaryHover: "hover:from-green-50/70 hover:to-green-50/50 dark:hover:from-green-900/30 dark:hover:to-green-900/20",
      content: "bg-gradient-to-br from-white/50 to-green-50/20 dark:from-slate-900/30 dark:to-green-900/10",
      icon: "text-green-600 dark:text-green-400",
    },
    purple: {
      summary: "bg-gradient-to-r from-purple-50/50 to-purple-50/30 dark:from-purple-900/20 dark:to-purple-900/10",
      summaryHover: "hover:from-purple-50/70 hover:to-purple-50/50 dark:hover:from-purple-900/30 dark:hover:to-purple-900/20",
      content: "bg-gradient-to-br from-white/50 to-purple-50/20 dark:from-slate-900/30 dark:to-purple-900/10",
      icon: "text-purple-600 dark:text-purple-400",
    },
    indigo: {
      summary: "bg-gradient-to-r from-indigo-50/50 to-indigo-50/30 dark:from-indigo-900/20 dark:to-indigo-900/10",
      summaryHover: "hover:from-indigo-50/70 hover:to-indigo-50/50 dark:hover:from-indigo-900/30 dark:hover:to-indigo-900/20",
      content: "bg-gradient-to-br from-white/50 to-indigo-50/20 dark:from-slate-900/30 dark:to-indigo-900/10",
      icon: "text-indigo-600 dark:text-indigo-400",
    },
    orange: {
      summary: "bg-gradient-to-r from-orange-50/50 to-orange-50/30 dark:from-orange-900/20 dark:to-orange-900/10",
      summaryHover: "hover:from-orange-50/70 hover:to-orange-50/50 dark:hover:from-orange-900/30 dark:hover:to-orange-900/20",
      content: "bg-gradient-to-br from-white/50 to-orange-50/20 dark:from-slate-900/30 dark:to-orange-900/10",
      icon: "text-orange-600 dark:text-orange-400",
    },
    teal: {
      summary: "bg-gradient-to-r from-teal-50/50 to-teal-50/30 dark:from-teal-900/20 dark:to-teal-900/10",
      summaryHover: "hover:from-teal-50/70 hover:to-teal-50/50 dark:hover:from-teal-900/30 dark:hover:to-teal-900/20",
      content: "bg-gradient-to-br from-white/50 to-teal-50/20 dark:from-slate-900/30 dark:to-teal-900/10",
      icon: "text-teal-600 dark:text-teal-400",
    },
    pink: {
      summary: "bg-gradient-to-r from-pink-50/50 to-pink-50/30 dark:from-pink-900/20 dark:to-pink-900/10",
      summaryHover: "hover:from-pink-50/70 hover:to-pink-50/50 dark:hover:from-pink-900/30 dark:hover:to-pink-900/20",
      content: "bg-gradient-to-br from-white/50 to-pink-50/20 dark:from-slate-900/30 dark:to-pink-900/10",
      icon: "text-pink-600 dark:text-pink-400",
    },
    cyan: {
      summary: "bg-gradient-to-r from-cyan-50/50 to-cyan-50/30 dark:from-cyan-900/20 dark:to-cyan-900/10",
      summaryHover: "hover:from-cyan-50/70 hover:to-cyan-50/50 dark:hover:from-cyan-900/30 dark:hover:to-cyan-900/20",
      content: "bg-gradient-to-br from-white/50 to-cyan-50/20 dark:from-slate-900/30 dark:to-cyan-900/10",
      icon: "text-cyan-600 dark:text-cyan-400",
    },
    amber: {
      summary: "bg-gradient-to-r from-amber-50/50 to-amber-50/30 dark:from-amber-900/20 dark:to-amber-900/10",
      summaryHover: "hover:from-amber-50/70 hover:to-amber-50/50 dark:hover:from-amber-900/30 dark:hover:to-amber-900/20",
      content: "bg-gradient-to-br from-white/50 to-amber-50/20 dark:from-slate-900/30 dark:to-amber-900/10",
      icon: "text-amber-600 dark:text-amber-400",
    },
  };
  return colorMap[color] || colorMap.blue;
};

export default function ContactPage() {
  const { header, emailSupport, faq, cta } = contactContent;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="mb-8 animate-fade-in">
          <Link 
            href={header.backButton.href} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-all duration-200 hover:gap-2 group"
          >
            <IconComponent name={header.backButton.icon} className="w-4 h-4 mr-1 transition-transform duration-200 group-hover:-translate-x-1" />
            {header.backButton.text}
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 bg-clip-text text-transparent animate-gradient">
                {header.title}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {header.subtitle}
            </p>
          </div>
        </div>


        {/* Two Column Section - Form and FAQ */}
        <div className="grid lg:grid-cols-2 gap-8"> 
          {/* Contact Form Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <ContactForm />
          </div>

          {/* FAQ Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-8 border shadow-sm">
              <div className="flex items-center gap-3 mb-8 group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500/70 to-green-600/70 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                  <IconComponent name={faq.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {faq.title}
                </h3>
              </div>
              
              <div className="space-y-3">
                {faq.items.map((item) => {
                  const colors = getColorClasses(item.color);
                  return (
                    <details 
                      key={item.id} 
                      className="group/item border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      <summary className={`cursor-pointer ${colors.summary} ${colors.summaryHover} px-4 py-3 font-medium text-sm flex items-center justify-between transition-all`}>
                        <span className="flex items-center gap-2">
                          <IconComponent name={item.icon} className={`w-5 h-5 ${colors.icon}`} />
                          {item.question}
                        </span>
                        <IconComponent name="ChevronDown" className="w-4 h-4 transition-transform duration-300 group-open/item:rotate-180" />
                      </summary>
                      <div className={`px-4 py-3 border-t border-gray-200 dark:border-slate-700 text-sm text-muted-foreground ${colors.content}`}>
                        {item.answer}
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          </div>
        </div>


        {/* Email Support Card */}
        <div className="my-5">
          <div className="w-full bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up group cursor-pointer" style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500/80 to-blue-600/80 flex items-center justify-center text-white mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                <IconComponent name={emailSupport.icon} className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {emailSupport.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{emailSupport.description}</p>
              <p className="font-medium text-blue-600 dark:text-blue-400 text-sm mb-3">{emailSupport.email}</p>
              <p className="text-xs text-muted-foreground bg-blue-50/30 dark:bg-blue-900/10 rounded-lg py-2 px-3 inline-flex items-center gap-2">
                <IconComponent name={emailSupport.responseIcon} className="w-3 h-3" />
                {emailSupport.responseTime}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-blue-50/40 to-purple-50/40 dark:from-slate-900/30 dark:to-slate-800/30 rounded-xl p-8 mb-8 border hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {cta.title}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cta.buttons.primary.href}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-700/90 hover:to-purple-700/90 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:scale-105">
                  <IconComponent name={cta.buttons.primary.icon} className="w-5 h-5 mr-2" />
                  {cta.buttons.primary.text}
                </Button>
              </Link>
              <Link href={cta.buttons.secondary.href}>
                <Button variant="outline" size="lg" className="transition-all duration-300 hover:shadow-lg transform hover:scale-105 hover:border-purple-300 dark:hover:border-purple-600">
                  <IconComponent name={cta.buttons.secondary.icon} className="w-5 h-5 mr-2" />
                  {cta.buttons.secondary.text}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
