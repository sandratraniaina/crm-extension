const authUtils = require("../utils/api");

const ticketsController = {
    getAllTickets: async (req, res) => {
        try {
            const response = await authUtils.authenticatedFetch(
                req,
                res,
                "/api/tickets"
            );
            if (!response) return;
            res.render("allTickets", { tickets: response });
        } catch (error) {
            console.error("Tickets fetch error:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    deleteTicket: async (req, res) => {
        const { ticketId } = req.params;
        const response = await authUtils.authenticatedFetch(
            req,
            res,
            `/api/tickets/${ticketId}/delete`,
            {
                method: "DELETE",
            }
        );
        if (!response) return;
        res.redirect("/tickets");
    },
};

module.exports = ticketsController;
