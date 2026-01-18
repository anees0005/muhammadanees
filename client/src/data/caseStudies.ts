export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  technologies: string[];
  duration: string;
  excerpt: string;
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'CompanyHub: Building an All-in-One Business Management SaaS',
    slug: 'companyhub-all-in-one-business-management-saas',
    client: 'Internal Project',
    industry: 'Business Management',
    challenge: 'Small businesses struggle with managing clients, invoices, finances, and team collaboration across multiple disconnected tools, leading to inefficiency and data silos.',
    solution: 'Developed CompanyHub, a comprehensive SaaS platform integrating CRM, invoicing, finance tracking, team collaboration, and role-based access control in a single unified system. Built with Next.js, TypeScript, PostgreSQL, and modern architecture patterns.',
    results: [
      { metric: 'Time Saved', value: '60%', improvement: 'Reduction in manual data entry' },
      { metric: 'Cost Reduction', value: '40%', improvement: 'Lower operational costs' },
      { metric: 'User Satisfaction', value: '95%', improvement: 'Positive feedback' },
      { metric: 'Data Accuracy', value: '99%', improvement: 'Eliminated data silos' }
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'Stripe', 'WebSockets'],
    duration: '4 months',
    excerpt: 'How we built a comprehensive business management SaaS platform that unified CRM, invoicing, finance tracking, and team collaboration into a single, scalable solution.',
    featured: true
  },
  {
    id: '2',
    title: 'ExpenseFlow: Modern Expense Tracking Application',
    slug: 'expenseflow-modern-expense-tracking-application',
    client: 'Internal Project',
    industry: 'Finance & Accounting',
    challenge: 'Individuals and businesses need an intuitive, modern solution for tracking expenses with smart categorization, detailed reporting, and a clean user experience.',
    solution: 'Created ExpenseFlow, a modern expense tracking SaaS with AI-powered categorization, comprehensive reporting, multi-currency support, and a beautiful financial UI. Focused on simplicity and powerful insights.',
    results: [
      { metric: 'Setup Time', value: '< 5 min', improvement: 'Quick onboarding' },
      { metric: 'User Adoption', value: '85%', improvement: 'Active monthly users' },
      { metric: 'Accuracy', value: '98%', improvement: 'Automated categorization' },
      { metric: 'Time Saved', value: '70%', improvement: 'Faster expense tracking' }
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Chart.js', 'NextAuth'],
    duration: '3 months',
    excerpt: 'Building a modern expense tracking application with smart categorization, beautiful reporting, and an intuitive user experience that makes financial management effortless.',
    featured: true
  },
  {
    id: '3',
    title: 'E-commerce Platform Optimization: 300% Traffic Increase',
    slug: 'ecommerce-platform-optimization-300-percent-traffic-increase',
    client: 'Retail Chain',
    industry: 'E-commerce',
    challenge: 'An established e-commerce platform was experiencing declining organic traffic, poor search rankings, and low conversion rates despite having quality products.',
    solution: 'Implemented comprehensive SEO strategy including technical SEO fixes, content optimization, schema markup, site speed improvements, and conversion rate optimization. Created content marketing strategy targeting high-intent keywords.',
    results: [
      { metric: 'Organic Traffic', value: '+300%', improvement: '6-month period' },
      { metric: 'Search Rankings', value: 'Top 10', improvement: 'For 50+ keywords' },
      { metric: 'Conversion Rate', value: '+45%', improvement: 'Improved UX' },
      { metric: 'Revenue', value: '+250%', improvement: 'From organic traffic' }
    ],
    technologies: ['WordPress', 'WooCommerce', 'SEO Tools', 'Analytics', 'Content Strategy'],
    duration: '6 months',
    excerpt: 'How we transformed an e-commerce platform\'s organic traffic by 300% through comprehensive SEO optimization, content strategy, and conversion rate improvements.',
    featured: false
  },
  {
    id: '4',
    title: 'AI Chatbot Implementation: 80% Support Ticket Reduction',
    slug: 'ai-chatbot-implementation-80-percent-support-ticket-reduction',
    client: 'Healthcare Provider',
    industry: 'Healthcare',
    challenge: 'A healthcare clinic was overwhelmed with routine patient inquiries, appointment scheduling requests, and FAQ responses, requiring significant staff time.',
    solution: 'Developed a custom AI chatbot integrated with the clinic\'s booking system and knowledge base. The chatbot handles appointment scheduling, FAQ responses, and basic inquiries, with seamless handoff to human staff when needed.',
    results: [
      { metric: 'Support Tickets', value: '-80%', improvement: 'Routine inquiries automated' },
      { metric: 'Response Time', value: '< 2 sec', improvement: 'Instant responses' },
      { metric: 'Patient Satisfaction', value: '+35%', improvement: 'Faster service' },
      { metric: 'Staff Efficiency', value: '+60%', improvement: 'Focus on complex cases' }
    ],
    technologies: ['OpenAI API', 'React', 'Node.js', 'Integration APIs', 'Natural Language Processing'],
    duration: '2 months',
    excerpt: 'Implementing an AI chatbot that reduced support tickets by 80% while improving patient satisfaction and allowing staff to focus on complex healthcare needs.',
    featured: false
  }
];

export const getAllCaseStudies = (): CaseStudy[] => {
  return caseStudies;
};

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find(study => study.slug === slug);
};

export const getFeaturedCaseStudies = (): CaseStudy[] => {
  return caseStudies.filter(study => study.featured);
};

