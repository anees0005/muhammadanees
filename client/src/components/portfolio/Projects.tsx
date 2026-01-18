import { ExternalLink, ShoppingCart, Code, Layers, Gamepad2, Bot, Star, Search, Maximize2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

// Import SEO project images
import project1Img from '../../assets/seo-work/project1.png';
import project2Img from '../../assets/seo-work/project2.png';
import project3Img from '../../assets/seo-work/project3.png';
import project4Img from '../../assets/seo-work/project4.png';
import project5Img from '../../assets/seo-work/project5.png';

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const projectCategories = [
    {
      category: "E-Commerce Websites",
      icon: <ShoppingCart size={24} />,
      color: "green",
      description: "Custom online stores with modern designs",
      projects: [
        { title: "BNC Clothing", url: "https://bncclothing.co.uk", tech: ["eCommerce", "Online Store"] },
        { title: "Clogsy", url: "https://clogsy.co.uk", tech: ["eCommerce", "Fashion"] },
        { title: "Leather Ledgers", url: "https://leatherledgers.co.uk", tech: ["eCommerce", "Products"] },
        { title: "Law Books Centre", url: "https://lawbookscentre.com", tech: ["WordPress", "WooCommerce"] },
        { title: "Novels Yard", url: "https://novelsyard.com", tech: ["WordPress", "eCommerce"] },
        { title: "Comfort Furnishings", url: "https://comfortfurnishings.co.uk", tech: ["eCommerce", "Furniture"] },
        { title: "Mstar Cleaning", url: "https://mstarcleaning.co.uk", tech: ["WordPress", "Services"] },
      ]
    },
    {
      category: "React Websites",
      icon: <Code size={24} />,
      color: "blue",
      description: "Modern web applications built with React",
      projects: [
        { title: "Este Aesthetic", url: "https://esteaesthetic.com", tech: ["React", "Healthcare"] },
        { title: "Este Services", url: "https://services.esteaesthetic.com", tech: ["React", "Booking"] },
        { title: "Chishty Immigration Law", url: "https://chishtyukimmigrationlaw.info", tech: ["React", "Legal"] },
        { title: "Mujtaba Ahmed Portfolio", url: "https://mujtabaahmed.vercel.app", tech: ["React", "Portfolio"] },
        { title: "ACE Cleaning", url: "https://acecleaning.services", tech: ["React", "Services"] },
        { title: "Saeed Khan Portfolio", url: "https://saeedkhan.vercel.app", tech: ["React", "Portfolio"] },
      ]
    },
    {
      category: "Next.js & Advanced",
      icon: <Layers size={24} />,
      color: "purple",
      description: "Server-side rendered applications",
      projects: [
        { title: "Skyline Strategies", url: "https://the-skyline-strategies.vercel.app", tech: ["Next.js", "IT Consultancy"] },
      ]
    },
    {
      category: "SaaS Products",
      icon: <Sparkles size={24} />,
      color: "cyan",
      description: "Full-stack SaaS applications with modern architecture",
      projects: [
        { title: "CompanyHub", url: "https://companyhub.vercel.app", tech: ["Next.js", "Full-Stack SaaS", "Business Management"], isSaaS: true, slug: "companyhub" },
        { title: "ExpenseFlow", url: "https://expenseflow-beta.vercel.app", tech: ["Next.js", "Finance SaaS", "Expense Tracking"], isSaaS: true, slug: "expenseflow" },
      ]
    },
    {
      category: "Games Developed",
      icon: <Gamepad2 size={24} />,
      color: "orange",
      description: "Interactive games and entertainment",
      projects: [
        { title: "Typing Test Game", url: "https://mujtabaahmed.vercel.app", tech: ["React", "Easy/Medium/Hard"] },
        { title: "Typing Speed Test", url: "https://saeedkhan.vercel.app", tech: ["React", "Interactive"] },
        { title: "Color Match Game", url: "https://saeedkhan.vercel.app", tech: ["React", "Memory"] },
        { title: "Pattern Memory", url: "https://saeedkhan.vercel.app", tech: ["React", "Brain Training"] },
      ]
    },
    {
      category: "AI Chatbots Built",
      icon: <Bot size={24} />,
      color: "pink",
      description: "Intelligent conversational assistants",
      projects: [
        { title: "Software Developer Bot", url: "https://mujtabaahmed.vercel.app", tech: ["AI", "Tech Support"] },
        { title: "Graphic Designer Bot", url: "https://saeedkhan.vercel.app", tech: ["AI", "Design Help"] },
        { title: "Clinic Services Bot", url: "https://esteaesthetic.com", tech: ["AI", "Healthcare"] },
        { title: "Cleaning Services Bot", url: "https://acecleaning.services", tech: ["AI", "Customer Service"] },
      ]
    },
    {
      category: "SEO Work & Results",
      icon: <Search size={24} />,
      color: "yellow",
      description: "SEO optimization projects with proven results",
      projects: [
        { 
          title: "SEO Optimization Project 1", 
          url: "#", 
          tech: ["On-Page SEO", "Technical SEO"],
          image: project1Img
        },
        { 
          title: "SEO Optimization Project 2", 
          url: "#", 
          tech: ["Keyword Research", "Content Optimization"],
          image: project2Img
        },
        { 
          title: "SEO Optimization Project 3", 
          url: "#", 
          tech: ["Local SEO", "Analytics"],
          image: project3Img
        },
        { 
          title: "SEO Optimization Project 4", 
          url: "#", 
          tech: ["Off-Page SEO", "Link Building"],
          image: project4Img
        },
        { 
          title: "SEO Optimization Project 5", 
          url: "#", 
          tech: ["SEO Audit", "Performance"],
          image: project5Img
        },
      ],
      showImages: true
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: { text: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", gradient: "from-green-500 to-emerald-500", hover: "hover:border-green-500 hover:shadow-green-500/30" },
      blue: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", gradient: "from-blue-500 to-cyan-500", hover: "hover:border-blue-500 hover:shadow-blue-500/30" },
      purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", gradient: "from-purple-500 to-pink-500", hover: "hover:border-purple-500 hover:shadow-purple-500/30" },
      orange: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", gradient: "from-orange-500 to-red-500", hover: "hover:border-orange-500 hover:shadow-orange-500/30" },
      pink: { text: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/30", gradient: "from-pink-500 to-rose-500", hover: "hover:border-pink-500 hover:shadow-pink-500/30" },
      yellow: { text: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", gradient: "from-yellow-500 to-orange-500", hover: "hover:border-yellow-500 hover:shadow-yellow-500/30" },
      cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", gradient: "from-cyan-500 to-blue-500", hover: "hover:border-cyan-500 hover:shadow-cyan-500/30" }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="projects" className="py-24 px-3 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-green-500/5"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="section-fade">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <Star size={16} className="animate-pulse" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-cyan-400">
            Featured Projects
          </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              20+ websites, games, and AI solutions delivered across diverse industries
            </p>
          </div>

          {/* Projects Categories */}
          <div className="space-y-12">
            {projectCategories.map((categoryGroup, catIndex) => {
              const colors = getColorClasses(categoryGroup.color);
              return (
                <div
                  key={categoryGroup.category}
                  className="section-fade"
                  style={{animationDelay: `${catIndex * 0.1}s`}}
                >
                  {/* Category Header */}
                  <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-6 md:mb-8 p-4 md:p-6 rounded-2xl ${colors.bg} border ${colors.border}`}>
                    <div className={`p-2 md:p-3 rounded-xl ${colors.bg} ${colors.text}`}>
                      {categoryGroup.icon}
                </div>
                    <div className="flex-1">
                      <h3 className={`text-xl md:text-2xl font-bold ${colors.text}`}>
                        {categoryGroup.category}
                  </h3>
                      <p className="text-sm md:text-base text-gray-400">{categoryGroup.description}</p>
                    </div>
                    <div className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full ${colors.bg} ${colors.text} font-semibold text-sm md:text-base`}>
                      {categoryGroup.projects.length} Projects
                    </div>
                  </div>

              {/* Projects Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {categoryGroup.projects.map((project, projIndex) => {
                      const projectWithImage = project as typeof project & { image?: string };
                      return (
                      <div
                        key={project.title}
                        className={`group card-modern p-3 md:p-6 ${colors.bg} border ${colors.border} ${colors.hover} transition-all duration-300`}
                      >
                        {projectWithImage.image && (
                          <div className="mb-4 rounded-lg overflow-hidden cursor-pointer bg-gray-800/50" onClick={() => setSelectedImage(projectWithImage.image!)}>
                            <img 
                              src={projectWithImage.image} 
                              alt={`${project.title} - ${project.tech.join(', ')}`}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="w-full h-48 flex flex-col items-center justify-center text-yellow-400 text-xs p-2 border border-yellow-500/30 rounded">
                                    <div>Image loading...</div>
                                  </div>`;
                                }
                              }}
                              key={projectWithImage.image}
                            />
                          </div>
                        )}
                        <div className="flex items-start justify-between mb-3 md:mb-4">
                          {(project as any).isSaaS ? (
                            <Link href={`/saas-tools/${(project as any).slug}`}>
                              <h4 className="text-base md:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer">
                                {project.title}
                              </h4>
                            </Link>
                          ) : (
                            <h4 className="text-base md:text-lg font-bold text-white group-hover:text-gradient-primary transition-colors">
                              {project.title}
                            </h4>
                          )}
                          {project.url !== '#' ? (
                            <a 
                              href={project.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={`p-1.5 md:p-2 rounded-lg ${colors.bg} ${colors.text} hover:bg-white/10 transition-all flex-shrink-0`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={16} className="md:w-[18px] md:h-[18px]" />
                            </a>
                          ) : projectWithImage.image ? (
                            <button
                              onClick={() => setSelectedImage(projectWithImage.image!)}
                              className={`p-1.5 md:p-2 rounded-lg ${colors.bg} ${colors.text} hover:bg-white/10 transition-all flex-shrink-0`}
                            >
                              <Maximize2 size={16} className="md:w-[18px] md:h-[18px]" />
                            </button>
                          ) : null}
                        </div>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {project.tech.map((tech) => (
                      <span 
                        key={tech}
                              className="px-2 md:px-3 py-0.5 md:py-1 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                      </div>
                    );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Stats */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="card-modern p-4 md:p-6 text-center bg-gradient-to-br from-green-500/10 to-green-500/5">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1 md:mb-2">20+</div>
              <div className="text-gray-400 text-sm md:text-base">Total Projects</div>
            </div>
            <div className="card-modern p-4 md:p-6 text-center bg-gradient-to-br from-blue-500/10 to-blue-500/5">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1 md:mb-2">6</div>
              <div className="text-gray-400 text-sm md:text-base">eCommerce Stores</div>
            </div>
            <div className="card-modern p-4 md:p-6 text-center bg-gradient-to-br from-purple-500/10 to-purple-500/5">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1 md:mb-2">10+</div>
              <div className="text-gray-400 text-sm md:text-base">Web Apps</div>
            </div>
            <div className="card-modern p-4 md:p-6 text-center bg-gradient-to-br from-orange-500/10 to-orange-500/5">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1 md:mb-2">4</div>
              <div className="text-gray-400 text-sm md:text-base">AI Chatbots</div>
              </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/80 p-2 rounded-full text-white hover:text-cyan-400 text-xl transition-colors z-10"
            >
              ✕
            </button>
            <img 
              src={selectedImage} 
              alt="Project screenshot - SEO work portfolio"
              className="w-full h-auto rounded-lg border border-cyan-500/20"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      )}
    </section>
  );
}
