const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, projectId, assignedTo, deadline } = req.body;

    const task = await Task.create({
      title,
      projectId,
      assignedTo,
      deadline,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET TASKS
exports.getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find({
        projectId: req.params.projectId,
      }).populate("assignedTo", "name email");
    } else {
      tasks = await Task.find({
        projectId: req.params.projectId,
        assignedTo: req.user.id,
      }).populate("assignedTo", "name email");
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE STATUS
exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

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
};