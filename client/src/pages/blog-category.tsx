import { useEffect } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, Tag, ArrowLeft } from "lucide-react";
import { blogPosts, getPostsByCategory } from "@/data/blogPosts";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import Breadcrumbs from "@/components/ui/breadcrumbs";

const categoryDescriptions: Record<string, { title: string; description: string; keywords: string[] }> = {
  "SaaS Development": {
    title: "SaaS Development - Complete Guide to Building Software as a Service Products",
    description: "Learn everything about SaaS development including architecture, pricing strategies, multi-tenancy, scaling, and best practices. Expert guides on building successful SaaS products.",
    keywords: ["SaaS development", "software as a service", "SaaS architecture", "SaaS best practices", "SaaS scaling"]
  },
  "Web Development": {
    title: "Web Development - Modern Web Development Tutorials and Best Practices",
    description: "Comprehensive web development guides covering React, Next.js, TypeScript, performance optimization, and modern development practices. Learn from real-world examples.",
    keywords: ["web development", "React", "Next.js", "TypeScript", "frontend development", "full-stack development"]
  },
  "Digital Marketing": {
    title: "Digital Marketing - SEO, Content Marketing, and Growth Strategies",
    description: "Expert digital marketing strategies including SEO optimization, content marketing, social media, and growth hacking techniques for SaaS and web businesses.",
    keywords: ["digital marketing", "SEO", "content marketing", "growth marketing", "SaaS marketing"]
  },
  "AI Tools": {
    title: "AI Tools and Automation - Complete Guide to AI Integration",
    description: "Learn about AI tools, automation, chatbots, and AI integration for businesses. Guides on OpenAI, n8n workflows, and AI-powered features.",
    keywords: ["AI tools", "AI automation", "chatbots", "n8n", "OpenAI", "business automation"]
  },
  "Startups": {
    title: "Startups - Building and Scaling Successful Tech Startups",
    description: "Startup guides covering funding, product development, team building, and scaling strategies. Learn from successful startup stories and best practices.",
    keywords: ["startups", "startup funding", "product development", "startup scaling", "tech startups"]
  },
  "Automation": {
    title: "Automation - Business Process Automation and Workflow Tools",
    description: "Complete guides on business automation, workflow tools, n8n, and process optimization. Learn how to automate your business operations.",
    keywords: ["automation", "business automation", "n8n", "workflow automation", "process automation"]
  }
};

export default function BlogCategory() {
  const [, params] = useRoute("/blog/category/:category");
  const category = params?.category || "";
  const decodedCategory = decodeURIComponent(category.replace(/-/g, " "));
  
  const categoryPosts = getPostsByCategory(decodedCategory);
  const categoryInfo = categoryDescriptions[decodedCategory];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // SEO: Update page title and meta
    if (categoryInfo) {
      document.title = categoryInfo.title + " | Muhammad Anees";
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', categoryInfo.description);
      }
    }
  }, [category, categoryInfo]);

  if (!categoryInfo || categoryPosts.length === 0) {
    return (
      <div className="relative bg-[hsl(var(--dark-bg))] text-white min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
            <p className="text-gray-400 mb-8">The category you're looking for doesn't exist.</p>
            <Link href="/blog">
              <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all">
                Back to Blog
              </button>
            </Link>
          </div>
        </div>
        <Footer />
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
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: "Blog", href: "/blog" },
            { label: decodedCategory }
          ]} />

          {/* Category Header */}
          <div className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <Tag size={16} />
              <span>Category</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {decodedCategory}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              {categoryInfo.description}
            </p>
            
            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mt-6">
              {categoryInfo.keywords.map(keyword => (
                <span key={keyword} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Category Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                {categoryPosts.length}
              </div>
              <div className="text-sm text-gray-400">Articles</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                {categoryPosts.reduce((sum, post) => sum + post.readTime, 0)}
              </div>
              <div className="text-sm text-gray-400">Total Read Time</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                {new Set(categoryPosts.flatMap(post => post.tags)).size}
              </div>
              <div className="text-sm text-gray-400">Topics Covered</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                {categoryPosts.filter(post => post.featured).length}
              </div>
              <div className="text-sm text-gray-400">Featured</div>
            </div>
          </div>

          {/* Featured Articles */}
          {categoryPosts.filter(post => post.featured).length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {categoryPosts
                  .filter(post => post.featured)
                  .slice(0, 2)
                  .map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <article className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer h-full">
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                          <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-medium">
                            Featured
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTime} min read
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all">
                          <span className="font-medium">Read more</span>
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </article>
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              All {decodedCategory} Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer h-full flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime} min
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all">
                      <span className="font-medium text-sm">Read article</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Related Categories */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Explore Other Categories</h2>
            <div className="flex flex-wrap gap-3">
              {Object.keys(categoryDescriptions)
                .filter(cat => cat !== decodedCategory)
                .map(cat => {
                  const slug = cat.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <Link key={cat} href={`/blog/category/${slug}`}>
                      <span className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-white/10 hover:border-cyan-500/50 transition-all cursor-pointer">
                        {cat}
                      </span>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

