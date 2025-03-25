const authUtils = require("../utils/api");

const customerBudgetService = {
    getCustomerBudgets: async (req, res) => {
        const response = await authUtils.authenticatedFetch(req, res, "/api/customers/budgets");

        return response.data;
    }
};

module.exports = customerBudgetService;