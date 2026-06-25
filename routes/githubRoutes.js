const express = require("express");



const {
  analyzeProfile,
  fetchAllProfiles,
  fetchSingleProfile,
} = require("../controllers/githubController");

const router = express.Router();

router.post("/analyze/:username", analyzeProfile);

router.get("/profiles", fetchAllProfiles);

router.get(
  "/profiles/:username",
  fetchSingleProfile
);

router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    database: "Connected",
    timestamp: new Date(),
  });
});

module.exports = router;