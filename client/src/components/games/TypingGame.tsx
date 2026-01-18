import { useState, useEffect, useCallback } from 'react';
import { Code, Zap, Target, Trophy, Timer, Brain } from 'lucide-react';

export default function TypingGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [currentCode, setCurrentCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [completedSnippets, setCompletedSnippets] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const codeSnippets = {
    easy: [
      'const name = "Muhammad";',
      'let age = 25;',
      'const isActive = true;',
      'function hello() { }',
      'const arr = [1, 2, 3];',
      'return "Hello World";',
    ],
    medium: [
      'const portfolio = { skills: "JavaScript" };',
      'function createWebsite() { return "Amazing"; }',
      'import React from "react";',
      'const developer = new FullStackDeveloper();',
      'async function deployApp() { await build(); }',
    ],
    hard: [
      'const memoizedCallback = useCallback(() => { handleClick(a); }, [a]);',
      'const { data, error } = useSWR("/api/user", fetcher);',
      'app.use(express.json()); app.listen(3000);',
      'try { await Promise.all(promises); } catch (e) { handleError(e); }',
    ]
  };

  const startGame = useCallback(() => {
    setGameState('playing');
    const snippets = codeSnippets[difficulty];
    setCurrentCode(snippets[Math.floor(Math.random() * snippets.length)]);
    setUserInput('');
    setTimeLeft(60);
    setScore(0);
    setWpm(0);
    setAccuracy(100);
    setCompletedSnippets(0);
  }, [difficulty]);

  const resetGame = useCallback(() => {
    setGameState('idle');
    setUserInput('');
    setScore(0);
    setWpm(0);
    setAccuracy(100);
    setCompletedSnippets(0);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (gameState === 'playing') {
      const correctChars = userInput.split('').filter((char, index) => 
        char === currentCode[index]
      ).length;
      
      const newAccuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;
      setAccuracy(newAccuracy);
      
      const wordsTyped = userInput.length / 5;
      const timeElapsed = (60 - timeLeft) / 60;
      const newWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
      setWpm(newWpm);
      
      const baseScore = correctChars * 10;
      const accuracyBonus = newAccuracy > 90 ? correctChars * 5 : 0;
      setScore(baseScore + accuracyBonus);

      if (userInput === currentCode) {
        setScore(prev => prev + 200);
        setCompletedSnippets(prev => prev + 1);
        
        setTimeout(() => {
          const snippets = codeSnippets[difficulty];
          setCurrentCode(snippets[Math.floor(Math.random() * snippets.length)]);
          setUserInput('');
        }, 500);
      }
    }
  }, [userInput, currentCode, gameState, timeLeft, difficulty]);

  const renderCodeWithHighlight = () => {
    return currentCode.split('').map((char, index) => {
      let className = 'transition-colors duration-150';
      
      if (index < userInput.length) {
        className += userInput[index] === char 
          ? ' text-cyan-300 bg-cyan-900/30' 
          : ' text-red-400 bg-red-900/30';
      } else if (index === userInput.length) {
        className += ' bg-white/30 text-black';
      } else {
        className += ' text-gray-500';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="relative max-h-[90vh] overflow-y-auto">
      <div className="relative card-modern p-4 sm:p-6 md:p-8 rounded-xl max-w-5xl mx-auto border border-cyan-500/20">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <Code className="text-cyan-400" size={24} />
            <span>Developer Typing Challenge</span>
          </h3>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">Test your coding speed!</p>
        </div>

        {gameState === 'idle' && (
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto mb-6 sm:mb-8">
              {(['easy', 'medium', 'hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`p-2 sm:p-3 md:p-4 rounded-lg border-2 transition-all ${
                    difficulty === diff 
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300' 
                      : 'border-gray-600 hover:border-gray-400 text-gray-400'
                  }`}
                >
                  <div className="font-semibold capitalize text-sm sm:text-base">{diff}</div>
                </button>
              ))}
            </div>
            <button 
              onClick={startGame}
              className="bg-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-cyan-600 transition-all hover:scale-105 shadow-lg text-base sm:text-lg"
            >
              🚀 Start Challenge
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
              <div className="card-modern p-2 sm:p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-center gap-1 sm:gap-2 text-cyan-400 mb-1">
                  <Timer size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Time</span>
                </div>
                <div className="text-base sm:text-xl font-bold">{timeLeft}s</div>
              </div>
              <div className="card-modern p-2 sm:p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-center gap-1 sm:gap-2 text-blue-400 mb-1">
                  <Target size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">WPM</span>
                </div>
                <div className="text-base sm:text-xl font-bold">{wpm}</div>
              </div>
              <div className="card-modern p-2 sm:p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-center gap-1 sm:gap-2 text-purple-400 mb-1">
                  <Zap size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Accuracy</span>
                </div>
                <div className="text-base sm:text-xl font-bold">{accuracy}%</div>
              </div>
              <div className="card-modern p-2 sm:p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-center gap-1 sm:gap-2 text-cyan-400 mb-1">
                  <Trophy size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Score</span>
                </div>
                <div className="text-base sm:text-xl font-bold">{score}</div>
              </div>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur p-3 sm:p-4 md:p-6 rounded-lg border border-cyan-500/20 overflow-x-auto">
              <div className="font-mono text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap break-words">
                {renderCodeWithHighlight()}
              </div>
            </div>
            
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full bg-gray-800/80 backdrop-blur text-white p-3 sm:p-4 rounded-lg font-mono text-sm sm:text-base md:text-lg 
                         border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 
                         focus:border-transparent transition-all"
              placeholder="Start typing..."
              autoFocus
            />
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="mb-6 sm:mb-8">
              <Brain className="text-cyan-400 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
              <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2">Challenge Complete!</h4>
              <p className="text-gray-400 text-sm sm:text-base">Great job on completing the typing challenge!</p>
                </div>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="card-modern p-3 sm:p-4 rounded-lg border border-cyan-500/20 bg-white/5">
                <div className="text-cyan-400 font-medium mb-1 sm:mb-2 text-xs sm:text-sm">WPM</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{wpm}</div>
              </div>
              <div className="card-modern p-3 sm:p-4 rounded-lg border border-purple-500/20 bg-white/5">
                <div className="text-purple-400 font-medium mb-1 sm:mb-2 text-xs sm:text-sm">Accuracy</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{accuracy}%</div>
              </div>
              <div className="card-modern p-3 sm:p-4 rounded-lg border border-blue-500/20 bg-white/5">
                <div className="text-blue-400 font-medium mb-1 sm:mb-2 text-xs sm:text-sm">Score</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{score}</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                onClick={startGame}
                className="bg-cyan-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-all hover:scale-105 text-sm sm:text-base"
              >
                🚀 Play Again
              </button>
              <button 
                onClick={resetGame}
                className="border border-white/20 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white/10 transition-all text-sm sm:text-base"
              >
                Close Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
