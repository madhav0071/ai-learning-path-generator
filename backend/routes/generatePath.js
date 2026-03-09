const express = require("express");
const router = express.Router();

const generateRoadmap = require("../services/roadmapService");
const parseGoal = require("../services/goalParser");

router.post("/", async (req, res) => {
  const { input } = req.body;
  const { goal, weeks } = parseGoal(input);

  const roadmap = await generateRoadmap(goal, weeks);

  res.json({
    goal,
    weeks,
    roadmap,
  });
});

module.exports = router;
