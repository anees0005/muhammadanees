import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Calendar, Code2, CheckCircle2 } from "lucide-react";
import { getAllCaseStudies, getFeaturedCaseStudies } from "@/data/caseStudies";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";

export default function CaseStudies() {
  const allStudies = getAllCaseStudies();
  const featuredStudies = getFeaturedCaseStudies();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <TrendingUp size={16} />
              <span>Case Studies</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Real Projects, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Real Results</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Detailed case studies showcasing how we've helped businesses achieve their goals through innovative SaaS solutions, web development, and digital marketing
            </p>
          </div>

          {/* Featured Case Studies */}
          {featuredStudies.length > 0 && (
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Featured Case Studies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredStudies.map(study => (
                  <Link key={study.id} href={`/case-studies/${study.slug}`}>
                    <article className="group bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 hover:border-cyan-500/50 transition-all cursor-pointer h-full">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/30">
                          {study.industry}
                        </span>
                        <span className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-xs font-medium border border-white/10 flex items-center gap-1">
                          <Calendar size={12} />
                          {study.duration}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {study.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.technologies.slice(0, 4).map(tech => (
                          <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 text-gray-400 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                        {study.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-white/5 border border-white/10 text-gray-400 rounded text-xs">
                            +{study.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all">
                        <span className="font-medium text-sm">Read Case Study</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Case Studies */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">All Case Studies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allStudies.map(study => (
                <Link key={study.id} href={`/case-studies/${study.slug}`}>
                  <article className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-medium border border-cyan-500/30">
                        {study.industry}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                      {study.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all">
                      <span className="font-medium text-sm">View Details</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

