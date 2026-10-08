import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tournaments() {

  const navigate = useNavigate();

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/tournaments"
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to load tournaments");
        return;
      }

      setTournaments(
        Array.isArray(data)
          ? data
          : data.tournaments || []
      );

    } catch (error) {

      setError(
        "Cannot connect to backend. Make sure the backend server is running."
      );

    } finally {

      setLoading(false);

    }
  };

  const joinTournament = (tournament) => {

    localStorage.setItem(
      "selectedTournament",
      JSON.stringify(tournament)
    );

    navigate("/team-registration");
  };

  if (loading) {
    return (
      <div className="loading">
        Loading tournaments...
      </div>
    );
  }

  return (
    <div className="tournament-page">

      <div className="page-header">

        <h1>🏆 Game Tournaments</h1>

        <p>
          Choose your tournament and join the competition!
        </p>

      </div>

      {error && (
        <div className="error tournament-error">
          {error}
        </div>
      )}

      <div className="tournament-grid">

        {tournaments.map((tournament) => (

          <div
            className="tournament-card"
            key={tournament._id}
          >

            <div className="game-icon">
              🎮
            </div>

            <h2>
              {tournament.name || tournament.title}
            </h2>

            <p className="description">
              {tournament.description ||
                "Join this exciting gaming tournament."}
            </p>

            <div className="tournament-info">

              <div>
                📅
                <span>
                  {tournament.date
                    ? new Date(tournament.date).toLocaleDateString()
                    : "Date not available"}
                </span>
              </div>

              <div>
                👥
                <span>
                  Max Players:{" "}
                  {tournament.maxPlayers || "N/A"}
                </span>
              </div>

              <div>
                💰
                <span>
                  Entry Fee: ₹
                  {tournament.entryFee ??
                    tournament.entryFees ??
                    0}
                </span>
              </div>

              <div>
                🟢
                <span>
                  Status:{" "}
                  {tournament.status || "Open"}
                </span>
              </div>

            </div>

            <button
              className="join-btn"
              onClick={() => joinTournament(tournament)}
            >
              Join Tournament
            </button>

          </div>

        ))}

      </div>

      {tournaments.length === 0 && !error && (
        <div className="empty">
          No tournaments found.
        </div>
      )}

    </div>
  );
}

export default Tournaments;