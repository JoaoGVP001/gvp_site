const GITHUB_USER = "JoaoGVP001";
const GITHUB_REPOSITORY = "BookReadNet";
const GITHUB_API_VERSION = "2026-03-10";
const GITHUB_CACHE_TTL = 60 * 60 * 1000;
const FALLBACK_CACHE_TTL = 5 * 60 * 1000;

type GitHubProfileResponse = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

type GitHubRepositoryResponse = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  default_branch: string;
  pushed_at: string;
};

type GitHubLanguagesResponse = Record<string, number>;

export type GitHubSnapshot = {
  source: "github" | "fallback";
  refreshedAt: string;
  profile: {
    login: string;
    name: string;
    avatarUrl: string;
    profileUrl: string;
    location: string;
    publicRepos: number;
    followers: number;
    following: number;
  };
  repository: {
    name: string;
    url: string;
    description: string;
    primaryLanguage: string;
    stars: number;
    forks: number;
    defaultBranch: string;
    pushedAt: string | null;
    languages: Array<{ name: string; percentage: number }>;
  };
};

type CacheEntry = {
  expiresAt: number;
  value: GitHubSnapshot;
};

const sharedCache = globalThis as typeof globalThis & {
  __joaoGitHubSnapshot?: CacheEntry;
};

const BOOKREADNET_DESCRIPTION =
  "Aplicação desktop para organizar e ler HQs, mangás e livros digitais.";

function fallbackSnapshot(): GitHubSnapshot {
  return {
    source: "fallback",
    refreshedAt: new Date().toISOString(),
    profile: {
      login: GITHUB_USER,
      name: "João Guilherme",
      avatarUrl: `https://github.com/${GITHUB_USER}.png?size=160`,
      profileUrl: `https://github.com/${GITHUB_USER}`,
      location: "Concórdia, Santa Catarina, Brasil",
      publicRepos: 4,
      followers: 13,
      following: 20,
    },
    repository: {
      name: GITHUB_REPOSITORY,
      url: `https://github.com/${GITHUB_USER}/${GITHUB_REPOSITORY}`,
      description: BOOKREADNET_DESCRIPTION,
      primaryLanguage: "Python",
      stars: 1,
      forks: 0,
      defaultBranch: "main",
      pushedAt: null,
      languages: [{ name: "Python", percentage: 100 }],
    },
  };
}

async function fetchGitHub<T>(path: string): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "gvp-site",
      "X-GitHub-Api-Version": GITHUB_API_VERSION,
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function languagePercentages(languages: GitHubLanguagesResponse) {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  if (total === 0) return [{ name: "Python", percentage: 100 }];

  return Object.entries(languages)
    .map(([name, bytes]) => ({ name, percentage: Math.round((bytes / total) * 100) }))
    .filter((language) => language.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage);
}

export async function getGitHubSnapshot(): Promise<GitHubSnapshot> {
  const cached = sharedCache.__joaoGitHubSnapshot;
  const now = Date.now();

  if (cached && cached.expiresAt > now) return cached.value;

  try {
    const [profile, repository, languages] = await Promise.all([
      fetchGitHub<GitHubProfileResponse>(`/users/${GITHUB_USER}`),
      fetchGitHub<GitHubRepositoryResponse>(`/repos/${GITHUB_USER}/${GITHUB_REPOSITORY}`),
      fetchGitHub<GitHubLanguagesResponse>(`/repos/${GITHUB_USER}/${GITHUB_REPOSITORY}/languages`),
    ]);

    const value: GitHubSnapshot = {
      source: "github",
      refreshedAt: new Date().toISOString(),
      profile: {
        login: profile.login,
        name: profile.name ?? "João Guilherme",
        avatarUrl: profile.avatar_url,
        profileUrl: profile.html_url,
        location: profile.location ?? "Brasil",
        publicRepos: profile.public_repos,
        followers: profile.followers,
        following: profile.following,
      },
      repository: {
        name: repository.name,
        url: repository.html_url,
        description: repository.description ?? BOOKREADNET_DESCRIPTION,
        primaryLanguage: repository.language ?? "Python",
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        defaultBranch: repository.default_branch,
        pushedAt: repository.pushed_at,
        languages: languagePercentages(languages),
      },
    };

    sharedCache.__joaoGitHubSnapshot = { value, expiresAt: now + GITHUB_CACHE_TTL };
    return value;
  } catch {
    const value = fallbackSnapshot();
    sharedCache.__joaoGitHubSnapshot = { value, expiresAt: now + FALLBACK_CACHE_TTL };
    return value;
  }
}
