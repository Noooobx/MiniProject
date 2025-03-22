import express from "express";
import axios from "axios";

const newsRouter = express.Router();

newsRouter.get("/view", async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY || "978b530dc1c042268598aab3b901510e";
    console.log(apiKey)
    const response = await axios.get("https://newsapi.org/v2/everything", {
        params: { q: "agriculture OR farming OR crops", language: "en", sortBy: "publishedAt", apiKey },
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
      });
      

    res.json(response.data); // Send the fetched news as JSON
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

export default newsRouter;
