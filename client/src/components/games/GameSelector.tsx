import { useState } from 'react';
import { Code, Calculator, Shield, BookOpen, X } from 'lucide-react';
import TypingGame from './TypingGame';
import AccountingGame from './AccountingGame';
import CybersecurityGame from './CybersecurityGame';
import HackingAdventure from './HackingAdventure';

export default function GameSelector({ onClose }: { onClose: () => void }) {
  const [selectedGame, setSelectedGame] = useState<'typing' | 'accounting' | 'cybersecurity' | 'adventure' | null>(null);

  if (selectedGame) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div className="relative max-w-5xl w-full my-4 sm:my-8">
          <button 
            onClick={() => setSelectedGame(null)}
            className="fixed top-2 right-2 sm:absolute sm:-top-12 sm:right-0 bg-black/80 sm:bg-transparent p-2 sm:p-0 rounded-full text-white hover:text-cyan-400 text-xl sm:text-2xl transition-colors z-50"
          >
            <X size={28} className="sm:w-8 sm:h-8" />
          </button>
          {selectedGame === 'typing' ? <TypingGame /> : 
           selectedGame === 'accounting' ? <AccountingGame /> : 
           selectedGame === 'cybersecurity' ? <CybersecurityGame /> : 
           <HackingAdventure />}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative max-w-4xl w-full my-4 sm:my-8">
        <button 
          onClick={onClose}
          className="fixed top-2 right-2 sm:absolute sm:-top-12 sm:right-0 bg-black/80 sm:bg-transparent p-2 sm:p-0 rounded-full text-white hover:text-cyan-400 text-xl sm:text-2xl transition-colors z-50"
        >
          <X size={28} className="sm:w-8 sm:h-8" />
        </button>
        
        <div className="glass-effect p-4 sm:p-6 md:p-8 rounded-xl border border-cyan-500/20">
          <div className="text-center mb-6 sm:mb-8 mt-8 sm:mt-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Choose Your Game</h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg">Test your skills or explore interactive scenarios!</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Typing Game Card */}
            <button
              onClick={() => setSelectedGame('typing')}
              className="group card-modern p-4 sm:p-6 md:p-8 bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-400/5 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-3 sm:p-4 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-all flex-shrink-0">
                  <Code className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Typing Challenge</h3>
              </div>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Test your coding speed and accuracy. Type code snippets as fast as you can!
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 sm:px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                  Speed Test
                </span>
                <span className="px-2 sm:px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                  3 Difficulties
                </span>
                <span className="px-2 sm:px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                  WPM Tracker
                </span>
              </div>
            </button>

            {/* Accounting Game Card */}
            <button
              onClick={() => setSelectedGame('accounting')}
              className="group card-modern p-4 sm:p-6 md:p-8 bg-white/5 border border-white/10 hover:border-purple-400 hover:bg-purple-400/5 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-3 sm:p-4 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-all flex-shrink-0">
                  <Calculator className="text-purple-400" size={24} />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">ACCA Quiz</h3>
              </div>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Challenge your accounting knowledge. Answer ACCA-level questions!
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 sm:px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                  ACCA Topics
                </span>
                <span className="px-2 sm:px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                  Timed Quiz
                </span>
                <span className="px-2 sm:px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                  Score Tracking
                </span>
              </div>
            </button>

            {/* Cybersecurity Game Card */}
            <button
              onClick={() => setSelectedGame('cybersecurity')}
              className="group card-modern p-4 sm:p-6 md:p-8 bg-white/5 border border-white/10 hover:border-green-400 hover:bg-green-400/5 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-3 sm:p-4 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-all flex-shrink-0">
                  <Shield className="text-green-400" size={24} />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Security Challenge</h3>
              </div>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Test your cybersecurity knowledge. Learn about threats, encryption, and security!
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 sm:px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                  Security Topics
                </span>
                <span className="px-2 sm:px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                  Timed Quiz
                </span>
                <span className="px-2 sm:px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                  50+ Questions
                </span>
              </div>
            </button>

            {/* Hacking Adventure Card */}
            <button
              onClick={() => setSelectedGame('adventure')}
              className="group card-modern p-4 sm:p-6 md:p-8 bg-white/5 border border-white/10 hover:border-orange-400 hover:bg-orange-400/5 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-3 sm:p-4 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-all flex-shrink-0">
                  <BookOpen className="text-orange-400" size={24} />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Hacking Adventure</h3>
              </div>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Interactive story scenarios where your choices matter. Navigate real-world cybersecurity situations!
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 sm:px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                  Interactive Story
                </span>
                <span className="px-2 sm:px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                  Choices Matter
                </span>
                <span className="px-2 sm:px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                  3 Scenarios
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

