import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Users } from 'lucide-react';

export default function AutoUpdater() {
  const [stats, setStats] = useState({
    projectsCompleted: 47,
    linesOfCode: 125847,
    clientsServed: 23,
    lastUpdated: new Date()
  });

  // Auto-increment stats to simulate AI automation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        projectsCompleted: prev.projectsCompleted + Math.random() > 0.7 ? 1 : 0,
        linesOfCode: prev.linesOfCode + Math.floor(Math.random() * 50) + 10,
        clientsServed: prev.clientsServed + Math.random() > 0.9 ? 1 : 0,
        lastUpdated: new Date()
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="fixed top-20 right-6 z-30 glass-effect p-4 rounded-lg min-w-[200px] opacity-90">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="text-[hsl(var(--neon-green))] animate-pulse" size={16} />
        <span className="text-xs text-[hsl(var(--neon-green))]">AI Live Stats</span>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Projects:</span>
          <span className="text-[hsl(var(--neon-cyan))] font-mono">
            {formatNumber(stats.projectsCompleted)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Lines of Code:</span>
          <span className="text-[hsl(var(--neon-green))] font-mono">
            {formatNumber(stats.linesOfCode)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Clients:</span>
          <span className="text-[hsl(var(--neon-pink))] font-mono">
            {formatNumber(stats.clientsServed)}
          </span>
        </div>
        
        <div className="pt-2 border-t border-gray-600 text-center">
          <span className="text-gray-400 text-xs">
            Updated: {stats.lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}