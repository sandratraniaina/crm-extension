const expenseThresholdService = require("../services/expenseThresholdService");
const authUtils = require("../utils/api");

const expenseThresholdController = {
    getExpenseThreshold: async (req, res) => {
        try {
            const response = await expenseThresholdService.getExpenseThreshold(
                req,
                res
            );

            res.render("expenseThreshold", {
                threshold: response.value,
            });
        } catch (error) {
            console.error("Threshold error:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    updateExpenseThreshold: async (req, res) => {
        const { value } = req.body;

        await expenseThresholdService.updateExpenseThreshold(req, res, {
            value,
        });

        res.redirect("/expense-threshold");
    },
};

module.exports = expenseThresholdController;
