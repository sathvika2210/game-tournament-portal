const mongoose = require("mongoose");
require("dotenv").config();

const Tournament = require("./models/Tournament");
const Registration = require("./models/Registration");

const tournaments = [
    {
        name: "KLU Cricket Championship",
        game: "Cricket",
        description: "Inter-college cricket tournament",
        date: "2026-10-20T10:00:00",
        maxPlayers: 100,
        entryFee: 500,
        status: "Upcoming"
    },
    {
        name: "BGMI Battle Royale",
        game: "BGMI",
        description: "BGMI team battle tournament",
        date: "2026-10-22T18:00:00",
        maxPlayers: 100,
        entryFee: 200,
        status: "Upcoming"
    },
    {
        name: "Free Fire Clash",
        game: "Free Fire",
        description: "Free Fire squad championship",
        date: "2026-10-24T18:00:00",
        maxPlayers: 50,
        entryFee: 100,
        status: "Upcoming"
    },
    {
        name: "Valorant 5v5 Championship",
        game: "Valorant",
        description: "Competitive Valorant 5 versus 5 tournament",
        date: "2026-10-26T17:00:00",
        maxPlayers: 50,
        entryFee: 300,
        status: "Upcoming"
    },
    {
        name: "FIFA Football Cup",
        game: "FIFA",
        description: "FIFA football gaming tournament",
        date: "2026-10-28T16:00:00",
        maxPlayers: 32,
        entryFee: 250,
        status: "Upcoming"
    },
    {
        name: "Minecraft Challenge",
        game: "Minecraft",
        description: "Creative and survival Minecraft challenge",
        date: "2026-10-30T15:00:00",
        maxPlayers: 40,
        entryFee: 150,
        status: "Upcoming"
    },
    {
        name: "Call of Duty Championship",
        game: "Call of Duty",
        description: "Call of Duty multiplayer battle tournament",
        date: "2026-11-01T18:00:00",
        maxPlayers: 100,
        entryFee: 200,
        status: "Upcoming"
    },
    {
        name: "Asphalt Racing Cup",
        game: "Asphalt",
        description: "High-speed online racing tournament",
        date: "2026-11-03T17:00:00",
        maxPlayers: 32,
        entryFee: 100,
        status: "Upcoming"
    },
    {
        name: "Tekken Battle Championship",
        game: "Tekken",
        description: "One versus one fighting game tournament",
        date: "2026-11-05T16:00:00",
        maxPlayers: 32,
        entryFee: 150,
        status: "Upcoming"
    },
    {
        name: "Basketball Gaming Tournament",
        game: "Basketball",
        description: "Online basketball gaming championship",
        date: "2026-11-07T16:00:00",
        maxPlayers: 20,
        entryFee: 300,
        status: "Upcoming"
    }
];

const seedTournaments = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        // Remove old registrations
        await Registration.deleteMany({});

        // Remove old tournaments
        await Tournament.deleteMany({});

        // Add 10 tournaments
        await Tournament.insertMany(tournaments);

        console.log("10 tournaments added successfully!");

        await mongoose.disconnect();

        console.log("MongoDB Disconnected");

    } catch (error) {
        console.log("Error:", error.message);
        process.exit(1);
    }
};

seedTournaments();