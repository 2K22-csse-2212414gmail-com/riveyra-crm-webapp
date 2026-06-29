// D:\CRM_riv\my-server\index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const model=require("./models/User");
const subscriptionModel=require("./models/Subscription");
const contactModel=require("./models/contact");
const mailModel=require("./models/mail");
const geoModel=require("./models/Location");
//const mailModel=require("./models/mail");

const { Configuration, OpenAIApi } = require("openai");

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// Routers
const apiRoutes = require("./routes");      // routes/index.js
//const userRouter = require("./routes/");

const app = express();

// ----- MongoDB connection  -----
//const MONGODB_URI = "mongodb://127.0.0.1:27017/crm_riv";

mongoose
  .connect("mongodb://127.0.0.1:27017/crm_riv")
  .then(() => {
    console.log("MongoDB connected to dashboard_db");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// ----- Core middleware -----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// ----- Health check -----
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ----- API routes -----
app.use("/api", apiRoutes);
app.use("/api/contact",contactModel);
app.use("/api/subscription",subscriptionModel);
app.use("/api/user",model);
app.use("/api/mail",mailModel);
app.use("/api/location",geoModel);
// /api/dashboard, /api/analytics, /api/prices, /api/reports, etc.
//app.use("/api/user", userRouter); // /api/user, /api/user/:id
    // /api/dashboard, /api/analytics, /api/prices, /api/reports, etc.
//app.use("/api/user", userRouter); // /api/user, /api/user/:id

// ----- 404 handler -----
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl,
  });
});

// ----- Error handler -----
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// ----- Start server -----
const PORT = 5000; // hardcoded instead of env
app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
});

module.exports = app;