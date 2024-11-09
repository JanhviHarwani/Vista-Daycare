// Team.js
import React from "react";
import "./Team.css"; 


type TeamMember = {
  image: string;
};

type TeamProps = {
  members: TeamMember[];
};

const Team: React.FC<TeamProps> = ({ members }) => {
  return (
    <div className="staff-container">
      {members.map((member, index) => (
        <div key={index} className="staff_indiv">
          <img src={member.image} className="image" />
        </div>
      ))}
    </div>
  );
};

export default Team;
