const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const leadExpenseController = require("../controllers/leadExpenseController");

router.get(
    "/expenses",
    authMiddleware.isAuthenticated,
    leadExpenseController.getLeadExpenses
);

router.post(
    "/:leadId/expenses/:expenseId/update",
    authMiddleware.isAuthenticated,
    leadExpenseController.updateLeadExpense
);
router.post(
    "/:leadId/expenses/:expenseId/delete",
    authMiddleware.isAuthenticated,
    leadExpenseController.deleteLeadExpense
);

module.exports = router;