// // backend/src/routes/records.js
// const express = require("express");
// const router = express.Router();
// //const RecordController = require("../controllers/records.controllers");

// // Base path is /api/records from app.js

// // GET /api/records
// router.get("/", RecordController.getRecords);

// // GET /api/records/:id
// router.get("/:id", RecordController.getRecordById);

// // POST /api/records
// router.post("/", RecordController.createRecord);

// // PUT /api/records/:id
// router.put("/:id", RecordController.updateRecord);

// // DELETE /api/records/:id
// router.delete("/:id", RecordController.deleteRecord);

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// router.get("/", (req, res) => {
//   const records = [
//     { id: 1, name: "Record One", value: "Value One" },