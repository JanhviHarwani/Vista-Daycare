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
    <section className="staff-container" aria-label="Our Team">
      {members.map((member, index) => (
        <div key={index} className="staff_indiv">
          <img
            src={member.image}
            className="image"
          />
        </div>
      ))}
    </section>
  );
};

export default Team;
