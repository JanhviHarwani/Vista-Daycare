// TeamCard.js
import React from "react";
import "./TeamCard.css";

type TeamCardProps = {
  image: string;
  name: string;
};

const TeamCard: React.FC<TeamCardProps> = ({ image, name }) => {
  return (
    <div className="team-card">
      <img src={image} alt={name} className="team-card-img" />
      <div className="team-card-container">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default TeamCard;
