const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🧭 CodeCompass Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      analyzeWebsite: 'POST /api/analyze/website',
      analyzeGithub: 'POST /api/analyze/github'
    },
    frontend: 'http://localhost:5173'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '🧭 CodeCompass backend is running!',
    timestamp: new Date().toISOString() 
  });
});

// Website analysis endpoint
app.post('/api/analyze/website', async (req, res) => {
  const { url } = req.body;
  
  console.log(`🌐 Analyzing website: ${url}`);
  
  // TODO: Implement website analysis
  res.json({ 
    type: 'website',
    url,
    status: 'success',
    data: {
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      performance: { score: 85 },
      complexity: 'intermediate',
      learningPath: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript']
    },
    message: 'Website analysis complete! (Mock data)'
  });
});

// GitHub analysis endpoint
app.post('/api/analyze/github', async (req, res) => {
  const { url } = req.body;
  
  console.log(`📁 Analyzing GitHub repo: ${url}`);
  
  // TODO: Implement GitHub repository analysis
  res.json({ 
    type: 'github',
    url,
    status: 'success',
    data: {
      name: 'Sample Repository',
      language: 'TypeScript',
      technologies: ['React', 'Node.js', 'Express'],
      completionPercentage: 75,
      complexity: 'advanced',
      fileCount: 127
    },
    message: 'GitHub analysis complete! (Mock data)'
  });
});

app.listen(PORT, () => {
  console.log(`🧭 CodeCompass backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
