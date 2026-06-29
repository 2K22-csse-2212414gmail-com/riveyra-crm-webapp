// routes/analytics.routes.js
const express = require("express");
const router = express.Router();

const trafficSummary = [
  { label: "Total Sessions", value: "34,218", delta: "+18.4%", color: "#38bdf8", icon: "▶" },
  { label: "Unique Visitors", value: "12,947", delta: "+9.2%",  color: "#22c55e", icon: "👤" },
  { label: "Bounce Rate",    value: "32.1%",  delta: "-3.1%",  color: "#f97316", icon: "↘" },
  { label: "Avg. Session",   value: "5m 23s", delta: "+41s",   color: "#a855f7", icon: "⏱" },
];

const topChannels = [
  { source: "Computer Science", sessions: 14820, change: "+14%" },
  { source: "Information Technology", sessions: 9623,  change: "+7%" },
  { source: "Data Science", sessions: 5421,  change: "+3%" },
  { source: "Artificial Intelligence", sessions: 2364,  change: "+22%" },
  { source: "Artificial Intelligence and Data Science", sessions: 2364,  change: "+22%" },
  { source: "Electronics and Communication", sessions: 2364,  change: "+22%" },
  { source: "Artificial Intelligence and Machine Learning", sessions: 2364,  change: "+22%" },
];

const geoBreakdown = [
  { country: "India",           users: 7321 },
  { country: "United States",   users: 4980 },
  { country: "United Kingdom",  users: 1942 },
  { country: "Germany",         users: 1534 },
  { country: "Canada",          users: 1218 },
];

// GET /api/analytics
router.get("/", (req, res) => {
  res.json({
    generatedAt: new Date().toISOString(),
    trafficSummary,
    topChannels,
    geoBreakdown,
  });
});
