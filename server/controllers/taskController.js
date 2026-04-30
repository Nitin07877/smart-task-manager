const Task = require("../models/Task");


exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, deadline } = req.body;

    let priority = "low";

    const now = new Date();
    const diff = (new Date(deadline) - now) / (1000 * 60 * 60 * 24);

    if (diff <= 1) priority = "high";
    else if (diff <= 3) priority = "medium";

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo,
      deadline,
      priority
    });

    res.status(201).json(task);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};