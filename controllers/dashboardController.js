const customerBudgetService = require("../services/customerBudgetService");
const financialSummaryService = require("../services/financialSummaryService");
const leadExpenseService = require("../services/leadExpenseService");
const ticketExpenseService = require("../services/ticketExpenseService");
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
        const expenses = await ticketExpenseService.getTicketExpenses(req, res);
        
        res.render("ticketExpenses", { expenses: expenses });
    },

    getClientBudgets: async (req, res) => {
        const response = await customerBudgetService.getCustomerBudgets(req, res)

        res.render("clientBudgets", { budgets: response });
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
