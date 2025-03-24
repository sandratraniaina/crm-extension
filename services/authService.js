const mockApiService = {
    login: async (username, password) => {
        if (username === "admin" && password === "password123") {
            return {
                success: true,
                token: "mock-jwt-token-12345",
            };
        }
        return {
            success: false,
        };
    },
};

module.exports = mockApiService;
