const authUtils = require("../utils/api");

const financialSummaryService = {
    getFinancialSummary: async (req, res) => {
        const results = await authUtils.authenticatedFetch(
            req,
            res,
            "/api/summary/financial-summary"
        );

        return results.data;
    },

    getCustomerFinancialSummaries: async (req, res) => {
        const results = await authUtils.authenticatedFetch(
            req, 
            res,
            "/api/summary/customer-financial-summary"
        );

        return results.data;
    }
}


module.exports = financialSummaryService;
