const { deleteTicket } = require("../controllers/ticketsController");
const authUtils = require("../utils/api");

const ticketService = {
    getAllTickets: async (req, res) => {
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            "/api/tickets"
        );

        return response.data;
    },

    deleteTicket: async (req, res, data) => {
        const { ticketId } = data;

        await authUtils.authenticatedFetch(
            req,
            res,
            `/api/tickets/${ticketId}/delete`,
            {
                method: "DELETE",
            }
        );
    },
};

module.exports = ticketService;
