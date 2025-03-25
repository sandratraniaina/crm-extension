const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const customerBudgetController = require('../controllers/customerBudgetController');

router.get(
    "/budgets",
    authMiddleware.isAuthenticated,
    customerBudgetController.getClientBudgets
);

module.exports = router;