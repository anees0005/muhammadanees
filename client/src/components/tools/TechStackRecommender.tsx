import { useState } from "react";
import { Code2, Sparkles, CheckCircle2 } from "lucide-react";

interface TechOption {
  name: string;
  description: string;
  useCase: string;
}

const techStacks: Record<string, TechOption[]> = {
  frontend: [
    { name: "React", description: "Component-based library for building UIs", useCase: "Complex interactive applications" },
    { name: "Next.js", description: "React framework with SSR and routing", useCase: "SEO-optimized web apps" },
    { name: "Vue.js", description: "Progressive JavaScript framework", useCase: "Easy to learn, flexible projects" },
    { name: "Angular", description: "Full-featured framework", useCase: "Enterprise applications" },
    { name: "Svelte", description: "Compile-time optimized framework", useCase: "Performance-critical apps" },
  ],
  backend: [
    { name: "Node.js", description: "JavaScript runtime for server-side", useCase: "Full-stack JavaScript" },
    { name: "Python (Django)", description: "High-level Python framework", useCase: "Rapid development, data-heavy apps" },
    { name: "Python (FastAPI)", description: "Modern Python API framework", useCase: "High-performance APIs" },
    { name: "Go", description: "Fast, compiled language", useCase: "Microservices, high concurrency" },
    { name: "Rust", description: "Memory-safe systems language", useCase: "Performance-critical systems" },
  ],
  database: [
    { name: "PostgreSQL", description: "Advanced open-source relational DB", useCase: "Complex queries, ACID compliance" },
    { name: "MongoDB", description: "NoSQL document database", useCase: "Flexible schemas, rapid development" },
    { name: "MySQL", description: "Popular relational database", useCase: "Web applications, general purpose" },
    { name: "Redis", description: "In-memory data store", useCase: "Caching, real-time features" },
    { name: "Supabase", description: "Open-source Firebase alternative", useCase: "Rapid prototyping, real-time" },
  ],
  deployment: [
    { name: "Vercel", description: "Optimized for Next.js and frontend", useCase: "JAMstack, serverless" },
    { name: "AWS", description: "Comprehensive cloud platform", useCase: "Enterprise, scalable apps" },
    { name: "DigitalOcean", description: "Simple cloud hosting", useCase: "Small to medium apps" },
    { name: "Railway", description: "Developer-friendly platform", useCase: "Quick deployments" },
    { name: "Docker", description: "Containerization platform", useCase: "Consistent deployments" },
  ],
};

export default function TechStackRecommender() {
  const [projectType, setProjectType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [budget, setBudget] = useState("");
  const [recommendations, setRecommendations] = useState<any>(null);

  const getRecommendations = () => {
    if (!projectType || !teamSize || !budget) {
      return;
    }

    const recs: any = {
      frontend: "",
      backend: "",
      database: "",
      deployment: "",
    };

    // Frontend recommendation
    if (projectType === "saas" || projectType === "web-app") {
      recs.frontend = teamSize === "solo" ? "Next.js" : "React + Next.js";
    } else if (projectType === "landing") {
      recs.frontend = "Next.js";
    } else if (projectType === "ecommerce") {
      recs.frontend = "Next.js or Shopify";
    } else {
      recs.frontend = "React";
    }

    // Backend recommendation
    if (teamSize === "solo" && budget === "low") {
      recs.backend = "Node.js (easy to learn)";
    } else if (projectType === "saas") {
      recs.backend = "Node.js or Python (FastAPI)";
    } else if (budget === "high") {
      recs.backend = "Go or Rust (performance)";
    } else {
      recs.backend = "Node.js or Python (Django)";
    }

    // Database recommendation
    if (projectType === "saas") {
      recs.database = "PostgreSQL (multi-tenancy)";
    } else if (projectType === "ecommerce") {
      recs.database = "PostgreSQL or MySQL";
    } else if (budget === "low") {
      recs.database = "PostgreSQL (free, powerful)";
    } else {
      recs.database = "PostgreSQL or MongoDB";
    }

    // Deployment recommendation
    if (budget === "low") {
      recs.deployment = "Vercel (free tier) or Railway";
    } else if (projectType === "saas") {
      recs.deployment = "AWS or Vercel";
    } else {
      recs.deployment = "Vercel or DigitalOcean";
    }

    setRecommendations(recs);
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Code2 size={28} className="text-cyan-400" />
          <span>Get Tech Stack Recommendations</span>
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Type
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.5rem'
              }}
            >
              <option value="" className="bg-gray-900 text-white">Select project type</option>
              <option value="saas" className="bg-gray-900 text-white">SaaS Application</option>
              <option value="web-app" className="bg-gray-900 text-white">Web Application</option>
              <option value="ecommerce" className="bg-gray-900 text-white">E-commerce Store</option>
              <option value="landing" className="bg-gray-900 text-white">Landing Page</option>
              <option value="api" className="bg-gray-900 text-white">API/Backend Service</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Team Size
            </label>
            <select
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.5rem'
              }}
            >
              <option value="" className="bg-gray-900 text-white">Select team size</option>
              <option value="solo" className="bg-gray-900 text-white">Solo Developer</option>
              <option value="small" className="bg-gray-900 text-white">Small Team (2-5)</option>
              <option value="medium" className="bg-gray-900 text-white">Medium Team (6-15)</option>
              <option value="large" className="bg-gray-900 text-white">Large Team (15+)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.5rem'
              }}
            >
              <option value="" className="bg-gray-900 text-white">Select budget</option>
              <option value="low" className="bg-gray-900 text-white">Low (Free/Low-cost tools)</option>
              <option value="medium" className="bg-gray-900 text-white">Medium ($50-500/month)</option>
              <option value="high" className="bg-gray-900 text-white">High ($500+/month)</option>
            </select>
          </div>

          <button
            onClick={getRecommendations}
            disabled={!projectType || !teamSize || !budget}
            className="w-full px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Recommendations
          </button>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <Sparkles size={24} className="text-cyan-400" />
            <span>Recommended Tech Stack</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(recommendations).map(([category, tech]: [string, any]) => (
              <div
                key={category}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <h4 className="text-lg font-bold text-white mb-3 capitalize">
                  {category}
                </h4>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-cyan-400" />
                  <span className="text-gray-300">{tech}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Note:</strong> These are general recommendations. 
              Consider your specific requirements, team expertise, and project constraints when making final decisions.
            </p>
          </div>
        </div>
      )}

      {/* Tech Stack Options */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
        <h3 className="text-xl font-bold mb-6 text-white">Popular Tech Stack Options</h3>
        <div className="space-y-8">
          {Object.entries(techStacks).map(([category, options]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold text-white mb-4 capitalize">
                {category}
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {options.map((tech) => (
                  <div
                    key={tech.name}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                  >
                    <h5 className="font-semibold text-white mb-2">{tech.name}</h5>
                    <p className="text-sm text-gray-400 mb-2">{tech.description}</p>
                    <p className="text-xs text-cyan-400">Best for: {tech.useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

