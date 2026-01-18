import { Link } from "wouter";
import { Download, FileText, Code, CheckSquare, Image, FileSpreadsheet, Search, Filter, Mail, ArrowRight, X } from "lucide-react";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import { resources, getResourcesByCategory, getResourcesByType, Resource } from "@/data/resources";
import { useState } from "react";
import EmailCapturePopup from "@/components/ui/EmailCapturePopup";

export default function ResourcesLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailModal, setEmailModal] = useState<{ open: boolean; resourceId: string | null }>({ open: false, resourceId: null });
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))];
  const types = ['all', ...Array.from(new Set(resources.map(r => r.type)))];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesType && matchesSearch;
  });

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf': return <FileText size={20} className="text-red-400" />;
      case 'template': return <FileSpreadsheet size={20} className="text-blue-400" />;
      case 'checklist': return <CheckSquare size={20} className="text-green-400" />;
      case 'code': return <Code size={20} className="text-purple-400" />;
      case 'design': return <Image size={20} className="text-pink-400" />;
      default: return <FileText size={20} className="text-gray-400" />;
    }
  };

  const getTypeColor = (type: Resource['type']) => {
    switch (type) {
      case 'pdf': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'template': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'checklist': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'code': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'design': return 'bg-pink-500/10 text-pink-400 border-pink-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const handleDownload = (resource: Resource) => {
    if (resource.requiresEmail && !emailModal.open) {
      setEmailModal({ open: true, resourceId: resource.id });
      return;
    }
    
    // Track download
    // In production, you'd track this in your analytics
    console.log('Download:', resource.title);
    
    // Trigger download
    if (resource.fileUrl) {
      // In production, this would be an actual file download
      // For now, we'll just show a message
      alert(`Downloading ${resource.title}...\n\nNote: In production, this would download the actual file.`);
    }
    
    setEmailModal({ open: false, resourceId: null });
    setEmail('');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Here you would integrate with your email service
    // For now, proceed with download
    const resource = resources.find(r => r.id === emailModal.resourceId);
    if (resource) {
      handleDownload(resource);
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
              Resource Library
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Free downloadable resources including guides, templates, checklists, and code snippets to help you build better software.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-[hsl(var(--dark-bg))]">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                >
                  {types.map(type => (
                    <option key={type} value={type} className="bg-[hsl(var(--dark-bg))]">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                className="group card-modern p-6 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(resource.type)}`}>
                    {resource.type.toUpperCase()}
                  </div>
                  {getTypeIcon(resource.type)}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                  {resource.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 flex-grow">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleDownload(resource)}
                  className="w-full px-4 py-2 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition-all inline-flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  {resource.requiresEmail ? 'Download (Email Required)' : 'Download Free'}
                </button>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No resources found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedType('all');
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
              <div className="text-3xl font-bold text-cyan-400">{resources.length}</div>
              <div className="text-sm text-gray-400 mt-1">Total Resources</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-green-400">{getResourcesByType('checklist').length}</div>
              <div className="text-sm text-gray-400 mt-1">Checklists</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-blue-400">{getResourcesByType('template').length}</div>
              <div className="text-sm text-gray-400 mt-1">Templates</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-purple-400">{getResourcesByType('pdf').length}</div>
              <div className="text-sm text-gray-400 mt-1">PDF Guides</div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      {emailModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-[hsl(var(--dark-bg))] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <button
              onClick={() => setEmailModal({ open: false, resourceId: null })}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
                <Mail size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Get Your Free Resource
              </h3>
              <p className="text-gray-400">
                Enter your email to download this resource and get access to our newsletter with the latest tips and updates.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                  required
                  autoFocus
                />
                {emailError && (
                  <p className="text-red-400 text-sm mt-2">{emailError}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all inline-flex items-center justify-center gap-2"
              >
                <Download size={18} />
                <span>Download Now</span>
              </button>
              <p className="text-gray-500 text-xs text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      )}

      <Footer />
      </div>
    </div>
  );
}

