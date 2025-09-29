const express = require("express");
const router = express.Router();
const { register, login, verifyToken } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Register a new user
router.post("/register", register);

// ✅ Login existing user
router.post("/login", login);

// ✅ Verify token (protected route example)
router.get("/verify", authMiddleware, verifyToken);

module.exports = router;
