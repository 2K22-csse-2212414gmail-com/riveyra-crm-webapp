// routes/payments.routes.js
const express = require("express");
const crypto = require("crypto");
const router = express.Router();

// TODO: import your User / Subscription model if needed
// const User = require("../models/User");
// const Subscription = require("../models/Subscription");

router.post("/verify", async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      userId, // you can send userId from frontend if you have auth
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment fields" });
    }

    const signData = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(signData)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    // At this point, payment is verified.
    // TODO: mark subscription active in DB:
    await subscriptionModel.create({ userId, planId, status: "active", razorpay_order_id, razorpay_payment_id });

    console.log("Payment verified for user:", userId, "plan:", planId);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;