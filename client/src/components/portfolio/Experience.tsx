import { useState } from 'react';
import { Briefcase, GraduationCap, Award, Download, FileText, Calendar, MapPin, TrendingUp } from 'lucide-react';
import AnimatedResume from './AnimatedResume';

export default function Experience() {
  const [showResume, setShowResume] = useState(false);
  const experienceItems = [
    {
      title: "IT Manager",
      organization: "The Skyline Strategies",
      period: "1 Year",
      description: "Managed full IT operations including websites, hosting, security, and AI systems. Led development of modern digital tools and handled client projects & technical issues.",
      skills: ["IT Management", "Security", "AI Systems", "Client Management"],
      color: "cyan"
    },
    {
      title: "Website Developer",
      organization: "Computer Support Centre",
      period: "2 Years",
      description: "Developed WordPress/React/Shopify websites. Resolved bugs, speed issues, server errors. Managed client website updates and maintenance.",
      skills: ["WordPress", "React", "Shopify", "Bug Fixing"],
      color: "blue"
    },
    {
      title: "Website Manager",
      organization: "chishtyukimmigrationlaw.info",
      period: "1 Year",
      description: "Managed design, updates, technical fixes & SEO for immigration law website.",
      skills: ["Web Management", "SEO", "Technical Fixes"],
      color: "purple"
    },
    {
      title: "Website Manager",
      organization: "lawbookscentre.com",
      period: "1 Year",
      description: "Improved UI/UX, SEO, and performance for law book eCommerce platform.",
      skills: ["UI/UX", "SEO", "Performance"],
      color: "yellow"
    },
    {
      title: "Online Books Sales Manager",
      organization: "Al Noor Law Book House",
      period: "5 Years",
      description: "Managed online sales, inventory, and customer support for law book business.",
      skills: ["Sales Management", "Inventory", "Customer Support"],
      color: "cyan"
    },
    {
      title: "Online Books Sales Manager",
      organization: "City Law Book House",
      period: "3 Years",
      description: "Managed operations, sales & digital listings for online book sales.",
      skills: ["Operations", "Sales", "Digital Listings"],
      color: "blue"
    }
  ];

  const educationItems = [
    {
      title: "ACCA (Pursuing - Skilled Module)",
      organization: "Association of Chartered Certified Accountants",
      period: "Ongoing",
      description: "Completed 7 exams: FA1, MA1, FA2, MA2, FMA, FFA, FBT. Currently pursuing Skilled Module. Remaining exams: LW, TX, FR, PM, AA, FM, APM, ATX, AFM, AAA, SBL, SBR.",
      color: "cyan"
    },
    {
      title: "IGCSE",
      organization: "Cambridge International",
      period: "Completed",
      description: "Successfully completed IGCSE qualification with strong foundation in core subjects.",
      color: "blue"
    }
  ];

  const accaCertificates = [
    "✅ FA1 - Recording Financial Transactions",
    "✅ MA1 - Management Information",
    "✅ FA2 - Maintaining Financial Records",
    "✅ MA2 - Managing Costs and Finance",
    "✅ FMA - Management Accounting",
    "✅ FFA - Financial Accounting",
    "✅ FBT - Foundations in Business & Technology",
    "⏳ LW, TX, FR, PM, AA, FM (Skilled Level)",
    "⏳ APM, ATX, AFM, AAA (Professional Level)",
    "⏳ SBL, SBR (Strategic Professional)"
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: { text: "text-cyan-400", bg: "bg-cyan-500/5", border: "border-cyan-500/30", dot: "bg-cyan-500" },
      blue: { text: "text-blue-400", bg: "bg-blue-500/5", border: "border-blue-500/30", dot: "bg-blue-500" },
      purple: { text: "text-purple-400", bg: "bg-purple-500/5", border: "border-purple-500/30", dot: "bg-purple-500" },
      yellow: { text: "text-yellow-400", bg: "bg-yellow-500/5", border: "border-yellow-500/30", dot: "bg-yellow-500" }
    };
    return colors[color as keyof typeof colors];
  };

  const handleShowResume = () => {
    setShowResume(true);
  };

  const handleDownloadCV = () => {
    const cvContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Muhammad Anees - Professional CV</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .container { 
            max-width: 900px; 
            margin: 0 auto; 
            background: white; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.3); 
            border-radius: 15px;
            overflow: hidden;
            animation: slideUp 0.8s ease-out;
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 50px 40px; 
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
            animation: shine 3s infinite;
        }
        @keyframes shine {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .header h1 { 
            font-size: 3em; 
            margin-bottom: 10px; 
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            position: relative;
            z-index: 1;
        }
        .header .tagline { 
            font-size: 1.2em; 
            opacity: 0.95;
            position: relative;
            z-index: 1;
        }
        .contact-bar { 
            background: #f8f9fa; 
            padding: 20px 40px; 
            display: flex; 
            justify-content: space-around; 
            flex-wrap: wrap; 
            gap: 15px;
            border-bottom: 3px solid #667eea;
        }
        .contact-item { 
            display: flex; 
            align-items: center; 
            gap: 8px;
            animation: fadeIn 1s ease-in;
            animation-delay: 0.3s;
            animation-fill-mode: both;
        }
        .contact-item:nth-child(2) { animation-delay: 0.5s; }
        .contact-item:nth-child(3) { animation-delay: 0.7s; }
        .icon { 
            color: #667eea; 
            font-weight: bold;
            font-size: 1.1em;
        }
        .content { padding: 40px; }
        .section { 
            margin-bottom: 40px;
            animation: fadeIn 1s ease-in;
            animation-fill-mode: both;
        }
        .section:nth-child(1) { animation-delay: 0.2s; }
        .section:nth-child(2) { animation-delay: 0.4s; }
        .section:nth-child(3) { animation-delay: 0.6s; }
        .section:nth-child(4) { animation-delay: 0.8s; }
        .section-title { 
            font-size: 1.8em; 
            color: #667eea; 
            margin-bottom: 15px; 
            border-bottom: 3px solid #667eea; 
            padding-bottom: 8px;
            position: relative;
        }
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 60px;
            height: 3px;
            background: #764ba2;
            animation: expandWidth 1s ease-out;
        }
        @keyframes expandWidth {
            from { width: 0; }
            to { width: 60px; }
        }
        .summary { 
            font-size: 1.1em; 
            color: #555; 
            line-height: 1.8;
        }
        .skills-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
            gap: 20px; 
        }
        .skill-category { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 10px; 
            border-left: 4px solid #667eea;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .skill-category:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        .skill-category h4 { 
            color: #667eea; 
            margin-bottom: 10px; 
            font-size: 1.2em;
        }
        .skill-list { 
            list-style: none; 
        }
        .skill-list li { 
            padding: 5px 0; 
            color: #666;
            position: relative;
            padding-left: 15px;
        }
        .skill-list li::before {
            content: '▸';
            position: absolute;
            left: 0;
            color: #764ba2;
        }
        .experience-item, .education-item { 
            background: #f8f9fa; 
            padding: 25px; 
            margin-bottom: 20px; 
            border-radius: 10px; 
            border-left: 4px solid #764ba2;
            transition: transform 0.3s;
        }
        .experience-item:hover, .education-item:hover {
            transform: translateX(10px);
        }
        .experience-item h4, .education-item h4 { 
            color: #667eea; 
            font-size: 1.3em; 
            margin-bottom: 5px;
        }
        .organization { 
            color: #764ba2; 
            font-weight: bold; 
            margin-bottom: 5px;
        }
        .period { 
            color: #999; 
            font-size: 0.9em; 
            margin-bottom: 10px;
        }
        .footer { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            text-align: center; 
            padding: 30px; 
            font-size: 0.9em;
        }
        @media (max-width: 768px) {
            body { padding: 20px 10px; }
            .container { max-width: 100%; border-radius: 10px; }
            .header { padding: 30px 20px; }
            .header h1 { font-size: 1.8em; }
            .header .tagline { font-size: 0.9em; }
            .contact-bar { padding: 15px 20px; flex-direction: column; align-items: center; gap: 10px; }
            .contact-item { font-size: 0.9em; }
            .content { padding: 20px 15px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 1.4em; }
            .summary { font-size: 0.95em; line-height: 1.6; }
            .skills-grid { grid-template-columns: 1fr; gap: 15px; }
            .skill-category { padding: 15px; }
            .skill-category h4 { font-size: 1.1em; }
            .experience-item, .education-item { padding: 18px 15px; margin-bottom: 15px; }
            .experience-item h4, .education-item h4 { font-size: 1.1em; }
        }
        @media print {
            body { background: white; padding: 0; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MUHAMMAD ANEES</h1>
            <p class="tagline">IT & Web Development Specialist | SEO & Digital Marketing Expert | Accounting & Financial Systems Professional</p>
        </div>
        
        <div class="contact-bar">
            <div class="contact-item">
                <span class="icon">✉</span>
                <span>anees05it@gmail.com</span>
            </div>
            <div class="contact-item">
                <span class="icon">📱</span>
                <span>+92 343 3523057</span>
            </div>
            <div class="contact-item">
                <span class="icon">📍</span>
                <span>Pakistan</span>
            </div>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">Professional Summary</h2>
                <p class="summary">
                    Versatile professional with 6+ years of experience bridging technology, business, and finance. Expert SaaS developer who built <strong>CompanyHub</strong> and <strong>ExpenseFlow</strong> - two production-ready SaaS products. Specialized in building scalable web applications with React, Next.js, TypeScript, and modern tech stacks. Published 20+ comprehensive blog articles on SaaS development, web technologies, and digital marketing. Expert in building modern websites (WordPress, Shopify, React, Next.js), driving digital marketing campaigns (SEO, paid ads, social media), managing IT operations & cybersecurity, and applying accounting principles through ACCA training. Proven track record in delivering 20+ websites, 100+ marketing campaigns, AI-powered chatbots, and production SaaS products. Seeking opportunities to leverage technical expertise and business acumen to solve complex challenges.
                </p>
            </div>
            
            <div class="section">
                <h2 class="section-title">Core Competencies</h2>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h4>🚀 SaaS Development</h4>
                        <ul class="skill-list">
                            <li>SaaS Product Development (CompanyHub, ExpenseFlow)</li>
                            <li>React & Next.js Production Apps</li>
                            <li>TypeScript & Modern JavaScript</li>
                            <li>API Design & RESTful Services</li>
                            <li>Database Design (PostgreSQL, MongoDB)</li>
                            <li>Microservices Architecture</li>
                            <li>Cloud Deployment (Vercel, AWS)</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>💻 Website Development</h4>
                        <ul class="skill-list">
                            <li>WordPress & WooCommerce</li>
                            <li>React & Next.js</li>
                            <li>MERN Stack</li>
                            <li>Three.js & Animations</li>
                            <li>E-commerce Solutions</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>📝 Content Creation & SEO</h4>
                        <ul class="skill-list">
                            <li>Technical Blog Writing (20+ Articles)</li>
                            <li>SaaS Development Guides</li>
                            <li>SEO-Optimized Content</li>
                            <li>Content Strategy</li>
                            <li>Technical Documentation</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>📱 Digital Marketing</h4>
                        <ul class="skill-list">
                            <li>Social Media Ads</li>
                            <li>Content Strategy</li>
                            <li>Analytics & Reporting</li>
                            <li>Video Editing</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>🔍 SEO Optimization</h4>
                        <ul class="skill-list">
                            <li>On-Page SEO (95%)</li>
                            <li>Technical SEO (92%)</li>
                            <li>Off-Page SEO (90%)</li>
                            <li>Keyword Research (93%)</li>
                            <li>Local SEO (88%)</li>
                            <li>SEO Analytics (94%)</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>🛡️ IT & Cybersecurity</h4>
                        <ul class="skill-list">
                            <li>IT Management</li>
                            <li>Network Security</li>
                            <li>AI Chatbots</li>
                            <li>System Administration</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>📊 Accounting & Business</h4>
                        <ul class="skill-list">
                            <li>ACCA (7 exams)</li>
                            <li>Bookkeeping</li>
                            <li>Financial Systems</li>
                            <li>Excel & Reporting</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Professional Experience</h2>
                
                <div class="experience-item">
                    <h4>IT Manager</h4>
                    <p class="organization">The Skyline Strategies</p>
                    <p class="period">1 Year</p>
                    <p>Managed full IT operations including websites, hosting, security, and AI systems. Led development of modern digital tools and handled client projects & technical issues.</p>
                </div>
                
                <div class="experience-item">
                    <h4>Website Developer</h4>
                    <p class="organization">Computer Support Centre</p>
                    <p class="period">2 Years</p>
                    <p>Developed WordPress/React/Shopify websites. Resolved bugs, speed issues, server errors. Managed client website updates and maintenance.</p>
                </div>
                
                <div class="experience-item">
                    <h4>Website Manager</h4>
                    <p class="organization">chishtyukimmigrationlaw.info</p>
                    <p class="period">1 Year</p>
                    <p>Managed design, updates, technical fixes & SEO for immigration law website.</p>
                </div>
                
                <div class="experience-item">
                    <h4>Website Manager</h4>
                    <p class="organization">lawbookscentre.com</p>
                    <p class="period">1 Year</p>
                    <p>Improved UI/UX, SEO, and performance for law book eCommerce platform.</p>
                </div>
                
                <div class="experience-item">
                    <h4>Online Books Sales Manager</h4>
                    <p class="organization">Al Noor Law Book House</p>
                    <p class="period">5 Years</p>
                    <p>Managed online sales, inventory, and customer support for law book business.</p>
                </div>
                
                <div class="experience-item">
                    <h4>Online Books Sales Manager</h4>
                    <p class="organization">City Law Book House</p>
                    <p class="period">3 Years</p>
                    <p>Managed operations, sales & digital listings for online book sales.</p>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Education & Certifications</h2>
                
                <div class="education-item">
                    <h4>ACCA (Pursuing - Skilled Module)</h4>
                    <p class="organization">Association of Chartered Certified Accountants</p>
                    <p class="period">Ongoing</p>
                    <p>Completed 7 exams: FA1, MA1, FA2, MA2, FMA, FFA, FBT. Currently pursuing Skilled Module with focus on advanced financial and management accounting.</p>
                </div>
                
                <div class="education-item">
                    <h4>IGCSE</h4>
                    <p class="organization">Cambridge International</p>
                    <p class="period">Completed</p>
                    <p>Successfully completed IGCSE qualification with strong foundation in core subjects.</p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Muhammad Anees</strong> - Multi-Disciplinary Professional</p>
            <p>© 2025 | Available for Freelance & Consulting Projects</p>
        </div>
    </div>
</body>
</html>
`;

    const blob = new Blob([cvContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Muhammad_Anees_Professional_CV.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="experience" className="py-24 px-3 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cyan-500/5"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="section-fade">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-4 md:mb-6">
              <Briefcase size={16} />
              <span>Career Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-cyan-400">
            Experience & Education
          </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              A decade of diverse experience across technology, business, and finance
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-12 md:mb-16">
            <div className="card-modern p-3 md:p-6 text-center bg-cyan-500/5 border border-cyan-500/30">
              <TrendingUp className="text-cyan-400 mx-auto mb-2" size={28} />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">6+</div>
              <div className="text-xs md:text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="card-modern p-4 md:p-6 text-center bg-blue-500/5 border border-blue-500/30">
              <Award className="text-blue-400 mx-auto mb-2" size={28} />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">20+</div>
              <div className="text-xs md:text-sm text-gray-400">Websites Built</div>
            </div>
            <div className="card-modern p-4 md:p-6 text-center bg-purple-500/5 border border-purple-500/30">
              <Briefcase className="text-purple-400 mx-auto mb-2" size={28} />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">6</div>
              <div className="text-xs md:text-sm text-gray-400">Job Positions</div>
            </div>
            <div className="card-modern p-4 md:p-6 text-center bg-yellow-500/5 border border-yellow-500/30">
              <GraduationCap className="text-yellow-400 mx-auto mb-2" size={28} />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">7</div>
              <div className="text-xs md:text-sm text-gray-400">ACCA Exams</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 md:gap-12 mb-8 md:mb-12">
            {/* Experience Cards */}
            <div>
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="p-2 md:p-3 bg-cyan-500/20 rounded-xl">
                  <Briefcase className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Work Experience</h3>
              </div>
              
              <div className="space-y-4">
              {experienceItems.map((item, index) => {
                  const colors = getColorClasses(item.color);
                return (
                    <div key={index} className={`card-modern p-4 md:p-6 ${colors.bg} border ${colors.border} hover:scale-105 transition-transform`}>
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2">
                      <div>
                          <h4 className="text-lg md:text-xl font-bold text-white mb-1">{item.title}</h4>
                          <p className={`font-medium ${colors.text} text-sm md:text-base`}>{item.organization}</p>
                      </div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm flex-shrink-0">
                          <Calendar size={14} />
                        <span>{item.period}</span>
                      </div>
                    </div>
                      <p className="text-gray-300 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed">{item.description}</p>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {item.skills.map((skill) => (
                        <span
                            key={skill}
                            className={`px-2 md:px-3 py-0.5 md:py-1 ${colors.bg} border ${colors.border} ${colors.text} rounded-lg text-xs font-medium`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
            
            {/* Education & Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <GraduationCap className="text-purple-400" size={28} />
                </div>
                <h3 className="text-3xl font-bold text-white">Education</h3>
              </div>
              
              <div className="space-y-6">
              {educationItems.map((item, index) => {
                  const colors = getColorClasses(item.color);
                return (
                    <div key={index} className={`card-modern p-6 ${colors.bg} border ${colors.border} hover:scale-105 transition-transform`}>
                      <div className="flex items-start justify-between mb-3">
                      <div>
                          <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                          <p className={`font-medium ${colors.text}`}>{item.organization}</p>
                      </div>
                        <span className="text-gray-400 text-sm">{item.period}</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
              </div>
              
              {/* ACCA Certificates */}
              <div className="card-modern p-8 bg-yellow-500/5 border border-yellow-500/30 mt-6">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="text-yellow-400" size={28} />
                  <h3 className="text-2xl font-bold text-yellow-400">ACCA Qualifications</h3>
                </div>
                <div className="grid gap-3">
                  {accaCertificates.map((cert, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <span className="text-gray-300 text-sm">{cert}</span>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CV Download Card - Full Width */}
          <div className="card-modern p-8 text-center border border-cyan-500/30 bg-cyan-500/5">
            <FileText className="text-cyan-400 mx-auto mb-4" size={48} />
            <h4 className="text-2xl font-bold text-white mb-3">Download My CV</h4>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Get my beautifully designed, dark-themed animated CV with all my experience, skills, and qualifications.
            </p>
            <button
              onClick={handleShowResume}
              className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition-all hover:scale-105 shadow-lg text-sm md:text-base whitespace-nowrap"
            >
              <Download size={18} className="md:w-5 md:h-5" />
              <span>Download CV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Animated Resume Modal */}
      {showResume && <AnimatedResume onClose={() => setShowResume(false)} />}
    </section>
  );
}
