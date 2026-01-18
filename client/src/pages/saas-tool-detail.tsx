import { useEffect } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, CheckCircle2, Calendar, Code2, Sparkles } from "lucide-react";
import { getSaaSProductBySlug } from "@/data/saasTools";
import { useState } from "react";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default function SAASToolDetail() {
  const [, params] = useRoute("/saas-tools/:slug");
  const slug = params?.slug || "";
  const product = getSaaSProductBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} - ${product.tagline} | SaaS Products`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', product.description);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="relative bg-[hsl(var(--dark-bg))] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/saas-tools">
            <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all">
              Back to SaaS Tools
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
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumbs */}
          {product && <Breadcrumbs items={[
            { label: "SaaS Tools", href: "/saas-tools" },
            { label: product.name }
          ]} />}

          {/* Product Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                product.status === 'live' 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                  : product.status === 'beta'
                  ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                  : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
              }`}>
                {product.status === 'live' ? '● Live' : product.status === 'beta' ? '● Beta' : 'Coming Soon'}
              </span>
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/30">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {product.name}
            </h1>
            <p className="text-2xl md:text-3xl text-cyan-400 mb-6 font-medium">
              {product.tagline}
            </p>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all"
              >
                <ExternalLink size={20} />
                <span>Visit Live Site</span>
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar size={16} />
                <span className="text-sm">Launched {new Date(product.launchDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={24} className="text-cyan-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Key Features</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {product.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 size={24} className="text-cyan-400 flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Code2 size={24} className="text-cyan-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Technology Stack</h2>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
              <div className="flex flex-wrap gap-3">
                {product.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Highlights Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Why {product.name}?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-4"
                >
                  <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{highlight}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Interested in Building Your Own SaaS?
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                I specialize in developing custom SaaS solutions from concept to deployment. Let's discuss how I can help bring your SaaS idea to life.
              </p>
              <Link href="#contact">
                <button className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all inline-flex items-center gap-2">
                  <span>Start a Conversation</span>
                  <ArrowLeft size={20} className="rotate-180" />
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

