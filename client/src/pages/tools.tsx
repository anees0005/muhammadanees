import { useEffect } from "react";
import { Link } from "wouter";
import { Calculator, ArrowRight, Code2, Zap, Search, Activity } from "lucide-react";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";

export default function Tools() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // SEO: Update page title and meta
    document.title = "Free Developer Tools - Website Speed Test, SEO Checker, Tech Stack Recommender | Muhammad Anees";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free developer tools: Website speed test, SEO score checker, tech stack recommender, API response time calculator, and SaaS pricing calculator. All tools are free to use with no signup required.');
    }
  }, []);

  const tools = [
    {
      id: 'saas-pricing-calculator',
      name: 'SaaS Pricing Calculator',
      description: 'Calculate optimal pricing for your SaaS product based on costs, target margin, and market analysis.',
      icon: <Calculator size={32} />,
      color: 'cyan'
    },
    {
      id: 'website-speed-test',
      name: 'Website Speed Test',
      description: 'Test your website loading speed and get Core Web Vitals metrics with optimization recommendations.',
      icon: <Zap size={32} />,
      color: 'yellow'
    },
    {
      id: 'seo-score-checker',
      name: 'SEO Score Checker',
      description: 'Analyze your website SEO score and get actionable recommendations to improve search rankings.',
      icon: <Search size={32} />,
      color: 'green'
    },
    {
      id: 'tech-stack-recommender',
      name: 'Tech Stack Recommender',
      description: 'Get personalized technology recommendations based on your project type, team size, and budget.',
      icon: <Code2 size={32} />,
      color: 'purple'
    },
    {
      id: 'api-response-time',
      name: 'API Response Time Calculator',
      description: 'Test API endpoint response times and analyze performance metrics for optimal API speed.',
      icon: <Activity size={32} />,
      color: 'blue'
    }
  ];

  return (
    <div className="relative bg-[hsl(var(--dark-bg))] text-white min-h-screen">
      <Navigation />
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(240,10%,3.9%)] via-[hsl(240,10%,5%)] to-[hsl(240,10%,7%)]">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-3 md:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <Code2 size={16} />
              <span>Free Tools & Calculators</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tools</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Free tools and calculators to help you make better decisions for your SaaS business and web development projects
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tools.map((tool) => {
              const colorClasses = {
                cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", hover: "hover:border-cyan-500/50" },
                yellow: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400", hover: "hover:border-yellow-500/50" },
                green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", hover: "hover:border-green-500/50" },
                purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", hover: "hover:border-purple-500/50" },
                blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", hover: "hover:border-blue-500/50" }
              };
              const colors = colorClasses[tool.color as keyof typeof colorClasses] || colorClasses.cyan;
              
              return (
                <Link key={tool.id} href={`/tools/${tool.id}`}>
                  <article className={`group bg-white/5 border ${colors.border} rounded-xl p-6 ${colors.hover} transition-all cursor-pointer h-full`}>
                    <div className={`w-16 h-16 ${colors.bg} border ${colors.border} rounded-xl flex items-center justify-center mb-4 ${colors.text}`}>
                      {tool.icon}
                    </div>
                    <h2 className={`text-xl font-bold mb-2 text-white group-hover:${colors.text.replace('text-', 'text-')} transition-colors`}>
                      {tool.name}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {tool.description}
                    </p>
                    <div className={`flex items-center gap-2 ${colors.text} mt-4 group-hover:gap-3 transition-all`}>
                      <span className="text-sm font-medium">Use Tool</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {/* SEO Section */}
          <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white text-center">
              Free Developer Tools for Better Web Performance
            </h2>
            <p className="text-gray-300 text-center mb-6 max-w-3xl mx-auto">
              Use our free tools to optimize your websites, improve SEO rankings, test API performance, 
              and make informed decisions about your tech stack. All tools are free to use and designed 
              to help developers build faster, better applications.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-8 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">100% Free</div>
                <p className="text-gray-400 text-sm">No signup required</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">5+ Tools</div>
                <p className="text-gray-400 text-sm">Comprehensive toolkit</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">Instant Results</div>
                <p className="text-gray-400 text-sm">Real-time analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

