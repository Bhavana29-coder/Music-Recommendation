import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { songs } from "../data/songs";
import "./playmusic.css";

import logo from "../assets/images/logo.png"; // ✅ logo

const FEATURE_LABELS = [
  "Energy",
  "Danceability",
  "Tempo",
  "Loudness",
  "Spectral Brightness",
  "Bass Strength",
  "Rhythmic Stability",
  "Harmonic Complexity",
  "Timbre Richness",
  "Dynamic Range",
];

export default function PlayMusic() {
  const { id } = useParams();
  const navigate = useNavigate();

  const song = songs.find((s) => s.id === Number(id));

  const [recommendations, setRecommendations] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("similar");

  // 🔁 Similar Songs (with retry)
  useEffect(() => {
    if (!song) return;

    const fetchRecommendations = async (retry = 0) => {
      try {
        setLoading(true);

        const res = await fetch(`/similar/${song.backendName}?k=4`);
        if (!res.ok) throw new Error("Backend not ready");

        const data = await res.json();

        const matched = data
          .map((item) => {
            const songData = songs.find((s) =>
              item.song.startsWith(s.backendName)
            );
            if (!songData) return null;

            return {
              ...songData,
              similarity: Math.round(item.score * 100),
            };
          })
          .filter(Boolean);

        setRecommendations(matched);
      } catch (err) {
        if (retry < 1) {
          setTimeout(() => fetchRecommendations(retry + 1), 1000);
        } else {
          console.error("Recommendation error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [song]);

  // 🎧 Audio Features
  useEffect(() => {
    if (!song) return;

    fetch(`/features/${song.backendName}`)
      .then((r) => r.json())
      .then((d) => setFeatures(d.pca_features || []))
      .catch((err) => console.error("Feature error:", err));
  }, [song]);

  if (!song) return <h2>Song not found</h2>;

  return (
    <div className="play-page">
      {/* Header with Logo only */}
      <div className="play-header">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Musify Logo" className="logo-img" />
        </div>
      </div>

      <div className="player-container">
        {/* LEFT */}
        <div className="main-song">
          <img src={song.cover} className="main-cover" alt={song.title} />
          <h2>{song.title}</h2>
          <p>{song.genre.toUpperCase()}</p>
          <audio controls autoPlay src={song.src} />
        </div>

        {/* RIGHT */}
        <div className="song-tabs">
          <div className="tabs">
            <button
              className={activeTab === "features" ? "active" : ""}
              onClick={() => setActiveTab("features")}
            >
              Audio Features
            </button>

            <button
              className={activeTab === "similar" ? "active" : ""}
              onClick={() => setActiveTab("similar")}
            >
              Similar Songs
            </button>
          </div>

          {/* 🎵 SIMILAR SONGS */}
          {activeTab === "similar" && (
            <div className="similar-content">
              {loading && <p>Loading...</p>}

              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="recommended-song"
                  onClick={() => navigate(`/play/${rec.id}`)}
                >
                  <img src={rec.cover} alt={rec.title} />

                  <div className="rec-info">
                    <p>{rec.title}</p>
                    <span>{rec.genre.toUpperCase()}</span>
                  </div>

                  <div className="similarity-percent">
                    {rec.similarity}%
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 🎚 AUDIO FEATURES */}
          {activeTab === "features" && (
            <div className="features-content">
              {features.map((f, i) => {
                const value = Math.min(
                  100,
                  Math.round(Math.abs(f) * 100)
                );

                return (
                  <div key={i} className="feature-bar">
                    <div className="feature-header">
                      <span>
                        {FEATURE_LABELS[i] || `Feature ${i + 1}`}
                      </span>
                      <span className="percent">{value}%</span>
                    </div>

                    <div className="bar">
                      <div
                        className="fill"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
