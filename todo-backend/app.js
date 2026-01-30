const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const boardRoutes = require("./routes/board.routes");
const todoRoutes = require("./routes/todo.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
