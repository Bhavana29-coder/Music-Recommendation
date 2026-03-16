import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import "./profile.css";
import logo from "../assets/images/logo.png";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      {/* NAVBAR */}
      <header className="profile-header">
        <div
          className="header-logo"
          onClick={() => navigate("/")}
          title="Go to home page"
        >
          <img src={logo} alt="App Logo" className="logo-img" />
        </div>

        <nav className="header-nav">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              navigate("/about");
            }}
          >
            <HelpCircle size={16} />
            <span>About</span>
          </a>
        </nav>
      </header>

      {/* PROFILE CARD */}
      <div className="profile-card">
        <div className="profile-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <h2 className="welcome-text">
          WELCOME, <span>{user.name.toUpperCase()}</span>
        </h2>

        <p className="subtext">
          Your journey begins here. Explore, connect, and personalize your
          experience.
        </p>

        <button className="signout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;