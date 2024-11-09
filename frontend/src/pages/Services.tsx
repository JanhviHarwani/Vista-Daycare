import ApplicationStructure from "../components/ApplicationStructure";
import Slider from "./Slider";
import Team from "./Team";
import './Services.css';

const teamMembers = [
  { image: "/image1.jpg" },

];

function Services() {
  return (
    <ApplicationStructure>
      <div className="whole">
        <Slider />
        <div className="services-container">
          {[
            "Health Services",
            "Nutrition",
            "Personal Care",
            "Activities",
            "Transportation",
            "Counseling",
            "Services for Caregivers",
          ].map((section, index) => (
            <div key={index} className="service-card">
              <h2 className="service-title">{section}</h2>
              <p className="service-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus,
                molestie est a, tempor magna.
              </p>
              <hr className="card-divider" />
              <Team members={teamMembers} />
            </div>
          ))}
        </div>
      </div>
    </ApplicationStructure>
  );
}

export default Services;
