const express = require("express");
const Match = require("../models/Match");

const router = express.Router();

// ===============================
// CREATE MATCH
// ===============================
router.post("/create", async (req, res) => {
    try {
        const {
            tournament,
            team1,
            team2,
            date
        } = req.body;

        // Check that both teams are different
        if (team1 === team2) {
            return res.status(400).json({
                message: "Team 1 and Team 2 must be different"
            });
        }

        const match = new Match({
            tournament,
            team1,
            team2,
            date
        });

        await match.save();

        res.status(201).json({
            message: "Match created successfully",
            match
        });

    } catch (error) {
        res.status(500).json({
            message: "Match creation failed",
            error: error.message
        });
    }
});

// ===============================
// GET ALL MATCHES
// ===============================
router.get("/", async (req, res) => {
    try {
        const matches = await Match.find()
            .populate("tournament", "name game")
            .populate("team1", "name")
            .populate("team2", "name");

        res.status(200).json(matches);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get matches",
            error: error.message
        });
    }
});

// ===============================
// GET ONE MATCH
// ===============================
router.get("/:id", async (req, res) => {
    try {
        const match = await Match.findById(req.params.id)
            .populate("tournament", "name game")
            .populate("team1", "name")
            .populate("team2", "name");

        if (!match) {
            return res.status(404).json({
                message: "Match not found"
            });
        }

        res.status(200).json(match);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get match",
            error: error.message
        });
    }
});

// ===============================
// DELETE MATCH
// ===============================
router.delete("/:id", async (req, res) => {
    try {
        const match = await Match.findByIdAndDelete(
            req.params.id
        );

        if (!match) {
            return res.status(404).json({
                message: "Match not found"
            });
        }

        res.status(200).json({
            message: "Match deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete match",
            error: error.message
        });
    }
});

module.exports = router;