const { GitHubAnalyzer } = require('../services/githubApi');

async function testGitHub() {
  const analyzer = new GitHubAnalyzer();
  
  try {
    const repoInfo = await analyzer.getRepositoryInfo('facebook', 'react');
    console.log('✅ GitHub API working!', repoInfo.name);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testGitHub();
