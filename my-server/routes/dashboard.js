const express = require("express");
const router = express.Router();

// GET /api/dashboard
router.get("/", (req, res) => {
  res.json({
    generatedAt: new Date().toISOString(),
    kpis: [
      { label: "Active Students",   value: "986",      delta: "+4.2%", color: "#22c55e", icon: "◎" },
      { label: "Monthly Revenue",   value: "$231,420", delta: "+9.8%", color: "#38bdf8", icon: "◆" },
      { label: "Open Tickets",      value: "37",       delta: "-12%",  color: "#f97316", icon: "⚠" },
      { label: "Churn Rate",        value: "1.8%",     delta: "-0.3%", color: "#f43f5e", icon: "⇩" },
    ],
    recentCourses: [
      { id: 1, name: "React Mastery",        students: 200, completion: "82%" },
      { id: 2, name: "Python",              students: 200, completion: "82%" },
      { id: 3, name: " Data Science",       students: 200, completion: "76%" },
      { id: 4, name: "UI/UX Fundamentals",  students: 150, completion: "69%" },
      { id: 5, name: "Machine Learning 101",students: 200, completion: "71%" },
      { id: 6, name: "DBMS",                students: 200, completion: "71%" },
      { id: 7, name: "Agentic AI",          students: 200, completion: "71%" },
    ],
  });
});

module.exports = router;