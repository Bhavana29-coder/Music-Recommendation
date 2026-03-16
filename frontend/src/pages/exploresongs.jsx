import React, { useState } from "react";
import { songs } from "../data/songs";
import { useNavigate } from "react-router-dom";
import "./exploresongs.css";
import logo from "../assets/images/logo.png";

export default function ExploreSongs() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handlePlay = (song) => {
    navigate(`/play/${song.id}`);
  };

  // ✅ Filter songs dynamically based on search input
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="songs-page">
      {/* Header with Logo */}
      <div className="songs-header">
        <div className="songs-header-top">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="Musify Logo" className="logo-img" />
          </div>

          <div className="songs-header-text">
  <h1>🎵 Dive Into the Rhythm</h1>
  <p>Explore <span>{songs.length} tracks</span> from every genre — your next favorite song is just a click away!</p>
</div>
        </div>

        {/* ✅ Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a song..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
      </div>

      {/* Song List */}
      <div className="songs-list">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <div
              key={song.id}
              className="song-row"
              onClick={() => handlePlay(song)}
            >
              <span className="song-index">{index + 1}</span>

              <div className="song-info">
                <h4>{song.title}</h4>
                <p>{song.genre.toUpperCase()}</p>
              </div>

              <span className="play-icon">▶</span>
            </div>
          ))
        ) : (
          <p className="no-results">No songs found</p>
        )}
      </div>
    </div>
  );
}