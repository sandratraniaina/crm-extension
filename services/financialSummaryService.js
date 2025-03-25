const authUtils = require("../utils/api");

const financialSummaryService = {
    getFinancialSummary: async (req, res) => {
        const results = await authUtils.authenticatedFetch(
            req,
            res,
            "/api/summary/financial-summary"
        );
        console.log(results);

        return results.data;
    }
}


module.exports = financialSummaryService;
