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
    "/leads/expenses",
    authMiddleware.isAuthenticated,
    dashboardController.getLeadExpenses
);
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
    "/leads/:leadId/expenses/:expenseId/update",
    authMiddleware.isAuthenticated,
    dashboardController.updateLeadExpense
);
router.post(
    "/leads/:leadId/expenses/:expenseId/delete",
    authMiddleware.isAuthenticated,
    dashboardController.deleteLeadExpense
);
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
router.post(
    "/clients/:clientId/budget/:budgetId/update",
    authMiddleware.isAuthenticated,
    dashboardController.updateClientBudget
);
router.post(
    "/clients/:clientId/budget/:budgetId/delete",
    authMiddleware.isAuthenticated,
    dashboardController.deleteClientBudget
);

module.exports = router;
