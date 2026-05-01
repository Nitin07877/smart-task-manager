const Project = require("../models/Project");
const User = require("../models/User");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const users = await User.find();
    const allUserIds = users.map((u) => u._id);

    const project = await Project.create({
      title,
      description,
      createdBy: req.user.id,
      members: allUserIds,
    });

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// GET PROJECTS
exports.getProjects = async (req, res) => {
  try {
    let projects;

    if (req.user.role === "admin") {
      projects = await Project.find();
    } else {
      projects = await Project.find({
        members: req.user.id,
      });
    }

    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};