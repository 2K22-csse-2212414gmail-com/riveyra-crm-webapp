// routes/prices.routes.js
const express = require("express");
const router = express.Router();
const razorpay = require("../config/razorpay");

// map your plan ids to amounts (in paise)
const PLAN_PRICES = {
  starter: 0,
  pro: 99900,        // ₹999 → 999 * 100
  enterprise: 0,     // will be “contact sales”
};

// POST /api/prices/create-order
router.post("/create-order", async (req, res, next) => {
  try {
    const { planId } = req.body;

    if (!PLAN_PRICES.hasOwnProperty(planId)) {
      return res.status(400).json({ error: "Invalid planId" });
    }

    const amount = PLAN_PRICES[planId];
    if (amount === 0) {
      return res.status(400).json({ error: "This plan does not require payment" });
    }

    const options = {
      amount,         // in paise
      currency: "INR",
      receipt: `order_${planId}_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options); // Razorpay API

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      planId,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    next(err);
  }
});

module.exports = router;