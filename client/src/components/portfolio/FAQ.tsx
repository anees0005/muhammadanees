import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer: "I offer comprehensive SaaS development, web application development, AI automation solutions, digital marketing, and business software consulting. This includes building custom SaaS products, React/Next.js applications, AI chatbots, workflow automation with n8n, SEO optimization, and full-stack development services."
  },
  {
    question: "What SaaS products have you built?",
    answer: "I've built CompanyHub (all-in-one business management platform) and ExpenseFlow (expense tracking application). Both are production-ready SaaS products built with modern technologies like Next.js, TypeScript, and PostgreSQL, featuring multi-tenancy, role-based access control, and scalable architectures."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in React, Next.js, TypeScript, Node.js, PostgreSQL, and modern web technologies. For SaaS development, I work with microservices architecture, REST APIs, authentication systems, payment integrations (Stripe), and cloud deployment. I also have expertise in AI/ML integration, automation tools (n8n), and digital marketing technologies."
  },
  {
    question: "How long does it take to build a SaaS product?",
    answer: "The timeline depends on complexity and features. A basic SaaS MVP typically takes 2-3 months, while a full-featured product can take 4-6 months or more. Factors include authentication, payment integration, multi-tenancy, admin panels, and third-party integrations. I provide detailed timelines after understanding your requirements."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes, I offer ongoing support, maintenance, feature updates, bug fixes, and performance optimization. I can also help with scaling your application, adding new features, and integrating additional services as your business grows."
  },
  {
    question: "Can you help with AI automation and chatbots?",
    answer: "Absolutely! I build custom AI chatbots using OpenAI, Anthropic Claude, and other AI platforms. I also specialize in n8n workflow automation, business process automation, and integrating AI capabilities into existing applications. I've built chatbots for various industries including healthcare, e-commerce, and professional services."
  },
  {
    question: "What is your experience with digital marketing?",
    answer: "I have 6+ years of experience in digital marketing, including SEO optimization, content marketing, social media advertising (Facebook, Instagram, TikTok), email marketing, and analytics. I've managed 100+ successful marketing campaigns and specialize in SaaS marketing strategies, growth hacking, and conversion optimization."
  },
  {
    question: "How do you ensure code quality and best practices?",
    answer: "I follow industry best practices including TypeScript for type safety, comprehensive testing, code reviews, documentation, and clean architecture principles. I use modern development tools, version control (Git), CI/CD pipelines, and maintain high code quality standards throughout the development process."
  },
  {
    question: "Can you work with existing codebases?",
    answer: "Yes, I can work with existing codebases, refactor legacy code, add new features, fix bugs, and improve performance. I'm experienced in understanding and extending existing systems while maintaining code quality and following established patterns."
  },
  {
    question: "What is your pricing model?",
    answer: "Pricing depends on project scope, complexity, and timeline. I offer flexible engagement models including fixed-price projects, hourly rates, and retainer agreements. For SaaS products, I can work on a project basis or provide ongoing development support. Contact me for a detailed quote based on your specific requirements."
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, I work with clients worldwide. I'm comfortable with remote collaboration, different time zones, and international communication. I use modern collaboration tools and maintain clear communication throughout projects."
  },
  {
    question: "How can I get started on a project?",
    answer: "Start by reaching out via email (anees05it@gmail.com) or WhatsApp (+92 343 3523057). We'll discuss your project requirements, timeline, and budget. I'll provide a detailed proposal, and once approved, we can begin development. I typically start with a discovery phase to fully understand your needs."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-3 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-green-500/5"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="section-fade">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <HelpCircle size={16} />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Questions</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about my services, expertise, and how we can work together
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-white pr-8">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={24}
                    className={`text-cyan-400 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Schema Markup for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqData.map((faq) => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              })
            }}
          />
        </div>
      </div>
    </section>
  );
}

