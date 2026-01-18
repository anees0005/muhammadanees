import { useEffect } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, X, TrendingUp, Code2, Zap, Users, DollarSign } from "lucide-react";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import Breadcrumbs from "@/components/ui/breadcrumbs";

interface ComparisonItem {
  feature: string;
  [key: string]: string | boolean;
}

const reactVsVueVsAngular: ComparisonItem[] = [
  { feature: "Learning Curve", react: "Moderate", vue: "Easy", angular: "Steep" },
  { feature: "Performance", react: "Excellent", vue: "Excellent", angular: "Good" },
  { feature: "Bundle Size", react: "Small", vue: "Smallest", angular: "Larger" },
  { feature: "TypeScript Support", react: "Excellent", vue: "Good", angular: "Built-in" },
  { feature: "Ecosystem", react: "Largest", vue: "Growing", angular: "Comprehensive" },
  { feature: "Mobile Development", react: "React Native", vue: "NativeScript", angular: "Ionic" },
  { feature: "Server-Side Rendering", react: "Next.js", vue: "Nuxt.js", angular: "Angular Universal" },
  { feature: "State Management", react: "Redux, Zustand", vue: "Vuex, Pinia", angular: "RxJS, NgRx" },
  { feature: "Community", react: "Very Large", vue: "Large", angular: "Large" },
  { feature: "Job Market", react: "Highest Demand", vue: "Growing", angular: "Stable" },
];

const nextjsVsRemixVsSveltekit: ComparisonItem[] = [
  { feature: "Framework", nextjs: "React-based", remix: "React-based", sveltekit: "Svelte-based" },
  { feature: "Server-Side Rendering", nextjs: "Excellent", remix: "Excellent", sveltekit: "Excellent" },
  { feature: "Data Loading", nextjs: "getServerSideProps", remix: "Loaders", sveltekit: "load()" },
  { feature: "File-Based Routing", nextjs: "Yes", remix: "Yes", sveltekit: "Yes" },
  { feature: "API Routes", nextjs: "Yes", remix: "Yes", sveltekit: "Yes" },
  { feature: "Image Optimization", nextjs: "Built-in", remix: "Manual", sveltekit: "Manual" },
  { feature: "Deployment", nextjs: "Vercel (optimized)", remix: "Any platform", sveltekit: "Any platform" },
  { feature: "Learning Curve", nextjs: "Moderate", remix: "Moderate", sveltekit: "Easy" },
  { feature: "Performance", nextjs: "Excellent", remix: "Excellent", sveltekit: "Excellent" },
  { feature: "Ecosystem", nextjs: "Largest", remix: "Growing", sveltekit: "Growing" },
];

