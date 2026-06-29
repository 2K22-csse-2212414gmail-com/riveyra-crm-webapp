// backend/src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["Student", "Tutor", "Admin"],
      default: "Student",
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Suspended"],
      default: "Active",
    },
    createdAt: {
      type: String, // keep as "YYYY-MM-DD" string to match your UI
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);