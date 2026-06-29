const express = require("express");
const router = express.Router();

router.use("/dashboard", require("./dashboard"));
// router.use("/analytics", require("./analytics"));
// router.use("/reports", require("./reports"));
router.use("/prices", require("./prices.routes"));
router.use("/payments", require("./payments.routes"));
router.use("/chat", require("./chat.routes"));
router.use("/mail", require("./mail.routes"));
//router.use("/table", require("./table"));
router.use("/talk", require("./talk"));
router.use("/contact", require("./contact"));
router.use("/location", require("./location"));
module.exports = router;