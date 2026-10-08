import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {

  const navigate = useNavigate();

  const tournament = JSON.parse(
    localStorage.getItem("selectedTournament")
  );

  const team = JSON.parse(
    localStorage.getItem("teamRegistration")
  );

  const [method, setMethod] = useState("UPI");
  const [processing, setProcessing] = useState(false);

  if (!tournament || !team) {

    return (
      <div className="empty-page">

        <h2>Registration details not found</h2>

        <button
          className="primary-btn"
          onClick={() => navigate("/tournaments")}
        >
          Go to Tournaments
        </button>

      </div>
    );
  }

  const amount =
    tournament.entryFee ??
    tournament.entryFees ??
    0;

  const handlePayment = (e) => {

    e.preventDefault();

    setProcessing(true);

    setTimeout(() => {

      localStorage.setItem(
        "paymentStatus",
        "success"
      );

      navigate("/registration-confirmed");

    }, 1500);
  };

  return (
    <div className="form-page">

      <div className="form-card">

        <h1>💳 Payment</h1>

        <div className="payment-summary">

          <h2>
            {tournament.name ||
              tournament.title}
          </h2>

          <p>
            Team: <strong>{team.teamName}</strong>
          </p>

          <p>
            Members:{" "}
            <strong>
              {team.members.length}
            </strong>
          </p>

          <h2>
            Amount: ₹{amount}
          </h2>

        </div>

        <form onSubmit={handlePayment}>

          <label>Payment Method</label>

          <select
            value={method}
            onChange={(e) =>
              setMethod(e.target.value)
            }
          >
            <option value="UPI">UPI</option>
            <option value="Card">
              Credit / Debit Card
            </option>
            <option value="Net Banking">
              Net Banking
            </option>
          </select>

          <button
            className="primary-btn"
            type="submit"
            disabled={processing}
          >
            {processing
              ? "Processing..."
              : `Pay ₹${amount}`}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Payment;