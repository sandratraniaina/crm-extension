const authUtils = {
    authenticatedFetch: async (req, res, url, options = {}) => {
        const token = req.session.token;

        if (!token) {
            res.redirect("/login");
            return null;
        }

        const mockData = {
            "/api/expenses": {
                leadExpenses: [
                    {
                        id: 1,
                        amount: 1200,
                        description: "Travel",
                        leadId: 1,
                        expenseDate: "2025-01-01",
                    },
                    {
                        id: 2,
                        amount: 1900,
                        description: "Marketing",
                        leadId: 1,
                        expenseDate: "2025-02-01",
                    },
                    {
                        id: 3,
                        amount: 300,
                        description: "Consulting",
                        leadId: 2,
                        expenseDate: "2025-03-01",
                    },
                ],
                ticketExpenses: [
                    {
                        id: 1,
                        amount: 500,
                        description: "Support",
                        ticketId: 1,
                        expenseDate: "2025-01-15",
                    },
                    {
                        id: 2,
                        amount: 800,
                        description: "Hardware",
                        ticketId: 2,
                        expenseDate: "2025-02-15",
                    },
                ],
            },
            "/api/leads": {
                leads: [
                    {
                        leadId: 1,
                        name: "Lead 1",
                        status: "success",
                        totalExpense: 3100,
                    },
                    {
                        leadId: 2,
                        name: "Lead 2",
                        status: "scheduled",
                        totalExpense: 300,
                    },
                ],
            },
            "/api/customers": {
                customers: [
                    {
                        customerId: 1,
                        name: "Client A",
                        budgets: [
                            { id: 1, amount: 5000 },
                            { id: 2, amount: 3000 },
                        ],
                        totalBudget: 8000,
                    },
                    {
                        customerId: 2,
                        name: "Client B",
                        budgets: [{ id: 3, amount: 2000 }],
                        totalBudget: 2000,
                    },
                ],
            },
            "/api/leads/1/expenses": {
                lead: { leadId: 1, name: "Lead 1" },
                expenses: [
                    {
                        id: 1,
                        amount: 1200,
                        description: "Travel",
                        expenseDate: "2025-01-01",
                    },
                    {
                        id: 2,
                        amount: 1900,
                        description: "Marketing",
                        expenseDate: "2025-02-01",
                    },
                ],
            },
            "/api/leads/2/expenses": {
                lead: { leadId: 2, name: "Lead 2" },
                expenses: [
                    {
                        id: 3,
                        amount: 300,
                        description: "Consulting",
                        expenseDate: "2025-03-01",
                    },
                ],
            },
            "/api/tickets/1/expenses": {
                ticket: { ticketId: 1, subject: "Issue 1" },
                expenses: [
                    {
                        id: 1,
                        amount: 500,
                        description: "Support",
                        expenseDate: "2025-01-15",
                    },
                ],
            },
            "/api/tickets/2/expenses": {
                ticket: { ticketId: 2, subject: "Issue 2" },
                expenses: [
                    {
                        id: 2,
                        amount: 800,
                        description: "Hardware",
                        expenseDate: "2025-02-15",
                    },
                ],
            },
            "/api/clients/1/budget": {
                customer: { customerId: 1, name: "Client A" },
                budgets: [
                    {
                        id: 1,
                        amount: 5000,
                        description: "Project A",
                        createdAt: "2025-01-01",
                    },
                    {
                        id: 2,
                        amount: 3000,
                        description: "Project B",
                        createdAt: "2025-02-01",
                    },
                ],
            },
            "/api/clients/2/budget": {
                customer: { customerId: 2, name: "Client B" },
                budgets: [
                    {
                        id: 3,
                        amount: 2000,
                        description: "Project C",
                        createdAt: "2025-03-01",
                    },
                ],
            },
        };

        const mockResponse = {
            ok: true,
            json: async () => mockData[url] || { error: "Not found" },
        };
        return mockResponse;
    },
};

module.exports = authUtils;
