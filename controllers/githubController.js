const {
  analyzeGithubProfile,
} = require("../services/githubService");

const {
  saveProfile,
} = require("../models/profileModel");

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile =
      await analyzeGithubProfile(username);

    await saveProfile(profile);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeProfile,
};

const {
  getAllProfiles,
  getProfileByUsername,
} = require("../models/profileModel");

const fetchAllProfiles = async (req, res) => {
  try {
    const profiles = await getAllProfiles();

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchSingleProfile = async (req, res) => {
  try {
    const profile =
      await getProfileByUsername(req.params.username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeProfile,
  fetchAllProfiles,
  fetchSingleProfile,
};