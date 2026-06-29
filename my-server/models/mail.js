const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema(
  {
    to: { type: String, required: true },
    from: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

// Use existing model if already compiled, otherwise create it
module.exports =
  mongoose.models.Mail || mongoose.model("Mail", mailSchema);