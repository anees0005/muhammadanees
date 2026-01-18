import { useEffect } from "react";
import { Link } from "wouter";
import { ExternalLink, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { getAllSaaSProducts } from "@/data/saasTools";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";

export default function SAASTools() {
  const products = getAllSaaSProducts();

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
              <Sparkles size={16} />
              <span>SaaS Products</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              SaaS Tools & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Products</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional SaaS solutions built with modern technology, designed to solve real business problems and drive efficiency.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
            {products.map((product) => (
              <Link key={product.id} href={`/saas-tools/${product.slug}`}>
                <article className="group bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-cyan-500/50 transition-all cursor-pointer h-full flex flex-col">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
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

                  {/* Product Info */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-lg text-cyan-400 mb-4 font-medium">
                    {product.tagline}
                  </p>
                  <p className="text-gray-400 mb-6 line-clamp-3 flex-grow">
                    {product.description}
                  </p>

                  {/* Key Features Preview */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3">Key Features:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {product.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-400 line-clamp-1">{feature.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-300 mb-2">Tech Stack:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.techStack.slice(0, 5).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 text-gray-400 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {product.techStack.length > 5 && (
                        <span className="px-2 py-1 bg-white/5 border border-white/10 text-gray-400 rounded text-xs">
                          +{product.techStack.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all">
                      <span className="font-medium">View Details</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-all text-cyan-400 text-sm"
                    >
                      <ExternalLink size={16} />
                      <span>Visit Site</span>
                    </a>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-block bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Need a Custom SaaS Solution?
              </h2>
              <p className="text-gray-400 mb-6">
                I specialize in building scalable, modern SaaS applications tailored to your business needs. From concept to deployment, I deliver production-ready solutions.
              </p>
              <Link href="#contact">
                <button className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all inline-flex items-center gap-2">
                  <span>Get in Touch</span>
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

