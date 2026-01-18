import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { blogPosts, getFeaturedPosts } from "@/data/blogPosts";
import { useState } from "react";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let filtered = blogPosts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory]);

  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const featuredPosts = getFeaturedPosts();

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
              <Tag size={16} />
              <span>Blog & Insights</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Latest Articles & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Insights</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Expert insights on SaaS development, AI automation, web development, and digital marketing
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 md:mb-12 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => {
                const categorySlug = category === "All" ? null : category.toLowerCase().replace(/\s+/g, '-');
                return category === "All" ? (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ) : (
                  <Link
                    key={category}
                    href={`/blog/category/${categorySlug}`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && searchQuery === "" && selectedCategory === "All" && (
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.slice(0, 2).map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <article className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer h-full">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-medium">
                          {post.category}
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

          {/* Trending Articles (Most Recent) */}
          {searchQuery === "" && selectedCategory === "All" && (
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white flex items-center gap-2">
                <span>🔥 Trending Articles</span>
                <span className="text-sm text-gray-400 font-normal">(Latest)</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {blogPosts
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 3)
                  .map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <article className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer h-full">
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                          <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-medium">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTime} min
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      </article>
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {/* Popular Articles (Featured) */}
          {searchQuery === "" && selectedCategory === "All" && (
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">⭐ Popular Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {blogPosts
                  .filter(post => post.featured)
                  .slice(0, 3)
                  .map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <article className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer h-full flex flex-col">
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                          <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded text-xs font-medium">
                            ⭐ Featured
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTime} min read
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map(tag => {
                            const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
                            return (
                              <Link key={tag} href={`/blog/tag/${tagSlug}`}>
                                <span className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs hover:bg-white/10 hover:text-cyan-400 transition-all cursor-pointer">
                                  {tag}
                                </span>
                              </Link>
                            );
                          })}
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
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              {searchQuery || selectedCategory !== "All" ? "Search Results" : "All Articles"}
            </h2>
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
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
                        {post.tags.slice(0, 3).map(tag => {
                          const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
                          return (
                            <Link key={tag} href={`/blog/tag/${tagSlug}`}>
                              <span className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs hover:bg-white/10 hover:text-cyan-400 transition-all cursor-pointer">
                                {tag}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all">
                        <span className="font-medium text-sm">Read article</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

