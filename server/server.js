const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const projectRoutes = require("./routes/projectRoutes");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());


app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "Protected route accessed",
    user: req.user
  });
});

app.use("/api/projects", projectRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));