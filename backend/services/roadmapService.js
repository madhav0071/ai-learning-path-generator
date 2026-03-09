const topicsData = require("../data/topics.json");
const searchYouTube = require("./youtubeService");

async function generateRoadmap(goal, weeks) {
  const goalKey = goal.toLowerCase();

  const topics = topicsData[goalKey] || [];

  const roadmap = [];

  for (let i = 0; i < weeks; i++) {
    let topic = topics[i] ? topics[i].topic : "Practice Project";

    const resources = await searchYouTube(topic);

    roadmap.push({
      week: i + 1,
      topic: topic,
      resources: resources,
    });
  }

  return roadmap;
}

module.exports = generateRoadmap;
