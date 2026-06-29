const express = require("express");
const Contact = require("../models/contact");

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log("Received contact message:", { name, email, subject, message });

    // Create and save the document
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    res.json({
      success: true,
      reply: "Thanks for reaching out! We have received your message.",
      id: contact._id,
    });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ success: false, message: "Error saving contact" });
  }
});

module.exports = router;