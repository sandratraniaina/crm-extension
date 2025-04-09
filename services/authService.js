const mockApiService = {
    login: async (username, password) => {
        const fullUrl = `${process.env.API_HOST}/api/login`;
        const headers = {
            "Content-Type": "application/json",
        };

        const response = await fetch(fullUrl, {
            method: "POST",
            headers,
            body: JSON.stringify({
                username,
                password,
            }),
        });

        return await response.json();
    },
};

module.exports = mockApiService;
