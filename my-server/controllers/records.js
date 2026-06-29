// backend/src/controllers/user.controller.js

// In-memory "database"
let users = [
     { id: 1, name: "Aarav Sharma",  course: "React Mastery",             status: "Active",    joined: "2026-03-18", progress: 82 },
  { id: 2, name: "Isha Verma",    course: "Python for Data Science",   status: "Active",    joined: "2026-02-10", progress: 76 },
  { id: 3, name: "Rohan Gupta",   course: "Machine Learning 101",      status: "Pending",   joined: "2026-04-01", progress: 40 },
  { id: 4, name: "Neha Singh",    course: "UI/UX Fundamentals",        status: "Completed", joined: "2025-12-22", progress: 100 },
  { id: 5, name: "Aditya Kumar",  course: "React Mastery",             status: "Active",    joined: "2026-01-05", progress: 64 },
  { id: 6, name: "Simran Kaur",   course: "Python for Data Science",   status: "Completed", joined: "2025-11-15", progress: 100 },
];

// Helper to get next ID
const getNextId = () => {
  return users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
};

// GET /api/users
// backend/src/controllers/records.controller.js

exports.getRecords = async (req, res) => {
  try {
    // example: return some records
    res.json({ message: "records ok", data: [] });
  } catch (err) {
    console.error("getRecords error:", err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};
exports.getUsers = (req, res) => {
  res.json({
    count: users.length,
    users,
  });
};

// GET /api/users/:id
exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

// POST /api/users
exports.createUser = (req, res) => {
  const { name, email, role = "Student", status = "Active" } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const id = getNextId();
  const createdAt = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const newUser = { id, name, email, role, status, createdAt };
  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
};

// PUT /api/users/:id
exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, email, role, status } = req.body;
  const user = users[userIndex];

  if (name !== undefined)  user.name = name;
  if (email !== undefined) user.email = email;
  if (role !== undefined)  user.role = role;
  if (status !== undefined) user.status = status;

  users[userIndex] = user;

  res.json({
    message: "User updated successfully",
    user,
  });
};

// DELETE /api/users/:id
exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const removed = users.splice(index, 1)[0];

  res.json({
    message: "User deleted successfully",
    user: removed,
  });
};