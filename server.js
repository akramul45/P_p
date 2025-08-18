import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// 🔑 API Key (সুরক্ষিত রাখতে backend এ রাখলাম)
const YT_API_KEY = "YOUR_YOUTUBE_DATA_API_KEY";

// API Endpoint → Get Video Info
app.get("/api/video", async (req, res) => {
  try {
    const videoId = req.query.id;

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,status&id=${videoId}&key=${YT_API_KEY}`;
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.items || result.items.length === 0) {
      return res.json({ error: "Video not found" });
    }

    const video = result.items[0];
    const snippet = video.snippet;
    const stats = video.statistics;

    res.json({
      title: snippet.title,
      thumbnail: snippet.thumbnails.high.url,
      uploadTime: snippet.publishedAt,
      views: stats.viewCount || 0,
      likes: stats.likeCount || 0,
      dislikes: "N/A", // API v3 dislikes hidden
      comments: stats.commentCount || 0,
      audience: video.status.madeForKids ? "Yes" : "No",
      category: snippet.categoryId,
      license: video.status.license
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Server Start
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

