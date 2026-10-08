import React from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Tournaments from "./pages/Tournaments";
import TeamRegistration from "./pages/TeamRegistration";
import Payment from "./pages/Payment";
import RegistrationConfirmed from "./pages/RegistrationConfirmed";
import Teams from "./pages/Teams";
import CreateTeam from "./pages/CreateTeam";
import CreateMatch from "./pages/CreateMatch";

import "./App.css";

function App() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("selectedTournament");
    navigate("/login");
  };

  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          🎮 Game Tournament
        </div>

        <div className="nav-links">
          {isLoggedIn ? (
            <>
              <Link to="/tournaments">Tournaments</Link>
              <Link to="/teams">Teams</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>

        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to="/tournaments" />
              : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/tournaments"
          element={<Tournaments />}
        />

        <Route
          path="/team-registration"
          element={<TeamRegistration />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/registration-confirmed"
          element={<RegistrationConfirmed />}
        />

        <Route
          path="/teams"
          element={<Teams />}
        />

        <Route
          path="/create-team"
          element={<CreateTeam />}
        />

        <Route
          path="/create-match"
          element={<CreateMatch />}
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </div>
  );
}

export default App;