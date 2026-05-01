const Task = require("../models/Task");

exports.getDashboard = async (req, res) => {
  try {
    let query = {};

    // 👤 If member → only their tasks
    if (req.user.role !== "admin") {
      query.assignedTo = req.user.id;
    }

    // 👑 Admin → all tasks (no filter)
    const tasks = await Task.find(query);

    const total = tasks.length;

    const completed = tasks.filter(
      (t) => t.status === "done"
    ).length;

    const pending = tasks.filter(
      (t) => t.status !== "done"
    ).length;

    const overdue = tasks.filter((t) => {
      return (
        t.deadline &&
        new Date(t.deadline) < new Date() &&
        t.status !== "done"
      );
    }).length;

    res.json({
      total,
      completed,
      pending,
      overdue,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};