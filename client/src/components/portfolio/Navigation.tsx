import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link } from "wouter";
import SearchModal from "@/components/ui/search-modal";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSearchOpen]);

  // Organized navigation items
  const homepageSections: Array<{ href: string; label: string; isRoute?: boolean }> = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
  ];

  const contentPages: Array<{ href: string; label: string; isRoute?: boolean }> = [
    { href: "/blog", label: "Blog", isRoute: true },
    { href: "/resources", label: "Resources", isRoute: true },
    { href: "/glossary", label: "Glossary", isRoute: true },
  ];

  const productPages: Array<{ href: string; label: string; isRoute?: boolean }> = [
    { href: "/saas-tools", label: "SaaS Tools", isRoute: true },
    { href: "/tools", label: "Tools", isRoute: true },
    { href: "/case-studies", label: "Case Studies", isRoute: true },
  ];

  // Combined for mobile menu - Product pages before content pages
  const allNavItems = [...homepageSections, ...productPages, ...contentPages];

  const handleNavClick = (href: string, isRoute?: boolean) => {
    if (isRoute) {
      setIsMenuOpen(false);
      return;
    }
    // Check if we're on a different page (not homepage)
    const currentPath = window.location.pathname;
    if (currentPath !== '/' && currentPath !== '' && currentPath !== '/muhammadanees/') {
      // Redirect to homepage with hash
      window.location.href = `/${href}`;
      setIsMenuOpen(false);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 backdrop-blur-xl bg-black/80 border-b border-white/10' : 'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-3 md:px-6">
        <div className="flex justify-between items-center gap-4">
          {/* Logo - Text Only */}
          <Link href="/" className="group cursor-pointer flex-shrink-0">
              <div className="text-lg sm:text-xl md:text-2xl xl:text-2xl font-bold tracking-tight">
                <span className="text-white transition-colors">Muhammad</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 ml-1 sm:ml-2 group-hover:from-cyan-300 group-hover:to-blue-400 transition-all">Anees</span>
              </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-nowrap flex-1 justify-end min-w-0">
            <div className="flex items-center gap-1 xl:gap-1.5 flex-nowrap">
              {/* Homepage Sections */}
              {homepageSections.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="px-2.5 xl:px-3 py-2 text-sm xl:text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Product Pages */}
              {productPages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-2.5 xl:px-3 py-2 text-sm xl:text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Content Pages */}
              {contentPages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-2.5 xl:px-3 py-2 text-sm xl:text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="ml-1.5 px-2.5 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              aria-label="Search"
            >
              <Search size={18} className="xl:w-[20px] xl:h-[20px]" />
            </button>
            <button
              onClick={() => handleNavClick('#contact')}
              className="ml-1.5 px-4 xl:px-5 py-2 bg-cyan-500 text-white text-sm xl:text-base font-medium rounded-lg hover:bg-cyan-600 transition-all duration-200 whitespace-nowrap"
            >
              Contact
            </button>
          </div>
          
          {/* Tablet/Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-cyan-400 transition-colors"
              aria-label="Search"
            >
              <Search size={24} />
            </button>
          <button
              className="text-white hover:text-green-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 backdrop-blur-xl bg-black/90 rounded-xl p-4 border border-white/10 max-h-[80vh] overflow-y-auto">
            {/* All Navigation Items */}
            {allNavItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 mb-1"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 mb-1"
                >
                  {item.label}
                </button>
              )
            ))}
            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full mt-3 px-6 py-3 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition-all duration-200"
            >
              Contact
            </button>
          </div>
        )}
      </div>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
