const axios = require("axios");

const analyzeGithubProfile = async (username) => {
  const userResponse = await axios.get(
    `https://api.github.com/users/${username}`
  );

  const reposResponse = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );

  const user = userResponse.data;
  const repos = reposResponse.data;

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );


  const totalWatchers = repos.reduce(
  (sum, repo) => sum + repo.watchers_count,
  0
);

const topRepo = repos.reduce(
  (best, repo) =>
    repo.stargazers_count >
    (best?.stargazers_count || 0)
      ? repo
      : best,
  null
);

  const totalForks = repos.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );

  const accountAgeDays = Math.floor(
    (Date.now() - new Date(user.created_at)) /
      (1000 * 60 * 60 * 24)
  );

  const developerScore = (
    user.followers * 0.4 +
    totalStars * 0.4 +
    user.public_repos * 0.2
  ).toFixed(2);

  return {
  username: user.login,
  name: user.name,

  bio: user.bio,
  company: user.company,
  location: user.location,
  blog: user.blog,

  public_repos: user.public_repos,
  followers: user.followers,
  following: user.following,

  total_stars: totalStars,
  total_forks: totalForks,
  total_watchers: totalWatchers,

  top_repo: topRepo ? topRepo.name : null,

  account_age_days: accountAgeDays,
  developer_score: developerScore,
  profile_url: user.html_url,
};
};

module.exports = { analyzeGithubProfile };