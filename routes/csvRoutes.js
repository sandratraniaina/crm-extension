const express = require("express");
const router = express.Router();
const multer = require("multer");
const csvService = require("../services/csvService"); // Import the service
const csvController = require("../controllers/csvController");
const authMiddleware = require("../middleware/authMiddleware");

// Configure multer to use memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Serve the upload form
router.get("/form", authMiddleware.isAuthenticated, csvController.csvForm);

// Handle CSV file upload
router.post("/upload", authMiddleware.isAuthenticated, upload.single("csvfile"), csvController.processCsv);

module.exports = router;
