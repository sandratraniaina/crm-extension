const authUtils = require("../utils/api");

const leadsController = {
    getAllLeads: async (req, res) => {
        try {
            const response = await authUtils.authenticatedFetch(
                req,
                res,
                "/api/leads"
            );
            if (!response) return;
            res.render("allLeads", { leads: response.data });
        } catch (error) {
            console.error("Leads fetch error:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    deleteLead: async (req, res) => {
        const { leadId } = req.params;
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            `/api/leads/${leadId}/delete`,
            {
                method: "DELETE",
            }
        );
        if (!response) return;
        res.redirect("/leads");
    },
};

module.exports = leadsController;
