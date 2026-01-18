export interface GlossaryTerm {
  id: string;
  term: string;
  slug: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
  examples?: string[];
  tags: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: '1',
    term: 'SaaS',
    slug: 'saas',
    definition: 'Software as a Service (SaaS) is a cloud-based software delivery model where applications are hosted by a service provider and made available to customers over the internet. Users typically access SaaS applications through a web browser and pay a subscription fee rather than purchasing software licenses.',
    category: 'Business & Technology',
    relatedTerms: ['Cloud Computing', 'Subscription Model', 'Multi-tenancy'],
    examples: ['Salesforce', 'Slack', 'Zoom', 'CompanyHub', 'ExpenseFlow'],
    tags: ['SaaS', 'Cloud', 'Software', 'Business Model']
  },
  {
    id: '2',
    term: 'React',
    slug: 'react',
    definition: 'React is an open-source JavaScript library for building user interfaces, particularly web applications. Developed by Facebook, React uses a component-based architecture and a virtual DOM to efficiently update and render UI components.',
    category: 'Web Development',
    relatedTerms: ['JavaScript', 'Component', 'Virtual DOM', 'JSX'],
    examples: ['Facebook', 'Instagram', 'Netflix', 'Airbnb'],
    tags: ['React', 'JavaScript', 'Frontend', 'UI Library']
  },
  {
    id: '3',
    term: 'Next.js',
    slug: 'nextjs',
    definition: 'Next.js is a React framework that enables server-side rendering, static site generation, and API routes. It provides features like automatic code splitting, optimized performance, and built-in CSS support, making it ideal for production-ready React applications.',
    category: 'Web Development',
    relatedTerms: ['React', 'SSR', 'SSG', 'Server Components'],
    examples: ['Vercel', 'TikTok', 'Hulu', 'Twitch'],
    tags: ['Next.js', 'React', 'Framework', 'SSR']
  },
  {
    id: '4',
    term: 'TypeScript',
    slug: 'typescript',
    definition: 'TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It adds optional type annotations, interfaces, and advanced features to JavaScript, helping developers catch errors early and write more maintainable code.',
    category: 'Programming Languages',
    relatedTerms: ['JavaScript', 'Type Safety', 'Interface', 'Compilation'],
    examples: ['Microsoft', 'Google', 'Slack', 'Asana'],
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Type Safety']
  },
  {
    id: '5',
    term: 'API',
    slug: 'api',
    definition: 'Application Programming Interface (API) is a set of protocols, routines, and tools for building software applications. APIs define how different software components should interact, allowing applications to communicate with each other and share data.',
    category: 'Backend Development',
    relatedTerms: ['REST', 'GraphQL', 'Endpoint', 'HTTP'],
    examples: ['REST API', 'GraphQL API', 'RESTful Services'],
    tags: ['API', 'Backend', 'Integration', 'Development']
  },
  {
    id: '6',
    term: 'SEO',
    slug: 'seo',
    definition: 'Search Engine Optimization (SEO) is the practice of optimizing websites and content to improve visibility and ranking in search engine results pages (SERPs). SEO involves technical optimization, content quality, and building authority to attract organic traffic.',
    category: 'Digital Marketing',
    relatedTerms: ['Keywords', 'On-Page SEO', 'Off-Page SEO', 'SERP'],
    examples: ['Keyword Research', 'Link Building', 'Content Optimization'],
    tags: ['SEO', 'Marketing', 'Search Engines', 'Optimization']
  },
  {
    id: '7',
    term: 'Microservices',
    slug: 'microservices',
    definition: 'Microservices is an architectural approach where applications are built as a collection of small, independent services that communicate over well-defined APIs. Each service is responsible for a specific business function and can be developed, deployed, and scaled independently.',
    category: 'Architecture',
    relatedTerms: ['Monolith', 'API Gateway', 'Service Mesh', 'Distributed Systems'],
    examples: ['Netflix', 'Amazon', 'Uber'],
    tags: ['Microservices', 'Architecture', 'Backend', 'Scalability']
  },
  {
    id: '8',
    term: 'CI/CD',
    slug: 'cicd',
    definition: 'Continuous Integration and Continuous Deployment (CI/CD) is a DevOps practice that automates the process of integrating code changes, running tests, and deploying applications. CI/CD pipelines enable faster, more reliable software delivery.',
    category: 'DevOps',
    relatedTerms: ['DevOps', 'Automation', 'Pipeline', 'Deployment'],
    examples: ['GitHub Actions', 'Jenkins', 'GitLab CI', 'CircleCI'],
    tags: ['CI/CD', 'DevOps', 'Automation', 'Deployment']
  },
  {
    id: '9',
    term: 'JWT',
    slug: 'jwt',
    definition: 'JSON Web Token (JWT) is a compact, URL-safe token format used for securely transmitting information between parties. JWTs are commonly used for authentication and authorization in web applications and APIs.',
    category: 'Security',
    relatedTerms: ['Authentication', 'Authorization', 'Token', 'OAuth'],
    examples: ['User Authentication', 'API Security', 'Session Management'],
    tags: ['JWT', 'Security', 'Authentication', 'Token']
  },
  {
    id: '10',
    term: 'GraphQL',
    slug: 'graphql',
    definition: 'GraphQL is a query language and runtime for APIs that allows clients to request exactly the data they need. Unlike REST APIs, GraphQL provides a single endpoint and enables clients to specify the structure of the response.',
    category: 'Backend Development',
    relatedTerms: ['API', 'REST', 'Query Language', 'Schema'],
    examples: ['GitHub API', 'Shopify', 'Facebook'],
    tags: ['GraphQL', 'API', 'Query Language', 'Backend']
  },
  {
    id: '11',
    term: 'Serverless',
    slug: 'serverless',
    definition: 'Serverless computing is a cloud computing model where cloud providers manage server infrastructure and automatically allocate resources as needed. Developers write and deploy code without managing servers, paying only for actual usage.',
    category: 'Cloud Computing',
    relatedTerms: ['Cloud Functions', 'Lambda', 'FaaS', 'Cloud Computing'],
    examples: ['AWS Lambda', 'Vercel Functions', 'Netlify Functions'],
    tags: ['Serverless', 'Cloud', 'Functions', 'Scalability']
  },
  {
    id: '12',
    term: 'Docker',
    slug: 'docker',
    definition: 'Docker is a platform for developing, shipping, and running applications using containerization. Containers package applications with their dependencies, ensuring consistent behavior across different environments.',
    category: 'DevOps',
    relatedTerms: ['Container', 'Kubernetes', 'Containerization', 'DevOps'],
    examples: ['Application Deployment', 'Microservices', 'Development Environments'],
    tags: ['Docker', 'Container', 'DevOps', 'Deployment']
  },
  {
    id: '13',
    term: 'REST',
    slug: 'rest',
    definition: 'Representational State Transfer (REST) is an architectural style for designing web services. RESTful APIs use HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources identified by URLs.',
    category: 'Backend Development',
    relatedTerms: ['API', 'HTTP', 'RESTful', 'Endpoint'],
    examples: ['REST API', 'RESTful Services', 'HTTP APIs'],
    tags: ['REST', 'API', 'HTTP', 'Backend']
  },
  {
    id: '14',
    term: 'OAuth',
    slug: 'oauth',
    definition: 'OAuth is an authorization framework that allows third-party services to access user resources without exposing passwords. It enables secure, token-based authentication and is widely used for social login and API access.',
    category: 'Security',
    relatedTerms: ['Authentication', 'JWT', 'Authorization', 'Token'],
    examples: ['Google Login', 'GitHub Authentication', 'Social Login'],
    tags: ['OAuth', 'Security', 'Authentication', 'Authorization']
  },
  {
    id: '15',
    term: 'Progressive Web App',
    slug: 'pwa',
    definition: 'Progressive Web App (PWA) is a web application that uses modern web capabilities to provide a native app-like experience. PWAs work offline, can be installed on devices, and provide push notifications.',
    category: 'Web Development',
    relatedTerms: ['Web App', 'Service Worker', 'Offline', 'Mobile'],
    examples: ['Twitter Lite', 'Pinterest', 'Uber'],
    tags: ['PWA', 'Web App', 'Mobile', 'Offline']
  }
];

export const getGlossaryTermBySlug = (slug: string): GlossaryTerm | undefined => {
  return glossaryTerms.find(term => term.slug === slug);
};

export const getGlossaryTermsByCategory = (category: string): GlossaryTerm[] => {
  return glossaryTerms.filter(term => term.category === category);
};

export const searchGlossaryTerms = (query: string): GlossaryTerm[] => {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery) ||
    term.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getCategories = (): string[] => {
  return Array.from(new Set(glossaryTerms.map(term => term.category)));
};

