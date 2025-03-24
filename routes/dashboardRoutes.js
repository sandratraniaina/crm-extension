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

// Detailed views
router.get(
    "/leads/:id/expenses",
    authMiddleware.isAuthenticated,
    dashboardController.getLeadExpenses
);
router.get(
    "/tickets/:id/expenses",
    authMiddleware.isAuthenticated,
    dashboardController.getTicketExpenses
);
router.get(
    "/clients/:id/budget",
    authMiddleware.isAuthenticated,
    dashboardController.getClientBudgets
);

module.exports = router;
    