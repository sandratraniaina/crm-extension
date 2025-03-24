const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const expenseThresholdRoutes = require('./routes/expenseThresholdRoutes');

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
app.use('/', expenseThresholdRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
