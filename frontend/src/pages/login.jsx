import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelpCircle } from "lucide-react";

import "./login.css";
import logo from "../assets/images/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      activeTab === "login"
        ? "http://127.0.0.1:8000/api/login"
        : "http://127.0.0.1:8000/api/signup";

    const payload =
      activeTab === "login"
        ? { email, password }
        : { name, email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        alert(data.message);

        if (activeTab === "signup") {
          // After signup, redirect to login tab
          setActiveTab("login");
          setEmail("");
          setPassword("");
          setName("");
        } else {
          // ✅ Save user info (for later use in home)
          localStorage.setItem("user", JSON.stringify(data.user || { name, email }));

          // ✅ Redirect to home
          navigate("/");
        }
      } else {
        alert(data.detail || data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server connection error");
      setLoading(false);
    }
  };

  return (
    <div className="page-transition">
      <div className="login-page">
        {/* NAVBAR */}
        <header className="login-header">
          <div
            className="header-logo"
            onClick={() => navigate("/")}
            title="Go to home page"
          >
            <img src={logo} alt="Musify Logo" className="logo-img" />
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

        {/* PAGE HEADER */}
        <header className="login-header-content">
          <h1>{activeTab === "login" ? "Welcome Back" : "Create Account"}</h1>
          <p>
            {activeTab === "login"
              ? "Login to your Musify account"
              : "Sign up to start using Musify"}
          </p>
        </header>

        {/* MAIN CONTENT */}
        <main className="login-main">
          <div className="login-container">
            {/* TABS */}
            <div className="form-tabs">
              <button
                className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {activeTab === "signup" && (
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading
                  ? "Please wait..."
                  : activeTab === "login"
                  ? "Login"
                  : "Create Account"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;