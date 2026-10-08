const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const teamRoutes = require("./routes/teamRoutes");
const matchRoutes = require("./routes/matchRoutes");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// API ROUTES
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/tournaments", tournamentRoutes);

app.use("/api/registrations", registrationRoutes);

app.use("/api/teams", teamRoutes);

app.use("/api/matches", matchRoutes);

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.send("Game Tournament Portal Backend is Running");
});

// ===============================
// CONNECT TO MONGODB
// ===============================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((error) => {
        console.log(
            "MongoDB Connection Error:",
            error
        );
    });