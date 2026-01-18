import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, CheckCircle, XCircle, Trophy, Timer, Brain } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function AccountingGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);

  // Massive question bank - 50+ questions
  const allQuestions: Question[] = [
    // Basic Accounting
    { question: "What is the accounting equation?", options: ["Assets = Liabilities + Equity", "Revenue - Expenses = Profit", "Debit = Credit", "Assets = Revenue"], correct: 0, explanation: "The fundamental accounting equation is Assets = Liabilities + Owner's Equity" },
    { question: "Which side increases an asset?", options: ["Credit", "Debit", "Both", "Neither"], correct: 1, explanation: "Assets increase on the debit side" },
    { question: "What is a liability?", options: ["Money owed to business", "Money business owes", "Business assets", "Owner's investment"], correct: 1, explanation: "A liability is money the business owes to others" },
    { question: "Which is a current asset?", options: ["Building", "Cash", "Patent", "Goodwill"], correct: 1, explanation: "Cash is a current asset" },
    { question: "What does ACCA stand for?", options: ["American Certified Accountant", "Association of Chartered Certified Accountants", "Academy of Corporate Accountants", "Association of Cost Accountants"], correct: 1, explanation: "ACCA is the Association of Chartered Certified Accountants" },
    
    // Depreciation & Assets
    { question: "What is depreciation?", options: ["Increase in value", "Systematic cost allocation", "Loss of cash", "Gain on sale"], correct: 1, explanation: "Depreciation allocates asset cost over useful life" },
    { question: "Straight-line depreciation formula?", options: ["(Cost - Residual) / Years", "Cost / 2", "Cost × Rate", "Cost - Years"], correct: 0, explanation: "Straight-line = (Cost - Residual Value) / Useful Life" },
    { question: "Which method values inventory at recent cost?", options: ["FIFO", "LIFO", "Weighted Average", "Specific ID"], correct: 1, explanation: "LIFO (Last In, First Out) uses most recent costs" },
    
    // Double Entry & Principles
    { question: "What is double-entry principle?", options: ["Two accounts", "Debit = Credit", "Both A and B", "Neither"], correct: 2, explanation: "Double-entry means every transaction affects two accounts with equal debits and credits" },
    { question: "What is working capital?", options: ["Total Assets", "Current Assets - Current Liabilities", "Total Equity", "Revenue - Expenses"], correct: 1, explanation: "Working capital = Current Assets - Current Liabilities" },
    { question: "Which ratio measures liquidity?", options: ["Debt-to-Equity", "Current Ratio", "ROA", "Profit Margin"], correct: 1, explanation: "Current Ratio measures liquidity" },
    
    // Advanced Topics
    { question: "What is the matching principle?", options: ["Match revenues with period", "Match expenses with revenues", "Match assets with liabilities", "Match debits with credits"], correct: 1, explanation: "Matching principle requires expenses matched with revenues they generate" },
    { question: "Calculate goodwill: Price $500k, Fair Value $350k", options: ["$150k", "$850k", "$500k", "$350k"], correct: 0, explanation: "Goodwill = Purchase Price - Fair Value = $500k - $350k = $150k" },
    { question: "What is NOT in comprehensive income?", options: ["Net Income", "Foreign currency translation", "Dividends paid", "Unrealized gains"], correct: 2, explanation: "Dividends are equity distributions, not income" },
    
    // Financial Statements
    { question: "Which shows financial position?", options: ["Income Statement", "Balance Sheet", "Cash Flow", "Equity Statement"], correct: 1, explanation: "Balance Sheet shows financial position at a point in time" },
    { question: "What is gross profit?", options: ["Revenue - All Expenses", "Revenue - COGS", "Net Income", "Operating Profit"], correct: 1, explanation: "Gross Profit = Revenue - Cost of Goods Sold" },
    { question: "Operating expenses include?", options: ["COGS", "Salaries & Rent", "Interest", "Tax"], correct: 1, explanation: "Operating expenses are day-to-day business costs like salaries and rent" },
    
    // Ratios & Analysis
    { question: "Debt-to-Equity ratio shows?", options: ["Liquidity", "Financial leverage", "Profitability", "Efficiency"], correct: 1, explanation: "Debt-to-Equity shows financial leverage/risk" },
    { question: "ROA stands for?", options: ["Return on Assets", "Rate of Appreciation", "Ratio of Accounts", "Revenue on Assets"], correct: 0, explanation: "ROA = Return on Assets" },
    { question: "Quick ratio excludes?", options: ["Cash", "Receivables", "Inventory", "Payables"], correct: 2, explanation: "Quick ratio excludes inventory as it's less liquid" },
    
    // Accounting Standards
    { question: "What is IAS?", options: ["International Accounting Standards", "Internal Audit System", "Income Assessment Standard", "Investment Analysis Standard"], correct: 0, explanation: "IAS = International Accounting Standards" },
    { question: "IFRS stands for?", options: ["International Financial Reporting Standards", "Internal Finance Reporting System", "International Fiscal Regulation Standards", "Income & Financial Recording Standards"], correct: 0, explanation: "IFRS = International Financial Reporting Standards" },
    
    // Cost Accounting
    { question: "Fixed costs are?", options: ["Variable with output", "Constant regardless of output", "Only labor", "Only materials"], correct: 1, explanation: "Fixed costs remain constant regardless of output level" },
    { question: "Break-even point is where?", options: ["Profit = Loss", "Revenue = Total Costs", "Revenue > Costs", "Costs > Revenue"], correct: 1, explanation: "Break-even is where Total Revenue = Total Costs" },
    { question: "Contribution margin is?", options: ["Revenue - Variable Costs", "Revenue - Fixed Costs", "Revenue - All Costs", "Gross Profit"], correct: 0, explanation: "Contribution Margin = Revenue - Variable Costs" },
    
    // Management Accounting
    { question: "Budgeting helps in?", options: ["Historical recording", "Planning & control", "Tax calculation", "Depreciation"], correct: 1, explanation: "Budgeting is used for planning and control" },
    { question: "Variance analysis compares?", options: ["Actual vs Budget", "Revenue vs Profit", "Assets vs Liabilities", "Income vs Expenses"], correct: 0, explanation: "Variance analysis compares actual results to budget" },
    
    // Additional Questions
    { question: "What is accrual accounting?", options: ["Cash basis", "Record when earned/incurred", "Record when paid", "Monthly recording"], correct: 1, explanation: "Accrual accounting records when earned or incurred, not when cash exchanged" },
    { question: "Retained earnings represent?", options: ["Cash reserves", "Accumulated profits not distributed", "Total revenue", "Current assets"], correct: 1, explanation: "Retained earnings are accumulated profits kept in business" },
    { question: "What is accounts receivable?", options: ["Money we owe", "Money owed to us", "Cash in bank", "Inventory"], correct: 1, explanation: "Accounts receivable is money customers owe us" },
    { question: "Which is an intangible asset?", options: ["Building", "Cash", "Patent", "Inventory"], correct: 2, explanation: "Patents are intangible assets (no physical form)" },
    { question: "Trial balance checks?", options: ["Profit", "Debits = Credits", "Assets = Liabilities", "Revenue"], correct: 1, explanation: "Trial balance verifies total debits equal total credits" },
    { question: "What is a journal entry?", options: ["Daily summary", "Recording a transaction", "Financial statement", "Budget plan"], correct: 1, explanation: "Journal entry records a financial transaction" },
    { question: "Chart of accounts is?", options: ["Profit calculation", "List of all accounts", "Balance sheet", "Income statement"], correct: 1, explanation: "Chart of accounts is a list of all company accounts" },
    { question: "What is owner's equity?", options: ["Money owed", "Owner's stake in business", "Revenue", "Expenses"], correct: 1, explanation: "Owner's equity is the owner's financial stake in the business" },
    { question: "Accounts payable is?", options: ["Money owed to us", "Money we owe suppliers", "Cash", "Revenue"], correct: 1, explanation: "Accounts payable is money we owe to suppliers" },
    { question: "What is cost of goods sold?", options: ["Operating expenses", "Direct costs of production", "All expenses", "Marketing costs"], correct: 1, explanation: "COGS is the direct cost of producing goods sold" },
    { question: "Net income is?", options: ["Total revenue", "Revenue - All Expenses", "Gross profit", "Operating income"], correct: 1, explanation: "Net Income = Total Revenue - All Expenses" },
    { question: "What is overhead?", options: ["Direct labor", "Indirect costs", "Revenue", "Assets"], correct: 1, explanation: "Overhead refers to indirect costs like rent and utilities" },
    { question: "Current ratio formula?", options: ["Current Assets / Current Liabilities", "Assets / Liabilities", "Revenue / Expenses", "Profit / Sales"], correct: 0, explanation: "Current Ratio = Current Assets / Current Liabilities" },
    { question: "What is a ledger?", options: ["Financial statement", "Book of accounts", "Budget", "Invoice"], correct: 1, explanation: "Ledger is a book containing all accounts" },
    { question: "Provision for bad debts is?", options: ["Revenue", "Expense estimate", "Asset", "Liability"], correct: 1, explanation: "Provision for bad debts estimates uncollectible amounts" },
    { question: "What is petty cash?", options: ["Bank loan", "Small amount for expenses", "Revenue", "Investment"], correct: 1, explanation: "Petty cash is small amount kept for minor expenses" },
    { question: "Audit means?", options: ["Preparing accounts", "Independent examination", "Tax filing", "Budgeting"], correct: 1, explanation: "Audit is independent examination of financial records" },
    { question: "What is turnover?", options: ["Employee leaving", "Total sales/revenue", "Profit", "Assets"], correct: 1, explanation: "Turnover refers to total sales or revenue" },
    { question: "Capital expenditure is?", options: ["Daily expenses", "Long-term asset purchase", "Revenue", "Liability"], correct: 1, explanation: "Capital expenditure is spending on long-term assets" },
    { question: "Revenue expenditure is?", options: ["Asset purchase", "Day-to-day costs", "Investment", "Loan"], correct: 1, explanation: "Revenue expenditure is day-to-day operating costs" },
    { question: "What is amortization?", options: ["Asset depreciation", "Intangible asset allocation", "Cash payment", "Revenue recognition"], correct: 1, explanation: "Amortization allocates cost of intangible assets" },
    { question: "Going concern assumes?", options: ["Business will close", "Business continues operating", "Bankruptcy", "Liquidation"], correct: 1, explanation: "Going concern assumes business continues for foreseeable future" },
    { question: "Materiality means?", options: ["All items equal", "Significant items matter", "Physical assets only", "Immaterial items"], correct: 1, explanation: "Materiality principle focuses on significant items" },
    { question: "What is a contingent liability?", options: ["Certain obligation", "Potential future obligation", "Current debt", "Revenue"], correct: 1, explanation: "Contingent liability is potential obligation depending on future event" },
    { question: "Prudence concept means?", options: ["Overstate profit", "Don't overstate assets/profit", "Maximize revenue", "Delay expenses"], correct: 1, explanation: "Prudence means not overstating assets or profits" }
  ];

  const getRandomQuestions = (count: number): Question[] => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);

  const startGame = () => {
    const questionCount = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
    setGameQuestions(getRandomQuestions(questionCount));
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(15);
    setCorrectAnswers(0);
    setUsedQuestions([]);
  };

  const resetGame = () => {
    setGameState('idle');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setGameQuestions([]);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && !showResult && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAnswer(null);
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, showResult, timeLeft]);

  const handleAnswer = (answerIndex: number | null) => {
    if (showResult || gameQuestions.length === 0) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const currentQ = gameQuestions[currentQuestion];
    const isCorrect = answerIndex === currentQ.correct;
    
    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft * 10);
      const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
      setScore(prev => prev + Math.floor((100 + timeBonus) * difficultyMultiplier));
      setCorrectAnswers(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < gameQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(15);
      } else {
        setGameState('finished');
      }
    }, 2000);
  };

  const currentQ = gameState === 'playing' && gameQuestions.length > 0 ? gameQuestions[currentQuestion] : null;

  return (
    <div className="relative max-h-[90vh] overflow-y-auto">
      <div className="relative card-modern p-4 sm:p-6 md:p-8 rounded-xl max-w-5xl mx-auto border border-cyan-500/20">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <Calculator className="text-cyan-400" size={24} />
            <span>ACCA Accounting Challenge</span>
          </h3>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">Test your accounting knowledge!</p>
        </div>

        {gameState === 'idle' && (
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto mb-6 sm:mb-8">
              {(['easy', 'medium', 'hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`p-2 sm:p-3 md:p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    difficulty === diff 
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300' 
                      : 'border-gray-600 hover:border-gray-400 text-gray-400'
                  }`}
                >
                  <div className="font-semibold capitalize text-sm sm:text-base">{diff}</div>
                  <div className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">
                    {diff === 'easy' ? '10 Q' : diff === 'medium' ? '15 Q' : '20 Q'}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-xs sm:text-sm px-2">
              50+ unique questions • Randomized every time • {difficulty === 'easy' ? '10' : difficulty === 'medium' ? '15' : '20'} questions per game
            </p>
            <button 
              onClick={startGame}
              className="bg-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-cyan-600 transition-all hover:scale-105 shadow-lg text-base sm:text-lg"
            >
              🚀 Start Quiz
            </button>
          </div>
        )}

        {gameState === 'playing' && currentQ && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div className="card-modern p-2 sm:p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-center gap-1 sm:gap-2 text-cyan-400 mb-1">
                  <Brain size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Question</span>
                </div>
                <div className="text-base sm:text-xl font-bold">{currentQuestion + 1}/{gameQuestions.length}</div>
              </div>
              <div className="card-modern p-2 sm:p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-center gap-1 sm:gap-2 text-blue-400 mb-1">
                  <Timer size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Time</span>
                </div>
                <div className={`text-base sm:text-xl font-bold ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : ''}`}>
                  {timeLeft}s
                </div>
              </div>
              <div className="card-modern p-2 sm:p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-center gap-1 sm:gap-2 text-purple-400 mb-1">
                  <Trophy size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Score</span>
                </div>
                <div className="text-base sm:text-xl font-bold">{score}</div>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur p-3 sm:p-4 md:p-6 rounded-lg border border-cyan-500/20">
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-4 sm:mb-6">{currentQ.question}</h4>
              
              <div className="space-y-2 sm:space-y-3">
                {currentQ.options.map((option, index) => {
                  let buttonClass = "w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all font-medium hover:scale-105 text-sm sm:text-base ";
                  
                  if (showResult) {
                    if (index === currentQ.correct) {
                      buttonClass += "border-cyan-500 bg-cyan-500/20 text-cyan-300";
                    } else if (index === selectedAnswer) {
                      buttonClass += "border-red-500 bg-red-500/20 text-red-300";
                    } else {
                      buttonClass += "border-gray-600 text-gray-400 opacity-50";
                    }
                  } else {
                    buttonClass += "border-white/20 text-white hover:border-cyan-400 hover:bg-cyan-400/10";
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => !showResult && handleAnswer(index)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="break-words pr-2">{option}</span>
                        {showResult && index === currentQ.correct && <CheckCircle size={18} className="text-cyan-400 flex-shrink-0 sm:w-5 sm:h-5" />}
                        {showResult && index === selectedAnswer && index !== currentQ.correct && <XCircle size={18} className="text-red-400 flex-shrink-0 sm:w-5 sm:h-5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {showResult && (
              <div className={`p-3 sm:p-4 rounded-lg ${selectedAnswer === currentQ.correct ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === currentQ.correct ? 
                    <CheckCircle className="text-cyan-400 mt-0.5 sm:mt-1 flex-shrink-0" size={18} /> : 
                    <XCircle className="text-red-400 mt-0.5 sm:mt-1 flex-shrink-0" size={18} />
                  }
                  <div>
                    <div className={`font-semibold mb-1 text-sm sm:text-base ${selectedAnswer === currentQ.correct ? 'text-cyan-300' : 'text-red-300'}`}>
                      {selectedAnswer === currentQ.correct ? '✓ Correct!' : '✗ Incorrect'}
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm">{currentQ.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="mb-6 sm:mb-8">
              <TrendingUp className="text-cyan-400 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
              <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2">Quiz Complete!</h4>
              <p className="text-gray-400 text-sm sm:text-base px-2">
                You got {correctAnswers} out of {gameQuestions.length} correct ({Math.round((correctAnswers / gameQuestions.length) * 100)}%)
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="card-modern p-3 sm:p-4 rounded-lg border border-cyan-500/20 bg-white/5">
                <div className="text-cyan-400 font-medium mb-1 sm:mb-2 text-xs sm:text-sm">Correct</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{correctAnswers}</div>
              </div>
              <div className="card-modern p-3 sm:p-4 rounded-lg border border-purple-500/20 bg-white/5">
                <div className="text-purple-400 font-medium mb-1 sm:mb-2 text-xs sm:text-sm">Score</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{score}</div>
              </div>
              <div className="card-modern p-3 sm:p-4 rounded-lg border border-blue-500/20 bg-white/5">
                <div className="text-blue-400 font-medium mb-1 sm:mb-2 text-xs sm:text-sm">Accuracy</div>
                <div className="text-lg sm:text-2xl font-bold text-white">
                  {Math.round((correctAnswers / gameQuestions.length) * 100)}%
                </div>
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
