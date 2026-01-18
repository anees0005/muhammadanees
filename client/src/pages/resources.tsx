import { Link } from "wouter";
import { BookOpen, Code, TrendingUp, Zap, Layers, Target, Search, Filter, Calculator, Download } from "lucide-react";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import { blogPosts } from "@/data/blogPosts";
import { getAllSaaSProducts } from "@/data/saasTools";
import { useState } from "react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'tool' | 'saas' | 'guide';
  category: string;
  tags: string[];
  url: string;
  icon: any;
}

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Build resources from blog posts, tools, and SaaS products
  const resources: Resource[] = [
    // Blog posts
    ...blogPosts.map(post => ({
      id: `blog-${post.id}`,
      title: post.title,
      description: post.excerpt,
      type: 'article' as const,
      category: post.category,
      tags: post.tags,
      url: `/blog/${post.slug}`,
      icon: BookOpen
    })),
    // Tools
    {
      id: 'tool-pricing',
      title: 'SaaS Pricing Calculator',
      description: 'Calculate optimal pricing for your SaaS product based on costs, margins, and market analysis.',
      type: 'tool',
      category: 'Tools',
      tags: ['SaaS', 'Pricing', 'Business'],
      url: '/tools/saas-pricing-calculator',
      icon: Calculator
    },
    {
      id: 'tool-speed',
      title: 'Website Speed Test',
      description: 'Test your website loading speed and get optimization recommendations.',
      type: 'tool',
      category: 'Tools',
      tags: ['Performance', 'SEO', 'Web Development'],
      url: '/tools/website-speed-test',
      icon: Zap
    },
    {
      id: 'tool-seo',
      title: 'SEO Score Checker',
      description: 'Analyze your website SEO score and get actionable recommendations.',
      type: 'tool',
      category: 'Tools',
      tags: ['SEO', 'Marketing', 'Analytics'],
      url: '/tools/seo-score-checker',
      icon: Target
    },
    {
      id: 'tool-tech',
      title: 'Tech Stack Recommender',
      description: 'Get personalized tech stack recommendations based on your project requirements.',
      type: 'tool',
      category: 'Tools',
      tags: ['Development', 'Technology', 'Architecture'],
      url: '/tools/tech-stack-recommender',
      icon: Layers
    },
    {
      id: 'tool-api',
      title: 'API Response Time Calculator',
      description: 'Test API response times and performance metrics.',
      type: 'tool',
      category: 'Tools',
      tags: ['API', 'Performance', 'Development'],
      url: '/tools/api-response-time',
      icon: Zap
    },
    // SaaS Products
    ...getAllSaaSProducts().map(product => ({
      id: `saas-${product.id}`,
      title: product.name,
      description: product.description,
      type: 'saas' as const,
      category: 'SaaS Products',
      tags: product.tags || [],
      url: `/saas/${product.slug}`,
      icon: TrendingUp
    }))
  ];

  const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))];
  const allTags = Array.from(new Set(resources.flatMap(r => r.tags)));

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'tool': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'saas': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'guide': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="relative bg-[hsl(var(--dark-bg))] text-white min-h-screen overflow-x-hidden">
      {/* Modern Minimal Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(240,10%,3.9%)] via-[hsl(240,10%,5%)] to-[hsl(240,10%,7%)]">
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>
      
      {/* Main Content - Layered Above Background */}
      <div className="relative z-10">
      <Navigation />
      
      <div className="relative z-10 pt-24 pb-16 px-3 md:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Resource Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive collection of articles, tools, guides, and SaaS products to help you build better software and grow your business.
            </p>
            <div className="mt-6">
              <Link href="/resources-library">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all inline-flex items-center gap-2">
                  <Download size={20} />
                  Browse Free Resources Library
                </button>
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources, articles, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => {
              const Icon = resource.icon;
              return (
                <Link key={resource.id} href={resource.url}>
                  <div className="group card-modern p-6 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(resource.type)}`}>
                        {resource.type.toUpperCase()}
                      </div>
                      <Icon size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 flex-grow">
                      {resource.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {resource.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No resources found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-cyan-400">{blogPosts.length}</div>
              <div className="text-sm text-gray-400 mt-1">Articles</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-green-400">5</div>
              <div className="text-sm text-gray-400 mt-1">Free Tools</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-purple-400">{getAllSaaSProducts().length}</div>
              <div className="text-sm text-gray-400 mt-1">SaaS Products</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-yellow-400">{allTags.length}</div>
              <div className="text-sm text-gray-400 mt-1">Topics</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      </div>
    </div>
  );
}

