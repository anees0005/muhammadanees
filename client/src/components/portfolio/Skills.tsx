import { useState } from 'react';
import { Code, TrendingUp, Shield, Calculator, Sparkles, Gamepad2, Search } from 'lucide-react';
import ServiceModal from './ServiceModal';

export default function Skills() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const skillCategories = [
    {
      title: "Website Development",
      icon: <Code size={32} />,
      color: "green",
      serviceDetails: {
        title: "Website Development Services",
        description: "Professional website development from concept to deployment. I build fast, responsive, and user-friendly websites.",
        features: [
          "Custom WordPress websites & stores",
          "React/Next.js modern applications",
          "E-commerce with payment gateways",
          "Mobile-first responsive design",
          "Speed & SEO optimization",
          "Maintenance & support"
        ],
        technologies: ["WordPress", "React", "Next.js", "Node.js", "Tailwind CSS", "Three.js", "WooCommerce"],
        color: "cyan"
      },
      skills: [
        { name: "WordPress", level: 95, icon: "🌐" },
        { name: "React & Next.js", level: 92, icon: "⚛️" },
        { name: "MERN Stack", level: 88, icon: "💻" },
        { name: "HTML/CSS/JS", level: 95, icon: "🎨" },
        { name: "Tailwind CSS", level: 90, icon: "🎯" },
        { name: "Three.js", level: 85, icon: "🎮" },
        { name: "UI/UX Design", level: 88, icon: "✨" },
      ]
    },
    {
      title: "Digital Marketing",
      icon: <TrendingUp size={32} />,
      color: "blue",
      serviceDetails: {
        title: "Digital Marketing Services",
        description: "Data-driven digital marketing strategies to grow your brand and increase conversions.",
        features: [
          "Facebook, Instagram & TikTok ads",
          "Complete SEO (on-page, off-page, technical)",
          "Content strategy & copywriting",
          "Social media management",
          "Analytics & tracking",
          "Video content creation"
        ],
        technologies: ["Facebook Ads", "Google Analytics", "SEMrush", "Canva", "Photoshop", "Premier Pro"],
        color: "blue"
      },
      skills: [
        { name: "Facebook Ads", level: 90, icon: "📱" },
        { name: "Instagram Ads", level: 90, icon: "📸" },
        { name: "TikTok Ads", level: 85, icon: "🎵" },
        { name: "SEO (Technical)", level: 92, icon: "🔍" },
        { name: "Content Strategy", level: 88, icon: "📝" },
        { name: "Analytics", level: 90, icon: "📊" },
        { name: "Video Editing", level: 85, icon: "🎬" },
        { name: "Graphics Design", level: 87, icon: "🎨" },
      ]
    },
    {
      title: "IT & Cybersecurity",
      icon: <Shield size={32} />,
      color: "purple",
      serviceDetails: {
        title: "IT & Cybersecurity Services",
        description: "Comprehensive IT management, AI automation, and security solutions to keep your business running smoothly and efficiently.",
        features: [
          "IT infrastructure setup & management",
          "System troubleshooting & support",
          "Cybersecurity implementation & monitoring",
          "AI chatbot development",
          "AI automation systems (voiceovers, transcription)",
          "Process automation & workflow optimization",
          "Game & app development"
        ],
        technologies: ["Linux", "Windows Server", "AI/ML", "Python", "Automation Tools", "Security Protocols", "OpenAI API", "Voice AI"],
        color: "purple"
      },
      skills: [
        { name: "IT Management", level: 90, icon: "⚙️" },
        { name: "System Troubleshooting", level: 92, icon: "🔧" },
        { name: "Cybersecurity", level: 85, icon: "🔒" },
        { name: "AI Chatbots", level: 88, icon: "🤖" },
        { name: "AI Voiceovers", level: 85, icon: "🎙️" },
        { name: "Automation Systems", level: 87, icon: "⚡" },
        { name: "Bug Fixing", level: 90, icon: "🐛" },
        { name: "Game Development", level: 85, icon: "🎮" },
      ]
    },
    {
      title: "Accounting & Business",
      icon: <Calculator size={32} />,
      color: "orange",
      serviceDetails: {
        title: "Accounting & Business Services",
        description: "ACCA-backed accounting services and business consulting to manage your finances effectively.",
        features: [
          "Bookkeeping & financial reports",
          "Management accounting",
          "Payroll system management",
          "Budget preparation & analysis",
          "Excel automation & dashboards",
          "Financial consulting"
        ],
        technologies: ["Excel", "QuickBooks", "ACCA Standards", "Financial Modeling", "Power BI"],
        color: "yellow"
      },
      skills: [
        { name: "ACCA (7 Exams)", level: 85, icon: "🎓" },
        { name: "Bookkeeping", level: 90, icon: "📚" },
        { name: "Financial Accounting", level: 88, icon: "💰" },
        { name: "Management Accounting", level: 85, icon: "📈" },
        { name: "Payroll Systems", level: 87, icon: "💵" },
        { name: "Budget Preparation", level: 86, icon: "📋" },
        { name: "Advanced Excel", level: 92, icon: "📊" },
        { name: "Canva/Photoshop", level: 90, icon: "🎨" },
      ]
    },
    {
      title: "Game Development",
      icon: <Gamepad2 size={32} />,
      color: "pink",
      serviceDetails: {
        title: "Game Development Services",
        description: "Interactive games and gamified experiences built with modern web technologies and game engines.",
        features: [
          "Browser-based interactive games",
          "Unity 2D/3D game development",
          "Unreal Engine game projects",
          "Educational & training games",
          "Typing games & skill challenges",
          "Quiz & trivia applications",
          "Leaderboard & scoring systems",
          "Mobile-responsive gameplay"
        ],
        technologies: ["Unity", "Unreal Engine", "React", "TypeScript", "Three.js", "C#", "Blueprints", "Game Logic"],
        color: "purple"
      },
      skills: [
        { name: "Unity Development", level: 85, icon: "🎮" },
        { name: "Unreal Engine", level: 80, icon: "🎯" },
        { name: "React Game Logic", level: 88, icon: "⚛️" },
        { name: "TypeScript", level: 90, icon: "📘" },
        { name: "Typing Games", level: 92, icon: "⌨️" },
        { name: "Quiz Games", level: 90, icon: "❓" },
        { name: "C# Programming", level: 85, icon: "💻" },
        { name: "Game UI/UX", level: 85, icon: "✨" },
      ]
    },
    {
      title: "SEO Optimization",
      icon: <Search size={32} />,
      color: "yellow",
      serviceDetails: {
        title: "SEO Optimization Services",
        description: "Comprehensive SEO strategies to improve your website's search engine rankings and drive organic traffic.",
        features: [
          "On-page SEO optimization (meta tags, headers, content)",
          "Technical SEO (site speed, mobile-friendliness, schema)",
          "Off-page SEO (backlinks, citations, local SEO)",
          "Keyword research & content strategy",
          "SEO audits & competitor analysis",
          "Google Analytics & Search Console setup",
          "Link building & outreach campaigns",
          "Local SEO optimization"
        ],
        technologies: ["Google Analytics", "Google Search Console", "SEMrush", "Ahrefs", "Screaming Frog", "Schema Markup", "Core Web Vitals"],
        color: "yellow",
        deliveryTime: "3 months"
      },
      skills: [
        { name: "On-Page SEO", level: 95, icon: "📝" },
        { name: "Technical SEO", level: 92, icon: "⚙️" },
        { name: "Off-Page SEO", level: 90, icon: "🔗" },
        { name: "Keyword Research", level: 93, icon: "🔍" },
        { name: "Local SEO", level: 88, icon: "📍" },
        { name: "SEO Analytics", level: 94, icon: "📊" },
        { name: "Content Optimization", level: 91, icon: "✍️" },
        { name: "Link Building", level: 89, icon: "🌐" },
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        text: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        gradient: "from-green-500 to-emerald-500",
        hover: "hover:border-green-500/50 hover:shadow-green-500/20"
      },
      blue: {
        text: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        gradient: "from-blue-500 to-cyan-500",
        hover: "hover:border-blue-500/50 hover:shadow-blue-500/20"
      },
      purple: {
        text: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        gradient: "from-purple-500 to-pink-500",
        hover: "hover:border-purple-500/50 hover:shadow-purple-500/20"
      },
      orange: {
        text: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        gradient: "from-orange-500 to-red-500",
        hover: "hover:border-orange-500/50 hover:shadow-orange-500/20"
      },
      pink: {
        text: "text-pink-400",
        bg: "bg-pink-500/10",
        border: "border-pink-500/30",
        gradient: "from-pink-500 to-rose-500",
        hover: "hover:border-pink-500/50 hover:shadow-pink-500/20"
      },
      yellow: {
        text: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        gradient: "from-yellow-500 to-orange-500",
        hover: "hover:border-yellow-500/50 hover:shadow-yellow-500/20"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="skills" className="py-24 px-3 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-blue-500/5"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="section-fade">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-4 md:mb-6">
              <Sparkles size={16} className="animate-pulse" />
              <span>Core Competencies</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-cyan-400">
              Skills & Expertise
          </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Diverse skill set across technology, marketing, and business domains
            </p>
          </div>

          {/* Skills Grid - Now with 6 cards, 2x3 grid */}
          <div className="grid md:grid-cols-2 gap-3 md:gap-8 mb-6 md:mb-8">
            {skillCategories.slice(0, 4).map((category, categoryIndex) => {
              const colors = getColorClasses(category.color);
              return (
                <div
                  key={category.title}
                  className={`card-modern p-4 md:p-8 ${colors.bg} border-2 ${colors.border} ${colors.hover} transition-all duration-500 cursor-pointer`}
                  style={{animationDelay: `${categoryIndex * 0.1}s`}}
                  onClick={() => setSelectedService(category.serviceDetails)}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className={`p-3 md:p-4 rounded-xl ${colors.bg} ${colors.text}`}>
                  {category.icon}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold ${colors.text}`}>{category.title}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="grid gap-3 md:gap-4">
                    {category.skills.map((skill, index) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg md:text-xl">{skill.icon}</span>
                            <span className="text-white font-medium text-sm md:text-base">{skill.name}</span>
                </div>
                          <span className={`text-xs md:text-sm font-semibold ${colors.text}`}>
                            {skill.level}%
                          </span>
                      </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-1000 ease-out`}
                            style={{ 
                              width: `${skill.level}%`,
                              transitionDelay: `${(categoryIndex * 100) + (index * 50)}ms`
                            }}
                        />
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Game Development & SEO Cards - Row 3 */}
          <div className="grid md:grid-cols-2 gap-3 md:gap-8 mb-6 md:mb-8">
            {skillCategories.slice(4, 6).map((category, categoryIndex) => {
              const colors = getColorClasses(category.color);
              return (
                <div
                  key={category.title}
                  className={`card-modern p-4 md:p-8 ${colors.bg} border-2 ${colors.border} ${colors.hover} transition-all duration-500 cursor-pointer`}
                  style={{animationDelay: `${(4 + categoryIndex) * 0.1}s`}}
                  onClick={() => setSelectedService(category.serviceDetails)}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className={`p-3 md:p-4 rounded-xl ${colors.bg} ${colors.text}`}>
                      {category.icon}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold ${colors.text}`}>{category.title}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="grid gap-3 md:gap-4">
                    {category.skills.map((skill, index) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg md:text-xl">{skill.icon}</span>
                            <span className="text-white font-medium text-sm md:text-base">{skill.name}</span>
                          </div>
                          <span className={`text-xs md:text-sm font-semibold ${colors.text}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-1000 ease-out`}
                            style={{ 
                              width: `${skill.level}%`,
                              transitionDelay: `${((4 + categoryIndex) * 100) + (index * 50)}ms`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="inline-block card-modern p-6 md:p-8">
              <p className="text-gray-300 mb-4 text-base md:text-lg">
                Looking for a versatile professional to elevate your business?
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition-all hover:scale-105 text-sm md:text-base"
              >
                <span>Let's Work Together</span>
                <Sparkles size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}
