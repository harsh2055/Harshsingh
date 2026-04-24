const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'harsh2055';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubHeaders = () => ({
  'Accept': 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN ? { 'Authorization': `token ${GITHUB_TOKEN}` } : {})
});

// GET /api/github/stats
router.get('/stats', async (req, res) => {
  try {
    const [userRes, reposRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers: githubHeaders() }),
      axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers: githubHeaders() })
    ]);

    const user = userRes.data;
    const repos = reposRes.data;

    // Language aggregation
    const langCounts = {};
    repos.forEach(r => { if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1; });
    const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0);
    const languages = Object.entries(langCounts)
      .map(([lang, count]) => ({ lang, count, pct: Math.round((count / totalLangRepos) * 100) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    res.json({
      username: user.login,
      name: user.name,
      bio: user.bio,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      createdAt: user.created_at,
      languages,
      recentRepos: repos.slice(0, 8).map(r => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        updatedAt: r.updated_at,
        topics: r.topics
      }))
    });
  } catch (err) {
    res.status(500).json({ message: 'GitHub API error', error: err.message });
  }
});

// GET /api/github/contributions — contribution summary
router.get('/contributions', async (req, res) => {
  try {
    const reposRes = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
      { headers: githubHeaders() }
    );
    const repos = reposRes.data;
    const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
    res.json({
      totalRepos: repos.length,
      totalStars,
      topLanguages: repos
        .filter(r => r.language)
        .reduce((acc, r) => { acc[r.language] = (acc[r.language] || 0) + 1; return acc; }, {})
    });
  } catch (err) {
    res.status(500).json({ message: 'GitHub API error' });
  }
});

module.exports = router;
