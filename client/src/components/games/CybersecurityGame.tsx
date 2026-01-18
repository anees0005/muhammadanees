import { useState, useEffect } from 'react';
import { Shield, TrendingUp, CheckCircle, XCircle, Trophy, Timer, Brain } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function CybersecurityGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);

  // Comprehensive cybersecurity question bank - 50+ questions
  const allQuestions: Question[] = [
    // Basic Security Concepts
    { question: "What is the CIA triad in cybersecurity?", options: ["Confidentiality, Integrity, Availability", "Computer, Internet, Access", "Code, Input, Analysis", "Control, Information, Authentication"], correct: 0, explanation: "CIA triad stands for Confidentiality (data privacy), Integrity (data accuracy), and Availability (system access)" },
    { question: "What is a firewall?", options: ["Antivirus software", "Network security device that filters traffic", "Password manager", "Encryption tool"], correct: 1, explanation: "A firewall is a network security device that monitors and filters incoming/outgoing network traffic" },
    { question: "What does VPN stand for?", options: ["Virtual Private Network", "Very Private Network", "Verified Private Network", "Virtual Public Network"], correct: 0, explanation: "VPN = Virtual Private Network, creates encrypted connection over public network" },
    { question: "What is encryption?", options: ["Deleting data", "Converting data into unreadable format", "Backing up data", "Scanning for viruses"], correct: 1, explanation: "Encryption converts readable data (plaintext) into unreadable format (ciphertext) for security" },
    { question: "What is a vulnerability?", options: ["A security weakness", "A type of malware", "An antivirus", "A firewall rule"], correct: 0, explanation: "A vulnerability is a weakness in a system that can be exploited by attackers" },
    
    // Malware Types
    { question: "What is ransomware?", options: ["Antivirus software", "Malware that encrypts files for ransom", "Network scanner", "Password generator"], correct: 1, explanation: "Ransomware encrypts victim's files and demands payment to restore access" },
    { question: "What is a Trojan horse?", options: ["Legitimate software", "Malware disguised as legitimate software", "Network protocol", "Encryption method"], correct: 1, explanation: "Trojan horse is malware that appears legitimate but contains malicious code" },
    { question: "What is phishing?", options: ["Fishing for data", "Social engineering attack via email", "Network scanning", "Password cracking"], correct: 1, explanation: "Phishing is social engineering attack using deceptive emails to steal credentials" },
    { question: "What is a worm?", options: ["Antivirus", "Self-replicating malware", "Firewall", "VPN"], correct: 1, explanation: "A worm is self-replicating malware that spreads without user interaction" },
    { question: "What is spyware?", options: ["Security software", "Malware that secretly monitors user activity", "Network tool", "Encryption software"], correct: 1, explanation: "Spyware secretly collects user information and activity without consent" },
    
    // Authentication & Access Control
    { question: "What is two-factor authentication (2FA)?", options: ["Two passwords", "Authentication using two different methods", "Double encryption", "Two firewalls"], correct: 1, explanation: "2FA requires two different authentication methods (e.g., password + SMS code)" },
    { question: "What is MFA?", options: ["Multiple File Access", "Multi-Factor Authentication", "Mobile File Authentication", "Master File Access"], correct: 1, explanation: "MFA = Multi-Factor Authentication, uses multiple verification methods" },
    { question: "What is a strong password characteristic?", options: ["Short and simple", "Long, complex, unique", "Your name", "123456"], correct: 1, explanation: "Strong passwords are long (12+ chars), complex (mixed case, numbers, symbols), and unique" },
    { question: "What is biometric authentication?", options: ["Password-based", "Physical characteristic-based (fingerprint, face)", "Token-based", "Certificate-based"], correct: 1, explanation: "Biometric authentication uses unique physical characteristics like fingerprints or facial recognition" },
    { question: "What is SSO?", options: ["Single Sign-On", "Secure Socket Option", "System Security Override", "Server Sign-Out"], correct: 0, explanation: "SSO = Single Sign-On, allows users to access multiple apps with one login" },
    
    // Network Security
    { question: "What is a DDoS attack?", options: ["Data Download", "Distributed Denial of Service", "Direct Data Storage", "Digital Data Security"], correct: 1, explanation: "DDoS = Distributed Denial of Service, floods target with traffic to make it unavailable" },
    { question: "What is HTTPS?", options: ["HyperText Transfer Protocol Secure", "High Transfer Protocol", "Hyper Transfer Protocol", "HTTP Security"], correct: 0, explanation: "HTTPS = HTTP Secure, encrypts data between browser and server using SSL/TLS" },
    { question: "What is a port scan?", options: ["Scanning for open ports", "Scanning for viruses", "Scanning for files", "Scanning for emails"], correct: 0, explanation: "Port scanning checks which network ports are open on a system" },
    { question: "What is SSL/TLS?", options: ["Security protocols for encryption", "Antivirus software", "Firewall type", "Malware"], correct: 0, explanation: "SSL/TLS are cryptographic protocols that provide secure communication over networks" },
    { question: "What is a man-in-the-middle attack?", options: ["Attacker intercepts communication", "Attacker deletes data", "Attacker encrypts files", "Attacker scans network"], correct: 0, explanation: "MITM attack intercepts and potentially alters communication between two parties" },
    
    // Security Practices
    { question: "What is a security patch?", options: ["New feature", "Update that fixes security vulnerabilities", "Backup file", "Antivirus update"], correct: 1, explanation: "Security patches are updates that fix discovered vulnerabilities in software" },
    { question: "What is penetration testing?", options: ["Hacking illegally", "Authorized security testing", "Installing malware", "Scanning for viruses"], correct: 1, explanation: "Penetration testing is authorized simulated attack to test security defenses" },
    { question: "What is a security audit?", options: ["System review for security compliance", "Installing antivirus", "Changing passwords", "Updating software"], correct: 0, explanation: "Security audit is systematic review of security policies and practices" },
    { question: "What is zero-day vulnerability?", options: ["Old vulnerability", "Unknown vulnerability with no patch", "Fixed vulnerability", "Minor vulnerability"], correct: 1, explanation: "Zero-day is unknown vulnerability with no available fix or patch" },
    { question: "What is least privilege principle?", options: ["Give all access", "Give minimum necessary access", "No access control", "Full admin rights"], correct: 1, explanation: "Least privilege means users get minimum access needed for their role" },
    
    // Encryption & Cryptography
    { question: "What is AES?", options: ["Advanced Encryption Standard", "Anti-Encryption System", "Automated Encryption Service", "Application Encryption Standard"], correct: 0, explanation: "AES = Advanced Encryption Standard, widely used symmetric encryption algorithm" },
    { question: "What is RSA?", options: ["Rivest-Shamir-Adleman encryption", "Random Security Algorithm", "Rapid Security Access", "Remote Security Authentication"], correct: 0, explanation: "RSA is public-key cryptosystem named after Rivest, Shamir, and Adleman" },
    { question: "What is hashing?", options: ["Encryption", "One-way function converting data to fixed-size string", "Decryption", "Compression"], correct: 1, explanation: "Hashing converts data into fixed-size string (hash) - one-way process" },
    { question: "What is a digital signature?", options: ["Handwritten signature", "Cryptographic proof of authenticity", "Password", "Username"], correct: 1, explanation: "Digital signature cryptographically proves document authenticity and integrity" },
    { question: "What is end-to-end encryption?", options: ["Server-side encryption", "Encryption only at endpoints", "Encryption where only sender/receiver can read", "No encryption"], correct: 2, explanation: "E2EE encrypts data so only sender and receiver can decrypt, not intermediaries" },
    
    // Threats & Attacks
    { question: "What is SQL injection?", options: ["Database query attack", "Network attack", "Email attack", "Physical attack"], correct: 0, explanation: "SQL injection inserts malicious SQL code into database queries" },
    { question: "What is XSS?", options: ["Cross-Site Scripting", "Extra Secure System", "Extended Security Service", "Cross-Site Security"], correct: 0, explanation: "XSS = Cross-Site Scripting, injects malicious scripts into web pages" },
    { question: "What is social engineering?", options: ["Technical hacking", "Manipulating people to reveal information", "Network scanning", "Password cracking"], correct: 1, explanation: "Social engineering manipulates people into revealing confidential information" },
    { question: "What is a brute force attack?", options: ["Trying all possible passwords", "Physical attack", "Network attack", "Email attack"], correct: 0, explanation: "Brute force tries all possible password combinations until correct one found" },
    { question: "What is a zero-day exploit?", options: ["Old exploit", "Exploit for unknown vulnerability", "Fixed exploit", "Minor exploit"], correct: 1, explanation: "Zero-day exploit attacks unknown vulnerability before patch is available" },
    
    // Security Tools & Technologies
    { question: "What is an IDS?", options: ["Intrusion Detection System", "Internet Data Service", "Internal Data System", "Integrated Defense System"], correct: 0, explanation: "IDS = Intrusion Detection System, monitors network for suspicious activity" },
    { question: "What is an IPS?", options: ["Intrusion Prevention System", "Internet Protocol Service", "Internal Protection System", "Integrated Privacy System"], correct: 0, explanation: "IPS = Intrusion Prevention System, actively blocks detected threats" },
    { question: "What is SIEM?", options: ["Security Information and Event Management", "System Integration and Event Management", "Secure Internet Event Management", "Security Internal Event Management"], correct: 0, explanation: "SIEM collects and analyzes security logs from multiple sources" },
    { question: "What is a honeypot?", options: ["Decoy system to attract attackers", "Security tool", "Antivirus", "Firewall"], correct: 0, explanation: "Honeypot is decoy system designed to attract and study attackers" },
    { question: "What is sandboxing?", options: ["Isolated environment for testing", "Backup system", "Encryption method", "Network protocol"], correct: 0, explanation: "Sandboxing runs code in isolated environment to prevent system damage" },
    
    // Compliance & Standards
    { question: "What is GDPR?", options: ["General Data Protection Regulation", "Global Data Protection Rule", "General Data Privacy Rule", "Global Data Protection Regulation"], correct: 0, explanation: "GDPR = General Data Protection Regulation, EU data privacy law" },
    { question: "What is PCI DSS?", options: ["Payment Card Industry Data Security Standard", "Personal Computer Information Data Security", "Public Computer Information Data Security", "Payment Card Information Data Security"], correct: 0, explanation: "PCI DSS = Payment Card Industry Data Security Standard for card data protection" },
    { question: "What is ISO 27001?", options: ["Information security management standard", "Network protocol", "Encryption standard", "Antivirus standard"], correct: 0, explanation: "ISO 27001 is international standard for information security management systems" },
    { question: "What is data breach?", options: ["Authorized access", "Unauthorized access to sensitive data", "Data backup", "Data encryption"], correct: 1, explanation: "Data breach is unauthorized access, disclosure, or theft of sensitive information" },
    { question: "What is PII?", options: ["Personally Identifiable Information", "Public Internet Information", "Private Internal Information", "Personal Internet Information"], correct: 0, explanation: "PII = Personally Identifiable Information, data that can identify individuals" },
    
    // Advanced Topics
    { question: "What is threat intelligence?", options: ["Antivirus", "Information about cyber threats", "Firewall", "VPN"], correct: 1, explanation: "Threat intelligence is information about current and emerging cyber threats" },
    { question: "What is incident response?", options: ["Preventing attacks", "Process for handling security incidents", "Installing antivirus", "Updating software"], correct: 1, explanation: "Incident response is organized approach to addressing security breaches" },
    { question: "What is a security policy?", options: ["Antivirus setting", "Documented security rules and procedures", "Firewall rule", "Password"], correct: 1, explanation: "Security policy defines organization's security rules, procedures, and guidelines" },
    { question: "What is risk assessment?", options: ["Installing security tools", "Evaluating security risks", "Scanning for viruses", "Changing passwords"], correct: 1, explanation: "Risk assessment identifies and evaluates potential security threats and vulnerabilities" },
    { question: "What is defense in depth?", options: ["Single security layer", "Multiple layers of security", "One firewall", "Single antivirus"], correct: 1, explanation: "Defense in depth uses multiple security layers to protect systems" },
    
    // Additional Questions
    { question: "What is a security token?", options: ["Physical or digital device for authentication", "Network protocol", "Antivirus", "Firewall"], correct: 0, explanation: "Security token is physical or digital device used for authentication" },
    { question: "What is certificate authority (CA)?", options: ["Issues digital certificates", "Network device", "Antivirus", "Firewall"], correct: 0, explanation: "CA issues and verifies digital certificates for secure communications" },
    { question: "What is network segmentation?", options: ["Dividing network into smaller parts", "Connecting networks", "Scanning network", "Encrypting network"], correct: 0, explanation: "Network segmentation divides network into smaller segments to limit breach impact" },
    { question: "What is a security baseline?", options: ["Minimum security configuration", "Maximum security", "No security", "Optional security"], correct: 0, explanation: "Security baseline is minimum security configuration standards for systems" },
    { question: "What is privilege escalation?", options: ["Gaining higher access rights", "Changing passwords", "Installing software", "Scanning network"], correct: 0, explanation: "Privilege escalation is gaining higher-level access than originally granted" }
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
            <Shield className="text-cyan-400" size={24} />
            <span>Cybersecurity Challenge</span>
          </h3>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">Test your cybersecurity knowledge!</p>
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

