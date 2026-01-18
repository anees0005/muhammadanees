import { Link } from "wouter";
import { Home, Search, BookOpen, Calculator, TrendingUp, ArrowRight, AlertCircle } from "lucide-react";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import { blogPosts, getFeaturedPosts } from "@/data/blogPosts";
import { getAllSaaSProducts } from "@/data/saasTools";
import { useState } from "react";
import SearchModal from "@/components/ui/search-modal";

export default function NotFound() {
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Get popular content
  const featuredPosts = getFeaturedPosts().slice(0, 3);
  const latestPosts = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  const saasProducts = getAllSaaSProducts().slice(0, 2);

  const tools = [
    { id: 'saas-pricing-calculator', name: 'SaaS Pricing Calculator', href: '/tools/saas-pricing-calculator' },
    { id: 'website-speed-test', name: 'Website Speed Test', href: '/tools/website-speed-test' },
    { id: 'seo-score-checker', name: 'SEO Score Checker', href: '/tools/seo-score-checker' },
  ];

  return (
    <div className="relative bg-[hsl(var(--dark-bg))] text-white min-h-screen">
      <Navigation />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      
      <div className="relative z-10 pt-32 pb-16 px-3 md:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* 404 Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500/10 rounded-full mb-6">
              <AlertCircle size={48} className="text-red-400" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Oops! The page you're looking for doesn't exist. But don't worry, we've got plenty of great content for you to explore.
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href="/">
                <button className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all inline-flex items-center gap-2">
                  <Home size={20} />
                  Go Home
                </button>
              </Link>
              <button
                onClick={() => setSearchOpen(true)}
                className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <Search size={20} />
                Search Site
              </button>
              <Link href="/blog">
                <button className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all inline-flex items-center gap-2">
                  <BookOpen size={20} />
                  Browse Blog
                </button>
              </Link>
            </div>
          </div>

          {/* Popular Content Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Featured Articles */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp size={24} className="text-cyan-400" />
                Featured Articles
              </h3>
              <div className="space-y-4">
                {featuredPosts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <div className="group bg-white/5 border border-white/10 rounded-lg p-4 hover:border-cyan-500/50 hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                        <ArrowRight size={20} className="text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest Articles */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen size={24} className="text-blue-400" />
                Latest Articles
              </h3>
              <div className="space-y-4">
                {latestPosts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <div className="group bg-white/5 border border-white/10 rounded-lg p-4 hover:border-blue-500/50 hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                        <ArrowRight size={20} className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Tools & Resources */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Free Tools */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calculator size={24} className="text-green-400" />
                Free Developer Tools
              </h3>
              <div className="space-y-3">
                {tools.map(tool => (
                  <Link key={tool.id} href={tool.href}>
                    <div className="group bg-white/5 border border-white/10 rounded-lg p-4 hover:border-green-500/50 hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="text-white group-hover:text-green-400 transition-colors font-medium">
                          {tool.name}
                        </span>
                        <ArrowRight size={18} className="text-gray-400 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
                <Link href="/tools">
                  <div className="mt-4 text-center">
                    <button className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-2">
                      View All Tools
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </Link>
              </div>
            </div>

            {/* SaaS Products */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp size={24} className="text-purple-400" />
                SaaS Products
              </h3>
              <div className="space-y-3">
                {saasProducts.map(product => (
                  <Link key={product.id} href={`/saas-tools/${product.slug}`}>
                    <div className="group bg-white/5 border border-white/10 rounded-lg p-4 hover:border-purple-500/50 hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white group-hover:text-purple-400 transition-colors font-medium block">
                            {product.name}
                          </span>
                          <span className="text-sm text-gray-400">
                            {product.description.substring(0, 60)}...
                          </span>
                        </div>
                        <ArrowRight size={18} className="text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </div>
                  </Link>
                ))}
                <Link href="/saas-tools">
                  <div className="mt-4 text-center">
                    <button className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-2">
                      View All Products
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/">
                <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
                  <Home size={24} className="mx-auto mb-2 text-cyan-400" />
                  <span className="text-sm text-gray-300">Home</span>
                </div>
              </Link>
              <Link href="/blog">
                <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
                  <BookOpen size={24} className="mx-auto mb-2 text-blue-400" />
                  <span className="text-sm text-gray-300">Blog</span>
                </div>
              </Link>
              <Link href="/tools">
                <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
                  <Calculator size={24} className="mx-auto mb-2 text-green-400" />
                  <span className="text-sm text-gray-300">Tools</span>
                </div>
              </Link>
              <Link href="/resources">
                <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
                  <TrendingUp size={24} className="mx-auto mb-2 text-purple-400" />
                  <span className="text-sm text-gray-300">Resources</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
