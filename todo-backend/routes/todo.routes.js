const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createTodo,
  getTodosByBoard,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/:boardId", createTodo);
router.get("/:boardId", getTodosByBoard);

router.put("/item/:id", updateTodo);
router.delete("/item/:id", deleteTodo);

module.exports = router;
