import React from "react";
import "./TeamCard.css";

type TeamCardProps = {
  image: string;
  name: string;
};

const TeamCard: React.FC<TeamCardProps> = ({ image, name }) => {
  return (
    <div className="team-card" role="region" aria-label={`Team member: ${name}`}>
      <img src={image} alt={`Photo of ${name}`} className="team-card-img" />

      <div className="team-card-container">
        <h2 tabIndex={0}>{name}</h2>
      </div>
    </div>
  );
};

export default TeamCard;
