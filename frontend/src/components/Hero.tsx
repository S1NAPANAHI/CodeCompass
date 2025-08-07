const Hero: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="text-6xl mb-4">🧭</div>
          
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-yellow-300">CodeCompass</span><br />
            Navigate Your Way to Full-Stack Mastery
          </h1>
          
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Analyze any website or GitHub repository to understand how they're built. 
            Get beginner-friendly explanations and personalized learning paths.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors transform hover:scale-105">
              Analyze a site
            </button>
            <button className="bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors transform hover:scale-105">
              Explore GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
