import { useState, useEffect, useRef } from "react";
import { Search, X, FileText, Code2, Sparkles, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { blogPosts } from "@/data/blogPosts";
import { saasProducts } from "@/data/saasTools";

interface SearchResult {
  id: string;
  title: string;
  type: 'blog' | 'saas' | 'page';
  url: string;
  excerpt?: string;
  category?: string;
  readTime?: number;
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search blog posts
    blogPosts.forEach(post => {
      const matchesTitle = post.title.toLowerCase().includes(searchQuery);
      const matchesExcerpt = post.excerpt.toLowerCase().includes(searchQuery);
      const matchesTags = post.tags.some(tag => tag.toLowerCase().includes(searchQuery));
      const matchesCategory = post.category.toLowerCase().includes(searchQuery);

      if (matchesTitle || matchesExcerpt || matchesTags || matchesCategory) {
        searchResults.push({
          id: post.id,
          title: post.title,
          type: 'blog',
          url: `/blog/${post.slug}`,
          excerpt: post.excerpt,
          category: post.category,
          readTime: post.readTime
        });
      }
    });

    // Search SaaS products
    saasProducts.forEach(product => {
      const matchesName = product.name.toLowerCase().includes(searchQuery);
      const matchesTagline = product.tagline.toLowerCase().includes(searchQuery);
      const matchesDescription = product.description.toLowerCase().includes(searchQuery);
      const matchesFeatures = product.features.some(f => 
        f.title.toLowerCase().includes(searchQuery) || 
        f.description.toLowerCase().includes(searchQuery)
      );

      if (matchesName || matchesTagline || matchesDescription || matchesFeatures) {
        searchResults.push({
          id: product.id,
          title: product.name,
          type: 'saas',
          url: `/saas-tools/${product.slug}`,
          excerpt: product.tagline,
          category: product.category
        });
      }
    });

    // Search pages
    const pages = [
      { title: 'Home', url: '/#home', type: 'page' as const },
      { title: 'About', url: '/#about', type: 'page' as const },
      { title: 'Skills', url: '/#skills', type: 'page' as const },
      { title: 'Projects', url: '/#projects', type: 'page' as const },
      { title: 'Experience', url: '/#experience', type: 'page' as const },
      { title: 'Tech Stack', url: '/#tech-stack', type: 'page' as const },
      { title: 'Testimonials', url: '/#testimonials', type: 'page' as const },
      { title: 'FAQ', url: '/#faq', type: 'page' as const },
      { title: 'Contact', url: '/#contact', type: 'page' as const },
    ];

    pages.forEach(page => {
      if (page.title.toLowerCase().includes(searchQuery)) {
        searchResults.push({
          id: page.title,
          title: page.title,
          type: page.type,
          url: page.url
        });
      }
    });

    // Sort by relevance (title matches first)
    searchResults.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(searchQuery);
      const bTitleMatch = b.title.toLowerCase().includes(searchQuery);
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      return 0;
    });

    setResults(searchResults.slice(0, 10)); // Limit to 10 results
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      const result = results[selectedIndex];
      if (result.type === 'page') {
        window.location.href = result.url;
      } else {
        window.location.href = result.url;
      }
      onClose();
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return <FileText size={18} className="text-blue-400" />;
      case 'saas':
        return <Sparkles size={18} className="text-cyan-400" />;
      default:
        return <Code2 size={18} className="text-gray-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 md:pt-32 px-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search articles, SaaS tools, pages..."
              className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query && results.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-2">Try different keywords</p>
            </div>
          )}

          {query && results.length > 0 && (
            <div className="p-2">
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  href={result.url}
                  onClick={onClose}
                >
                  <div
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      index === selectedIndex
                        ? 'bg-cyan-500/20 border border-cyan-500/50'
                        : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white truncate">
                            {result.title}
                          </h3>
                          {result.category && (
                            <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs font-medium border border-cyan-500/30 flex-shrink-0">
                              {result.category}
                            </span>
                          )}
                        </div>
                        {result.excerpt && (
                          <p className="text-sm text-gray-400 line-clamp-1 mb-2">
                            {result.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="capitalize">{result.type}</span>
                          {result.readTime && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {result.readTime} min read
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!query && (
            <div className="p-8 text-center text-gray-400">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Start typing to search</p>
              <p className="text-sm">Search across blog posts, SaaS tools, and pages</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {query && results.length > 0 && (
          <div className="p-3 border-t border-white/10 bg-gray-950/50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{results.length} result{results.length !== 1 ? 's' : ''} found</span>
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

