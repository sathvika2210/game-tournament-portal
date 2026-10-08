const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
    {
        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            required: true
        },

        team1: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true
        },

        team2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            default: "Upcoming"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Match", matchSchema);