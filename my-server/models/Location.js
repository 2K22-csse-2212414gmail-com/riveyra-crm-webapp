// models/Location.js
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    pin: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    geo: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
  },
  { timestamps: true }
);

// locationSchema.index({ geo: "2dsphere" });

module.exports = mongoose.model("Location", locationSchema);