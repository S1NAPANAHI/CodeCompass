import { Octokit } from "@octokit/rest";

export class GitHubAnalyzer {
  private octokit: Octokit;

  constructor(token?: string) {
    this.octokit = new Octokit({
      auth: token,
    });
  }

  async getRepositoryInfo(owner: string, repo: string) {
    try {
      const { data } = await this.octokit.rest.repos.get({
        owner,
        repo,
      });
      
      return {
        name: data.name,
        description: data.description,
        language: data.language,
        stars: data.stargazers_count,
        forks: data.forks_count,
        topics: data.topics,
      };
    } catch (error) {
      throw new Error(`Failed to fetch repository: ${error}`);
    }
  }
}