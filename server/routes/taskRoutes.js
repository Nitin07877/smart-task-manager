const express = require("express");
const router = express.Router();

const { createTask, getTasks } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../models/Task");

// Create task
router.post("/", authMiddleware, createTask);

// Admin: project tasks
router.get("/:projectId", authMiddleware, getTasks);

// Member: their tasks


// Admin dashboard: all tasks
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find().populate(
      "assignedTo",
      "_id name email"
    );

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update status
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    task.status = req.body.status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;