import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portfolio from "@/pages/portfolio";
import Blog from "@/pages/blog";
import BlogCategory from "@/pages/blog-category";
import BlogTag from "@/pages/blog-tag";
import BlogDetail from "@/pages/blog-detail";
import Resources from "@/pages/resources";
import ResourcesLibrary from "@/pages/resources-library";
import Glossary from "@/pages/glossary";
import SAASTools from "@/pages/saas-tools";
import SAASToolDetail from "@/pages/saas-tool-detail";
import Comparison from "@/pages/comparison";
import Tools from "@/pages/tools";
import ToolDetail from "@/pages/tool-detail";
import CaseStudies from "@/pages/case-studies";
import CaseStudyDetail from "@/pages/case-study-detail";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

// Get the base path from Vite config
const base = import.meta.env.BASE_URL;

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <WouterRouter base={base}>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Portfolio} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/category/:category" component={BlogCategory} />
        <Route path="/blog/tag/:tag" component={BlogTag} />
        <Route path="/blog/:slug" component={BlogDetail} />
        <Route path="/saas-tools" component={SAASTools} />
        <Route path="/saas-tools/:slug" component={SAASToolDetail} />
        <Route path="/compare/:topic" component={Comparison} />
        <Route path="/tools" component={Tools} />
        <Route path="/tools/:toolId" component={ToolDetail} />
        <Route path="/resources" component={Resources} />
        <Route path="/resources-library" component={ResourcesLibrary} />
        <Route path="/glossary" component={Glossary} />
        <Route path="/case-studies" component={CaseStudies} />
        <Route path="/case-studies/:slug" component={CaseStudyDetail} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
