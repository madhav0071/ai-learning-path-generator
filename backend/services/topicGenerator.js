function generateTopics(goal, weeks) {
  const topics = [];

  topics.push(`Introduction to ${goal}`);
  topics.push(`${goal} fundamentals`);
  topics.push(`Intermediate ${goal}`);
  topics.push(`Advanced ${goal}`);
  topics.push(`${goal} tools and ecosystem`);
  topics.push(`${goal} project`);

  const roadmap = [];

  for (let i = 0; i < weeks; i++) {
    roadmap.push({
      week: i + 1,
      topic: topics[i] || `${goal} practice project`,
    });
  }

  return roadmap;
}

module.exports = generateTopics;
