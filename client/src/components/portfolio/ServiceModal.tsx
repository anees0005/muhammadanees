import { X, Check, Rocket, DollarSign, Clock, Star, Zap, Mail } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  color: string;
  pricing?: string;
  deliveryTime?: string;
  projects?: string;
  examples?: string[];
}

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const getColorClasses = (color: string) => {
    const colors = {
      cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-400", glow: "shadow-cyan-500/50" },
      blue: { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", glow: "shadow-blue-500/50" },
      purple: { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-400", glow: "shadow-purple-500/50" },
      green: { border: "border-green-500/30", bg: "bg-green-500/10", text: "text-green-400", glow: "shadow-green-500/50" },
      yellow: { border: "border-yellow-500/30", bg: "bg-yellow-500/10", text: "text-yellow-400", glow: "shadow-yellow-500/50" }
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  const colors = getColorClasses(service.color);

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in overflow-y-auto scrollbar-hide" 
      onClick={onClose}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <div className="relative max-w-4xl w-full my-8 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Modal Content */}
        <div className={`card-modern border-2 ${colors.border} bg-gray-900/95 backdrop-blur-sm overflow-hidden shadow-2xl ${colors.glow} relative max-h-[90vh] overflow-y-auto scrollbar-hide`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* Close Button - Inside Modal */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-red-500/20 border border-red-500/50 rounded-full text-white hover:bg-red-500/30 transition-all hover:scale-110"
          >
            <X size={24} />
          </button>
        
          {/* Header with Icon */}
          <div className={`${colors.bg} border-b ${colors.border} p-4 sm:p-6 md:p-8`}>
            <div className="flex items-start gap-3 sm:gap-4">
              <div className={`p-2 sm:p-3 ${colors.bg} border ${colors.border} rounded-xl flex-shrink-0`}>
                <Rocket className={`${colors.text} w-6 h-6 sm:w-8 sm:h-8`} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colors.text} mb-2 md:mb-3 break-words`}>{service.title}</h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">{service.description}</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <div className={`p-4 ${colors.bg} border ${colors.border} rounded-xl text-center`}>
                <DollarSign className={`${colors.text} mx-auto mb-2`} size={24} />
                <div className="text-sm text-gray-400">Starting From</div>
                <div className={`text-lg font-bold ${colors.text}`}>Custom Quote</div>
              </div>
              <div className={`p-4 ${colors.bg} border ${colors.border} rounded-xl text-center`}>
                <Clock className={`${colors.text} mx-auto mb-2`} size={24} />
                <div className="text-sm text-gray-400">
                  {service.title.toLowerCase().includes('seo') ? 'Results' : 'Delivery Time'}
                </div>
                <div className={`text-lg font-bold ${colors.text}`}>
                  {service.deliveryTime ? service.deliveryTime : '1-4 Weeks'}
                </div>
              </div>
              <div className={`p-4 ${colors.bg} border ${colors.border} rounded-xl text-center`}>
                <Star className={`${colors.text} mx-auto mb-2`} size={24} />
                <div className="text-sm text-gray-400">Rating</div>
                <div className={`text-lg font-bold ${colors.text}`}>5.0 ⭐</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Features */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className={colors.text} size={24} />
                  <h3 className="text-xl font-bold text-white">What's Included</h3>
                </div>
                <div className="space-y-3">
                  {service.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start gap-3 p-3 ${colors.bg} border ${colors.border} rounded-lg hover:scale-105 transition-transform`}
                    >
                      <Check className={`${colors.text} mt-0.5 flex-shrink-0`} size={20} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Rocket className={colors.text} size={24} />
                  <h3 className="text-xl font-bold text-white">Technologies & Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 ${colors.bg} border ${colors.border} ${colors.text} rounded-lg text-sm font-medium hover:scale-110 transition-transform cursor-default`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Examples */}
                {service.examples && service.examples.length > 0 && (
                  <div className={`mt-6 p-4 ${colors.bg} border ${colors.border} rounded-xl`}>
                    <h4 className={`font-bold ${colors.text} mb-2`}>🚀 Real Examples</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {service.examples.map((example, index) => (
                        <li key={index}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Why Choose This Service */}
                <div className={`mt-6 p-4 ${colors.bg} border ${colors.border} rounded-xl`}>
                  <h4 className={`font-bold ${colors.text} mb-2`}>✨ Why Choose This Service?</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Proven track record with 20+ successful projects</li>
                    <li>• Fast turnaround time & responsive communication</li>
                    <li>• Post-delivery support & maintenance included</li>
                    <li>• 100% satisfaction guaranteed</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <a
                href="#contact"
                onClick={onClose}
                className={`flex items-center justify-center gap-2 px-6 py-4 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition-all hover:scale-105 shadow-lg`}
              >
                <Mail size={20} />
                <span>Get a Free Quote</span>
              </a>
              <a
                href="https://wa.me/923433523057"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={`flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all hover:scale-105 shadow-lg`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp Me</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
