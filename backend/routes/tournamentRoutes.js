const express = require("express");
const Tournament = require("../models/Tournament");

const router = express.Router();

// ======================================
// CREATE TOURNAMENT
// ======================================
router.post("/create", async (req, res) => {
    try {
        const {
            name,
            game,
            description,
            date,
            maxPlayers,
            entryFee
        } = req.body;

        const tournament = new Tournament({
            name,
            game,
            description,
            date,
            maxPlayers,
            entryFee
        });

        await tournament.save();

        res.status(201).json({
            message: "Tournament created successfully",
            tournament
        });

    } catch (error) {
        res.status(500).json({
            message: "Tournament creation failed",
            error: error.message
        });
    }
});


// ======================================
// GET ALL TOURNAMENTS
// ======================================
router.get("/", async (req, res) => {
    try {
        const tournaments = await Tournament.find();

        res.status(200).json(tournaments);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get tournaments",
            error: error.message
        });
    }
});


// ======================================
// GET ONE TOURNAMENT
// ======================================
router.get("/:id", async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);

        if (!tournament) {
            return res.status(404).json({
                message: "Tournament not found"
            });
        }

        res.status(200).json(tournament);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get tournament",
            error: error.message
        });
    }
});


// ======================================
// DELETE TOURNAMENT
// ======================================
router.delete("/:id", async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndDelete(
            req.params.id
        );

        if (!tournament) {
            return res.status(404).json({
                message: "Tournament not found"
            });
        }

        res.status(200).json({
            message: "Tournament deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete tournament",
            error: error.message
        });
    }
});


module.exports = router;