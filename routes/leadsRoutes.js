const express = require("express");
const router = express.Router();
const leadsController = require("../controllers/leadsController");
const authMiddleware = require("../middleware/authMiddleware");

// Leads routes
router.get(
    "",
    authMiddleware.isAuthenticated,
    leadsController.getAllLeads
);
router.post(
    "/:leadId/delete",
    authMiddleware.isAuthenticated,
    leadsController.deleteLead
);

module.exports = router;
