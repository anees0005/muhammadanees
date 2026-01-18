import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [
    { label: "Home", href: "/" },
    ...items
  ];

  return (
    <nav className="mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={16} className="text-gray-500" />}
            {item.href && index < allItems.length - 1 ? (
              <Link href={item.href} className="hover:text-cyan-400 transition-colors">
                {index === 0 ? (
                  <span className="flex items-center gap-1">
                    <Home size={14} />
                    <span>{item.label}</span>
                  </span>
                ) : (
                  <span>{item.label}</span>
                )}
              </Link>
            ) : (
              <span className={index === allItems.length - 1 ? "text-white font-medium" : ""}>
                {index === 0 ? (
                  <span className="flex items-center gap-1">
                    <Home size={14} />
                    <span>{item.label}</span>
                  </span>
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
            )}
          </li>
        ))}
      </ol>
      
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": allItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label,
              "item": item.href ? `https://anees0005.github.io/muhammadanees${item.href}` : undefined
            }))
          })
        }}
      />
    </nav>
  );
}

