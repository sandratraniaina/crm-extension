const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/ticketsController");
const authMiddleware = require("../middleware/authMiddleware");

// Tickets routes
router.get(
    "",
    authMiddleware.isAuthenticated,
    ticketsController.getAllTickets
);
router.post(
    "/:ticketId/delete",
    authMiddleware.isAuthenticated,
    ticketsController.deleteTicket
);

module.exports = router;
