import { useEffect } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { Calendar, Clock, ArrowLeft, Tag, Share2, Twitter, Facebook, Linkedin, Link2, Calculator, Layers, ExternalLink } from "lucide-react";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blogPosts";
import { getAllSaaSProducts } from "@/data/saasTools";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorBio from "@/components/blog/AuthorBio";
import ReadingProgress from "@/components/blog/ReadingProgress";
import EmailCapturePopup from "@/components/ui/EmailCapturePopup";
import { getSeriesForPost, getAllSeries } from "@/data/articleSeries";
import { blogPosts } from "@/data/blogPosts";
import { BookOpen, ChevronRight, ChevronLeft } from "lucide-react";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const post = getBlogPostBySlug(slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = post.seoTitle || post.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.seoDescription || post.excerpt);
      }
      
      // Add Article Schema Markup
      const existingSchema = document.getElementById('article-schema');
      if (existingSchema) existingSchema.remove();
      
      const schemaScript = document.createElement('script');
      schemaScript.id = 'article-schema';
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image || "https://anees0005.github.io/muhammadanees/og-image.jpg",
        "datePublished": post.date,
        "dateModified": post.lastUpdated || post.date,
        "author": {
          "@type": "Person",
          "name": post.author,
          "url": "https://anees0005.github.io/muhammadanees/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Muhammad Anees Portfolio",
          "logo": {
            "@type": "ImageObject",
            "url": "https://anees0005.github.io/muhammadanees/og-image.jpg"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://anees0005.github.io/muhammadanees/blog/${post.slug}`
        },
        "articleSection": post.category,
        "keywords": post.tags.join(", "),
        "wordCount": post.content.split(/\s+/).length,
        "timeRequired": `PT${post.readTime}M`
      });
      document.head.appendChild(schemaScript);
      
      // Add HowTo Schema for tutorial/guide articles
      const isTutorial = post.title.toLowerCase().includes('guide') || 
                        post.title.toLowerCase().includes('tutorial') ||
                        post.title.toLowerCase().includes('how to') ||
                        post.tags.some(tag => tag.toLowerCase().includes('tutorial') || tag.toLowerCase().includes('guide'));
      
      if (isTutorial) {
        // Extract steps from content (looking for numbered lists or ## headings)
        const stepMatches = post.content.match(/^##?\s+(.+)$/gm) || [];
        const steps = stepMatches.slice(0, 10).map((match, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "name": match.replace(/^##?\s+/, "").trim(),
          "text": match.replace(/^##?\s+/, "").trim()
        }));
        
        if (steps.length > 0) {
          const existingHowTo = document.getElementById('howto-schema');
          if (existingHowTo) existingHowTo.remove();
          
          const howToScript = document.createElement('script');
          howToScript.id = 'howto-schema';
          howToScript.type = 'application/ld+json';
          howToScript.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": post.title,
            "description": post.excerpt,
            "image": post.image || "https://anees0005.github.io/muhammadanees/og-image.jpg",
            "totalTime": `PT${post.readTime}M`,
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            },
            "step": steps,
            "author": {
              "@type": "Person",
              "name": post.author
            }
          });
          document.head.appendChild(howToScript);
        }
      }
      
      return () => {
        const schema = document.getElementById('article-schema');
        if (schema) schema.remove();
        const howTo = document.getElementById('howto-schema');
        if (howTo) howTo.remove();
      };
    }
  }, [post]);

  const handleShare = async (platform?: string) => {
    if (!post) return;
    
    const url = window.location.href;
    const title = post.title;
    const text = post.excerpt;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) {
    return (
      <div className="relative bg-[hsl(var(--dark-bg))] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all">
              Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post, 6);
  const articleSeries = post ? getSeriesForPost(post, blogPosts) : null;
  
  // Get more posts from same category
  const categoryPosts = post ? blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3) : [];
  
  // Get SaaS products related to post tags
  const saasProducts = getAllSaaSProducts();
  const relatedSaaS = post ? saasProducts.filter(product => 
    post.tags.some(tag => 
      product.name.toLowerCase().includes(tag.toLowerCase()) ||
      product.description.toLowerCase().includes(tag.toLowerCase())
    )
  ).slice(0, 2) : [];

  return (
    <div className="relative bg-[hsl(var(--dark-bg))] text-white min-h-screen">
      <ReadingProgress />
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
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: "Blog", href: "/blog" },
            ...(articleSeries ? [{ label: articleSeries.name, href: `/blog/series/${articleSeries.slug}` }] : []),
            { label: post.title }
          ]} />

          {/* Article Header */}
          <article className="mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 flex-wrap">
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                Published: {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              {post.lastUpdated && post.lastUpdated !== post.date && (
                <span className="flex items-center gap-1 text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/30">
                  <Calendar size={14} />
                  Updated: {new Date(post.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
              {(!post.lastUpdated || post.lastUpdated === post.date) && (
                <span className="flex items-center gap-1 text-gray-500 text-xs">
                  (Content is current and up-to-date)
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {post.readTime} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between py-4 border-t border-b border-white/10">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold text-white">{post.author}</p>
                  <p className="text-sm text-gray-400">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 mr-2">Share:</span>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={18} className="text-blue-400" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-blue-600/20 hover:border-blue-600/50 transition-all"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={18} className="text-blue-500" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-blue-700/20 hover:border-blue-700/50 transition-all"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={18} className="text-blue-400" />
                </button>
                <button
                  onClick={() => handleShare()}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                  aria-label="Copy link"
                >
                  <Link2 size={18} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map(tag => {
                const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link key={tag} href={`/blog/tag/${tagSlug}`}>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-cyan-500/50 transition-all cursor-pointer">
                      <Tag size={12} className="inline mr-1" />
                      {tag}
                    </span>
                  </Link>
                );
              })}
            </div>
          </article>

          {/* Article Content with TOC */}
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <TableOfContents content={post.content} />
            </div>

            {/* Article Content */}
            <div className="lg:col-span-3 prose prose-invert prose-lg max-w-none">
              <div className="markdown-content text-gray-300 leading-relaxed">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => {
                      const id = `heading-${children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                      return <h1 id={id} className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4 scroll-mt-24">{children}</h1>;
                    },
                    h2: ({ children }) => {
                      const id = `heading-${children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                      return <h2 id={id} className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4 scroll-mt-24">{children}</h2>;
                    },
                    h3: ({ children }) => {
                      const id = `heading-${children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                      return <h3 id={id} className="text-xl md:text-2xl font-bold text-white mt-6 mb-3 scroll-mt-24">{children}</h3>;
                    },
                  p: ({ children }) => <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>,
                  li: ({ children }) => <li className="ml-4">{children}</li>,
                  img: ({ src, alt, ...props }: any) => (
                    <img
                      src={src}
                      alt={alt || `${post.title} - Image`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto rounded-lg my-6 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                      {...props}
                    />
                  ),
                  code: ({ node, inline, className, children, ...props }: any) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';
                      const codeString = String(children).replace(/\n$/, '');
                      
                      return !inline && match ? (
                        <div className="my-6 rounded-lg overflow-hidden">
                          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                            <span className="text-xs text-gray-400 uppercase">{language}</span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(codeString);
                              }}
                              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                              Copy
                            </button>
                          </div>
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={language}
                            PreTag="div"
                            className="!m-0 !rounded-none"
                            {...props}
                          >
                            {codeString}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code className="px-2 py-1 bg-white/10 rounded text-cyan-400 text-sm" {...props}>
                          {children}
                        </code>
                      );
                    },
                  strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                }}
              >
                {post.content}
              </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <AuthorBio />

          {/* Related Resources */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Related Resources</h2>
            
            {/* Related Tools */}
            {post.tags.some(tag => tag.toLowerCase().includes('saas') || tag.toLowerCase().includes('pricing') || tag.toLowerCase().includes('calculator')) && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <Calculator size={20} className="text-cyan-400" />
                  Related Tools
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/tools/saas-pricing-calculator">
                    <div className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <Calculator className="text-cyan-400" size={24} />
                        <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                          SaaS Pricing Calculator
                        </h4>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Calculate optimal pricing for your SaaS product based on costs and target margins.
                      </p>
                    </div>
                  </Link>
                  <Link href="/tools/tech-stack-recommender">
                    <div className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <Layers className="text-purple-400" size={24} />
                        <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                          Tech Stack Recommender
                        </h4>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Get personalized technology recommendations for your project.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* Related SaaS Products */}
            {post.tags.some(tag => tag.toLowerCase().includes('saas') || tag.toLowerCase().includes('product') || tag.toLowerCase().includes('business')) && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <Layers size={20} className="text-purple-400" />
                  My SaaS Products
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {getAllSaaSProducts().slice(0, 2).map(product => (
                    <Link key={product.id} href={`/saas-tools/${product.slug}`}>
                      <div className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                            {product.name}
                          </h4>
                          <ExternalLink size={16} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                        </div>
                        <p className="text-gray-400 text-sm mb-3">
                          {product.tagline}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.techStack.slice(0, 3).map(tech => (
                            <span key={tech} className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Article Series Navigation */}
            {articleSeries && articleSeries.posts.length > 1 && (
              <div className="mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={20} className="text-cyan-400" />
                  <h3 className="text-xl font-bold text-white">
                    {articleSeries.name} Series
                  </h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  This article is part of a complete guide series. Read all articles to master the topic.
                </p>
                <div className="space-y-2 mb-6">
                  {articleSeries.posts.map((seriesPost, index) => {
                    const isCurrent = seriesPost.id === post.id;
                    return (
                      <div key={seriesPost.id}>
                        {isCurrent ? (
                          <div className="flex items-center gap-3 p-3 bg-cyan-500/20 border border-cyan-500/50 rounded-lg">
                            <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="text-cyan-400 text-xs font-medium mb-1">Current Article</div>
                              <div className="text-white font-semibold">{seriesPost.title}</div>
                            </div>
                          </div>
                        ) : (
                          <Link href={`/blog/${seriesPost.slug}`}>
                            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-cyan-500/50 transition-all cursor-pointer">
                              <div className="flex-shrink-0 w-8 h-8 bg-white/10 text-gray-300 rounded-full flex items-center justify-center font-bold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="text-gray-400 text-xs font-medium mb-1">Part {index + 1}</div>
                                <div className="text-white font-semibold hover:text-cyan-400 transition-colors">{seriesPost.title}</div>
                              </div>
                              <ChevronRight size={20} className="text-gray-400" />
                            </div>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
                {(() => {
                  const currentIndex = articleSeries.posts.findIndex(p => p.id === post.id);
                  const prevPost = currentIndex > 0 ? articleSeries.posts[currentIndex - 1] : null;
                  const nextPost = currentIndex < articleSeries.posts.length - 1 ? articleSeries.posts[currentIndex + 1] : null;
                  return (prevPost || nextPost) && (
                    <div className="flex gap-4 pt-6 border-t border-white/10">
                      {prevPost && (
                        <Link href={`/blog/${prevPost.slug}`} className="flex-1">
                          <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-cyan-500/50 transition-all cursor-pointer">
                            <ChevronLeft size={20} className="text-cyan-400" />
                            <div className="flex-1">
                              <div className="text-gray-400 text-xs mb-1">Previous in Series</div>
                              <div className="text-white font-semibold hover:text-cyan-400 transition-colors">{prevPost.title}</div>
                            </div>
                          </div>
                        </Link>
                      )}
                      {nextPost && (
                        <Link href={`/blog/${nextPost.slug}`} className="flex-1">
                          <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-cyan-500/50 transition-all cursor-pointer">
                            <div className="flex-1 text-right">
                              <div className="text-gray-400 text-xs mb-1">Next in Series</div>
                              <div className="text-white font-semibold hover:text-cyan-400 transition-colors">{nextPost.title}</div>
                            </div>
                            <ChevronRight size={20} className="text-cyan-400" />
                          </div>
                        </Link>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Related SaaS Products */}
            {relatedSaaS.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <Layers size={20} className="text-cyan-400" />
                  Related SaaS Products
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedSaaS.map(product => (
                    <Link key={product.id} href={`/saas-tools/${product.slug}`}>
                      <article className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer h-full">
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                          <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded text-xs font-medium">
                            SaaS Product
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            product.status === 'live' 
                              ? 'bg-green-500/10 text-green-400'
                              : 'bg-yellow-500/10 text-yellow-400'
                          }`}>
                            {product.status === 'live' ? '● Live' : 'Beta'}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {product.description}
                        </p>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* More from this Category */}
            {categoryPosts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <Tag size={20} className="text-cyan-400" />
                  More from {post.category}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {categoryPosts.map(categoryPost => (
                    <Link key={categoryPost.id} href={`/blog/${categoryPost.slug}`}>
                      <article className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer h-full">
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                          <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-medium">
                            {categoryPost.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {categoryPost.readTime} min
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                          {categoryPost.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {categoryPost.excerpt}
                        </p>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <Tag size={20} className="text-cyan-400" />
                  Related Articles
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.slice(0, 3).map(relatedPost => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <article className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer h-full">
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                          <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-medium">
                            {relatedPost.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {relatedPost.readTime} min
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Category Link */}
            <div className="mt-8 text-center">
              <Link href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}>
                <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 hover:border-cyan-500/50 transition-all inline-flex items-center gap-2">
                  <Tag size={18} />
                  <span>View All {post.category} Articles</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <EmailCapturePopup trigger="exit-intent" />
    </div>
  );
}

