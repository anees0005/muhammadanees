import { useState } from 'react';
import { Briefcase, Award, TrendingUp, Target, Code2, Palette, Gamepad2, Bot, Shield, Search, Smartphone } from 'lucide-react';
import { Link } from 'wouter';
import ServiceModal from './ServiceModal';

export default function About() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const highlights = [
    {
      icon: <Briefcase className="text-green-400" size={28} />,
      title: "6+ Years Experience",
      description: "Multi-disciplinary professional delivering results"
    },
    {
      icon: <Award className="text-blue-400" size={28} />,
      title: "ACCA Certified",
      description: "7 exams completed, pursuing Skilled Module"
    },
    {
      icon: <TrendingUp className="text-purple-400" size={28} />,
      title: "100+ Projects",
      description: "Websites, campaigns, and AI solutions delivered"
    }
  ];

  const expertise = [
    {
      icon: <Code2 className="text-cyan-400" size={32} />,
      title: "Website Development",
      skills: ["WordPress", "React", "Next.js", "MERN Stack", "Three.js", "WooCommerce"],
      color: "bg-cyan-500/5",
      serviceDetails: {
        title: "Website Development Services",
        description: "Professional website development tailored to your business needs. From simple landing pages to complex web applications.",
        features: [
          "Custom WordPress websites & stores",
          "React/Next.js modern web applications",
          "E-commerce solutions with payment integration",
          "Responsive mobile-first design",
          "Speed optimization & SEO",
          "Ongoing maintenance & support"
        ],
        technologies: ["WordPress", "React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Three.js", "WooCommerce"],
        color: "cyan"
      }
    },
    {
      icon: <Target className="text-yellow-400" size={32} />,
      title: "Accounting",
      skills: ["ACCA", "Bookkeeping", "Financial Systems", "Payroll", "Budget Analysis"],
      color: "bg-yellow-500/5",
      serviceDetails: {
        title: "Accounting & Finance Services",
        description: "Professional accounting services backed by ACCA qualifications to manage your finances effectively.",
        features: [
          "Bookkeeping & financial reporting",
          "Management accounting",
          "Payroll system management",
          "Budget preparation & analysis",
          "Excel automation & dashboards",
          "Financial consulting",
          "Tax preparation support",
          "Financial statement analysis"
        ],
        technologies: ["Excel", "QuickBooks", "ACCA Standards", "Financial Modeling", "Power BI", "Accounting Software"],
        color: "yellow"
      }
    },
    {
      icon: <Smartphone className="text-indigo-400" size={32} />,
      title: "App Development",
      skills: ["React Native", "Mobile Apps", "PWA", "iOS", "Android", "Cross-Platform"],
      color: "bg-indigo-500/5",
      serviceDetails: {
        title: "App Development Services",
        description: "Professional mobile and web app development for iOS, Android, and cross-platform solutions.",
        features: [
          "React Native mobile applications",
          "Progressive Web Apps (PWA)",
          "iOS & Android native apps",
          "Cross-platform development",
          "App store optimization",
          "Mobile UI/UX design",
          "API integration",
          "App maintenance & updates"
        ],
        technologies: ["React Native", "Flutter", "Swift", "Kotlin", "PWA", "App Store", "Google Play", "Mobile APIs"],
        color: "indigo"
      }
    },
    {
      icon: <Gamepad2 className="text-pink-400" size={32} />,
      title: "Game Development",
      skills: ["Unity", "Unreal Engine", "Web Games", "C# Programming", "Game Logic"],
      color: "bg-pink-500/5",
      serviceDetails: {
        title: "Game Development Services",
        description: "Professional game development using Unity, Unreal Engine, and modern web technologies.",
        features: [
          "Unity 2D/3D game development",
          "Unreal Engine projects",
          "Custom browser-based games",
          "Educational & training games",
          "Typing speed games & challenges",
          "Quiz & trivia applications",
          "Leaderboard & scoring systems",
          "Mobile-responsive gameplay"
        ],
        technologies: ["Unity", "Unreal Engine", "React", "TypeScript", "Three.js", "C#", "Blueprints", "Game Logic"],
        color: "purple"
      }
    },
    {
      icon: <Palette className="text-blue-400" size={32} />,
      title: "Digital Marketing",
      skills: ["Social Ads", "Content Strategy", "Analytics", "Brand Building", "Video Editing"],
      color: "bg-blue-500/5",
      serviceDetails: {
        title: "Digital Marketing Services",
        description: "Comprehensive digital marketing strategies to grow your online presence and drive conversions.",
        features: [
          "Facebook, Instagram & TikTok advertising campaigns",
          "Content strategy & copywriting",
          "Social media management",
          "Analytics & performance tracking",
          "Video content creation & editing",
          "Brand building & awareness"
        ],
        technologies: ["Facebook Ads Manager", "Google Analytics", "Canva", "Adobe Photoshop", "Premier Pro", "Social Media Tools"],
        color: "blue"
      }
    },
    {
      icon: <Search className="text-orange-400" size={32} />,
      title: "SEO",
      skills: ["On-Page SEO", "Technical SEO", "Off-Page SEO", "Keyword Research", "Local SEO"],
      color: "bg-orange-500/5",
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
      }
    },
    {
      icon: <Bot className="text-purple-400" size={32} />,
      title: "AI Automation",
      skills: ["AI Chatbots", "AI Voiceovers", "Automation", "Workflow Optimization", "AI Integration"],
      color: "bg-purple-500/5",
      serviceDetails: {
        title: "AI Automation Services",
        description: "Cutting-edge AI automation systems including chatbots, voiceovers, transcription, and workflow optimization to streamline your business operations.",
        features: [
          "Custom AI chatbots with natural language processing",
          "AI voiceover generation for videos & presentations",
          "Speech-to-text transcription services",
          "AI content generation & copywriting",
          "Workflow automation & optimization",
          "AI-powered customer support systems",
          "Data processing automation",
          "Integration with existing systems"
        ],
        technologies: ["OpenAI API", "GPT Models", "Voice AI", "Python", "AI/ML Tools", "Automation Scripts", "Zapier", "Make.com"],
        color: "purple"
      }
    },
    {
      icon: <Shield className="text-green-400" size={32} />,
      title: "Cyber Security",
      skills: ["Security Audits", "Threat Protection", "Network Security", "Data Protection", "Monitoring"],
      color: "bg-green-500/5",
      serviceDetails: {
        title: "Cybersecurity Services",
        description: "Comprehensive cybersecurity solutions to protect your business from threats and ensure data security compliance.",
        features: [
          "Security audits & vulnerability assessments",
          "Network security implementation",
          "Firewall configuration & management",
          "Data encryption & protection",
          "Security monitoring & threat detection",
          "Backup & disaster recovery planning",
          "Security awareness training",
          "Compliance consulting (GDPR, etc.)"
        ],
        technologies: ["Security Protocols", "Firewalls", "VPN", "SSL/TLS", "Penetration Testing Tools", "SIEM", "Security Frameworks"],
        color: "green"
      }
    },
    {
      icon: <Code2 className="text-cyan-400" size={32} />,
      title: "SaaS Development",
      skills: ["SaaS Architecture", "Multi-tenancy", "Subscription Management", "API Development", "Scalable Systems"],
      color: "bg-cyan-500/5",
      serviceDetails: {
        title: "SaaS Development Services",
        description: "Build scalable Software-as-a-Service (SaaS) products from scratch. Expert in creating multi-tenant applications, subscription systems, and scalable architectures. Creator of CompanyHub and ExpenseFlow.",
        features: [
          "Custom SaaS application development",
          "Multi-tenant architecture design",
          "Subscription & billing system integration",
          "User authentication & authorization (RBAC)",
          "API development & documentation",
          "Database design for SaaS (PostgreSQL, MongoDB)",
          "Payment gateway integration (Stripe, PayPal)",
          "Real-time features & WebSocket integration",
          "Scalable cloud infrastructure setup",
          "SaaS analytics & monitoring",
          "Product-Led Growth (PLG) implementation",
          "Ongoing maintenance & scaling"
        ],
        technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Stripe", "WebSockets", "AWS", "Vercel", "Docker"],
        color: "cyan",
        examples: ["CompanyHub - All-in-One Business Management", "ExpenseFlow - Expense Tracking SaaS"]
      }
    }
  ];

  return (
    <section id="about" className="py-24 px-3 md:px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="section-fade">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-4 md:mb-6">
              Get to Know Me
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-cyan-400">
            About Me
          </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              A versatile professional bridging technology, marketing, and finance
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="card-modern p-4 md:p-8 text-center"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Bio Section */}
          <div className="card-modern p-4 md:p-10 mb-8 md:mb-12">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Who I Am</h3>
              <div className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-300 leading-relaxed">
                <p>
                  <span className="text-green-400 font-semibold">Full-stack developer and SaaS specialist</span> with 6+ years of experience 
                  building scalable web applications, AI automation solutions, and business software. Creator of{' '}
                  <Link href="/saas-tools/companyhub" className="text-cyan-400 hover:text-cyan-300 underline font-semibold">CompanyHub</Link>
                  {' '}(All-in-One Business Management Tool) and{' '}
                  <Link href="/saas-tools/expenseflow" className="text-cyan-400 hover:text-cyan-300 underline font-semibold">ExpenseFlow</Link>
                  {' '}(Expense Tracking SaaS). Explore my{' '}
                  <Link href="/saas-tools" className="text-purple-400 hover:text-purple-300 underline">SaaS products</Link>
                  {' '}or read about{' '}
                  <Link href="/blog/building-scalable-saas-products-complete-guide-2025" className="text-blue-400 hover:text-blue-300 underline">building scalable SaaS products</Link>.
                </p>
                <p>
                  Expert in <span className="text-blue-400 font-semibold">React, Next.js, TypeScript, Node.js, PostgreSQL</span>, 
                  SaaS architecture, multi-tenancy, subscription systems, AI automation, SEO, and modern web technologies. 
                  Check out my{' '}
                  <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 underline">blog articles</Link>
                  {' '}for insights on these technologies, or use my{' '}
                  <Link href="/tools" className="text-green-400 hover:text-green-300 underline">free developer tools</Link>.
                </p>
                <p>
                  Specializing in <span className="text-purple-400 font-semibold">SaaS product development</span>, helping businesses 
                  build scalable software solutions from concept to deployment. Known for clean architecture, fast execution, and production-ready code. 
                  Learn more about{' '}
                  <Link href="/blog/saas-pricing-strategies-maximize-revenue" className="text-yellow-400 hover:text-yellow-300 underline">SaaS pricing strategies</Link>
                  {' '}or use the{' '}
                  <Link href="/tools/saas-pricing-calculator" className="text-cyan-400 hover:text-cyan-300 underline">SaaS Pricing Calculator</Link>.
                </p>
              </div>
            </div>
                    </div>

          {/* Expertise Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {expertise.map((item, index) => (
              <div
                key={index}
                className={`card-modern p-4 md:p-8 ${item.color} cursor-pointer hover:scale-105 transition-transform flex flex-col`}
                style={{animationDelay: `${index * 0.15}s`}}
                onClick={() => setSelectedService(item.serviceDetails)}
              >
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="p-2 md:p-3 bg-white/5 rounded-xl">
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{item.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 flex-grow">
                  {item.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 md:px-3 py-1 md:py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-xs md:text-sm hover:bg-white/10 hover:border-white/20 transition-all h-fit"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="text-center text-cyan-400 text-xs md:text-sm font-medium mt-auto pt-2">
                  Click to learn more →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  );
}
