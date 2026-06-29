// routes/talk.js
const express = require("express");
const { NlpManager } = require("node-nlp");

const router = express.Router();

const nlpManager = new NlpManager({
  languages: ["en", "es", "fr", "de", "uk", "jp"],
  forceNER: true,
});

async function initNlp() {
  nlpManager.addDocument("en", "Hello", "greet.hello");
  nlpManager.addDocument("en", "Hi", "greet.hello");
  nlpManager.addDocument("es", "Hola", "greet.hello");
  nlpManager.addDocument("fr", "Bonjour", "greet.hello");
  nlpManager.addDocument("de", "Hallo", "greet.hello");
  nlpManager.addDocument("uk", "Привіт", "greet.hello");
  nlpManager.addDocument("jp", "こんにちは", "greet.hello");

  nlpManager.addAnswer("en", "greet.hello", "Hello! How can we assist you today?");
  nlpManager.addAnswer("es", "greet.hello", "¡Hola! ¿Cómo podemos ayudarte hoy?");
  nlpManager.addAnswer("fr", "greet.hello", "Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?");
  nlpManager.addAnswer("de", "greet.hello", "Hallo! Wie können wir Ihnen heute helfen?");
  nlpManager.addAnswer("uk", "greet.hello", "Привіт! Чим ми можемо вам допомогти сьогодні?");
  nlpManager.addAnswer("jp", "greet.hello", "こんにちは！今日は何かお手伝いできることはありますか？");

  await nlpManager.train();
  nlpManager.save();
}

initNlp().catch((err) => {
  console.error("Error initializing NLP:", err);
});

router.get("/:lang", async (req, res) => {
  try {
    const lang = req.params.lang || "en";
    const supported = ["en", "es", "fr", "de", "uk", "jp"];

    if (!supported.includes(lang)) {
      return res.status(400).json({ error: "Unsupported language code" });
    }

    const sampleInputs = {
      en: "Hello",
      es: "Hola",
      fr: "Bonjour",
      de: "Hallo",
      jp: "こんにちは",
    };

    const utterance = sampleInputs[lang] || "Hello";
    const response = await nlpManager.process(lang, utterance);

    res.json({ lang, utterance, response });
  } catch (err) {
    console.error("NLP error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;