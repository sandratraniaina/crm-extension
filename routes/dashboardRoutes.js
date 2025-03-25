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

// Detailed views (updated to use query params)

router.get(
    "/tickets/expenses",
    authMiddleware.isAuthenticated,
    dashboardController.getTicketExpenses
);
router.get(
    "/clients/budgets",
    authMiddleware.isAuthenticated,
    dashboardController.getClientBudgets
);

// Update and Delete routes
router.post(
    "/tickets/:ticketId/expenses/:expenseId/update",
    authMiddleware.isAuthenticated,
    dashboardController.updateTicketExpense
);
router.post(
    "/tickets/:ticketId/expenses/:expenseId/delete",
    authMiddleware.isAuthenticated,
    dashboardController.deleteTicketExpense
);

module.exports = router;
