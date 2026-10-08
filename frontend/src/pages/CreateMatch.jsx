import { useEffect, useState } from "react";
import axios from "axios";

function CreateMatch() {
    const [tournaments, setTournaments] = useState([]);
    const [teams, setTeams] = useState([]);

    const [formData, setFormData] = useState({
        tournament: "",
        team1: "",
        team2: "",
        date: ""
    });

    // Get tournaments and teams
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tournamentResponse = await axios.get(
                    "http://localhost:5000/api/tournaments"
                );

                const teamResponse = await axios.get(
                    "http://localhost:5000/api/teams"
                );

                setTournaments(tournamentResponse.data);
                setTeams(teamResponse.data);

            } catch (error) {
                console.log("Error loading data:", error);
            }
        };

        fetchData();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Create match
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.team1 === formData.team2) {
            alert("Team 1 and Team 2 must be different");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/matches/create",
                formData
            );

            alert(response.data.message);

            setFormData({
                tournament: "",
                team1: "",
                team2: "",
                date: ""
            });

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Match creation failed"
            );
        }
    };

    return (
        <div>
            <h2>Game Tournament Portal</h2>

            <h3>Create Match</h3>

            <form onSubmit={handleSubmit}>

                {/* Tournament */}
                <label>Tournament:</label>

                <br />

                <select
                    name="tournament"
                    value={formData.tournament}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Tournament
                    </option>

                    {tournaments.map((tournament) => (
                        <option
                            key={tournament._id}
                            value={tournament._id}
                        >
                            {tournament.name}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                {/* Team 1 */}
                <label>Team 1:</label>

                <br />

                <select
                    name="team1"
                    value={formData.team1}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Team 1
                    </option>

                    {teams.map((team) => (
                        <option
                            key={team._id}
                            value={team._id}
                        >
                            {team.name}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                {/* Team 2 */}
                <label>Team 2:</label>

                <br />

                <select
                    name="team2"
                    value={formData.team2}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Team 2
                    </option>

                    {teams.map((team) => (
                        <option
                            key={team._id}
                            value={team._id}
                        >
                            {team.name}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                {/* Date */}
                <label>Match Date:</label>

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

                <button type="submit">
                    Create Match
                </button>

            </form>
        </div>
    );
}

export default CreateMatch;