import { useEffect } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, Calendar, Code2, CheckCircle2, Target, Lightbulb } from "lucide-react";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default function CaseStudyDetail() {
  const [, params] = useRoute("/case-studies/:slug");
  const slug = params?.slug || "";
  const study = getCaseStudyBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return (
      <div className="relative bg-[hsl(var(--dark-bg))] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <p className="text-gray-400 mb-8">The case study you're looking for doesn't exist.</p>
          <Link href="/case-studies">
            <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all">
              Back to Case Studies
            </button>
          </Link>
        </div>
      </div>
    );
  }

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
        <div className="container mx-auto max-w-5xl">
          <Link href="/case-studies">
            <button className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8">
              <ArrowLeft size={18} />
              <span>Back to Case Studies</span>
            </button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/30">
                {study.industry}
              </span>
              <span className="px-4 py-2 bg-white/5 text-gray-400 rounded-full text-sm font-medium border border-white/10 flex items-center gap-2">
                <Calendar size={14} />
                {study.duration}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {study.title}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {study.excerpt}
            </p>
          </div>

          {/* Challenge Section */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Target size={28} className="text-red-400" />
              <h2 className="text-2xl font-bold text-white">The Challenge</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {study.challenge}
            </p>
          </div>

          {/* Solution Section */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb size={28} className="text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">The Solution</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {study.solution}
            </p>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp size={28} className="text-green-400" />
              <h2 className="text-2xl font-bold text-white">Results</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {study.results.map((result, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {result.value}
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">
                    {result.metric}
                  </div>
                  <div className="text-sm text-gray-400">
                    {result.improvement}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Section */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Code2 size={28} className="text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Technologies Used</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {study.technologies.map(tech => (
                <span key={tech} className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Start Your Project?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <Link href="#contact">
              <button className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all inline-flex items-center gap-2">
                <span>Get in Touch</span>
                <ArrowLeft size={20} className="rotate-180" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

