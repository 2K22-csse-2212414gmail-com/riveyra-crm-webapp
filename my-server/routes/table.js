const express = require("express");
const router = express.Router();

// GET /api/table
router.get("/", (req, res) => {
    res.json({
        generatedAt: new Date().toISOString(),
        data: [
            { id: 1, name: "Alice", course: "React Mastery", progress: "82%" },
            { id: 2, name: "Bob", course: "Python", progress: "76%" },  
            { id: 3, name: "Charlie", course: "Data Science", progress: "69%" },
            { id: 4, name: "David", course: "UI/UX Fundamentals", progress: "71%" }
        ],
        rawRows : [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", role: "Student", status: "Active", createdAt: "2026-03-18" },
  { id: 2, name: "Isha Verma", email: "isha@example.com", role: "Student", status: "Pending", createdAt: "2026-04-02" },
  { id: 3, name: "Rohan Gupta", email: "rohan@example.com", role: "Tutor", status: "Suspended", createdAt: "2025-12-11" },
  { id: 4, name: "Neha Singh", email: "neha@example.com", role: "Student", status: "Active", createdAt: "2026-01-20" },
  { id: 5, name: "Aditya Kumar", email: "aditya@example.com", role: "Admin", status: "Active", createdAt: "2025-11-05" },
]
    });
});

module.exports = router;