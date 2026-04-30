const Project = require("../models/Project");


exports.createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;

    const project = await Project.create({
      title,
      description,
      createdBy: req.user.id,
      members
    });

    res.status(201).json(project);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { members: req.user.id }
      ]
    });

    res.json(projects);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};