const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 3000;

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "your-secret-key", // Replace with a secure key in production
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set to true in production with HTTPS
    })
);

// Routes
app.use("/", authRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
