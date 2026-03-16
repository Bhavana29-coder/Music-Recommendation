import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

import logo from "../assets/images/logo.png"; // ✅ add this

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Header with Logo */}
      <div className="about-header">
        <div className="about-header-top">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="Musify Logo" className="logo-img" />
          </div>

          <div className="about-header-text">
            <h1>
              About <span>Musify</span>
            </h1>
            <p>
              Discover music the way <span>it sounds</span>
            </p>
          </div>
        </div>
      </div>

      {/* Feature Card */}
      <div className="about-card">
        <p className="about-desc">
          Unlike traditional systems that rely on genres or tags, Musify
          analyzes the audio itself to understand musical{" "}
          <span>patterns</span>.
        </p>

        <h3 className="feature-title">Analyzes audio features like</h3>

        <div className="features">
          <div className="feature-item">
            <span className="icon">🎵</span>
            <p>Rhythm & Tempo</p>
          </div>
          <div className="feature-item">
            <span className="icon">〰️</span>
            <p>Pitch & Melody</p>
          </div>
          <div className="feature-item">
            <span className="icon">✦</span>
            <p>Energy & Dynamics</p>
          </div>
        </div>
      </div>

      {/* Goal Section */}
      <h2 className="section-heading">Our Goal</h2>
      <div className="about-card">
        <p className="goal-text">
          To create a new way of music discovery based solely on how songs
          sound, not restricted by labels or biases.
        </p>
        <p className="goal-highlight">
          No genres. No tags. Just sound.
        </p>
      </div>

      {/* Hackathon Section */}
      <h2 className="section-heading">Designed for Hackathon</h2>
      <div className="about-card hackathon-card">
        <p>
          ⚡ This project was created as part of a hackathon, focusing on
          innovation and practical impact in music recommendation.
        </p>
      </div>

      {/* Team Section */}
      <h2 className="section-heading">Team Members</h2>
      <div className="team-grid">
        <div className="team-card">Anushka Gupta</div>
        <div className="team-card">Aastha Khandelwal</div>
        <div className="team-card">Gunjan Sidana</div>
        <div className="team-card">Bhavana Saini</div>
      </div>
    </div>
  );
};

export default About;
