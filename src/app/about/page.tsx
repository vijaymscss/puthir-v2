import { Button } from "@/components/ui/button";
import Link from "next/link";
import { aboutContent } from "@/content/about.content";
import * as Icons from "lucide-react";

// Icon mapper component
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const Icon = Icons[name as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
  return Icon ? <Icon className={className} /> : null;
};

// Color mapper for proper Tailwind classes
const getColorClasses = (color: string, type: 'feature' | 'tech' | 'reason' = 'feature') => {
  const colorMap: Record<string, {
    hover: string;
    hoverDark: string;
    iconBg?: string;
    iconBgDark?: string;
    bgGradient?: string;
    bgGradientDark?: string;
    textHover: string;
    textHoverDark: string;
  }> = {
    blue: {
      hover: "hover:bg-blue-50/30",
      hoverDark: "dark:hover:bg-blue-900/10",
      iconBg: "bg-gradient-to-r from-blue-100 to-indigo-100",
      iconBgDark: "dark:from-blue-900/30 dark:to-indigo-900/30",
      bgGradient: "bg-gradient-to-br from-blue-50/80 to-blue-100/40",
      bgGradientDark: "dark:from-blue-900/20 dark:to-blue-800/10",
      textHover: "group-hover:text-blue-600",
      textHoverDark: "dark:group-hover:text-blue-400",
    },
    green: {
      hover: "hover:bg-green-50/30",
      hoverDark: "dark:hover:bg-green-900/10",
      iconBg: "bg-gradient-to-r from-green-100 to-emerald-100",
      iconBgDark: "dark:from-green-900/30 dark:to-emerald-900/30",
      bgGradient: "bg-gradient-to-br from-green-50/80 to-green-100/40",
      bgGradientDark: "dark:from-green-900/20 dark:to-green-800/10",
      textHover: "group-hover:text-green-600",
      textHoverDark: "dark:group-hover:text-green-400",
    },
    purple: {
      hover: "hover:bg-purple-50/30",
      hoverDark: "dark:hover:bg-purple-900/10",
      iconBg: "bg-gradient-to-r from-purple-100 to-pink-100",
      iconBgDark: "dark:from-purple-900/30 dark:to-pink-900/30",
      bgGradient: "bg-gradient-to-br from-purple-50/80 to-purple-100/40",
      bgGradientDark: "dark:from-purple-900/20 dark:to-purple-800/10",
      textHover: "group-hover:text-purple-600",
      textHoverDark: "dark:group-hover:text-purple-400",
    },
    orange: {
      hover: "hover:bg-orange-50/30",
      hoverDark: "dark:hover:bg-orange-900/10",
      iconBg: "bg-gradient-to-r from-orange-100 to-amber-100",
      iconBgDark: "dark:from-orange-900/30 dark:to-amber-900/30",
      bgGradient: "bg-gradient-to-br from-orange-50/80 to-orange-100/40",
      bgGradientDark: "dark:from-orange-900/20 dark:to-orange-800/10",
      textHover: "group-hover:text-orange-600",
      textHoverDark: "dark:group-hover:text-orange-400",
    },
    indigo: {
      hover: "hover:bg-indigo-50/30",
      hoverDark: "dark:hover:bg-indigo-900/10",
      iconBg: "bg-gradient-to-r from-indigo-100 to-purple-100",
      iconBgDark: "dark:from-indigo-900/30 dark:to-purple-900/30",
      bgGradient: "bg-gradient-to-br from-indigo-50/80 to-indigo-100/40",
      bgGradientDark: "dark:from-indigo-900/20 dark:to-indigo-800/10",
      textHover: "group-hover:text-indigo-600",
      textHoverDark: "dark:group-hover:text-indigo-400",
    },
    teal: {
      hover: "hover:bg-teal-50/30",
      hoverDark: "dark:hover:bg-teal-900/10",
      iconBg: "bg-gradient-to-r from-teal-100 to-cyan-100",
      iconBgDark: "dark:from-teal-900/30 dark:to-cyan-900/30",
      bgGradient: "bg-gradient-to-br from-teal-50/80 to-teal-100/40",
      bgGradientDark: "dark:from-teal-900/20 dark:to-teal-800/10",
      textHover: "group-hover:text-teal-600",
      textHoverDark: "dark:group-hover:text-teal-400",
    },
    emerald: {
      hover: "hover:bg-emerald-50/30",
      hoverDark: "dark:hover:bg-emerald-900/10",
      iconBg: "bg-gradient-to-r from-emerald-100 to-teal-100",
      iconBgDark: "dark:from-emerald-900/30 dark:to-teal-900/30",
      bgGradient: "bg-gradient-to-br from-emerald-50/80 to-emerald-100/40",
      bgGradientDark: "dark:from-emerald-900/20 dark:to-emerald-800/10",
      textHover: "group-hover:text-emerald-600",
      textHoverDark: "dark:group-hover:text-emerald-400",
    },
  };
  
  return colorMap[color] || colorMap.blue;
};

export default function AboutPage() {
  const { hero, mission, features, technology, whyChoose, cta } = aboutContent;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 bg-clip-text text-transparent animate-gradient">
              {hero.title}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {hero.subtitle}
          </p>
        </div>

        <div className="space-y-8">
          {/* Mission Section */}
          <div className="bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up cursor-pointer" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/80 to-purple-600/80 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                <IconComponent name={mission.icon} className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {mission.title}
              </h2>
            </div>
            {mission.paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className={`text-muted-foreground text-lg leading-relaxed ${index < mission.paragraphs.length - 1 ? 'mb-4' : ''}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up cursor-pointer" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500/70 to-blue-600/70 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                <IconComponent name={features.icon} className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-400">
                {features.title}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {features.items.map((feature, index) => {
                const colors = getColorClasses(feature.color);
                return (
                  <div 
                    key={index}
                    className={`group ${colors.hover} ${colors.hoverDark} rounded-lg p-3 -m-3 transition-all duration-200 cursor-pointer`}
                  >
                    <div>
                      <h3 className={`font-medium mb-1 ${colors.textHover} ${colors.textHoverDark} transition-colors flex items-center gap-2`}>
                        <IconComponent name={feature.icon} className="w-5 h-5" />
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>



          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up cursor-pointer" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500/70 to-teal-600/70 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                <IconComponent name={whyChoose.icon} className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                {whyChoose.title}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {whyChoose.reasons.map((reason, index) => {
                const colors = getColorClasses(reason.color);
                return (
                  <div 
                    key={index}
                    className={`text-center group ${colors.hover} ${colors.hoverDark} rounded-lg p-4 -m-4 transition-all duration-300 cursor-pointer`}
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${colors.iconBg} ${colors.iconBgDark} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <IconComponent name={reason.icon} className="w-8 h-8 text-current" />
                    </div>
                    <h3 className={`font-semibold mb-2 ${colors.textHover} ${colors.textHoverDark} transition-colors`}>
                      {reason.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50/40 to-purple-50/40 dark:from-slate-900/30 dark:to-slate-800/30 rounded-xl p-8 mb-8 animate-fade-in-up border hover:shadow-lg transition-all duration-300" style={{ animationDelay: '1.2s' }}>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              {cta.title}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-lg leading-relaxed">
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

              <Link href={cta.backButton.href}>
              <Button variant="outline" size="lg" className="transition-all duration-300 hover:shadow-lg transform hover:scale-105 hover:border-purple-300 dark:hover:border-purple-600">
                  <IconComponent name={cta.backButton.icon} className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              {cta.backButton.text}
                </Button>
           
          </Link>
            </div>
          </div>
          
          
        </div>
      </div>
    </main>
  );
}
