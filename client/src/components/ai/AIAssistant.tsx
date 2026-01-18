import { useState, useEffect, useRef } from 'react';
import { Bot, MessageCircle, X, Send, Code2, Sparkles, Zap, Terminal } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you learn about Muhammad Anees's expertise in SaaS development, web applications, AI automation, and digital marketing. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const predefinedResponses = {
    skills: "Muhammad Anees is a full-stack developer and SaaS specialist with expertise in: 💻 Web Development (React, Next.js, TypeScript, Node.js) | 🚀 SaaS Development (CompanyHub, ExpenseFlow, custom solutions) | 🤖 AI & Automation (Chatbots, n8n workflows, business automation) | 📱 Digital Marketing (SEO, Content Marketing, Growth Strategies) | 📊 Business Software (Custom tools, integrations, enterprise solutions)",
    experience: "Muhammad has 6+ years of comprehensive experience including: IT Manager at The Skyline Strategies, Website Developer at Computer Support Centre, and various technical leadership roles. He has successfully delivered 20+ websites, built 2 production SaaS products, and managed 100+ marketing campaigns!",
    projects: "His portfolio includes: 🏢 SaaS Products (CompanyHub - business management platform, ExpenseFlow - expense tracking) | 🛒 6 e-commerce stores (bncclothing.co.uk, clogsy.co.uk, etc.) | ⚛️ React/Next.js applications (esteaesthetic.com, acecleaning.services) | 🤖 4+ AI chatbots | 🎮 Interactive games. Each project demonstrates expertise in modern web technologies and business solutions!",
    contact: "You can reach Muhammad Anees at anees05it@gmail.com or call/WhatsApp at +92 343 3523057. He's available for website development, digital marketing campaigns, AI integration, and IT consulting projects!",
    education: "Muhammad holds IGCSE qualification and is pursuing ACCA (Association of Chartered Certified Accountants). He has completed 7 ACCA exams: FA1, MA1, FA2, MA2, FMA, FFA, and FBT, currently working on the Skilled Module.",
    marketing: "As a Digital Marketing Expert, Muhammad specializes in Facebook, Instagram, and TikTok paid advertising, comprehensive SEO (on-page, off-page, and technical), content strategy, brand storytelling, video production, and analytics. He has managed 100+ successful marketing campaigns!",
    wordpress: "Muhammad is highly experienced in WordPress and Shopify development, creating custom eCommerce stores, optimizing website speed and security, integrating payment gateways, and implementing SEO best practices. He has built 20+ production websites!",
    acca: "Muhammad is an ACCA pursuing candidate with 7 exams completed (FA1, MA1, FA2, MA2, FMA, FFA, FBT). He has expertise in bookkeeping, financial accounting, management accounting, payroll systems, internal audit, and budget preparation. He's currently in the ACCA Skilled Module!",
    ai: "Muhammad builds custom AI chatbots and automation systems tailored to businesses. He has created chatbots for software development, graphic design, clinic services, and cleaning services. He also specializes in n8n workflow automation, business process automation, and AI integration for SaaS products.",
    saas: "Muhammad has built production SaaS products including CompanyHub (all-in-one business management) and ExpenseFlow (expense tracking). He specializes in scalable SaaS architecture, multi-tenancy, database design, API development, and product-led growth strategies.",
    hire: "Muhammad is available for freelance projects and consulting! Services include: 🚀 SaaS Development (Full-stack, architecture, scaling) | 💻 Web Development (React, Next.js, TypeScript) | 🤖 AI & Automation (Chatbots, workflows, integrations) | 📱 Digital Marketing (SEO, Content, Growth) | 🏢 Business Software (Custom solutions, integrations). Contact: anees05it@gmail.com or +92 343 3523057",
    whatsapp: "💬 Chat with Muhammad on WhatsApp: +92 343 3523057 | Or click here: https://wa.me/923433523057",
    default: "That's an interesting question! I recommend reaching out to Muhammad directly at anees05it@gmail.com or +92 343 3523057 for detailed information. He's always excited to discuss new projects and opportunities!"
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('whatsapp') || message.includes('wa.me') || message.includes('chat')) {
      return predefinedResponses.whatsapp;
    } else if (message.includes('skill') || message.includes('technology') || message.includes('expert')) {
      return predefinedResponses.skills;
    } else if (message.includes('experience') || message.includes('work') || message.includes('job')) {
      return predefinedResponses.experience;
    } else if (message.includes('project') || message.includes('portfolio') || message.includes('website')) {
      return predefinedResponses.projects;
    } else if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
      return predefinedResponses.contact;
    } else if (message.includes('education') || message.includes('study') || message.includes('qualification')) {
      return predefinedResponses.education;
    } else if (message.includes('market') || message.includes('seo') || message.includes('ads') || message.includes('social')) {
      return predefinedResponses.marketing;
    } else if (message.includes('wordpress') || message.includes('shopify') || message.includes('ecommerce')) {
      return predefinedResponses.wordpress;
    } else if (message.includes('acca') || message.includes('account') || message.includes('finance')) {
      return predefinedResponses.acca;
    } else if (message.includes('ai') || message.includes('chatbot') || message.includes('automat')) {
      return predefinedResponses.ai;
    } else if (message.includes('saas') || message.includes('software as a service') || message.includes('companyhub') || message.includes('expenseflow')) {
      return predefinedResponses.saas;
    } else if (message.includes('hire') || message.includes('freelance') || message.includes('available') || message.includes('service')) {
      return predefinedResponses.hire;
    } else {
      return predefinedResponses.default;
    }
  };

  const quickQuestions = [
    { icon: "💻", text: "What are your skills?", key: "skills" },
    { icon: "🚀", text: "SaaS products", key: "saas" },
    { icon: "📞", text: "How to contact?", key: "contact" },
    { icon: "💬", text: "WhatsApp me", key: "whatsapp" }
  ];

  const handleQuickQuestion = (key: string) => {
    const questionText = quickQuestions.find(q => q.key === key)?.text || key;
    handleSendMessage(questionText);
  };

  const handleSendMessage = (customMessage?: string) => {
    const messageText = customMessage || inputValue.trim();
    if (!messageText) return;

    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getAIResponse(messageText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-4 md:right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[95vw] max-w-[380px] h-[550px] bg-gray-900 border-2 border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header - Developer Style */}
          <div className="bg-gray-800 border-b border-cyan-500/30 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/50">
                  <Terminal className="text-cyan-400" size={20} />
                </div>
              </div>
              <div>
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="text-cyan-400 font-mono">&gt;</span> AI Assistant
                </div>
                <div className="text-xs text-gray-400 font-mono">Online • Ready to help</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* WhatsApp Icon */}
              <a
                href="https://wa.me/923433523057"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/50 hover:bg-green-500/30 transition-all hover:scale-110"
                title="Chat on WhatsApp"
              >
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            <button 
              onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/50 hover:bg-red-500/30 transition-all"
            >
                <X size={18} className="text-red-400" />
            </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/50" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                <div className={`flex gap-2 max-w-[85%] ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  {msg.isBot && (
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/50 flex-shrink-0">
                      <Code2 className="text-cyan-400" size={16} />
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      msg.isBot
                        ? 'bg-gray-800 border border-cyan-500/30 text-gray-200'
                        : 'bg-cyan-500/20 border border-cyan-500/50 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-xs text-gray-500 mt-1 block font-mono">
                      {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/50">
                    <Code2 className="text-cyan-400 animate-pulse" size={16} />
                  </div>
                  <div className="bg-gray-800 border border-cyan-500/30 px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-4 py-2 bg-gray-900/80 border-t border-cyan-500/20">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {quickQuestions.map((q) => (
                  <button
                  key={q.key}
                  onClick={() => handleQuickQuestion(q.key)}
                  className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300 hover:bg-cyan-500/20 transition-all whitespace-nowrap font-mono"
                  >
                  {q.icon} {q.text}
                  </button>
                ))}
              </div>
            </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-800 border-t border-cyan-500/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-gray-900 border border-cyan-500/30 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 text-sm font-mono"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-cyan-500 text-white px-4 py-2.5 rounded-lg hover:bg-cyan-600 transition-all flex items-center gap-2 font-semibold"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button - Modern Minimal Design */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-cyan-500/50 hover:scale-110 transition-all flex items-center justify-center group relative overflow-hidden"
        aria-label="Open AI Assistant"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Icon */}
        <div className="relative z-10">
          {isOpen ? (
            <X size={24} className="md:w-7 md:h-7" />
          ) : (
            <MessageCircle size={24} className="md:w-7 md:h-7" />
          )}
        </div>
        
        {/* Pulse effect */}
        {!isOpen && (
          <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-20"></div>
        )}
      </button>
    </div>
  );
}
