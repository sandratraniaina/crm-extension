const ticketExpenseService = require("../services/ticketExpenseService");

const ticketExpenseController = {
    getTicketExpenses: async (req, res) => {
        const expenses = await ticketExpenseService.getTicketExpenses(req, res);
        
        res.render("ticketExpenses", { expenses: expenses });
    },
    updateTicketExpense: async (req, res) => {
        const { ticketId, expenseId } = req.params;
        const { amount, description, expenseDate } = req.body;
        await ticketExpenseService.updateTicketExpense(req, res, { ticketId, expenseId, amount, description, expenseDate });
        
        const query = ticketId ? `?ticketId=${ticketId}` : "";
        res.redirect(
            `/tickets/expenses${query}`
        );
    },
    deleteTicketExpense: async (req, res) => {
        const { ticketId, expenseId } = req.params;
        await ticketExpenseService.deleteTicketExpense(req, res, { ticketId, expenseId });

        const query = ticketId ? `?ticketId=${ticketId}` : "";
        res.redirect(
            `/tickets/expenses${query}`
        );
    }
};

module.exports = ticketExpenseController;