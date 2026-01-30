const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const app = express();
const boardRoutes = require("./routes/board.routes");
const todoRoutes = require("./routes/todo.routes");

app.use("/api/todos", todoRoutes);

app.use("/api/boards", boardRoutes);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
