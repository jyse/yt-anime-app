import React from "react";
import "./UpcomingCard.css";

function UpcomingCard({ episode }) {
  return (
    <div className="media-card">
      <img className="image" src={episode.images.jpg.image_url} alt="test" />
      <div className="title">
        <h3>{episode.newTitle}</h3>
      </div>
      <div className="episode">
        <p>{episode.start_date}</p>
      </div>
    </div>
  );
}

export default UpcomingCard;
