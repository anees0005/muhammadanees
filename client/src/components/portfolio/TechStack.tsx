import { Code2, Database, Cloud, Cpu, Globe, Shield } from "lucide-react";

interface TechCategory {
  name: string;
  icon: React.ReactNode;
  technologies: string[];
  color: string;
}

const techCategories: TechCategory[] = [
  {
    name: "Frontend",
    icon: <Globe size={24} />,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
    color: "blue"
  },
  {
    name: "Backend",
    icon: <Cpu size={24} />,
    technologies: ["Node.js", "Express", "Python", "Django", "REST APIs", "GraphQL"],
    color: "green"
  },
  {
    name: "Database",
    icon: <Database size={24} />,
    technologies: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma", "Drizzle ORM"],
    color: "purple"
  },
  {
    name: "Cloud & DevOps",
    icon: <Cloud size={24} />,
    technologies: ["Vercel", "AWS", "Docker", "GitHub Actions", "CI/CD", "Kubernetes"],
    color: "cyan"
  },
  {
    name: "AI & Automation",
    icon: <Code2 size={24} />,
    technologies: ["OpenAI", "Anthropic Claude", "n8n", "Workflow Automation", "AI Chatbots"],
    color: "pink"
  },
  {
    name: "Security & Auth",
    icon: <Shield size={24} />,
    technologies: ["NextAuth", "JWT", "OAuth", "RBAC", "Encryption", "Security Best Practices"],
    color: "orange"
  }
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
    green: { text: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
    purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
    cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
    pink: { text: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/30" },
    orange: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" }
  };
  return colors[color as keyof typeof colors];
};

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-24 px-3 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="section-fade">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <Code2 size={16} />
              <span>Technology Stack</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Technologies I <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Work With</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Modern tools and technologies I use to build scalable, performant, and production-ready applications
            </p>
          </div>

          {/* Tech Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {techCategories.map((category, index) => {
              const colors = getColorClasses(category.color);
              return (
                <div
                  key={index}
                  className={`bg-white/5 border ${colors.border} rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all`}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-lg ${colors.bg} ${colors.text}`}>
                      {category.icon}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold ${colors.text}`}>
                      {category.name}
                    </h3>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-sm font-medium hover:border-cyan-500/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 max-w-3xl">
              <p className="text-gray-300 leading-relaxed mb-4">
                I stay current with the latest technologies and best practices, continuously learning and adapting to deliver cutting-edge solutions. 
                My tech stack evolves with industry standards to ensure optimal performance, security, and scalability.
              </p>
              <p className="text-cyan-400 font-medium">
                Always learning, always building, always improving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

