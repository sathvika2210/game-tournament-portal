const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        game: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        maxPlayers: {
            type: Number,
            required: true
        },

        entryFee: {
            type: Number,
            default: 0
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

module.exports = mongoose.model("Tournament", tournamentSchema);