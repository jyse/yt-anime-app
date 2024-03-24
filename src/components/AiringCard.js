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
          <p>
            <span className="label"> Genres:</span> {genres}
          </p>
          <p>
            <span className="label">Episodes:</span> {episode.episodes || "--"}
          </p>
          <p>
            <span className="label"> Rating:</span> {episode.rating}
          </p>
          <p>
            <span className="label"> Score:</span> {episode.score}
          </p>
          <p>
            <span className="label">Favorites:</span> {episode.favorites},
            Members: {episode.members}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AiringCard;
