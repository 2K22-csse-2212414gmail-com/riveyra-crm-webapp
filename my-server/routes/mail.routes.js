// routes/mail.routes.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Mail = require("../models/Mail");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    const mailDoc = await Mail.create({
      from: process.env.EMAIL_USER,
      to,
      subject,
      body: text,
      preview: text.slice(0, 80),
      status: "sent",
    });

    res.status(200).json({ message: "Email sent successfully", mail: mailDoc });
  } catch (error) {
    console.error("Error sending email:", error);

    const mailDoc = await Mail.create({
      from: process.env.EMAIL_USER,
      to,
      subject,
      body: text,
      preview: text.slice(0, 80),
      status: "failed",
    });

    res.status(500).json({ message: "Failed to send email", mail: mailDoc });
  }
});

module.exports = router;