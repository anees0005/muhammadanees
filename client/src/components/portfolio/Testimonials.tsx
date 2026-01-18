import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  project?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Shahzaib Chishty",
    role: "Owner",
    company: "Novels Yard",
    content: "Muhammad Anees built our e-commerce website for Novels Yard and delivered exceptional results. The website is fast, user-friendly, and has significantly improved our online book sales. His attention to detail and professionalism throughout the project was outstanding.",
    rating: 5,
    project: "Novels Yard Website"
  },
  {
    name: "Dr. Akmal Chaudhary",
    role: "Founder",
    company: "Este Aesthetics",
    content: "Working with Muhammad Anees on our Este Aesthetics website was a great experience. He created a modern, responsive React website that perfectly represents our brand. The booking system integration works flawlessly, and our patients love the user experience.",
    rating: 5,
    project: "Este Aesthetics Website"
  },
  {
    name: "Hassan Subhani Chishty",
    role: "Owner",
    company: "Chishty UK Immigration Law and Visa Advisor",
    content: "Muhammad Anees developed our professional immigration law website with React. The site is modern, fast, and helps us effectively communicate our services to clients. His technical expertise and understanding of our business needs made the entire process smooth.",
    rating: 5,
    project: "Chishty UK Immigration Law Website"
  },
  {
    name: "Haider Subhani Chishty",
    role: "Owner",
    company: "The Law Books Centre",
    content: "Muhammad Anees built our e-commerce platform for The Law Books Centre. The website handles our inventory beautifully and provides an excellent shopping experience for our customers. Sales have increased since the launch, and we're very satisfied with the results.",
    rating: 5,
    project: "Law Books Centre Website"
  },
  {
    name: "Mujtaba Ahmed",
    role: "Owner",
    company: "Mujtaba Ahmed Portfolio",
    content: "Muhammad Anees created my professional portfolio website using React. The design is modern, the performance is excellent, and it perfectly showcases my work. I've received many compliments on the website's design and functionality.",
    rating: 5,
    project: "Mujtaba Ahmed Portfolio"
  },
  {
    name: "Adeel Chaudhary",
    role: "Owner",
    company: "Mstar Cleaning",
    content: "Muhammad Anees developed our WordPress website for Mstar Cleaning. The site is professional, mobile-friendly, and has helped us attract more customers. The booking and contact features work perfectly, and we're very happy with the results.",
    rating: 5,
    project: "Mstar Cleaning Website"
  },
  {
    name: "Muhammad Safeer",
    role: "Owner",
    company: "ACE Cleaning",
    content: "Muhammad Anees built our ACE Cleaning website with React, and we're extremely satisfied. The website is fast, professional, and has improved our online presence significantly. The service booking system works great, and we've seen an increase in inquiries.",
    rating: 5,
    project: "ACE Cleaning Website"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-3 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="section-fade">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <Star size={16} className="fill-cyan-400" />
              <span>Client Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              What Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Say</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real feedback from clients who have worked with me on SaaS development, web applications, and digital marketing projects
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 hover:border-cyan-500/50 transition-all flex flex-col"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote size={32} className="text-cyan-400/50" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                  "{testimonial.content}"
                </p>

                {/* Project Badge */}
                {testimonial.project && (
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/30">
                      {testimonial.project}
                    </span>
                  </div>
                )}

                {/* Author */}
                <div className="border-t border-white/10 pt-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Schema Markup for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "itemListElement": testimonials.map((testimonial, index) => ({
                  "@type": "Review",
                  "position": index + 1,
                  "author": {
                    "@type": "Person",
                    "name": testimonial.name
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": testimonial.rating,
                    "bestRating": 5
                  },
                  "reviewBody": testimonial.content
                }))
              })
            }}
          />
        </div>
      </div>
    </section>
  );
}

