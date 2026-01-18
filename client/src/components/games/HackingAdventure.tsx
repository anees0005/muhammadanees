import { useState } from 'react';
import { BookOpen, Trophy, AlertTriangle, CheckCircle, XCircle, Zap, Shield } from 'lucide-react';

interface Choice {
  text: string;
  nextScene: string;
  score: number;
  feedback: string;
  securityLevel: 'good' | 'neutral' | 'bad';
}

interface Scene {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
  isEnding?: boolean;
  endingType?: 'success' | 'failure' | 'neutral';
}

export default function HackingAdventure() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [currentSceneId, setCurrentSceneId] = useState('start');
  const [score, setScore] = useState(0);
  const [securityScore, setSecurityScore] = useState(100);
  const [storyPath, setStoryPath] = useState<string[]>(['start']);
  const [selectedScenario, setSelectedScenario] = useState<'phishing' | 'network' | 'data' | null>(null);

  const scenarios: Record<string, Scene[]> = {
    phishing: [
      {
        id: 'phishing_start',
        title: '📧 Suspicious Email Detected',
        description: 'You receive an email claiming to be from your bank asking you to verify your account. The email looks official but something feels off. What do you do?',
        choices: [
          {
            text: 'Click the link and verify (it looks legitimate)',
            nextScene: 'phishing_bad',
            score: -20,
            feedback: '⚠️ This was a phishing attempt! You clicked a malicious link. Always verify emails through official channels.',
            securityLevel: 'bad'
          },
          {
            text: 'Check the sender email address carefully',
            nextScene: 'phishing_check',
            score: 10,
            feedback: '✅ Good instinct! Checking sender details is the first step in identifying phishing.',
            securityLevel: 'good'
          },
          {
            text: 'Forward to IT security team',
            nextScene: 'phishing_report',
            score: 15,
            feedback: '✅ Excellent! Reporting suspicious emails helps protect the entire organization.',
            securityLevel: 'good'
          }
        ]
      },
      {
        id: 'phishing_check',
        title: '🔍 Email Investigation',
        description: 'You examine the sender address: "security@bank-official.com" vs the real bank domain "bank.com". The email has urgent language and requests immediate action. What\'s your next step?',
        choices: [
          {
            text: 'Contact the bank directly via their official website',
            nextScene: 'phishing_good',
            score: 20,
            feedback: '✅ Perfect! Always use official channels to verify requests. This is the secure way.',
            securityLevel: 'good'
          },
          {
            text: 'Reply to the email asking for verification',
            nextScene: 'phishing_bad',
            score: -15,
            feedback: '⚠️ Replying confirms your email is active. Attackers use this for future attacks.',
            securityLevel: 'bad'
          },
          {
            text: 'Ignore it and delete',
            nextScene: 'phishing_neutral',
            score: 5,
            feedback: 'Neutral choice. Safe but not optimal - reporting helps others.',
            securityLevel: 'neutral'
          }
        ]
      },
      {
        id: 'phishing_report',
        title: '🛡️ Security Team Response',
        description: 'IT security confirms this is a phishing campaign targeting your organization. They\'ve blocked the malicious domain and sent alerts to all employees. Your quick action prevented potential breaches.',
        choices: [
          {
            text: 'Continue to next scenario',
            nextScene: 'phishing_success',
            score: 25,
            feedback: '🎉 You successfully identified and reported a phishing attack!',
            securityLevel: 'good'
          }
        ],
        isEnding: true,
        endingType: 'success'
      },
      {
        id: 'phishing_good',
        title: '✅ Secure Verification',
        description: 'You contacted the bank through their official website. They confirmed the email was fake and thanked you for reporting it. You\'ve protected yourself and helped prevent others from falling victim.',
        choices: [
          {
            text: 'Continue to next scenario',
            nextScene: 'phishing_success',
            score: 25,
            feedback: '🎉 Excellent security practices! You avoided the phishing attack.',
            securityLevel: 'good'
          }
        ],
        isEnding: true,
        endingType: 'success'
      },
      {
        id: 'phishing_bad',
        title: '🚨 Security Breach',
        description: 'You clicked the link and entered your credentials. Your account has been compromised. The attackers now have access to your banking information. You need to immediately change all passwords and contact your bank.',
        choices: [
          {
            text: 'Learn from this mistake',
            nextScene: 'phishing_failure',
            score: -30,
            feedback: '⚠️ This is why phishing is dangerous. Always verify through official channels.',
            securityLevel: 'bad'
          }
        ],
        isEnding: true,
        endingType: 'failure'
      },
      {
        id: 'phishing_neutral',
        title: '⚪ Safe but Missed Opportunity',
        description: 'You deleted the email without reporting it. While you stayed safe, others in your organization might still be at risk. Reporting suspicious emails helps protect everyone.',
        choices: [
          {
            text: 'Continue',
            nextScene: 'phishing_neutral_end',
            score: 0,
            feedback: 'You stayed safe but could have done more to help others.',
            securityLevel: 'neutral'
          }
        ],
        isEnding: true,
        endingType: 'neutral'
      },
      {
        id: 'phishing_success',
        title: 'Mission Complete',
        description: 'You successfully navigated the phishing scenario!',
        choices: [],
        isEnding: true,
        endingType: 'success'
      },
      {
        id: 'phishing_failure',
        title: 'Mission Failed',
        description: 'The phishing attack succeeded. Learn from this experience.',
        choices: [],
        isEnding: true,
        endingType: 'failure'
      },
      {
        id: 'phishing_neutral_end',
        title: 'Scenario Complete',
        description: 'You completed the scenario safely.',
        choices: [],
        isEnding: true,
        endingType: 'neutral'
      }
    ],
    network: [
      {
        id: 'network_start',
        title: '🌐 Network Intrusion Alert',
        description: 'Your security system detects unusual network activity. Multiple failed login attempts from an unknown IP address. The system shows potential brute force attack. What\'s your response?',
        choices: [
          {
            text: 'Block the IP address immediately',
            nextScene: 'network_block',
            score: 15,
            feedback: '✅ Quick response! Blocking suspicious IPs is a good first step.',
            securityLevel: 'good'
          },
          {
            text: 'Investigate the source IP first',
            nextScene: 'network_investigate',
            score: 10,
            feedback: '✅ Investigation is important, but speed matters in active attacks.',
            securityLevel: 'good'
          },
          {
            text: 'Ignore it - might be a false positive',
            nextScene: 'network_bad',
            score: -25,
            feedback: '⚠️ Ignoring security alerts is dangerous. Always investigate suspicious activity.',
            securityLevel: 'bad'
          }
        ]
      },
      {
        id: 'network_block',
        title: '🛡️ IP Blocked',
        description: 'You\'ve blocked the IP, but the attacker switches to a different IP address and continues. The attack is now targeting multiple accounts. You need a stronger defense strategy.',
        choices: [
          {
            text: 'Enable rate limiting and account lockout',
            nextScene: 'network_rate_limit',
            score: 20,
            feedback: '✅ Excellent! Rate limiting prevents brute force attacks effectively.',
            securityLevel: 'good'
          },
          {
            text: 'Just block each new IP as they appear',
            nextScene: 'network_whackamole',
            score: -10,
            feedback: '⚠️ This is like whack-a-mole. Attackers use botnets with many IPs.',
            securityLevel: 'bad'
          }
        ]
      },
      {
        id: 'network_investigate',
        title: '🔍 Investigation Results',
        description: 'The IP traces to a known botnet. This is a coordinated attack using thousands of compromised devices. While investigating, the attack continues.',
        choices: [
          {
            text: 'Implement multi-factor authentication',
            nextScene: 'network_mfa',
            score: 25,
            feedback: '✅ Perfect! MFA makes brute force attacks ineffective even with correct passwords.',
            securityLevel: 'good'
          },
          {
            text: 'Just monitor and document',
            nextScene: 'network_bad',
            score: -15,
            feedback: '⚠️ Monitoring alone doesn\'t stop attacks. Action is needed.',
            securityLevel: 'bad'
          }
        ]
      },
      {
        id: 'network_rate_limit',
        title: '✅ Attack Mitigated',
        description: 'Rate limiting and account lockout policies have stopped the brute force attack. Failed login attempts are now blocked after 3 attempts. The system is secure.',
        choices: [
          {
            text: 'Continue',
            nextScene: 'network_success',
            score: 20,
            feedback: '🎉 You successfully defended against a brute force attack!',
            securityLevel: 'good'
          }
        ],
        isEnding: true,
        endingType: 'success'
      },
      {
        id: 'network_mfa',
        title: '✅ MFA Enabled',
        description: 'Multi-factor authentication is now required for all accounts. Even if attackers guess passwords, they can\'t access accounts without the second factor. The attack is neutralized.',
        choices: [
          {
            text: 'Continue',
            nextScene: 'network_success',
            score: 25,
            feedback: '🎉 MFA is one of the best defenses against credential attacks!',
            securityLevel: 'good'
          }
        ],
        isEnding: true,
        endingType: 'success'
      },
      {
        id: 'network_whackamole',
        title: '🚨 Attack Escalates',
        description: 'The attacker keeps switching IPs. Your manual blocking can\'t keep up. Several accounts have been compromised. You need to implement automated security measures.',
        choices: [
          {
            text: 'Learn from this',
            nextScene: 'network_failure',
            score: -20,
            feedback: '⚠️ Automated security controls are essential for modern threats.',
            securityLevel: 'bad'
          }
        ],
        isEnding: true,
        endingType: 'failure'
      },
      {
        id: 'network_bad',
        title: '🚨 Breach Occurred',
        description: 'The attack succeeded. Multiple accounts were compromised because no defensive action was taken in time. Data may have been stolen.',
        choices: [
          {
            text: 'Continue',
            nextScene: 'network_failure',
            score: -30,
            feedback: '⚠️ Always respond to security alerts promptly.',
            securityLevel: 'bad'
          }
        ],
        isEnding: true,
        endingType: 'failure'
      },
      {
        id: 'network_success',
        title: 'Mission Complete',
        description: 'You successfully defended the network!',
        choices: [],
        isEnding: true,
        endingType: 'success'
      },
      {
        id: 'network_failure',
        title: 'Mission Failed',
        description: 'The network attack succeeded.',
        choices: [],
        isEnding: true,
        endingType: 'failure'
      }
    ],
    data: [
      {
        id: 'data_start',
        title: '💾 Data Breach Discovery',
        description: 'You discover that sensitive customer data has been exposed. A database backup was stored on an unsecured cloud storage bucket that\'s publicly accessible. The data includes names, emails, and hashed passwords.',
        choices: [
          {
            text: 'Immediately secure the bucket and assess damage',
            nextScene: 'data_secure',
            score: 20,
            feedback: '✅ Quick action! Securing the breach is the first priority.',
            securityLevel: 'good'
          },
          {
            text: 'Notify management and wait for instructions',
            nextScene: 'data_wait',
            score: -10,
            feedback: '⚠️ In data breaches, time is critical. Immediate action is needed.',
            securityLevel: 'bad'
          },
          {
            text: 'Check if anyone has accessed the data',
            nextScene: 'data_check',
            score: 15,
            feedback: '✅ Good thinking, but securing should come first.',
            securityLevel: 'good'
          }
        ]
      },
      {
        id: 'data_secure',
        title: '🔒 Securing the Breach',
        description: 'You\'ve secured the bucket, but you need to determine the scope. How long was it exposed? Who might have accessed it? You also need to comply with data breach notification laws.',
        choices: [
          {
            text: 'Conduct forensic analysis and notify affected users',
            nextScene: 'data_good',
            score: 25,
            feedback: '✅ Excellent! Transparency and proper investigation are crucial.',
            securityLevel: 'good'
          },
          {
            text: 'Keep it quiet to avoid bad publicity',
            nextScene: 'data_bad',
            score: -30,
            feedback: '⚠️ Hiding breaches violates laws and damages trust. Always report properly.',
            securityLevel: 'bad'
          },
          {
            text: 'Only notify if passwords were compromised',
            nextScene: 'data_partial',
            score: 5,
            feedback: 'Partial compliance. All exposed data should be reported.',
            securityLevel: 'neutral'
          }
        ]
      },
      {
        id: 'data_check',
        title: '🔍 Access Logs Review',
        description: 'You check access logs and find the bucket was accessed by unknown IPs. The data has been downloaded. You need to secure it immediately and assess the damage.',
        choices: [
          {
            text: 'Secure immediately and notify all affected parties',
            nextScene: 'data_good',
            score: 20,
            feedback: '✅ Proper response to confirmed data access.',
            securityLevel: 'good'
          },
          {
            text: 'Just change the passwords and move on',
            nextScene: 'data_bad',
            score: -20,
            feedback: '⚠️ This is insufficient. Full breach response is required.',
            securityLevel: 'bad'
          }
        ]
      },
      {
        id: 'data_wait',
        title: '⏳ Delayed Response',
        description: 'While waiting for management approval, the breach continues. More data may have been accessed. Time is critical in breach response.',
        choices: [
          {
            text: 'Take immediate action anyway',
            nextScene: 'data_secure',
            score: 15,
            feedback: '✅ Sometimes you need to act first, explain later in emergencies.',
            securityLevel: 'good'
          },
          {
            text: 'Continue waiting',
            nextScene: 'data_bad',
            score: -25,
            feedback: '⚠️ Delays in breach response increase damage significantly.',
            securityLevel: 'bad'
          }
        ]
      },
      {
        id: 'data_good',
        title: '✅ Proper Breach Response',
        description: 'You conducted a thorough investigation, secured all systems, notified affected users within 72 hours (GDPR requirement), and implemented stronger security measures. While the breach occurred, your response was exemplary.',
        choices: [
          {
            text: 'Continue',
            nextScene: 'data_success',
            score: 30,
            feedback: '🎉 You handled the data breach professionally and legally!',
            securityLevel: 'good'
          }
        ],
        isEnding: true,
        endingType: 'success'
      },
      {
        id: 'data_bad',
        title: '🚨 Compliance Violation',
        description: 'The breach was not properly reported. Regulatory authorities have been notified by third parties. Your organization faces fines, legal action, and severe reputation damage. Proper breach response is mandatory by law.',
        choices: [
          {
            text: 'Learn from this',
            nextScene: 'data_failure',
            score: -35,
            feedback: '⚠️ Data breach notification laws (GDPR, etc.) are mandatory, not optional.',
            securityLevel: 'bad'
          }
        ],
        isEnding: true,
        endingType: 'failure'
      },
      {
        id: 'data_partial',
        title: '⚪ Partial Response',
        description: 'You notified users about password exposure but not other data. While better than nothing, full transparency is required for compliance and trust.',
        choices: [
          {
            text: 'Continue',
            nextScene: 'data_neutral',
            score: 10,
            feedback: 'Partial compliance, but could be better.',
            securityLevel: 'neutral'
          }
        ],
        isEnding: true,
        endingType: 'neutral'
      },
      {
        id: 'data_success',
        title: 'Mission Complete',
        description: 'You successfully managed the data breach!',
        choices: [],
        isEnding: true,
        endingType: 'success'
      },
      {
        id: 'data_failure',
        title: 'Mission Failed',
        description: 'The data breach response failed.',
        choices: [],
        isEnding: true,
        endingType: 'failure'
      },
      {
        id: 'data_neutral',
        title: 'Scenario Complete',
        description: 'You completed the scenario with mixed results.',
        choices: [],
        isEnding: true,
        endingType: 'neutral'
      }
    ]
  };

  const startGame = (scenario: 'phishing' | 'network' | 'data') => {
    setSelectedScenario(scenario);
    setGameState('playing');
    setCurrentSceneId(`${scenario}_start`);
    setScore(0);
    setSecurityScore(100);
    setStoryPath([`${scenario}_start`]);
  };

  const resetGame = () => {
    setGameState('idle');
    setCurrentSceneId('start');
    setScore(0);
    setSecurityScore(100);
    setStoryPath(['start']);
    setSelectedScenario(null);
  };

  const handleChoice = (choice: Choice) => {
    const newScore = score + choice.score;
    const newSecurityScore = Math.max(0, Math.min(100, securityScore + (choice.securityLevel === 'good' ? -5 : choice.securityLevel === 'bad' ? 15 : 5)));
    
    setScore(newScore);
    setSecurityScore(newSecurityScore);
    setStoryPath([...storyPath, choice.nextScene]);
    setCurrentSceneId(choice.nextScene);
  };

  const currentScenes = selectedScenario ? scenarios[selectedScenario] : [];
  const currentScene = currentScenes.find(s => s.id === currentSceneId);

  const getEndingMessage = () => {
    if (!currentScene) return '';
    if (currentScene.endingType === 'success') {
      return '🎉 Excellent work! You made secure choices and protected the systems.';
    } else if (currentScene.endingType === 'failure') {
      return '⚠️ The security incident wasn\'t handled properly. Learn from these mistakes.';
    } else {
      return '⚪ You completed the scenario, but there\'s room for improvement.';
    }
  };

  const getSecurityLevel = () => {
    if (securityScore >= 80) return { text: 'Excellent', color: 'text-green-400', bg: 'bg-green-500/10' };
    if (securityScore >= 60) return { text: 'Good', color: 'text-cyan-400', bg: 'bg-cyan-500/10' };
    if (securityScore >= 40) return { text: 'Fair', color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
    return { text: 'Poor', color: 'text-red-400', bg: 'bg-red-500/10' };
  };

  const securityLevel = getSecurityLevel();

  return (
    <div className="relative max-h-[90vh] overflow-y-auto">
      <div className="relative card-modern p-4 sm:p-6 md:p-8 rounded-xl max-w-5xl mx-auto border border-cyan-500/20">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <BookOpen className="text-cyan-400" size={24} />
            <span>Hacking Adventure</span>
          </h3>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">Interactive cybersecurity scenarios where your choices matter!</p>
        </div>

        {gameState === 'idle' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-gray-400 text-sm sm:text-base mb-4">
                Choose a cybersecurity scenario and make decisions that affect the outcome. Learn security best practices through interactive storytelling!
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              <button
                onClick={() => startGame('phishing')}
                className="group card-modern p-6 bg-white/5 border border-white/10 hover:border-red-400 hover:bg-red-400/5 transition-all duration-300 text-left"
              >
                <div className="text-4xl mb-3">📧</div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Phishing Attack</h4>
                <p className="text-gray-300 text-sm mb-3">Navigate a suspicious email scenario. Learn to identify and respond to phishing attempts.</p>
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertTriangle size={16} />
                  <span>Medium Difficulty</span>
                </div>
              </button>

              <button
                onClick={() => startGame('network')}
                className="group card-modern p-6 bg-white/5 border border-white/10 hover:border-orange-400 hover:bg-orange-400/5 transition-all duration-300 text-left"
              >
                <div className="text-4xl mb-3">🌐</div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Network Intrusion</h4>
                <p className="text-gray-300 text-sm mb-3">Defend against a brute force attack. Make critical security decisions under pressure.</p>
                <div className="flex items-center gap-2 text-orange-400 text-sm">
                  <AlertTriangle size={16} />
                  <span>Hard Difficulty</span>
                </div>
              </button>

              <button
                onClick={() => startGame('data')}
                className="group card-modern p-6 bg-white/5 border border-white/10 hover:border-purple-400 hover:bg-purple-400/5 transition-all duration-300 text-left"
              >
                <div className="text-4xl mb-3">💾</div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Data Breach</h4>
                <p className="text-gray-300 text-sm mb-3">Handle a discovered data breach. Learn proper incident response and compliance.</p>
                <div className="flex items-center gap-2 text-purple-400 text-sm">
                  <AlertTriangle size={16} />
                  <span>Hard Difficulty</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {gameState === 'playing' && currentScene && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 text-center">
              <div className="card-modern p-2 sm:p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-center gap-1 sm:gap-2 text-cyan-400 mb-1">
                  <Trophy size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Score</span>
                </div>
                <div className="text-base sm:text-xl font-bold">{score}</div>
              </div>
              <div className="card-modern p-2 sm:p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-center gap-1 sm:gap-2 text-blue-400 mb-1">
                  <Shield size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Security</span>
                </div>
                <div className={`text-base sm:text-xl font-bold ${securityLevel.color}`}>
                  {securityScore}%
                </div>
              </div>
              <div className={`card-modern p-2 sm:p-3 rounded-lg ${securityLevel.bg} col-span-2 sm:col-span-1`}>
                <div className={`text-xs sm:text-sm font-medium ${securityLevel.color} mb-1`}>Status</div>
                <div className={`text-sm sm:text-base font-bold ${securityLevel.color}`}>
                  {securityLevel.text}
                </div>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur p-4 sm:p-6 rounded-lg border border-cyan-500/20">
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
                {currentScene.title}
              </h4>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
                {currentScene.description}
              </p>

              {currentScene.isEnding ? (
                <div className={`p-4 rounded-lg border-2 ${
                  currentScene.endingType === 'success' ? 'bg-green-500/10 border-green-500/30' :
                  currentScene.endingType === 'failure' ? 'bg-red-500/10 border-red-500/30' :
                  'bg-yellow-500/10 border-yellow-500/30'
                }`}>
                  <div className="flex items-start gap-3">
                    {currentScene.endingType === 'success' ? 
                      <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={24} /> :
                      currentScene.endingType === 'failure' ?
                      <XCircle className="text-red-400 mt-1 flex-shrink-0" size={24} /> :
                      <AlertTriangle className="text-yellow-400 mt-1 flex-shrink-0" size={24} />
                    }
                    <div>
                      <div className={`font-semibold mb-2 text-base sm:text-lg ${
                        currentScene.endingType === 'success' ? 'text-green-300' :
                        currentScene.endingType === 'failure' ? 'text-red-300' :
                        'text-yellow-300'
                      }`}>
                        {getEndingMessage()}
                      </div>
                      <div className="text-gray-300 text-sm">
                        Final Score: <span className="font-bold text-white">{score}</span> | 
                        Security Level: <span className={`font-bold ${securityLevel.color}`}>{securityScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentScene.choices.map((choice, index) => {
                    const choiceColor = choice.securityLevel === 'good' ? 'border-green-400 hover:bg-green-400/10' :
                                       choice.securityLevel === 'bad' ? 'border-red-400 hover:bg-red-400/10' :
                                       'border-yellow-400 hover:bg-yellow-400/10';
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleChoice(choice)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all font-medium hover:scale-105 text-sm sm:text-base ${choiceColor} text-white`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="break-words pr-2">{choice.text}</span>
                          {choice.securityLevel === 'good' && <CheckCircle size={18} className="text-green-400 flex-shrink-0" />}
                          {choice.securityLevel === 'bad' && <XCircle size={18} className="text-red-400 flex-shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {currentScene.isEnding && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button 
                  onClick={resetGame}
                  className="bg-cyan-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-all hover:scale-105 text-sm sm:text-base"
                >
                  🎮 Play Another Scenario
                </button>
                <button 
                  onClick={() => {
                    setGameState('idle');
                    setSelectedScenario(null);
                  }}
                  className="border border-white/20 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white/10 transition-all text-sm sm:text-base"
                >
                  Back to Menu
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

