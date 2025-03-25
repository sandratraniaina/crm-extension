const financialSummaryService = require("../services/financialSummaryService");
const leadExpenseService = require("../services/leadExpenseService");
const authUtils = require("../utils/api");

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

    getLeadExpenses: async (req, res) => {
        const expenses = await leadExpenseService.getLeadExpenses(req, res);

        res.render("leadExpenses", { expenses: expenses });
    },

    getTicketExpenses: async (req, res) => {
        const url = "/api/tickets/expenses";
        const expenses = await authUtils.authenticatedFetch(req, res, url);
        
        res.render("ticketExpenses", { expenses: expenses.data });
    },

    getClientBudgets: async (req, res) => {
        const url = "/api/customers/budgets"
        const response = await authUtils.authenticatedFetch(req, res, url);
        if (!response) return;

        res.render("clientBudgets", { budgets: response.data });
    },

    updateLeadExpense: async (req, res) => {
        const { leadId, expenseId } = req.params;
        const { amount, description, expenseDate } = req.body;

        await leadExpenseService.updateLeadExpense(req, res, {
            leadId, expenseId, amount, description, expenseDate
        });

        res.redirect(`/leads/expenses${leadId ? `?leadId=${leadId}` : ""}`);
    },
    deleteLeadExpense: async (req, res) => {
        const { leadId, expenseId } = req.params;
        
        await leadExpenseService.deleteLeadExpense(req, res, { leadId, expenseId });
        
        res.redirect(`/leads/expenses${leadId ? `?leadId=${leadId}` : ""}`);
    },

    updateTicketExpense: async (req, res) => {
        const { ticketId, expenseId } = req.params;
        const { amount, description, expenseDate } = req.body;
        const response = await authUtils.authenticatedFetch(
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
        if (!response) return;
        res.redirect(
            `/tickets/expenses${ticketId ? `?ticketId=${ticketId}` : ""}`
        );
    },
    deleteTicketExpense: async (req, res) => {
        const { ticketId, expenseId } = req.params;
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            `/api/tickets/${ticketId}/expenses/${expenseId}`,
            {
                method: "DELETE",
            }
        );
        if (!response) return;
        res.redirect(
            `/tickets/expenses${ticketId ? `?ticketId=${ticketId}` : ""}`
        );
    },

    updateClientBudget: async (req, res) => {
        const { clientId, budgetId } = req.params;
        const { amount, description } = req.body;
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            `/api/clients/${clientId}/budget/${budgetId}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    description,
                }),
            }
        );
        if (!response) return;
        res.redirect(
            `/clients/budget${clientId ? `?clientId=${clientId}` : ""}`
        );
    },
    deleteClientBudget: async (req, res) => {
        const { clientId, budgetId } = req.params;
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            `/api/clients/${clientId}/budget/${budgetId}`,
            {
                method: "DELETE",
            }
        );
        if (!response) return;
        res.redirect(
            `/clients/budget${clientId ? `?clientId=${clientId}` : ""}`
        );
    },
};

module.exports = dashboardController;
