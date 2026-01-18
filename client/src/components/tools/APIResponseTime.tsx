import { useState } from "react";
import { Activity, Clock, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

interface TestResult {
  url: string;
  responseTime: number;
  status: number;
  timestamp: Date;
}

export default function APIResponseTime() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [error, setError] = useState("");
  const [testCount, setTestCount] = useState(5);

  const testAPI = async () => {
    if (!url.trim()) {
      setError("Please enter a valid API endpoint URL");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const testResults: TestResult[] = [];
      
      for (let i = 0; i < testCount; i++) {
        const startTime = performance.now();
        let status = 200;
        let responseTime = 0;
        
        try {
          // Use a CORS proxy or test with proper error handling
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
          
          const response = await fetch(url, {
            method: 'GET',
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
            }
          });
          
          clearTimeout(timeoutId);
          const endTime = performance.now();
          responseTime = endTime - startTime;
          status = response.status;
          
          // Read response to ensure full request completion
          await response.text();
          
        } catch (err: any) {
          const endTime = performance.now();
          responseTime = endTime - startTime;
          
          // Handle different error types
          if (err.name === 'AbortError') {
            status = 408; // Request timeout
            responseTime = 10000; // 10 seconds
          } else if (err.message?.includes('CORS') || err.message?.includes('Failed to fetch')) {
            // CORS error - still measure the time it took to fail
            status = 0; // CORS blocked
          } else {
            status = 500; // Server error
          }
        }
        
        testResults.push({
          url: url,
          responseTime: Math.round(responseTime),
          status: status,
          timestamp: new Date()
        });
        
        // Wait between requests to avoid rate limiting
        if (i < testCount - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      setResults(testResults);
    } catch (err) {
      setError("Failed to test API. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const averageTime = results.length > 0
    ? results.reduce((sum, r) => sum + r.responseTime, 0) / results.length
    : 0;

  const minTime = results.length > 0
    ? Math.min(...results.map(r => r.responseTime))
    : 0;

  const maxTime = results.length > 0
    ? Math.max(...results.map(r => r.responseTime))
    : 0;

  const getPerformanceRating = (time: number) => {
    if (time < 200) return { rating: "Excellent", color: "text-green-400" };
    if (time < 500) return { rating: "Good", color: "text-yellow-400" };
    if (time < 1000) return { rating: "Fair", color: "text-orange-400" };
    return { rating: "Slow", color: "text-red-400" };
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Activity size={28} className="text-cyan-400" />
          <span>Test API Response Time</span>
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              placeholder="https://api.example.com/endpoint"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
            <button
              onClick={testAPI}
              disabled={loading}
              className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Testing..." : "Test API"}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Tests: {testCount}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={testCount}
              onChange={(e) => setTestCount(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </p>
        )}
        <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-xs text-gray-400">
            <strong className="text-cyan-400">Note:</strong> Some APIs may block requests due to CORS policies. 
            Response times are measured from the client side. For accurate server-side metrics, use server monitoring tools.
          </p>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <>
          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp size={24} className="text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Average</h3>
              </div>
              <div className={`text-3xl font-bold mb-2 ${getPerformanceRating(averageTime).color}`}>
                {averageTime.toFixed(0)}ms
              </div>
              <p className="text-sm text-gray-400">{getPerformanceRating(averageTime).rating}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={24} className="text-green-400" />
                <h3 className="text-lg font-bold text-white">Fastest</h3>
              </div>
              <div className="text-3xl font-bold mb-2 text-green-400">
                {minTime.toFixed(0)}ms
              </div>
              <p className="text-sm text-gray-400">Best response time</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle size={24} className="text-red-400" />
                <h3 className="text-lg font-bold text-white">Slowest</h3>
              </div>
              <div className="text-3xl font-bold mb-2 text-red-400">
                {maxTime.toFixed(0)}ms
              </div>
              <p className="text-sm text-gray-400">Worst response time</p>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6 text-white">Test Results</h3>
            <div className="space-y-3">
              {results.map((result, index) => {
                const rating = getPerformanceRating(result.responseTime);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                        rating.color.includes('green') ? 'bg-green-500/20 text-green-400' :
                        rating.color.includes('yellow') ? 'bg-yellow-500/20 text-yellow-400' :
                        rating.color.includes('orange') ? 'bg-orange-500/20 text-orange-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          Test #{index + 1}
                        </div>
                        <div className="text-sm text-gray-400">
                          {result.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-xl font-bold ${rating.color}`}>
                          {result.responseTime.toFixed(0)}ms
                        </div>
                        <div className="text-xs text-gray-400">{rating.rating}</div>
                      </div>
                      {result.status === 200 ? (
                        <CheckCircle2 size={24} className="text-green-400" />
                      ) : result.status === 0 ? (
                        <AlertCircle size={24} className="text-yellow-400" title="CORS blocked - cannot verify status" />
                      ) : (
                        <X size={24} className="text-red-400" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <CheckCircle2 size={20} className="text-cyan-400" />
              <span>Performance Tips</span>
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Target response time: &lt; 200ms for excellent performance</li>
              <li>• Use caching to reduce API calls</li>
              <li>• Optimize database queries</li>
              <li>• Consider using a CDN for static content</li>
              <li>• Monitor API performance regularly</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

