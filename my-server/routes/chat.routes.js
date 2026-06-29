const express = require("express");
const axios = require("axios");
const router = express.Router();

// Simple OpenAI Chat Completions example
router.post("/assistant", async (req, res, next) => {
  try {
    const { messages } = req.body;

    // Add system prompt to keep it focused on your app
    const fullMessages = [
      {
        role: "system",
        content:
          "You are CRM Riv Assistant. Answer only questions about this CRM, pricing, student records, and dashboard features. If asked anything else, politely say you can only help with CRM Riv.",
      },
      ...(messages || []),
    ];

    const openaiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-mini", // or whichever you use
        messages: fullMessages,
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const assistantMessage = openaiRes.data.choices[0].message;
    res.json({ reply: assistantMessage });
  } catch (err) {
    console.error("Chat assistant error:", err.response?.data || err);
    res.status(500).json({ error: "Assistant failed" });
  }
});

module.exports = router;