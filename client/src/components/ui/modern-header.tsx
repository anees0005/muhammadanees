import { Code2, Sparkles } from 'lucide-react';

interface ModernHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function ModernHeader({ title, subtitle, icon }: ModernHeaderProps) {
  return (
    <div className="relative text-center mb-16">
      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative flex-shrink-0 overflow-visible min-w-[56px] min-h-[56px]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
              {icon || <Code2 className="text-white" size={32} />}
            </div>
          </div>
        </div>
        
        {/* Title with animated 3D effect */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 relative">
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent blur-sm animate-pulse">
            {title}
          </span>
          <span className="relative bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent bg-300% animate-gradient-x">
            {title}
          </span>
        </h1>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-xl md:text-2xl text-cyan-200 font-medium animate-text-glow">
            {subtitle}
          </p>
        )}
        
        {/* Decorative elements */}
        <div className="flex justify-center mt-6 space-x-2">
          <Sparkles className="text-cyan-400 animate-pulse" size={16} />
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
          <Sparkles className="text-yellow-400 animate-pulse" size={16} style={{animationDelay: '0.5s'}} />
        </div>
      </div>
    </div>
  );
}