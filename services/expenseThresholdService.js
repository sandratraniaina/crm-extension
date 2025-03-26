const {
    getExpenseThreshold,
    updateExpenseThreshold,
} = require("../controllers/expenseThresholdController");
const authUtils = require("../utils/api");

const expenseThresholdService = {
    getExpenseThreshold: async (req, res) => {
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            "/api/expense-threshold"
        );

        return response.data.threshold;
    },

    updateExpenseThreshold: async (req, res, data) => {
        const { value } = data;
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            "/api/expense-threshold/update",
            {
                method: "POST",
                body: JSON.stringify({ threshold: parseFloat(value) / 100 }),
            }
        );
        
        return response;
    },
};

module.exports = expenseThresholdService;
