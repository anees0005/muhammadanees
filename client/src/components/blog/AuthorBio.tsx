import { Github, Linkedin, Mail } from "lucide-react";

export default function AuthorBio() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 mt-12">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl md:text-3xl font-bold text-white">
            MA
          </div>
        </div>

        {/* Bio Content */}
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            Muhammad Anees
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Full-stack developer and SaaS specialist with 6+ years of experience building scalable web applications, 
            AI automation solutions, and business software. Creator of <strong className="text-white">CompanyHub</strong> and <strong className="text-white">ExpenseFlow</strong>. 
            Expert in React, Next.js, TypeScript, and modern web technologies.
          </p>
          
          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs font-medium">
              SaaS Development
            </span>
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-xs font-medium">
              Full-Stack
            </span>
            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-xs font-medium">
              AI Automation
            </span>
            <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full text-xs font-medium">
              Digital Marketing
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/anees0005"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Github size={18} />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-anees-37932a356"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={18} />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href="mailto:anees05it@gmail.com"
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Mail size={18} />
              <span className="text-sm">Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

