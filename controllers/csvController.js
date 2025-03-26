const csvService = require("../services/csvService");

const csvController = {
    csvForm: (req, res) => {
        res.render("upload");
    },
    processCsv: async (req, res) => {
        try {
            // Delegate CSV processing to the service
            const response = await csvService.processAndUploadCsv(req, res, req.file);
            
            if (!response.success)  {
                res.render("upload", {
                    message: `An error occured: ${response.message}`
                })
            }

            res.redirect("/csv/form");
        } catch (error) {
            console.error("Error processing CSV:", error);
            res.status(500).send("Error processing CSV");
        }
    },
};

module.exports = csvController;
