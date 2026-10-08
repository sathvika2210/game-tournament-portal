import { useState } from "react";
import axios from "axios";

function CreateTournament() {
    const [formData, setFormData] = useState({
        name: "",
        game: "",
        description: "",
        date: "",
        maxPlayers: "",
        entryFee: ""
    });

    const games = [
        "BGMI",
        "Free Fire",
        "Valorant",
        "FIFA",
        "Minecraft",
        "Call of Duty"
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/tournaments/create",
                formData
            );

            alert(response.data.message);

            setFormData({
                name: "",
                game: "",
                description: "",
                date: "",
                maxPlayers: "",
                entryFee: ""
            });

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Tournament creation failed"
            );
        }
    };

    return (
        <div>
            <h2>Game Tournament Portal</h2>

            <h3>Create Tournament</h3>

            <form onSubmit={handleSubmit}>

                {/* Tournament Name */}
                <label>Tournament Name:</label>
                <br />

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Tournament Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                {/* Game */}
                <label>Select Game:</label>
                <br />

                <select
                    name="game"
                    value={formData.game}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Game
                    </option>

                    {games.map((game) => (
                        <option
                            key={game}
                            value={game}
                        >
                            {game}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                {/* Description */}
                <label>Description:</label>
                <br />

                <textarea
                    name="description"
                    placeholder="Enter Tournament Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                {/* Date */}
                <label>Tournament Date:</label>
                <br />

                <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                {/* Maximum Players */}
                <label>Maximum Players:</label>
                <br />

                <input
                    type="number"
                    name="maxPlayers"
                    placeholder="Enter Maximum Players"
                    value={formData.maxPlayers}
                    onChange={handleChange}
                    min="1"
                    required
                />

                <br />
                <br />

                {/* Entry Fee */}
                <label>Entry Fee:</label>
                <br />

                <input
                    type="number"
                    name="entryFee"
                    placeholder="Enter Entry Fee"
                    value={formData.entryFee}
                    onChange={handleChange}
                    min="0"
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Create Tournament
                </button>

            </form>
        </div>
    );
}

export default CreateTournament;