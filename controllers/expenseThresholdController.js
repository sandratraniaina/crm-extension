const authUtils = require("../utils/api");

const expenseThresholdController = {
    getExpenseThreshold: async (req, res) => {
        try {
            const response = await authUtils.authenticatedFetch(
                req,
                res,
                "/api/expense-threshold"
            );
            if (!response) return;
            const thresholdData = await response.json();
            res.render("expenseThreshold", {
                threshold: thresholdData.threshold,
            });
        } catch (error) {
            console.error("Threshold error:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    updateExpenseThreshold: async (req, res) => {
        const { value } = req.body;
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            "/api/expense-threshold/update",
            {
                method: "POST",
                body: JSON.stringify({ threshold: parseFloat(value) }),
            }
        );
        if (!response) return;
        res.redirect("/expense-threshold");
    },
};

module.exports = expenseThresholdController;
