const express = require("express");
const router = express.Router();

const { createTask, getTasks } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, createTask);

router.get("/:projectId", authMiddleware, getTasks);

module.exports = router;