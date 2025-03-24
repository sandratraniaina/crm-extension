const authUtils = require("../utils/api");

const dashboardController = {
    getDashboard: async (req, res) => {
        try {
            // Mock API calls
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
};

module.exports = dashboardController;
