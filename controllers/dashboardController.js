const customerBudgetService = require("../services/customerBudgetService");
const financialSummaryService = require("../services/financialSummaryService");

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
};

module.exports = dashboardController;
