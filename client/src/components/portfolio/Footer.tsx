import { Heart, Zap, Mail, Phone, Github, Linkedin } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="py-12 md:py-16 px-4 md:px-6 border-t border-cyan-500/20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cyan-500/5"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="mb-3 md:mb-4">
                <h3 className="text-lg md:text-xl font-bold text-white">Muhammad <span className="text-cyan-400">Anees</span></h3>
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Multi-disciplinary professional bridging technology, marketing, and finance to deliver innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Quick Links</h4>
            <div className="grid grid-cols-3 md:grid-cols-2 gap-2 md:gap-3">
              <a href="/#home" className="text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm">
                Home
              </a>
              <a href="/#about" className="text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm">
                About
              </a>
              <a href="/#skills" className="text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm">
                Skills
              </a>
              <a href="/#projects" className="text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm">
                Projects
              </a>
              <Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm">
                Blog
              </Link>
              <Link href="/saas-tools" className="text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm">
                SaaS Tools
              </Link>
              <Link href="/case-studies" className="text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm">
                Case Studies
              </Link>
              <Link href="/tools" className="text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm">
                Tools
              </Link>
              <a href="/#faq" className="text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm">
                FAQ
              </a>
              <a href="/#contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm">
                Contact
              </a>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Connect</h4>
            <div className="space-y-2 md:space-y-3">
              <a href="mailto:anees05it@gmail.com" className="flex items-center gap-2 md:gap-3 text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm group justify-center md:justify-start">
                <div className="w-7 md:w-8 h-7 md:h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                  <Mail size={14} className="text-cyan-400 md:w-4 md:h-4" />
                </div>
                <span className="truncate">anees05it@gmail.com</span>
              </a>
              <a href="tel:+923433523057" className="flex items-center gap-2 md:gap-3 text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm group justify-center md:justify-start">
                <div className="w-7 md:w-8 h-7 md:h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                  <Phone size={14} className="text-cyan-400 md:w-4 md:h-4" />
                </div>
                <span>+92 343 3523057</span>
              </a>
              <a href="http://github.com/anees0005" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm group justify-center md:justify-start">
                <div className="w-7 md:w-8 h-7 md:h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                  <Github size={14} className="text-cyan-400 md:w-4 md:h-4" />
                </div>
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/muhammad-anees-37932a356" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm group justify-center md:justify-start">
                <div className="w-7 md:w-8 h-7 md:h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                  <Linkedin size={14} className="text-cyan-400 md:w-4 md:h-4" />
                </div>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6 md:mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-xs md:text-sm">
              © 2026 <span className="text-white font-semibold">Muhammad Anees</span>. All rights reserved.
            </p>
            <p className="text-[10px] md:text-xs text-gray-500 mt-1">
              IT & Web Development | Digital Marketing | Accounting Professional
            </p>
          </div>
        </div>

        {/* Badge */}
        <div className="mt-6 md:mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-cyan-500/5 border border-cyan-500/20 rounded-full text-cyan-400 text-[10px] md:text-xs">
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span>Available for Freelance Projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
