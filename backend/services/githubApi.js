require('dotenv').config();

class GitHubAnalyzer {
  constructor() {
    this.octokit = null;
    this.initOctokit();
  }

  async initOctokit() {
    const { Octokit } = await import('@octokit/rest');
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
  }

  async getRepositoryInfo(owner, repo) {
    if (!this.octokit) {
      await this.initOctokit();
    }
    
    try {
      const { data } = await this.octokit.rest.repos.get({
        owner,
        repo
      });

      return {
        name: data.name,
        fullName: data.full_name,
        description: data.description,
        language: data.language,
        stars: data.stargazers_count,
        forks: data.forks_count,
        topics: data.topics,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        size: data.size,
        defaultBranch: data.default_branch
      };
    } catch (error) {
      throw new Error(`Failed to fetch repository: ${error.message}`);
    }
  }

  async getRepositoryContents(owner, repo, path = '') {
    try {
      const { data } = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path
      });

      return data;
    } catch (error) {
      throw new Error(`Failed to fetch contents: ${error.message}`);
    }
  }

  async getRepositoryLanguages(owner, repo) {
    try {
      const { data } = await this.octokit.rest.repos.listLanguages({
        owner,
        repo
      });

      return data;
    } catch (error) {
      throw new Error(`Failed to fetch languages: ${error.message}`);
    }
  }
}

module.exports = { GitHubAnalyzer };
