function parseGoal(input) {
  const lowerInput = input.toLowerCase();

  // detect weeks
  let weeks = 4;
  const weekMatch = lowerInput.match(/(\d+)\s*week/);

  if (weekMatch) {
    weeks = parseInt(weekMatch[1]);
  }

  // detect months
  const monthMatch = lowerInput.match(/(\d+)\s*month/);
  if (monthMatch) {
    weeks = parseInt(monthMatch[1]) * 4;
  }

  // detect days
  const dayMatch = lowerInput.match(/(\d+)\s*day/);
  if (dayMatch) {
    weeks = Math.ceil(parseInt(dayMatch[1]) / 7);
  }

  // remove common phrases
  let goal = lowerInput
    .replace(/i want to learn/g, "")
    .replace(/teach me/g, "")
    .replace(/\blearn\b/g, "")
    .replace(/\bstudy\b/g, "")
    .replace(/in \d+ weeks?/g, "")
    .replace(/in \d+ months?/g, "")
    .trim();

  // alias normalization
  const goalAliases = {
    js: "javascript",
    "node js": "nodejs",
    node: "nodejs",
    reactjs: "react",
    ml: "machine learning",
    mongo: "mongodb",
    "mongo db": "mongodb",
  };

  if (goalAliases[goal]) {
    goal = goalAliases[goal];
  }

  return {
    goal,
    weeks,
  };
}

module.exports = parseGoal;
