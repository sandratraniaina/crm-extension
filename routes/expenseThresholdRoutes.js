const express = require('express');
const router = express.Router();
const expenseThresholdController = require('../controllers/expenseThresholdController');
const authMiddleware = require('../middleware/authMiddleware');

// Expense Threshold routes
router.get('', authMiddleware.isAuthenticated, expenseThresholdController.getExpenseThreshold);
router.post('', authMiddleware.isAuthenticated, expenseThresholdController.updateExpenseThreshold);

module.exports = router;