// src/routes/report.routes.js
const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/reports");

router.get("/dashboard/pdf", ReportController.downloadDashboardReport);
router.get("/analytics/pdf", ReportController.downloadAnalyticsReport);
router.get("/table/pdf", ReportController.showTableReport);
module.exports = router;