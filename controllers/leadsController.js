const leadService = require("../services/leadService");
const authUtils = require("../utils/api");

const leadsController = {
    getAllLeads: async (req, res) => {
        try {
            const response = await leadService.getAllLeads(req, res);

            res.render("allLeads", { leads: response });
        } catch (error) {
            console.error("Leads fetch error:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    deleteLead: async (req, res) => {
        const { leadId } = req.params;

        await leadService.deleteLead(req, res, { leadId });

        res.redirect("/leads");
    },
};

module.exports = leadsController;
