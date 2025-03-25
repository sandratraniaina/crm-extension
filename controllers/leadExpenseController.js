const leadExpenseService = require("../services/leadExpenseService");

const leadExpenseController = {
    getLeadExpenses: async (req, res) => {
        const expenses = await leadExpenseService.getLeadExpenses(req, res);

        res.render("leadExpenses", { expenses: expenses });
    },
    updateLeadExpense: async (req, res) => {
        const { leadId, expenseId } = req.params;
        const { amount, description, expenseDate } = req.body;

        await leadExpenseService.updateLeadExpense(req, res, {
            leadId,
            expenseId,
            amount,
            description,
            expenseDate,
        });

        const query = leadId ? `?leadId=${leadId}` : "";
        res.redirect(`/leads/expenses${query}`);
    },
    deleteLeadExpense: async (req, res) => {
        const { leadId, expenseId } = req.params;

        await leadExpenseService.deleteLeadExpense(req, res, {
            leadId,
            expenseId,
        });

        const query = leadId ? `?leadId=${leadId}` : "";
        res.redirect(`/leads/expenses${query}`);
    },
};

module.exports = leadExpenseController;
