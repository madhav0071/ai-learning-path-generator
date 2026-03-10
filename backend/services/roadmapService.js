const topicsData = require("../data/topics.json");
const searchYouTube = require("./youtubeService");
const generateTopics = require("./topicGenerator");
const curatedResources = require("../data/resources.json");
const roadmaps = require("../data/roadmaps.json");

async function generateRoadmap(goal, weeks) {
  const goalKey = goal.toLowerCase().replace(".", "").trim();

  let topics;

  if (roadmaps[goalKey]) {
    let roadmapTopics = roadmaps[goalKey];

    if (weeks < roadmapTopics.length) {
      roadmapTopics = roadmapTopics.slice(0, weeks);
    }

    topics = roadmapTopics.map((topic) => ({ topic }));
  } else if (topicsData[goalKey]) {
    topics = topicsData[goalKey];
  } else {
    topics = generateTopics(goal, weeks);
  }

  const roadmap = [];

  for (let i = 0; i < weeks; i++) {
    let topic;
    if (topicsData[goalKey]) {
      topic = topics[i]?.topic || `${goal} practice`;
    } else {
      topic = topics[i].topic;
    }

    const topicKey = topic.toLowerCase();

    let resources;

    const goalResources = curatedResources[goalKey];

    if (goalResources) {
      const matchedKey = Object.keys(goalResources).find((key) =>
        topicKey.includes(key.split(" ")[0]),
      );

      if (matchedKey) {
        resources = goalResources[matchedKey];
      }
    }

    if (!resources) {
      resources = await searchYouTube(topic);
    }

    roadmap.push({
      week: i + 1,
      topic: topic,
      resources: resources,
    });
  }

  return roadmap;
}

module.exports = generateRoadmap;
