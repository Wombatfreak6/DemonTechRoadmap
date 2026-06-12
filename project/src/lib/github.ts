export interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
}

export interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const REPO_OWNER = "Demon-Die";
const REPO_NAME = "DemonTechRoadmap";

export async function getRepoDetails(): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch GitHub repo details", error);
    return null;
  }
}

export async function getContributors(): Promise<GitHubContributor[] | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=20`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch GitHub contributors", error);
    return null;
  }
}
