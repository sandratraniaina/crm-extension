const authUtils = {
    authenticatedFetch: async (req, res, url, options = {}) => {
        const token = req.session.token;
    
        if (!token) {
            res.redirect("/login");
            return null;
        }
    
        const defaultHeaders = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
    
        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        });
    
        const mockResponse = {
            ok: true,
            json: async () => ({ message: "Mock data from CRM" }),
        };
        
        return mockResponse;
    }
}

module.exports = authUtils;