import React from "react";
import css from "./TeamCard.module.css";

type TeamCardProps = {
  image: string;
  name: string;
};

const TeamCard: React.FC<TeamCardProps> = ({ image, name }) => {
  return (
    <div className={css.teamCard} role="region" aria-label={`Team member: ${name}`}>
      <img src={image} alt={`Photo of ${name}`} className={css.teamCardImg} />

      <div className={css.teamCardContainer}>
        <h2 tabIndex={0}>{name}</h2>
      </div>
    </div>
  );
};

export default TeamCard;
