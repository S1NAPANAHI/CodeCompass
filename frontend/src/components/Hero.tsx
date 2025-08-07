import React, { useState } from 'react';

const Hero: React.FC = () => {
  const [analysisType, setAnalysisType] = useState('website');
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    console.log(`🧭 Analyzing ${analysisType}: ${url}`);
    
    // TODO: Connect to backend API
    setTimeout(() => {
      setIsAnalyzing(false);
      console.log('Analysis complete!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-8xl mb-6">🧭</div>
          
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
              CodeCompass
            </h1>
            <p className="text-2xl text-blue-200 font-light">
              Navigate Your Way to Full-Stack Mastery
            </p>
          </div>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Analyze any website OR GitHub repository to understand how they're built. 
            Get beginner-friendly explanations and personalized learning paths.
          </p>
          
          {/* Analysis Type Toggle */}
          <div className="flex justify-center mb-8">
            <button 
              className={`px-8 py-3 rounded-l-lg font-semibold transition-all ${
                analysisType === 'website' 
                  ? 'bg-yellow-400 text-gray-900' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setAnalysisType('website')}
            >
              🌐 Website
            </button>
            <button 
              className={`px-8 py-3 rounded-r-lg font-semibold transition-all ${
                analysisType === 'github' 
                  ? 'bg-yellow-400 text-gray-900' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setAnalysisType('github')}
            >
              📁 GitHub Repo
            </button>
          </div>

          {/* URL Input */}
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={
                analysisType === 'website' 
                  ? "Enter website URL (e.g., stripe.com)"
                  : "GitHub repo (e.g., facebook/react or github.com/facebook/react)"
              }
              className="w-full px-4 py-3 rounded-lg text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            />
            
            <button
              onClick={handleAnalyze}
              disabled={!url.trim() || isAnalyzing}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-400 disabled:cursor-not-allowed text-gray-900 font-bold py-4 px-8 rounded-lg transition-all text-lg flex items-center justify-center"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-3">
                  </div>
                  Analyzing...
                </>
              ) : (
                `🧭 Analyze ${analysisType === 'website' ? 'Website' : 'Repository'}`
              )}
            </button>
          </div>
          
          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-white font-semibold mb-2">Tech Stack Detection</h3>
              <p className="text-gray-300 text-sm">Identify frameworks, libraries & tools</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-white font-semibold mb-2">Code Explanations</h3>
              <p className="text-gray-300 text-sm">Complex concepts made simple</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-white font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-300 text-sm">See project completion status</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="text-white font-semibold mb-2">Learning Paths</h3>
              <p className="text-gray-300 text-sm">Personalized study roadmaps</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
