const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const ticketExpenseController = require("../controllers/ticketExpenseController");

router.get(
    "/expenses",
    authMiddleware.isAuthenticated,
    ticketExpenseController.getTicketExpenses
);
router.post(
    "/:ticketId/expenses/:expenseId/update",
    authMiddleware.isAuthenticated,
    ticketExpenseController.updateTicketExpense
);
router.post(
    "/:ticketId/expenses/:expenseId/delete",
    authMiddleware.isAuthenticated,
    ticketExpenseController.deleteTicketExpense
);

module.exports = router;
