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

require('dotenv').config();

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

app.use("/", authRoutes);
app.use("/", dashboardRoutes);

app.use("/customers", customerBudgetRoutes);

app.use("/expense-threshold", expenseThresholdRoutes);

app.use("/tickets", ticketsRoutes);
app.use("/tickets", ticketExpenseRoutes);

app.use("/leads", leadsRoutes);
app.use("/leads", leadExpenseRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
