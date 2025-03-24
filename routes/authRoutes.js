const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Login page
router.get("/login", authController.getLogin);

// Handle login submission
router.post("/login", authController.postLogin);

// Dashboard (protected route)
router.get("/", authMiddleware.isAuthenticated, authController.getDashboard);

module.exports = router;
