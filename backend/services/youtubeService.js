require("dotenv").config();

const axios = require("axios");

const API_KEY = process.env.YOUTUBE_API_KEY;

async function searchYouTube(query) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search`;

    const response = await axios.get(url, {
      params: {
        part: "snippet",
        q: `${query} tutorial full course`,
        maxResults: 2,
        type: "video",
        videoDuration: "medium",
        order: "relevance",
        key: API_KEY,
      },
    });

    return response.data.items.map((video) => ({
      title: video.snippet.title,
      url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
    }));
  } catch (error) {
    console.error("YouTube API error:", error.message);
    return [];
  }
}

module.exports = searchYouTube;
