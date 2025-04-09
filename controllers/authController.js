const authService = require("../services/authService");

const authController = {
    getLogin: (req, res) => {
        res.render("login", { error: null });
    },

    postLogin: async (req, res) => {
        const { username, password } = req.body;
        const response = await authService.login(username, password);

        if (response.success) {
            req.session.user = response.data.userDetails;
            req.session.token = response.data.token;
            return res.redirect("/");
        }

        res.render("login", { error: response.message });
    },

    getDashboard: (req, res) => {
        res.send("Welcome to the Dashboard!"); // Placeholder
    },
};

module.exports = authController;
