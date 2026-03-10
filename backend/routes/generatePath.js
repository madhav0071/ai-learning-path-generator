/**
 * @swagger
 * /generate:
 *   post:
 *     summary: Generate a learning roadmap
 *     description: Parses natural language input and returns a structured learning roadmap with resources.
 *     tags:
 *       - Roadmap
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               input:
 *                 type: string
 *                 example: "Teach me Python in 2 months"
 *     responses:
 *       200:
 *         description: Roadmap generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 goal:
 *                   type: string
 *                   example: python
 *                 weeks:
 *                   type: number
 *                   example: 8
 *                 roadmap:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       week:
 *                         type: number
 *                         example: 1
 *                       topic:
 *                         type: string
 *                         example: Python Basics
 *                       resources:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             title:
 *                               type: string
 *                               example: Python Tutorial for Beginners
 *                             url:
 *                               type: string
 *                               example: https://youtube.com/watch?v=xxxxx
 */
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
