export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'template' | 'checklist' | 'code' | 'design';
  category: string;
  fileUrl?: string; // For actual downloads
  downloadCount?: number;
  tags: string[];
  requiresEmail: boolean;
  image?: string;
}

export const resources: Resource[] = [
  {
    id: '1',
    title: 'SaaS Development Checklist 2025',
    description: 'Complete checklist for building and launching a SaaS product. Includes architecture, security, deployment, and growth strategies.',
    type: 'checklist',
    category: 'SaaS Development',
    fileUrl: '/resources/saas-development-checklist.pdf',
    downloadCount: 0,
    tags: ['SaaS', 'Checklist', 'Development', 'Startup'],
    requiresEmail: true,
    image: '/resources/saas-checklist.jpg'
  },
  {
    id: '2',
    title: 'React Performance Optimization Guide',
    description: 'Comprehensive PDF guide covering React optimization techniques, best practices, and performance monitoring strategies.',
    type: 'pdf',
    category: 'Web Development',
    fileUrl: '/resources/react-performance-guide.pdf',
    downloadCount: 0,
    tags: ['React', 'Performance', 'Optimization', 'Guide'],
    requiresEmail: true,
    image: '/resources/react-guide.jpg'
  },
  {
    id: '3',
    title: 'SEO Technical Audit Checklist',
    description: 'Complete technical SEO audit checklist to identify and fix SEO issues on your website. Includes on-page, off-page, and technical factors.',
    type: 'checklist',
    category: 'SEO',
    fileUrl: '/resources/seo-audit-checklist.pdf',
    downloadCount: 0,
    tags: ['SEO', 'Checklist', 'Audit', 'Technical SEO'],
    requiresEmail: true,
    image: '/resources/seo-checklist.jpg'
  },
  {
    id: '4',
    title: 'Next.js Project Template',
    description: 'Starter template for Next.js projects with TypeScript, Tailwind CSS, authentication, and best practices pre-configured.',
    type: 'template',
    category: 'Web Development',
    fileUrl: '/resources/nextjs-template.zip',
    downloadCount: 0,
    tags: ['Next.js', 'Template', 'TypeScript', 'Starter'],
    requiresEmail: true,
    image: '/resources/nextjs-template.jpg'
  },
  {
    id: '5',
    title: 'API Design Best Practices Guide',
    description: 'Complete guide to designing RESTful APIs. Includes authentication, versioning, error handling, and documentation standards.',
    type: 'pdf',
    category: 'Backend Development',
    fileUrl: '/resources/api-design-guide.pdf',
    downloadCount: 0,
    tags: ['API', 'REST', 'Backend', 'Design'],
    requiresEmail: true,
    image: '/resources/api-guide.jpg'
  },
  {
    id: '6',
    title: 'SaaS Pricing Strategy Template',
    description: 'Excel template for calculating SaaS pricing, including cost analysis, margin calculations, and pricing tier recommendations.',
    type: 'template',
    category: 'Business',
    fileUrl: '/resources/saas-pricing-template.xlsx',
    downloadCount: 0,
    tags: ['SaaS', 'Pricing', 'Business', 'Template'],
    requiresEmail: true,
    image: '/resources/pricing-template.jpg'
  },
  {
    id: '7',
    title: 'Website Launch Checklist',
    description: 'Pre-launch checklist covering security, performance, SEO, analytics, and user experience factors before going live.',
    type: 'checklist',
    category: 'Web Development',
    fileUrl: '/resources/website-launch-checklist.pdf',
    downloadCount: 0,
    tags: ['Launch', 'Checklist', 'Website', 'Pre-launch'],
    requiresEmail: true,
    image: '/resources/launch-checklist.jpg'
  },
  {
    id: '8',
    title: 'TypeScript React Component Template',
    description: 'Reusable TypeScript React component template with props interface, error handling, and testing setup.',
    type: 'code',
    category: 'Web Development',
    fileUrl: '/resources/react-component-template.tsx',
    downloadCount: 0,
    tags: ['React', 'TypeScript', 'Template', 'Component'],
    requiresEmail: false,
    image: '/resources/component-template.jpg'
  }
];

export const getResourcesByCategory = (category: string): Resource[] => {
  return resources.filter(resource => resource.category === category);
};

export const getResourceById = (id: string): Resource | undefined => {
  return resources.find(resource => resource.id === id);
};

export const getPopularResources = (limit: number = 5): Resource[] => {
  return [...resources]
    .sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0))
    .slice(0, limit);
};

export const getResourcesByType = (type: Resource['type']): Resource[] => {
  return resources.filter(resource => resource.type === type);
};

