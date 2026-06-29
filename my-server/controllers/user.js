// controllers/user.controller.js
const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ count: users.length, users });
  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, role = "Student", status = "Active" } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const createdAt = new Date().toISOString().slice(0, 10);

    console.log("createUser body:", req.body); // debug
    const user = await User.create({
      name,
      email,
      role,
      status,
      createdAt,
    });
    console.log("created user id:", user._id); // debug

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    console.error("createUser error:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
};