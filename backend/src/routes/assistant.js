import express from "express";

const assistantRouter = express.Router();

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

assistantRouter.post("/chat", async (req, res) => {
  const { prompt, language = "en" } = req.body;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    return res.status(500).json({ message: "GEMINI_API_KEY is not configured on the server." });
  }

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ message: "Prompt is required." });
  }

  const langInstruction =
    language === "hi"
      ? "Reply in Hindi (हिन्दी)."
      : language === "ml"
        ? "Reply in Malayalam (മലയാളം)."
        : "Reply in English.";

  try {
    const response = await fetch(`${GEMINI_URL}?key=${geminiApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an agricultural assistant for FarmDirect, helping farmers with crops, soil, fertilizers, pests, yield, and market advice. ${langInstruction}\n\nUser: ${prompt}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data?.error?.message || "Gemini request failed.",
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm not sure how to respond.";

    return res.status(200).json({ text });
  } catch (error) {
    console.error("Assistant route error:", error);
    return res.status(500).json({ message: "AI service is temporarily unavailable." });
  }
});

export default assistantRouter;
