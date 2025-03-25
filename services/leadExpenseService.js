const authUtils = require("../utils/api");

const leadExpenseService = {
    getLeadExpenses: async (req, res) => {
        const results = await authUtils.authenticatedFetch(
            req,
            res,
            "/api/leads/expenses"
        );

        return results.data;
    },
    updateLeadExpense: async (req, res, data) => {
        const { leadId, expenseId, amount, description, expenseDate } = data;

        await authUtils.authenticatedFetch(
            req,
            res,
            `/api/leads/${leadId}/expenses/${expenseId}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    description,
                    expenseDate,
                }),
            }
        );
    },
    deleteLeadExpense: async (req, res, data) => {
        const { leadId, expenseId } = data;
        
        await authUtils.authenticatedFetch(
            req,
            res,
            `/api/leads/${leadId}/expenses/${expenseId}`,
            {
                method: "DELETE",
            }
        );
    },
};

module.exports = leadExpenseService;
