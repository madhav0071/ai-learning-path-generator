require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.YOUTUBE_API_KEY;

async function searchYouTube(query) {
  try {
    const goal = query.split(" ")[0].toLowerCase();

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          maxResults: 5,
          type: "video",
          key: API_KEY,
        },
      },
    );

    const filtered = response.data.items.filter((video) => {
      const title = video.snippet.title.toLowerCase();

      return (
        title.includes(goal) &&
        !title.includes("short") &&
        !title.includes("#shorts") &&
        !title.includes("in 5 minutes") &&
        !title.includes("in 10 minutes")
      );
    });

    return filtered.slice(0, 3).map((video) => ({
      title: video.snippet.title,
      url: `https://youtube.com/watch?v=${video.id.videoId}`,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}


module.exports = searchYouTube;
