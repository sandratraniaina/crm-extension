const authUtils = {
    authenticatedFetch: async (req, res, url, options = {}) => {
        const token = req.session.token;
        if (!token) {
            res.redirect("/login");
            return null;
        }

        const baseUrl = "http://localhost:8080";
        const fullUrl = `${baseUrl}${url}`;
        const headers = {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        try {
            const response = await fetch(fullUrl, {
                ...options,
                headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonResponse = await response.json();

            if (!jsonResponse.success) {
                throw new Error(jsonResponse.message || "API request failed");
            }

            return jsonResponse.data !== undefined ? jsonResponse.data : true;
        } catch (error) {
            console.error("API fetch error:", error.message);
            res.status(500).send(`API Error: ${error.message}`);
            return null;
        }
    },
};

module.exports = authUtils;
