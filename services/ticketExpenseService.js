const {
    updateTicketExpense,
    deleteTicketExpense,
} = require("../controllers/dashboardController");
const authUtils = require("../utils/api");

const ticketExpenseService = {
    getTicketExpenses: async (req, res) => {
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            "/api/tickets/expenses"
        );

        return response.data;
    },

    updateTicketExpense: async (req, res, data) => {
        const { ticketId, expenseId, amount, description, expenseDate } = data;
        await authUtils.authenticatedFetch(
            req,
            res,
            `/api/tickets/${ticketId}/expenses/${expenseId}`,
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

    deleteTicketExpense: async (req, res, data) => {
        const { ticketId, expenseId } = data;
        await authUtils.authenticatedFetch(
            req,
            res,
            `/api/tickets/${ticketId}/expenses/${expenseId}`,
            {
                method: "DELETE",
            }
        );
    },
};

module.exports = ticketExpenseService;
