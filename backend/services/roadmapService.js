const topicsData = require("../data/topics.json");
const searchYouTube = require("./youtubeService");
const generateTopics = require("./topicGenerator");

async function generateRoadmap(goal, weeks) {
  const goalKey = goal.toLowerCase();

  let topics = topicsData[goalKey];
  if (!topics) {
    topics = generateTopics(goal, weeks);
  }

  const roadmap = [];

  for (let i = 0; i < weeks; i++) {
    let topic;
    if (topicsData[goalKey]) {
      topic = topics[i] ? topics[i].topic : `${goal} practice`;
    } else {
      topic = topics[i].topic;
    }

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
