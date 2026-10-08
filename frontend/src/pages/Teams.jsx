import { useEffect, useState } from "react";
import axios from "axios";

function Teams() {
    const [teams, setTeams] = useState([]);

    // Get all teams
    const fetchTeams = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/teams"
            );

            setTeams(response.data);
        } catch (error) {
            console.log("Error fetching teams:", error);
        }
    };

    // Load teams when page opens
    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <div>
            <h2>Game Tournament Portal</h2>

            <h3>Teams</h3>

            {teams.length === 0 ? (
                <p>No teams available.</p>
            ) : (
                teams.map((team) => (
                    <div key={team._id}>
                        <h3>{team.name}</h3>

                        <p>
                            <strong>Captain:</strong>{" "}
                            {team.captain?.name}
                        </p>

                        <p>
                            <strong>Captain Email:</strong>{" "}
                            {team.captain?.email}
                        </p>

                        <p>
                            <strong>Members:</strong>{" "}
                            {team.members?.length || 0}
                        </p>

                        <hr />
                    </div>
                ))
            )}

        </div>
    );
}

export default Teams;