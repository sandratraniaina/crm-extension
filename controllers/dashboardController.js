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
        const leadId = req.query.leadId; // Changed to query param
        const url = leadId ? `/api/leads/${leadId}/expenses` : "/api/expenses";
        const response = await authUtils.authenticatedFetch(req, res, url);
        if (!response) return;
        const data = await response.json();
        const leadExpenses = leadId
            ? data
            : { lead: { name: "All Leads" }, expenses: data.leadExpenses };
        res.render("leadExpenses", { leadExpenses, leadId });
    },

    getTicketExpenses: async (req, res) => {
        const ticketId = req.query.ticketId; // Changed to query param
        const url = ticketId
            ? `/api/tickets/${ticketId}/expenses`
            : "/api/expenses";
        const response = await authUtils.authenticatedFetch(req, res, url);
        if (!response) return;
        const data = await response.json();
        const ticketExpenses = ticketId
            ? data
            : {
                  ticket: { subject: "All Tickets" },
                  expenses: data.ticketExpenses,
              };
        res.render("ticketExpenses", { ticketExpenses, ticketId });
    },

    getClientBudgets: async (req, res) => {
        const clientId = req.query.clientId; // Changed to query param
        const url = clientId
            ? `/api/clients/${clientId}/budget`
            : "/api/customers";
        const response = await authUtils.authenticatedFetch(req, res, url);
        if (!response) return;
        const data = await response.json();
        const clientBudgets = clientId
            ? data
            : {
                  customer: { name: "All Clients" },
                  budgets: data.customers.flatMap((c) => c.budgets),
              };
        res.render("clientBudgets", { clientBudgets, clientId });
    },

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
        res.redirect(`/leads/expenses${leadId ? `?leadId=${leadId}` : ""}`);
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
