import { useState } from "react";
import axios from "axios";

function CreateTeam() {
    const [teamName, setTeamName] = useState("");

    const createTeam = async (e) => {
        e.preventDefault();

        const captain = localStorage.getItem("userId");

        if (!captain) {
            alert("Please login first");
            window.location.href = "/";
            return;
        }

        if (!teamName.trim()) {
            alert("Please enter a team name");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/teams/create",
                {
                    name: teamName,
                    captain: captain
                }
            );

            alert(response.data.message);

            setTeamName("");

            // Go back to tournaments after creating team
            window.location.href = "/tournaments";

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Team creation failed"
            );
        }
    };

    return (
        <div>
            <h2>Game Tournament Portal</h2>

            <h3>Create Team</h3>

            <p>
                Captain:{" "}
                {localStorage.getItem("userName") || "Not logged in"}
            </p>

            <form onSubmit={createTeam}>
                <input
                    type="text"
                    placeholder="Enter Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Create Team
                </button>
            </form>
        </div>
    );
}

export default CreateTeam;