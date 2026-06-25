const db = require("../config/db");

// Save or Update Profile
const saveProfile = (profile) => {
  const sql = `
    INSERT INTO github_profiles (
      username,
      name,
      bio,
      company,
      location,
      blog,
      public_repos,
      followers,
      following,
      total_stars,
      total_forks,
      total_watchers,
      top_repo,
      account_age_days,
      developer_score,
      profile_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      bio = VALUES(bio),
      company = VALUES(company),
      location = VALUES(location),
      blog = VALUES(blog),
      public_repos = VALUES(public_repos),
      followers = VALUES(followers),
      following = VALUES(following),
      total_stars = VALUES(total_stars),
      total_forks = VALUES(total_forks),
      total_watchers = VALUES(total_watchers),
      top_repo = VALUES(top_repo),
      account_age_days = VALUES(account_age_days),
      developer_score = VALUES(developer_score),
      profile_url = VALUES(profile_url)
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [
        profile.username,
        profile.name,
        profile.bio,
        profile.company,
        profile.location,
        profile.blog,
        profile.public_repos,
        profile.followers,
        profile.following,
        profile.total_stars,
        profile.total_forks,
        profile.total_watchers,
        profile.top_repo,
        profile.account_age_days,
        profile.developer_score,
        profile.profile_url,
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// Get All Profiles
const getAllProfiles = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM github_profiles ORDER BY analyzed_at DESC",
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

// Get Single Profile
const getProfileByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM github_profiles WHERE username = ?",
      [username],
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      }
    );
  });
};

module.exports = {
  saveProfile,
  getAllProfiles,
  getProfileByUsername,
};