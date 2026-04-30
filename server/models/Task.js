const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo"
  },
  deadline: Date,
  priority: {
    type: String,
    enum: ["low", "medium", "high"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);