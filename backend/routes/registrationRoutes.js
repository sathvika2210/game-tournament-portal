const express = require("express");
const Registration = require("../models/Registration");

const router = express.Router();

// ======================================
// JOIN TOURNAMENT
// ======================================
router.post("/join", async (req, res) => {
    try {
        const { userId, tournamentId } = req.body;

        // Check if user already joined
        const existingRegistration = await Registration.findOne({
            user: userId,
            tournament: tournamentId
        });

        if (existingRegistration) {
            return res.status(400).json({
                message: "You already joined this tournament"
            });
        }

        // Create registration
        const registration = new Registration({
            user: userId,
            tournament: tournamentId
        });

        await registration.save();

        res.status(201).json({
            message: "Tournament joined successfully",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to join tournament",
            error: error.message
        });
    }
});


// ======================================
// GET ALL REGISTRATIONS
// ======================================
router.get("/", async (req, res) => {
    try {
        const registrations = await Registration.find()
            .populate("user", "name email")
            .populate("tournament", "name game");

        res.status(200).json(registrations);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get registrations",
            error: error.message
        });
    }
});


module.exports = router;