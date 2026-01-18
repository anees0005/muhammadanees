import { useEffect } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import SAASPricingCalculator from "@/components/tools/SaasPricingCalculator";
import WebsiteSpeedTest from "@/components/tools/WebsiteSpeedTest";
import SEOScoreChecker from "@/components/tools/SEOScoreChecker";
import TechStackRecommender from "@/components/tools/TechStackRecommender";
import APIResponseTime from "@/components/tools/APIResponseTime";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default function ToolDetail() {
  const [, params] = useRoute("/tools/:toolId");
  const toolId = params?.toolId || "";

  const getToolComponent = () => {
    switch (toolId) {
      case "saas-pricing-calculator":
        return {
          title: "SaaS Pricing Calculator",
          description: "Calculate optimal pricing for your SaaS product based on costs, target margins, and market analysis",
          component: <SAASPricingCalculator />
        };
      case "website-speed-test":
        return {
          title: "Website Speed Test Tool",
          description: "Test your website loading speed and get Core Web Vitals metrics with optimization recommendations",
          component: <WebsiteSpeedTest />
        };
      case "seo-score-checker":
        return {
          title: "SEO Score Checker",
          description: "Analyze your website SEO score and get actionable recommendations to improve search rankings",
          component: <SEOScoreChecker />
        };
      case "tech-stack-recommender":
        return {
          title: "Tech Stack Recommender",
          description: "Get personalized technology recommendations based on your project type, team size, and budget",
          component: <TechStackRecommender />
        };
      case "api-response-time":
        return {
          title: "API Response Time Calculator",
          description: "Test API endpoint response times and analyze performance metrics for optimal API speed",
          component: <APIResponseTime />
        };
      default:
        return null;
    }
  };

  const tool = getToolComponent();

  useEffect(() => {
    window.scrollTo(0, 0);
    // SEO: Update page title and meta based on tool
    if (tool) {
      document.title = `${tool.title} - Free Developer Tool | Muhammad Anees`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', tool.description);
      }
    }
  }, [toolId, tool]);

  if (tool) {
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
          <div className="container mx-auto max-w-5xl">
            {/* Breadcrumbs */}
            <Breadcrumbs items={[
              { label: "Tools", href: "/tools" },
              { label: tool.title }
            ]} />

            <div className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {tool.title}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {tool.description}
              </p>
            </div>

            {tool.component}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative bg-[hsl(var(--dark-bg))] text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
        <p className="text-gray-400 mb-8">The tool you're looking for doesn't exist.</p>
        <Link href="/tools">
          <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all">
            Back to Tools
          </button>
        </Link>
      </div>
    </div>
  );
}

