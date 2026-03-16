import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img6 from "../assets/images/img6.jpg";
import img7 from "../assets/images/img7.jpg";
import img8 from "../assets/images/img8.jpg";
import logo from "../assets/images/logo.png";

const images = [img6, img2, img3, img4, img5, img1, img7, img8];

export default function Home() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!storedUser;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Musify Logo" className="logo-img" />
        </div>

        <div className="nav-links">
          <button className="nav-btn" onClick={() => navigate("/about")}>
            About
          </button>

          <button className="nav-btn" onClick={() => navigate("/contact")}>
            Contact
          </button>

          {!isLoggedIn ? (
            <button
              className="btn outline small"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <div
              className="user-avatar"
              onClick={() => navigate("/profile")}
              title={storedUser.name}
            >
              {storedUser.name
                ? storedUser.name.charAt(0).toUpperCase()
                : "U"}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Discover music with <br />
            <span className="gradient-text">musical precision.</span>
          </h1>

          <p className="subtitle">
            Explore your music taste through data visualization. Our
            AI-powered engine analyzes audio features to find your perfect
            rhythm.
          </p>

          <div className="cta">
            <button
              className="btn primary large"
              onClick={() => navigate("/exploresongs")}
            >
              Start Listening
            </button>
          </div>
        </div>

        <div className="hero-right image-box">
          <img
            key={index}
            src={images[index]}
            alt="Musify Feature"
            className="slider-image"
          />
        </div>
      </section>
    </div>
  );
}