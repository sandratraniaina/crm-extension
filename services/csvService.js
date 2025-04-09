const FormData = require("form-data");

const csvService = {
    async processAndUploadCsv(req, res, file) {
        // Check for token manually
        const token = req.session.token;
        if (!token) {
            res.redirect("/login");
            return null;
        }

        // Convert file buffer to string
        const fileContent = file.buffer.toString("utf8");

        // Split into sections based on blank lines, remove empty sections
        const sections = fileContent
            .split(/\r?\n\s*\r?\n/)
            .filter((section) => section.trim() !== "");

        // Validate that there are exactly three sections
        if (sections.length !== 3) {
            throw new Error(
                "The CSV file must contain exactly three entity sections separated by blank lines"
            );
        }

        // Create multipart form
        const form = new FormData();
        form.append("customerCsvFile", sections[0], {
            filename: "customer.csv",
            contentType: "text/csv",
        });
        form.append("budgetCsvFile", sections[1], {
            filename: "budget.csv",
            contentType: "text/csv",
        });
        form.append("expenseCsvFile", sections[2], {
            filename: "expense.csv",
            contentType: "text/csv",
        });

        // Get multipart headers
        const multipartHeaders = form.getHeaders();
        console.log("Multipart headers:", multipartHeaders);

        // Construct full URL
        const baseUrl = process.env.API_HOST || "http://localhost:8080"; // Fallback to localhost:8080 if not set
        const fullUrl = `${baseUrl}/api/customer/upload`;

        // Use native fetch with custom headers
        try {
            const response = await fetch(fullUrl, {
                method: "POST",
                headers: {
                    ...multipartHeaders, // Preserve multipart/form-data headers
                    Authorization: `Bearer ${token}`, // Add token manually
                },
                body: form,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `API request failed with status ${response.status}: ${errorText}`
                );
            }

            const jsonResponse = await response.json(); // Assuming JSON response from Spring Boot
            return jsonResponse;
        } catch (error) {
            console.error("Fetch error:", error.message);
            res.status(500).send(`Fetch Error: ${error.message}`);
            return null;
        }
    },
};

module.exports = csvService;
