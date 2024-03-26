import "./AiringCard.css";
import React, { useState, useEffect } from "react";

function AiringCard({ episode }) {
  const [genres, setGenres] = useState([]);

  const getDetails = (episode) => {
    const genresSentence = episode.genres.map((genre) => genre.name).join(", ");
    setGenres(genresSentence);
  };

  useEffect(() => {
    getDetails(episode);
  }, [episode]);

  return (
    <div className="card">
      <img
        className="card-image"
        src={episode.images.jpg.image_url}
        alt={episode.title}
      />
      <div className="card-details">
        <div className="card-title">
          <h3>{episode.newTitle}</h3>
          <p>Genres: {genres}</p>
          <p>Episodes: {episode.episodes || "--"}</p>
          <p>Score: {episode.score}</p>
          <p>
            Favorites: {episode.favorites}, Members: {episode.members}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AiringCard;
