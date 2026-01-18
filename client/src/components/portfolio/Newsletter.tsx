import { useState } from "react";
import { Mail, CheckCircle2, Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Here you would integrate with your email service (Mailchimp, ConvertKit, etc.)
    // For now, we'll just show success message
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubmitted(true);
      setEmail("");
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-16 px-3 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
              <Mail size={32} className="text-cyan-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Stay Updated with Latest Insights
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get weekly updates on SaaS development, web technologies, AI automation, and digital marketing strategies. 
              No spam, unsubscribe anytime.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                <CheckCircle2 size={32} className="text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-400">
                You've been successfully subscribed. Check your email for confirmation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Send size={18} />
                  <span>Subscribe</span>
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
              )}
              <p className="text-gray-500 text-xs mt-3 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

