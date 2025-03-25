const customerBudgetService = require("../services/customerBudgetService");

const customerBudgetController = {
    getClientBudgets: async (req, res) => {
        const response = await customerBudgetService.getCustomerBudgets(req, res)

        res.render("clientBudgets", { budgets: response });
    }
};

module.exports = customerBudgetController;