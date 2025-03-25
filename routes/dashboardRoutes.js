const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

// Dashboard
router.get(
    "/",
    authMiddleware.isAuthenticated,
    dashboardController.getDashboard
);

router.get(
    "/clients/budgets",
    authMiddleware.isAuthenticated,
    dashboardController.getClientBudgets
);

module.exports = router;
