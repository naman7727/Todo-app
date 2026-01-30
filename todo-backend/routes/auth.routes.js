const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { registerUser } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", authMiddleware, registerUser);

module.exports = router;
