// D:\CRM_riv\my-server\routes\user.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.js");

// Base path will be /api/user/...

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;