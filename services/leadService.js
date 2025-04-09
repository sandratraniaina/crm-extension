const { getAllLeads, deleteLead } = require("../controllers/leadsController");
const authUtils = require("../utils/api");

const leadService = {
    getAllLeads: async (req, res) => {
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            "/api/leads"
        );

        return response.data;
    },

    deleteLead: async (req, res, data) => {
        const { leadId } = data;

        await authUtils.authenticatedFetch(
            req,
            res,
            `/api/leads/${leadId}/delete`,
            {
                method: "DELETE",
            }
        );
    },
};

module.exports = leadService;
