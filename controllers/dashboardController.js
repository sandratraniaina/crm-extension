const authUtils = require("../utils/api");

const dashboardController = {
    getDashboard: async (req, res) => {
        try {
            const expensesResponse = await authUtils.authenticatedFetch(
                req,
                res,
                "/api/expenses"
            );
            if (!expensesResponse) return;
            const leadsResponse = await authUtils.authenticatedFetch(
                req,
                res,
                "/api/leads"
            );
            if (!leadsResponse) return;
            const customersResponse = await authUtils.authenticatedFetch(
                req,
                res,
                "/api/customers"
            );
            if (!customersResponse) return;

            const expensesData = await expensesResponse.json();
            const leadsData = await leadsResponse.json();
            const customersData = await customersResponse.json();

            res.render("dashboard", { expensesData, leadsData, customersData });
        } catch (error) {
            console.error("Dashboard error:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    getLeadExpenses: async (req, res) => {
        const leadId = req.params.id;
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            `/api/leads/${leadId}/expenses`
        );
        if (!response) return;
        const leadExpenses = await response.json();
        res.render("leadExpenses", { leadExpenses, leadId });
    },

    getTicketExpenses: async (req, res) => {
        const ticketId = req.params.id;
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            `/api/tickets/${ticketId}/expenses`
        );
        if (!response) return;
        const ticketExpenses = await response.json();
        res.render("ticketExpenses", { ticketExpenses, ticketId });
    },

    getClientBudgets: async (req, res) => {
        const clientId = req.params.id;
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            `/api/clients/${clientId}/budget`
        );
        if (!response) return;
        const clientBudgets = await response.json();
        res.render("clientBudgets", { clientBudgets, clientId });
    },

    // Update and Delete Lead Expense
    updateLeadExpense: async (req, res) => {
        const { leadId, expenseId } = req.params;
        const { amount, description, expenseDate } = req.body;
        const response = await authUtils.authenticatedFetch(
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
        if (!response) return;
        res.redirect(`/leads/${leadId}/expenses`);
    },
    deleteLeadExpense: async (req, res) => {
        const { leadId, expenseId } = req.params;
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            `/api/leads/${leadId}/expenses/${expenseId}`,
            {
                method: "DELETE",
            }
        );
        if (!response) return;
        res.redirect(`/leads/${leadId}/expenses`);
    },

    // Update and Delete Ticket Expense
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
        res.redirect(`/tickets/${ticketId}/expenses`);
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
        res.redirect(`/tickets/${ticketId}/expenses`);
    },

    // Update and Delete Client Budget
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
        res.redirect(`/clients/${clientId}/budget`);
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
        res.redirect(`/clients/${clientId}/budget`);
    },
};

module.exports = dashboardController;
