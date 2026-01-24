export interface SaaSFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface SAASProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  url: string;
  logo?: string;
  category: string;
  features: SaaSFeature[];
  techStack: string[];
  highlights: string[];
  screenshots?: string[];
  status: 'live' | 'beta' | 'coming-soon';
  launchDate: string;
}

export const saasProducts: SAASProduct[] = [
  {
    id: 'companyhub',
    name: 'CompanyHub',
    slug: 'companyhub',
    tagline: 'The All-in-One Business Management Tool',
    description: 'CompanyHub is a comprehensive business management platform that streamlines operations, enhances team collaboration, and provides complete visibility into your business performance. Built for modern businesses that need an integrated solution for client management, invoicing, finance tracking, and team collaboration.',
    url: 'https://companyhub.vercel.app',
    category: 'Business Management',
    features: [
      {
        title: 'Client Management',
        description: 'Complete CRM functionality to manage all your client relationships, contact information, communication history, and client documents in one centralized location.'
      },
      {
        title: 'Invoice Generation',
        description: 'Create professional invoices quickly with customizable templates, automated numbering, and multiple payment gateway integrations. Track invoice status and send automated reminders.'
      },
      {
        title: 'Finance Tracking',
        description: 'Comprehensive financial dashboard with real-time revenue tracking, expense management, profit/loss reports, and financial analytics to make data-driven business decisions.'
      },
      {
        title: 'Team Collaboration & Chat',
        description: 'Built-in team chat and collaboration tools for seamless communication, file sharing, task assignments, and project discussions within the platform.'
      },
      {
        title: 'Role-Based Access Control',
        description: 'Granular permission system allowing you to control what each team member can access, ensuring data security and proper workflow management.'
      },
      {
        title: 'Business Operations Dashboard',
        description: 'Real-time dashboard providing insights into key business metrics, client activity, revenue trends, team performance, and operational efficiency.'
      },
      {
        title: 'Project Management',
        description: 'Organize and track projects with task management, deadlines, milestones, and progress tracking integrated with client and team management.'
      },
      {
        title: 'Document Management',
        description: 'Secure document storage and management system for contracts, proposals, invoices, and other business documents with version control.'
      }
    ],
    techStack: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Prisma',
      'NextAuth',
      'Stripe',
      'WebSockets'
    ],
    highlights: [
      'Unified platform replacing multiple tools',
      'Real-time collaboration and updates',
      'Secure and scalable architecture',
      'Mobile-responsive design',
      'API-ready for integrations',
      'Comprehensive audit logging'
    ],
    status: 'live',
    launchDate: '2025-12-01'
  },
  {
    id: 'expenseflow',
    name: 'Expense Flow Pro',
    slug: 'expenseflow',
    tagline: 'The Expense Tracker',
    description: 'Expense Flow Pro is a modern, intuitive expense tracking application designed to help individuals and businesses manage their finances effortlessly. With smart categorization, detailed reporting, and a clean financial UI, Expense Flow Pro makes expense management simple and insightful.',
    url: 'https://expenseflowpro.vercel.app/',
    category: 'Finance & Accounting',
    features: [
      {
        title: 'Expense Tracking',
        description: 'Easily record and track all your expenses with quick entry forms, receipt uploads, and automatic categorization for accurate financial records.'
      },
      {
        title: 'Smart Categorization',
        description: 'Automatically categorize expenses using AI-powered classification or create custom categories that match your business needs and reporting requirements.'
      },
      {
        title: 'Reports & Summaries',
        description: 'Generate comprehensive financial reports with visual charts, spending trends, category breakdowns, and period comparisons to understand your spending patterns.'
      },
      {
        title: 'Clean Financial UI',
        description: 'Beautiful, intuitive interface designed for clarity and ease of use, making expense management a pleasant experience rather than a chore.'
      },
      {
        title: 'Budget Management',
        description: 'Set budgets for different categories and receive alerts when approaching limits, helping you stay on track with your financial goals.'
      },
      {
        title: 'Multi-Currency Support',
        description: 'Track expenses in multiple currencies with automatic conversion rates, perfect for businesses operating internationally or individuals who travel.'
      },
      {
        title: 'Export & Integration',
        description: 'Export your expense data in various formats (CSV, PDF, Excel) and integrate with accounting software for seamless financial management.'
      },
      {
        title: 'Receipt Management',
        description: 'Upload and store receipts digitally, extract expense details automatically, and maintain a complete audit trail for all transactions.'
      }
    ],
    techStack: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Prisma',
      'Chart.js',
      'NextAuth'
    ],
    highlights: [
      'Intuitive user experience',
      'Real-time expense insights',
      'Mobile-first design',
      'Secure data encryption',
      'Fast and responsive',
      'Export-ready reports'
    ],
    status: 'live',
    launchDate: '2025-12-01'
  },
  {
    id: 'webscoreai',
    name: 'WebScore AI',
    slug: 'webscoreai',
    tagline: 'AI-Powered Website Analysis',
    description: 'WebScore AI is an intelligent website analysis tool that provides comprehensive insights into your website\'s performance, SEO, accessibility, and user experience. Powered by advanced AI algorithms, it delivers actionable recommendations to improve your online presence and drive better results.',
    url: 'https://webscoreai.vercel.app',
    category: 'AI & Analytics',
    features: [
      {
        title: 'AI-Powered Analysis',
        description: 'Leverage advanced artificial intelligence to analyze your website comprehensively, identifying issues and opportunities that traditional tools might miss.'
      },
      {
        title: 'SEO Score & Optimization',
        description: 'Get detailed SEO scores with specific recommendations for improving search engine rankings, meta tags, content quality, and technical SEO factors.'
      },
      {
        title: 'Performance Metrics',
        description: 'Analyze website speed, Core Web Vitals, loading times, and performance bottlenecks with actionable insights to enhance user experience.'
      },
      {
        title: 'Accessibility Audit',
        description: 'Ensure your website is accessible to all users with comprehensive accessibility audits and WCAG compliance recommendations.'
      },
      {
        title: 'Security Analysis',
        description: 'Identify security vulnerabilities, SSL certificate issues, and potential threats to keep your website and users safe.'
      },
      {
        title: 'Competitive Insights',
        description: 'Compare your website against competitors and industry benchmarks to understand your position and identify improvement opportunities.'
      },
      {
        title: 'Detailed Reports',
        description: 'Generate comprehensive, easy-to-understand reports with visual charts, prioritized recommendations, and progress tracking over time.'
      },
      {
        title: 'Real-Time Monitoring',
        description: 'Monitor your website continuously and receive alerts when issues are detected, ensuring optimal performance at all times.'
      }
    ],
    techStack: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'AI/ML Models',
      'Web APIs',
      'Analytics Engine'
    ],
    highlights: [
      'AI-driven insights and recommendations',
      'Comprehensive website analysis',
      'Real-time monitoring capabilities',
      'User-friendly interface',
      'Actionable optimization suggestions',
      'Competitive benchmarking'
    ],
    status: 'live',
    launchDate: '2026-01-01'
  }
];

export const getSaaSProductBySlug = (slug: string): SAASProduct | undefined => {
  return saasProducts.find(product => product.slug === slug);
};

export const getAllSaaSProducts = (): SAASProduct[] => {
  return saasProducts;
};

