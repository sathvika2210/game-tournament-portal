import React from "react";
import { useNavigate } from "react-router-dom";

function RegistrationConfirmed() {

  const navigate = useNavigate();

  const tournament = JSON.parse(
    localStorage.getItem("selectedTournament")
  );

  const team = JSON.parse(
    localStorage.getItem("teamRegistration")
  );

  return (
    <div className="confirmation-page">

      <div className="confirmation-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Registration Successful!</h1>

        <p>
          Your team has been registered successfully.
        </p>

        {tournament && (
          <div className="confirmation-details">

            <p>
              <strong>Tournament:</strong>{" "}
              {tournament.name ||
                tournament.title}
            </p>

            <p>
              <strong>Team:</strong>{" "}
              {team?.teamName}
            </p>

            <p>
              <strong>Members:</strong>{" "}
              {team?.members?.join(", ")}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              Successful
            </p>

          </div>
        )}

        <button
          className="primary-btn"
          onClick={() =>
            navigate("/tournaments")
          }
        >
          View More Tournaments
        </button>

      </div>

    </div>
  );
}

export default RegistrationConfirmed;