export default function Comparison() {
  const [, params] = useRoute("/compare/:topic");
  const topic = params?.topic || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topic]);

  const getComparisonData = () => {
    if (topic === "react-vs-vue-vs-angular") {
      return {
        title: "React vs Vue vs Angular: Complete Framework Comparison 2025",
        description: "Comprehensive comparison of React, Vue, and Angular frameworks. Learn which framework is best for your project based on performance, ecosystem, learning curve, and use cases.",
        data: reactVsVueVsAngular,
        frameworks: [
          { name: "React", color: "blue", pros: ["Largest ecosystem", "Huge community", "React Native", "Flexible"], cons: ["Steeper learning curve", "Requires additional libraries"] },
          { name: "Vue", color: "green", pros: ["Easiest to learn", "Small bundle size", "Great documentation", "Progressive"], cons: ["Smaller ecosystem", "Less job opportunities"] },
          { name: "Angular", color: "red", pros: ["Full framework", "Built-in TypeScript", "Enterprise-ready", "Comprehensive"], cons: ["Steep learning curve", "Larger bundle size", "More opinionated"] }
        ]
      };
    } else if (topic === "nextjs-vs-remix-vs-sveltekit") {
      return {
        title: "Next.js vs Remix vs SvelteKit: Framework Comparison 2025",
        description: "Compare Next.js, Remix, and SvelteKit for your next project. Understand differences in data loading, routing, performance, and deployment options.",
        data: nextjsVsRemixVsSveltekit,
        frameworks: [
          { name: "Next.js", color: "blue", pros: ["Vercel optimization", "Image optimization", "Largest ecosystem", "Great DX"], cons: ["Vendor lock-in risk", "Complex routing"] },
          { name: "Remix", color: "purple", pros: ["Web standards", "Flexible deployment", "Great data loading", "Modern"], cons: ["Smaller ecosystem", "Less resources"] },
          { name: "SvelteKit", color: "orange", pros: ["No virtual DOM", "Smaller bundles", "Great performance", "Easy to learn"], cons: ["Smaller ecosystem", "Less adoption"] }
        ]
      };
    }
    return null;
  };

  const comparison = getComparisonData();

  if (!comparison) {
    return (
      <div className="relative bg-[hsl(var(--dark-bg))] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Comparison Not Found</h1>
          <p className="text-gray-400 mb-8">The comparison you're looking for doesn't exist.</p>
          <Link href="/">
            <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[hsl(var(--dark-bg))] text-white min-h-screen">
      <Navigation />
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(240,10%,3.9%)] via-[hsl(240,10%,5%)] to-[hsl(240,10%,7%)]">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-3 md:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: comparison?.title || "Comparison" }
          ]} />

          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <TrendingUp size={16} />
              <span>Framework Comparison</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {comparison.title}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              {comparison.description}
            </p>
          </div>

          {/* Framework Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {comparison.frameworks.map((framework, index) => {
              const colorClasses = {
                blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
                green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400" },
                red: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400" },
                purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400" },
                orange: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400" }
              };
              const colors = colorClasses[framework.color as keyof typeof colorClasses];
              
              return (
                <div key={index} className={`bg-white/5 border ${colors.border} rounded-xl p-6`}>
                  <h2 className={`text-2xl font-bold mb-4 ${colors.text}`}>{framework.name}</h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-2">Pros:</h3>
                      <ul className="space-y-1">
                        {framework.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-2">Cons:</h3>
                      <ul className="space-y-1">
                        {framework.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                            <X size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparison Table */}
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Feature</th>
                    {comparison.frameworks.map((fw, i) => (
                      <th key={i} className="px-6 py-4 text-center text-sm font-semibold text-white">
                        {fw.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.data.map((item, index) => (
                    <tr key={index} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-300">{item.feature}</td>
                      {comparison.frameworks.map((fw, fwIndex) => {
                        const key = fw.name.toLowerCase().replace('.', '');
                        const value = item[key];
                        return (
                          <td key={fwIndex} className="px-6 py-4 text-center text-gray-400">
                            {value === true || value === "Yes" ? (
                              <CheckCircle2 size={20} className="text-green-400 mx-auto" />
                            ) : value === false || value === "No" ? (
                              <X size={20} className="text-red-400 mx-auto" />
                            ) : (
                              <span>{String(value)}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8 md:p-12 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Code2 size={32} className="text-cyan-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Which Should You Choose?</h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              {topic === "react-vs-vue-vs-angular" ? (
                <>
                  <p>
                    <strong className="text-white">Choose React if:</strong> You need the largest ecosystem, want maximum flexibility, 
                    plan to build mobile apps with React Native, or need the most job opportunities.
                  </p>
                  <p>
                    <strong className="text-white">Choose Vue if:</strong> You're new to frameworks, want the easiest learning curve, 
                    need a small bundle size, or prefer a progressive framework that's easy to adopt.
                  </p>
                  <p>
                    <strong className="text-white">Choose Angular if:</strong> You're building enterprise applications, need a full 
                    framework with everything included, want built-in TypeScript, or prefer opinionated structure.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong className="text-white">Choose Next.js if:</strong> You want Vercel optimization, need built-in image optimization, 
                    prefer the largest ecosystem, or want the most resources and community support.
                  </p>
                  <p>
                    <strong className="text-white">Choose Remix if:</strong> You value web standards, need flexible deployment options, 
                    want modern data loading patterns, or prefer a framework that follows web fundamentals.
                  </p>
                  <p>
                    <strong className="text-white">Choose SvelteKit if:</strong> You want the smallest bundle sizes, prefer no virtual DOM, 
                    need excellent performance, or want an easy-to-learn framework with great developer experience.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="inline-block bg-white/5 border border-white/10 rounded-xl p-8 max-w-2xl">
              <h2 className="text-2xl font-bold mb-4 text-white">Need Help Choosing?</h2>
              <p className="text-gray-400 mb-6">
                I can help you choose the right framework for your project and build it using best practices.
              </p>
              <Link href="#contact">
                <button className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all inline-flex items-center gap-2">
                  <span>Get Expert Advice</span>
                  <ArrowLeft size={20} className="rotate-180" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

