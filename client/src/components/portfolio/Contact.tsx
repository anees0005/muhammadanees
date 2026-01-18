import { Mail, Phone, MapPin, Send, MessageSquare, Linkedin, Github } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState('');

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: "anees05it@gmail.com",
      href: "mailto:anees05it@gmail.com",
      color: "cyan"
    },
    {
      icon: <Phone size={24} />,
      label: "Phone",
      value: "+92 343 3523057",
      href: "tel:+923433523057",
      color: "cyan"
    },
    {
      icon: <MapPin size={24} />,
      label: "Location",
      value: "Pakistan",
      href: null,
      color: "cyan"
    }
  ];

  const socialLinks = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      href: "mailto:anees05it@gmail.com",
      color: "bg-cyan-500"
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/muhammad-anees-37932a356",
      color: "bg-cyan-500"
    },
    {
      icon: <Github size={20} />,
      label: "GitHub",
      href: "http://github.com/anees0005",
      color: "bg-cyan-500"
    }
  ];

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", hover: "hover:border-cyan-500/50 hover:shadow-cyan-500/20" }
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  return (
    <section id="contact" className="py-24 px-3 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cyan-500/5"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="section-fade">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-4 md:mb-6">
              <MessageSquare size={16} />
              <span>Let's Connect</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-cyan-400">
            Get In Touch
          </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Ready to elevate your business? Let's discuss your next project
                </p>
            </div>
            
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-4 md:gap-12">
            {/* Left Column - Contact Info */}
            <div className="space-y-6 md:space-y-8">
              {/* Contact Cards */}
              <div className="space-y-3 md:space-y-4">
                {contactInfo.map((contact, index) => {
                  const colors = getColorClasses(contact.color);
                  return (
                    <div
                      key={index}
                      className={`card-modern p-3 md:p-6 ${colors.bg} border ${colors.border} ${colors.hover} transition-all duration-300`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <div className={`p-2 md:p-3 rounded-xl ${colors.bg} ${colors.text}`}>
                          {contact.icon}
                    </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs md:text-sm text-gray-400 mb-1">{contact.label}</div>
                      {contact.href ? (
                        <a
                          href={contact.href}
                              className={`text-base md:text-lg font-semibold ${colors.text} hover:underline break-all`}
                        >
                              {contact.value}
                        </a>
                      ) : (
                            <div className="text-base md:text-lg font-semibold text-white break-words">{contact.value}</div>
                      )}
                        </div>
                      <button
                        onClick={() => handleCopy(contact.value, contact.label)}
                          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg ${colors.bg} ${colors.text} hover:bg-white/10 transition-all text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0`}
                      >
                          {copied === contact.label ? 'Copied!' : 'Copy'}
                      </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            
            {/* Social Links */}
              <div className="card-modern p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Connect on Social</h3>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                      className={`group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 ${social.color} rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-cyan-600 justify-center sm:justify-start`}
                  >
                      <div className="text-white">{social.icon}</div>
                      <span className="text-white font-semibold text-sm md:text-base">{social.label}</span>
                  </a>
                ))}
                </div>
              </div>

              {/* Availability Badge */}
              <div className="card-modern p-6 bg-cyan-500/10 border border-cyan-500/30">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-cyan-500 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Available for Projects</div>
                    <div className="text-gray-400 text-sm">Response time: Usually within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - CTA Card */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="card-modern p-6 md:p-8 lg:p-10 bg-cyan-500/5 border border-cyan-500/30">
                <div className="text-center mb-6 md:mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-cyan-500 mb-4 md:mb-6">
                    <Send className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 leading-tight">
                    Ready to Start Your Project?
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    I specialize in modern websites, eCommerce stores, digital marketing campaigns, 
                    AI automation, and IT solutions. Let's discuss how I can help your business grow.
                </p>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {/* Services List */}
                  <div className="space-y-2 md:space-y-3">
                    {[
                      "🌐 Website Development",
                      "💼 SaaS Development & Products",
                      "🛍️ E-Commerce Solutions",
                      "📱 Digital Marketing",
                      "🔍 SEO Optimization",
                      "🤖 AI Automation Systems",
                      "🎙️ AI Voiceovers & Chatbots",
                      "💼 IT Management",
                      "🔒 Cybersecurity",
                      "📊 Financial Systems"
                    ].map((service, index) => (
                      <div key={index} className="flex items-center gap-2 md:gap-3 text-gray-300 text-sm md:text-base">
                        <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-cyan-500 flex-shrink-0"></div>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp Button */}
                  <a
                    href="https://wa.me/923433523057?text=Hi%20Muhammad%20Anees!%20I'd%20like%20to%20discuss%20a%20project%20with%20you."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 md:gap-3 w-full px-6 md:px-8 py-3 md:py-4 bg-green-500 text-white text-center font-semibold rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 hover:bg-green-600 text-sm md:text-base whitespace-nowrap"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>

                  <p className="text-center text-gray-400 text-xs md:text-sm">
                    Or reach out via phone, email, or social media
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
