import { useState, useEffect } from 'react';
import { Download, Mail, Play, ArrowRight } from 'lucide-react';
import GameSelector from '@/components/games/GameSelector';
import HeroBackground from '@/components/three/HeroBackground';
import AnimatedResume from './AnimatedResume';

export default function Hero() {
  const [showGame, setShowGame] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [displayedText, setDisplayedText] = useState(['', '', '', '', '', '']);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    "SaaS & Full Stack Developer",
    "IT & Web Development Specialist",
    "Accounting & Financial Systems Professional",
    "Digital Marketing Expert",
    "Game Development Specialist",
    "AI Automation & Voiceover Specialist"
  ];

  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    let typingInterval: NodeJS.Timeout;
    let isDeleting = false;
    let pauseTime = 0;

    const animateText = () => {
      if (pauseTime > 0) {
        pauseTime--;
        return;
      }

      if (!isDeleting && charIndex < roles[currentIndex].length) {
        // Typing forward
        setDisplayedText(prev => {
          const newText = [...prev];
          newText[currentIndex] = roles[currentIndex].substring(0, charIndex + 1);
          return newText;
        });
        charIndex++;
      } else if (!isDeleting && charIndex === roles[currentIndex].length) {
        // Finished typing current role
        if (currentIndex < roles.length - 1) {
          // Move to next role
          currentIndex++;
          charIndex = 0;
          setCurrentRoleIndex(currentIndex);
          pauseTime = 6; // Short pause before next role
        } else {
          // All roles typed, wait before restarting
          pauseTime = 40; // Longer pause at the end
          isDeleting = true;
        }
      } else if (isDeleting) {
        // Clear all text and restart
        setDisplayedText(['', '', '', '', '', '']);
        currentIndex = 0;
        charIndex = 0;
        setCurrentRoleIndex(0);
        isDeleting = false;
        }
    };

    typingInterval = setInterval(animateText, 50); // Typing speed (50ms per character)

    return () => clearInterval(typingInterval);
  }, []);


  const roleColors = ["text-orange-400", "text-cyan-400", "text-yellow-400", "text-blue-400", "text-pink-400", "text-purple-400"];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-12 md:pb-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-gray-900 to-gray-900"></div>
        <HeroBackground />
        </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm backdrop-blur-sm">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
              <span>Available for Projects</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 text-white leading-tight">
                Muhammad Anees
              </h1>
              
              {/* Coding-Style Animated Role Titles */}
              <div className="space-y-2 md:space-y-3 min-h-[280px] sm:min-h-[260px] md:min-h-[240px] text-left w-full max-w-3xl mx-auto bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 pb-2 sm:p-6 md:p-8 font-mono overflow-hidden">
                {roles.map((role, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 md:gap-3"
                    style={{ 
                      opacity: currentRoleIndex >= index ? 1 : 0.3,
                      transition: 'opacity 0.3s'
                    }}
                  >
                    <span className="text-gray-500 select-none text-base md:text-lg flex-shrink-0">&gt;</span>
                    <span className={`text-base md:text-lg lg:text-xl font-medium ${roleColors[index]} break-words leading-relaxed`}>
                      {displayedText[index]}
                      {currentRoleIndex === index && displayedText[index].length < role.length && (
                        <span className="inline-block w-1.5 h-5 md:w-2 md:h-6 bg-cyan-400 ml-1 animate-pulse"></span>
                      )}
                    </span>
        </div>
                ))}
                </div>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto pt-4">
              SaaS & Full Stack Developer delivering high-converting websites, scalable web apps, and growth-ready
              SaaS products with modern UI/UX, performance optimization, and SEO best practices. Expertise across
              digital marketing, AI automation (chatbots, voiceovers, workflow tools), cybersecurity, and accounting
              systems to help businesses launch faster, rank higher, and convert more.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all duration-200 hover:scale-105"
              >
                <Mail size={20} />
                <span>Get in Touch</span>
                <ArrowRight size={20} />
              </a>
              <button
                onClick={() => setShowResume(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm hover:scale-105"
              >
                <Download size={20} />
                <span>Download CV</span>
              </button>
              <button
                onClick={() => setShowGame(!showGame)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm hover:scale-105"
              >
                <Play size={20} />
                <span>Play Games</span>
              </button>
        </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-8 pt-12 max-w-2xl mx-auto">
              <div className="p-3 md:p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">6+</div>
                <div className="text-xs md:text-sm text-gray-400 leading-tight">Years Experience</div>
                    </div>
              <div className="p-3 md:p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">20+</div>
                <div className="text-xs md:text-sm text-gray-400 leading-tight">Websites Built</div>
                </div>
              <div className="p-3 md:p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">3</div>
                <div className="text-xs md:text-sm text-gray-400 leading-tight">SaaS Products</div>
            </div>
        </div>

            {/* Specializations Cards */}
            <div className="pt-8 md:pt-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-5xl mx-auto">
                {[
                  { icon: "☁️", title: "SaaS Development", desc: "Products & Platforms" },
                  { icon: "🌐", title: "Website Development", desc: "Modern Websites" },
                  { icon: "📊", title: "Accounting", desc: "ACCA & Finance" },
                  { icon: "📱", title: "App Development", desc: "Mobile & PWA" },
                  { icon: "🎮", title: "Game Development", desc: "Unity & Web Games" },
                  { icon: "📈", title: "Digital Marketing", desc: "Social Ads & Content" },
                  { icon: "🔍", title: "SEO", desc: "Search Optimization" },
                  { icon: "🤖", title: "AI Automation", desc: "Chatbots & Voiceovers" }
                ].map((spec, index) => (
                  <div
                    key={index}
                    className="p-2.5 md:p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/30 transition-all hover:scale-105 text-center group"
                  >
                    <div className="text-xl md:text-3xl mb-1 md:mb-2 group-hover:scale-110 transition-transform">{spec.icon}</div>
                    <div className="text-white font-semibold text-[10px] md:text-sm mb-0.5 md:mb-1 leading-tight">{spec.title}</div>
                    <div className="text-gray-400 text-[9px] md:text-xs leading-tight">{spec.desc}</div>
            </div>
                ))}
                </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-8">
              <p className="text-sm text-gray-500 mb-4">Core Technologies</p>
              <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
                {['SaaS', 'WordPress', 'React', 'Next.js', 'AI/ML', 'SEO', 'Security', 'Python'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-sm backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/30 transition-all hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Selector Modal */}
      {showGame && <GameSelector onClose={() => setShowGame(false)} />}

      {/* Animated Resume Modal */}
      {showResume && <AnimatedResume onClose={() => setShowResume(false)} />}
    </section>
  );
}
