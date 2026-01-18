import { useState, useEffect } from "react";
import { X, Mail, Send, CheckCircle2 } from "lucide-react";

interface EmailCapturePopupProps {
  trigger?: 'exit-intent' | 'scroll' | 'time';
  delay?: number; // For time-based trigger (seconds)
  scrollPercent?: number; // For scroll trigger (0-100)
}

export default function EmailCapturePopup({ 
  trigger = 'exit-intent', 
  delay = 30,
  scrollPercent = 60 
}: EmailCapturePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [hasShown, setHasShown] = useState(false);

  // Check if user has already seen the popup (localStorage)
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('email-popup-seen');
    if (hasSeenPopup === 'true') {
      setHasShown(true);
    }
  }, []);

  // Exit intent detection
  useEffect(() => {
    if (trigger !== 'exit-intent' || hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isOpen && !hasShown) {
        setIsOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [trigger, isOpen, hasShown]);

  // Scroll-based trigger
  useEffect(() => {
    if (trigger !== 'scroll' || hasShown) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;

      if (scrollPercentage >= scrollPercent && !isOpen && !hasShown) {
        setIsOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trigger, scrollPercent, isOpen, hasShown]);

  // Time-based trigger
  useEffect(() => {
    if (trigger !== 'time' || hasShown) return;

    const timer = setTimeout(() => {
      if (!isOpen && !hasShown) {
        setIsOpen(true);
      }
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [trigger, delay, isOpen, hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      // Here you would integrate with your email service (Mailchimp, ConvertKit, etc.)
      // For now, we'll just show success message
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubmitted(true);
      setEmail("");
      localStorage.setItem('email-popup-seen', 'true');
      
      // Close after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        setHasShown(true);
      }, 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setHasShown(true);
    localStorage.setItem('email-popup-seen', 'true');
  };

  if (!isOpen || hasShown) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-[hsl(var(--dark-bg))] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
              <CheckCircle2 size={32} className="text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
            <p className="text-gray-400">
              You've been successfully subscribed. Check your email for confirmation.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
                <Mail size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Updated!
              </h3>
              <p className="text-gray-400">
                Get the latest articles, tools, and SaaS development insights delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                  required
                  autoFocus
                />
                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all inline-flex items-center justify-center gap-2"
              >
                <Send size={18} />
                <span>Subscribe</span>
              </button>
              <p className="text-gray-500 text-xs text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

