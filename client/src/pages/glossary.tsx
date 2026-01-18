import { Link } from "wouter";
import { BookOpen, Search, Tag, ExternalLink, ArrowRight } from "lucide-react";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import { glossaryTerms, getCategories, searchGlossaryTerms, GlossaryTerm } from "@/data/glossary";
import { useState, useEffect } from "react";

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [filteredTerms, setFilteredTerms] = useState(glossaryTerms);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tech Glossary - Definitions & Terminology | Muhammad Anees";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Comprehensive tech glossary with definitions of SaaS, React, Next.js, TypeScript, API, SEO, and more. Learn technical terms and concepts.');
    }

    // Add Glossary schema markup
    const existingSchema = document.getElementById('glossary-schema');
    if (existingSchema) existingSchema.remove();

    const schemaScript = document.createElement('script');
    schemaScript.id = 'glossary-schema';
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Tech Glossary",
      "description": "Comprehensive glossary of technical terms and definitions",
      "url": "https://anees0005.github.io/muhammadanees/glossary",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": glossaryTerms.slice(0, 10).map((term, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "DefinedTerm",
            "name": term.term,
            "description": term.definition,
            "url": `https://anees0005.github.io/muhammadanees/glossary/${term.slug}`
          }
        }))
      }
    });
    document.head.appendChild(schemaScript);

    return () => {
      const schema = document.getElementById('glossary-schema');
      if (schema) schema.remove();
    };
  }, []);

  useEffect(() => {
    let filtered = glossaryTerms;

    if (searchQuery) {
      filtered = searchGlossaryTerms(searchQuery);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }

    setFilteredTerms(filtered);
  }, [searchQuery, selectedCategory]);

  const categories = ["all", ...getCategories()];

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <BookOpen size={16} />
              <span>Tech Glossary</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Technical Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Definitions</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive glossary of technical terms, concepts, and definitions in software development, SaaS, and web technologies.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search terms... (e.g., SaaS, React, API)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {category === "all" ? "All Categories" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Terms Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTerms.map(term => (
              <div
                key={term.id}
                onClick={() => setSelectedTerm(term)}
                className="group card-modern p-6 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/30">
                    {term.category}
                  </div>
                  <BookOpen size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                  {term.term}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
                  {term.definition}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {term.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all">
                  <span className="font-medium text-sm">Read definition</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No terms found matching your criteria.</p>
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
              <div className="text-3xl font-bold text-cyan-400">{glossaryTerms.length}</div>
              <div className="text-sm text-gray-400 mt-1">Total Terms</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-blue-400">{getCategories().length}</div>
              <div className="text-sm text-gray-400 mt-1">Categories</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-green-400">{glossaryTerms.filter(t => t.examples).length}</div>
              <div className="text-sm text-gray-400 mt-1">With Examples</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-purple-400">{new Set(glossaryTerms.flatMap(t => t.tags)).size}</div>
              <div className="text-sm text-gray-400 mt-1">Unique Tags</div>
            </div>
          </div>
        </div>
      </div>

      {/* Term Detail Modal */}
      {selectedTerm && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedTerm(null)}
        >
          <div 
            className="relative bg-[hsl(var(--dark-bg))] border border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTerm(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink size={24} />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/30">
                  {selectedTerm.category}
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{selectedTerm.term}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{selectedTerm.definition}</p>
            </div>

            {selectedTerm.examples && selectedTerm.examples.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">Examples</h3>
                <ul className="space-y-2">
                  {selectedTerm.examples.map((example, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">Related Terms</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTerm.relatedTerms.map((relatedTerm, index) => {
                    const related = glossaryTerms.find(t => t.term === relatedTerm);
                    return related ? (
                      <Link key={index} href={`/glossary/${related.slug}`}>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-pointer">
                          {relatedTerm}
                        </span>
                      </Link>
                    ) : (
                      <span key={index} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400">
                        {relatedTerm}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTerm.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      </div>
    </div>
  );
}

