// models/Subscription.js
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    planId: { type: String, enum: ["starter", "pro", "enterprise"], required: true },
    status: { type: String, enum: ["active", "expired", "canceled"], default: "active" },
    razorpay_order_id: String,
    razorpay_payment_id: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);