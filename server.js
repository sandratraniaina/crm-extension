const express = require("express");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const leadsRoutes = require("./routes/leadsRoutes");
const ticketsRoutes = require("./routes/ticketsRoutes");
const expenseThresholdRoutes = require("./routes/expenseThresholdRoutes");
const leadExpenseRoutes = require("./routes/leadExpenseRoutes");
const ticketExpenseRoutes = require("./routes/ticketExpenseRoutes");
const customerBudgetRoutes = require("./routes/customerBudgetRoutes");
const csvRoutes = require("./routes/csvRoutes");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 120000,
            secure: false,
            httpOnly: true,
        },
    })
);
app.use((req, res, next) => {
    res.locals.session = req.session; // Make session data available in EJS
    next();
});

app.use("/", authRoutes);
app.use("/", dashboardRoutes);

app.use("/csv", csvRoutes);

app.use("/customers", customerBudgetRoutes);

app.use("/expense-threshold", expenseThresholdRoutes);

app.use("/tickets", ticketsRoutes);
app.use("/tickets", ticketExpenseRoutes);

app.use("/leads", leadsRoutes);
app.use("/leads", leadExpenseRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
