const Task = require("../models/Task");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ assignedTo: userId });

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "done").length;
    const pending = tasks.filter(t => t.status !== "done").length;

    const overdue = tasks.filter(t => {
      return new Date(t.deadline) < new Date() && t.status !== "done";
    }).length;

    res.json({
      total,
      completed,
      pending,
      overdue
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};