const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} = require("../controllers/board.controller");

const router = express.Router();

router.use(authMiddleware); // protect all routes

router.post("/", createBoard);
router.get("/", getBoards);
router.put("/:id", updateBoard);
router.delete("/:id", deleteBoard);

module.exports = router;
