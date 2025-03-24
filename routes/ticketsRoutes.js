const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/ticketsController");
const authMiddleware = require("../middleware/authMiddleware");

// Tickets routes
router.get(
    "/tickets",
    authMiddleware.isAuthenticated,
    ticketsController.getAllTickets
);
router.post(
    "/tickets/:ticketId/delete",
    authMiddleware.isAuthenticated,
    ticketsController.deleteTicket
);

module.exports = router;
