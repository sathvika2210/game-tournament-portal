const express = require("express");
const Team = require("../models/Team");

const router = express.Router();

// ======================================
// CREATE TEAM
// ======================================
router.post("/create", async (req, res) => {
    try {
        const { name, captain } = req.body;

        const team = new Team({
            name,
            captain,
            members: [captain]
        });

        await team.save();

        res.status(201).json({
            message: "Team created successfully",
            team
        });

    } catch (error) {
        res.status(500).json({
            message: "Team creation failed",
            error: error.message
        });
    }
});


// ======================================
// GET ALL TEAMS
// ======================================
router.get("/", async (req, res) => {
    try {
        const teams = await Team.find()
            .populate("captain", "name email")
            .populate("members", "name email");

        res.status(200).json(teams);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get teams",
            error: error.message
        });
    }
});


// ======================================
// GET ONE TEAM
// ======================================
router.get("/:id", async (req, res) => {
    try {
        const team = await Team.findById(req.params.id)
            .populate("captain", "name email")
            .populate("members", "name email");

        if (!team) {
            return res.status(404).json({
                message: "Team not found"
            });
        }

        res.status(200).json(team);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get team",
            error: error.message
        });
    }
});


// ======================================
// DELETE TEAM
// ======================================
router.delete("/:id", async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);

        if (!team) {
            return res.status(404).json({
                message: "Team not found"
            });
        }

        res.status(200).json({
            message: "Team deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete team",
            error: error.message
        });
    }
});


module.exports = router;