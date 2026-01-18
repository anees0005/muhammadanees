import { Link } from "wouter";
import { Calculator, Zap, Search, Code2, Activity, ArrowRight } from "lucide-react";

const featuredTools = [
  {
    id: 'saas-pricing-calculator',
    name: 'SaaS Pricing Calculator',
    description: 'Calculate optimal pricing for your SaaS product',
    icon: <Calculator size={24} />,
    color: 'cyan'
  },
  {
    id: 'website-speed-test',
    name: 'Website Speed Test',
    description: 'Test website performance and Core Web Vitals',
    icon: <Zap size={24} />,
    color: 'yellow'
  },
  {
    id: 'seo-score-checker',
    name: 'SEO Score Checker',
    description: 'Analyze SEO and get optimization recommendations',
    icon: <Search size={24} />,
    color: 'green'
  },
  {
    id: 'tech-stack-recommender',
    name: 'Tech Stack Recommender',
    description: 'Get personalized technology recommendations',
    icon: <Code2 size={24} />,
    color: 'purple'
  },
  {
    id: 'api-response-time',
    name: 'API Response Time',
    description: 'Test API performance and response times',
    icon: <Activity size={24} />,
    color: 'blue'
  }
];

export default function ToolsSection() {
  return (
    <section id="tools" className="py-24 px-3 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="section-fade">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <Code2 size={16} />
              <span>Free Developer Tools</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tools</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Free tools to help you optimize websites, improve SEO, test APIs, and make better technology decisions. 
              All tools are free to use with no signup required.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredTools.map((tool) => {
              const colorClasses = {
                cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", hover: "hover:border-cyan-500/50" },
                yellow: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400", hover: "hover:border-yellow-500/50" },
                green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", hover: "hover:border-green-500/50" },
                purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", hover: "hover:border-purple-500/50" },
                blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", hover: "hover:border-blue-500/50" }
              };
              const colors = colorClasses[tool.color as keyof typeof colorClasses];
              
              return (
                <Link key={tool.id} href={`/tools/${tool.id}`}>
                  <article className={`group bg-white/5 border ${colors.border} rounded-xl p-6 hover:${colors.hover} transition-all cursor-pointer h-full`}>
                    <div className={`w-14 h-14 ${colors.bg} border ${colors.border} rounded-xl flex items-center justify-center mb-4 ${colors.text}`}>
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gradient-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all">
                      <span className="text-sm font-medium">Use Tool</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/tools">
              <button className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all inline-flex items-center gap-2">
                <span>View All Tools</span>
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

