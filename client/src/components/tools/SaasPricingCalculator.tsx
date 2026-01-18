import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, Users, Percent, Info } from "lucide-react";

export default function SAASPricingCalculator() {
  const [monthlyCosts, setMonthlyCosts] = useState({
    development: 5000,
    infrastructure: 500,
    marketing: 2000,
    support: 1000,
    other: 500
  });

  const [targetMargin, setTargetMargin] = useState(70);
  const [estimatedUsers, setEstimatedUsers] = useState(100);
  const [tierCount, setTierCount] = useState(3);

  // Calculate total monthly costs accurately
  const totalMonthlyCosts = Object.values(monthlyCosts).reduce((a, b) => a + b, 0);
  
  // Calculate target revenue: Revenue = Costs / (1 - Margin%)
  // Example: If costs = $1000 and margin = 70%, revenue = $1000 / 0.3 = $3,333.33
  const targetRevenue = totalMonthlyCosts > 0 ? totalMonthlyCosts / (1 - targetMargin / 100) : 0;
  
  // Calculate price per user (assuming all users pay the same base price)
  const pricePerUser = estimatedUsers > 0 ? targetRevenue / estimatedUsers : 0;
  
  // Recommended pricing tiers with accurate multipliers
  // Starter: 40% discount from base (60% of base price)
  // Professional: Base price (100%)
  // Business: 50% premium (150% of base price)
  // Enterprise: 150% premium (250% of base price)
  const recommendedPrices = {
    starter: Math.max(0, pricePerUser * 0.6),
    professional: Math.max(0, pricePerUser),
    business: Math.max(0, pricePerUser * 1.5),
    enterprise: Math.max(0, pricePerUser * 2.5)
  };

  const handleCostChange = (key: string, value: number) => {
    setMonthlyCosts(prev => ({ ...prev, [key]: Math.max(0, value) }));
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Calculator size={28} className="text-cyan-400" />
          <span>Input Your Costs</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Monthly Development Costs ($)
            </label>
            <input
              type="number"
              value={monthlyCosts.development}
              onChange={(e) => handleCostChange('development', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Monthly Infrastructure Costs ($)
            </label>
            <input
              type="number"
              value={monthlyCosts.infrastructure}
              onChange={(e) => handleCostChange('infrastructure', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Monthly Marketing Costs ($)
            </label>
            <input
              type="number"
              value={monthlyCosts.marketing}
              onChange={(e) => handleCostChange('marketing', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Monthly Support Costs ($)
            </label>
            <input
              type="number"
              value={monthlyCosts.support}
              onChange={(e) => handleCostChange('support', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Other Monthly Costs ($)
            </label>
            <input
              type="number"
              value={monthlyCosts.other}
              onChange={(e) => handleCostChange('other', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Profit Margin (%)
            </label>
            <input
              type="number"
              min="0"
              max="95"
              value={targetMargin}
              onChange={(e) => setTargetMargin(Math.max(0, Math.min(95, parseFloat(e.target.value) || 0)))}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 60-80%</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Estimated Monthly Users
            </label>
            <input
              type="number"
              min="1"
              value={estimatedUsers}
              onChange={(e) => setEstimatedUsers(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Costs */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign size={24} className="text-red-400" />
            <h3 className="text-lg font-bold text-white">Total Monthly Costs</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            ${totalMonthlyCosts.toLocaleString()}
          </div>
          <p className="text-sm text-gray-400">All operational costs combined</p>
        </div>

        {/* Target Revenue */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={24} className="text-green-400" />
            <h3 className="text-lg font-bold text-white">Target Monthly Revenue</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            ${targetRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <p className="text-sm text-gray-400">{targetMargin}% profit margin</p>
        </div>

        {/* Price Per User */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users size={24} className="text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Price Per User</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            ${pricePerUser.toFixed(2)}
          </div>
          <p className="text-sm text-gray-400">Based on {estimatedUsers} users</p>
        </div>
      </div>

      {/* Recommended Pricing Tiers */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Percent size={28} className="text-cyan-400" />
          <span>Recommended Pricing Tiers</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-400 mb-2">Starter</h3>
            <div className="text-3xl font-bold text-white mb-1">
              ${recommendedPrices.starter.toFixed(0)}
              <span className="text-lg text-gray-400">/mo</span>
            </div>
            <p className="text-sm text-gray-400">Basic features</p>
            <p className="text-xs text-gray-500 mt-2">40% discount</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-400 mb-2">Professional</h3>
            <div className="text-3xl font-bold text-white mb-1">
              ${recommendedPrices.professional.toFixed(0)}
              <span className="text-lg text-gray-400">/mo</span>
            </div>
            <p className="text-sm text-gray-400">Most popular</p>
            <p className="text-xs text-gray-500 mt-2">Base price</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-purple-400 mb-2">Business</h3>
            <div className="text-3xl font-bold text-white mb-1">
              ${recommendedPrices.business.toFixed(0)}
              <span className="text-lg text-gray-400">/mo</span>
            </div>
            <p className="text-sm text-gray-400">Advanced features</p>
            <p className="text-xs text-gray-500 mt-2">50% premium</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-400 mb-2">Enterprise</h3>
            <div className="text-3xl font-bold text-white mb-1">
              ${recommendedPrices.enterprise.toFixed(0)}
              <span className="text-lg text-gray-400">/mo</span>
            </div>
            <p className="text-sm text-gray-400">Full features</p>
            <p className="text-xs text-gray-500 mt-2">150% premium</p>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Info size={24} className="text-cyan-400 flex-shrink-0 mt-1" />
          <div className="text-gray-300 space-y-2">
            <p className="font-semibold text-white">Pricing Tips:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>These are starting recommendations - adjust based on market research</li>
              <li>Consider competitor pricing and value proposition</li>
              <li>Test different price points with A/B testing</li>
              <li>Annual pricing typically offers 20-30% discount</li>
              <li>Monitor customer acquisition cost (CAC) vs lifetime value (LTV)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

