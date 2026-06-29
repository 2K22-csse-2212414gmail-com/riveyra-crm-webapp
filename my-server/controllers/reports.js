// src/controllers/report.controller.js
const fs = require("fs");
const path = require("path");

// GET /api/reports/dashboard/pdf
exports.downloadDashboardReport = (req, res) => {
  const filePath = path.join(__dirname, "../../reports/dashboard-latest.pdf");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Dashboard report PDF not found" });
  }

  const stat = fs.statSync(filePath);

  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=dashboard-report.pdf");

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
};

// GET /api/reports/analytics/pdf
exports.downloadAnalyticsReport = (req, res) => {
  const filePath = path.join(__dirname, "../../reports/analytics-latest.pdf");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Analytics report PDF not found" });
  }

  const stat = fs.statSync(filePath);

  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=analytics-report.pdf");

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
};
exports.showTableReport = (req, res) => { 
  const filePath = path.join(__dirname, "../../reports/table-latest.pdf");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Table report PDF not found" });
  }

  const stat = fs.statSync(filePath);

  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=table-report.pdf");

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
};
