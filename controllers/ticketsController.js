const ticketService = require("../services/ticketService");
const authUtils = require("../utils/api");

const ticketsController = {
    getAllTickets: async (req, res) => {
        try {
            const response = await ticketService.getAllTickets(req, res);
            if (!response) return;
            res.render("allTickets", { tickets: response });
        } catch (error) {
            console.error("Tickets fetch error:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    deleteTicket: async (req, res) => {
        const { ticketId } = req.params;

        await ticketService.deleteTicket(req, res, { ticketId });

        res.redirect("/tickets");
    },
};

module.exports = ticketsController;
