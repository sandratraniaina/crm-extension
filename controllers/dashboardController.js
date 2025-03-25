const customerBudgetService = require("../services/customerBudgetService");
const financialSummaryService = require("../services/financialSummaryService");
const ticketExpenseService = require("../services/ticketExpenseService");

const dashboardController = {
    getDashboard: async (req, res) => {
        try {
            const financialSummary = await financialSummaryService.getFinancialSummary(req, res);
            const summaries = await financialSummaryService.getCustomerFinancialSummaries(req, res);

            res.render("dashboard", { financialSummary, summaries });
        } catch (error) {
            console.error("Dashboard error:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    getTicketExpenses: async (req, res) => {
        const expenses = await ticketExpenseService.getTicketExpenses(req, res);
        
        res.render("ticketExpenses", { expenses: expenses });
    },

    getClientBudgets: async (req, res) => {
        const response = await customerBudgetService.getCustomerBudgets(req, res)

        res.render("clientBudgets", { budgets: response });
    },

    updateTicketExpense: async (req, res) => {
        const { ticketId, expenseId } = req.params;
        const { amount, description, expenseDate } = req.body;
        await ticketExpenseService.updateTicketExpense(req, res, { ticketId, expenseId, amount, description, expenseDate });
        
        res.redirect(
            `/tickets/expenses${ticketId ? `?ticketId=${ticketId}` : ""}`
        );
    },
    deleteTicketExpense: async (req, res) => {
        const { ticketId, expenseId } = req.params;
        await ticketExpenseService.deleteTicketExpense(req, res, { ticketId, expenseId });

        res.redirect(
            `/tickets/expenses${ticketId ? `?ticketId=${ticketId}` : ""}`
        );
    }
};

module.exports = dashboardController;
