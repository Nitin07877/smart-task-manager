const express = require("express");
const router = express.Router();

const { createProject, getProjects } = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


router.post("/", authMiddleware, roleMiddleware("admin"), createProject);


router.get("/", authMiddleware, getProjects);

module.exports = router;