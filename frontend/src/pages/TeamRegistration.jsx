import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeamRegistration() {

  const navigate = useNavigate();

  const tournament = JSON.parse(
    localStorage.getItem("selectedTournament")
  );

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([
    "",
    "",
    ""
  ]);

  const handleMemberChange = (index, value) => {

    const updatedMembers = [...members];

    updatedMembers[index] = value;

    setMembers(updatedMembers);
  };

  const addMember = () => {

    if (members.length < 5) {
      setMembers([...members, ""]);
    }
  };

  const removeMember = (index) => {

    if (members.length > 1) {

      setMembers(
        members.filter((_, i) => i !== index)
      );

    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!tournament) {
      alert("Please select a tournament first.");
      navigate("/tournaments");
      return;
    }

    const teamData = {
      teamName,
      members: members.filter(
        (member) => member.trim() !== ""
      ),
      tournamentId: tournament._id,
      tournamentName:
        tournament.name || tournament.title
    };

    localStorage.setItem(
      "teamRegistration",
      JSON.stringify(teamData)
    );

    navigate("/payment");
  };

  if (!tournament) {

    return (
      <div className="empty-page">

        <h2>No tournament selected</h2>

        <button
          className="primary-btn"
          onClick={() => navigate("/tournaments")}
        >
          Go to Tournaments
        </button>

      </div>
    );
  }

  return (
    <div className="form-page">

      <div className="form-card team-card">

        <h1>👥 Team Registration</h1>

        <div className="selected-tournament">

          <h2>
            {tournament.name || tournament.title}
          </h2>

          <p>
            Entry Fee: ₹
            {tournament.entryFee ??
              tournament.entryFees ??
              0}
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <label>Team Name</label>

          <input
            type="text"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) =>
              setTeamName(e.target.value)
            }
            required
          />

          <h3>Team Members</h3>

          {members.map((member, index) => (

            <div
              className="member-row"
              key={index}
            >

              <input
                type="text"
                placeholder={`Member ${index + 1} name`}
                value={member}
                onChange={(e) =>
                  handleMemberChange(
                    index,
                    e.target.value
                  )
                }
                required={index === 0}
              />

              {members.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() =>
                    removeMember(index)
                  }
                >
                  ×
                </button>
              )}

            </div>

          ))}

          {members.length < 5 && (
            <button
              type="button"
              className="secondary-btn"
              onClick={addMember}
            >
              + Add Member
            </button>
          )}

          <button
            type="submit"
            className="primary-btn"
          >
            Continue to Payment
          </button>

        </form>

      </div>

    </div>
  );
}

export default TeamRegistration;