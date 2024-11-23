import React from "react";
import ApplicationStructure from "../components/ApplicationStructure";
import Carousel from "../components/Carousel";
import bingo from "../assets/image/bingo.jpg";
import milk from "../assets/image/milk.jpg";
import craft from "../assets/image/craft.jpg";
import "./Activities.css";

const Activities: React.FC = () => {
  // Data for upper section
  const upperImages = [bingo, craft, bingo, craft, bingo, craft];
  const upperAltTexts = [
    "Daily Schedule1",
    "Daily Schedule2",
    "Daily Schedule3",
    "Daily Schedule4",
    "Daily Schedule5",
    "Daily Schedule6",
  ];
  const upperTitles = [
    "Daily Schedule1",
    "Daily Schedule2",
    "Daily Schedule3",
    "Daily Schedule4",
    "Daily Schedule5",
    "Daily Schedule6",
  ];
  const upperDescriptions = [
    [
      "07:00 Breakfast/News",
      "08:30 Table Games",
      "09:20 CRAFT",
      "10:30 Group Exercises",
      "11:15 Lunch Special",
    ],
    [
      "07:00 Breakfast/News",
      "08:30 Table Games",
      "09:20 CRAFT",
      "10:30 Group Exercises",
      "11:15 Lunch Special",
    ],
    [
      "07:00 Breakfast/News",
      "08:30 Table Games",
      "09:20 CRAFT",
      "10:30 Group Exercises",
      "11:15 Lunch Special",
    ],
    [
      "07:00 Breakfast/News",
      "08:30 Table Games",
      "09:20 CRAFT",
      "10:30 Group Exercises",
      "11:15 Lunch Special",
    ],
    [
      "07:00 Breakfast/News",
      "08:30 Table Games",
      "09:20 CRAFT",
      "10:30 Group Exercises",
      "11:15 Lunch Special",
    ],
    [
      "07:00 Breakfast/News",
      "08:30 Table Games",
      "09:20 CRAFT",
      "10:30 Group Exercises",
      "11:15 Lunch Special",
    ],
  ];

  const upperDates = [
    "2024-11-13",
    "2024-11-14",
    "2024-11-15",
    "2024-11-16",
    "2024-11-17",
    "2024-11-18",
  ];

  // Data for lower section
  const lowerImages = [milk, milk, milk, milk, milk, milk];
  const lowerAltTexts = ["Meal1", "Meal2", "Meal3", "Meal4", "Meal5", "Meal6"];
  const lowerTitles = ["Meal1", "Meal2", "Meal3", "Meal4", "Meal5", "Meal6"];
  const lowerDescriptions = [
    "1% unflavored milk, Pork rib dices in a red sauce w/ cactus, Smashed beans, Fresh fruit Orange, Cucumber salad",
    "1% unflavored milk, Pork rib dices in a red sauce w/ cactus, Smashed beans, Fresh fruit Orange, Cucumber salad",
    "1% unflavored milk, Pork rib dices in a red sauce w/ cactus, Smashed beans, Fresh fruit Orange, Cucumber salad",
    "1% unflavored milk, Pork rib dices in a red sauce w/ cactus, Smashed beans, Fresh fruit Orange, Cucumber salad",
    "1% unflavored milk, Pork rib dices in a red sauce w/ cactus, Smashed beans, Fresh fruit Orange, Cucumber salad",
    "1% unflavored milk, Pork rib dices in a red sauce w/ cactus, Smashed beans, Fresh fruit Orange, Cucumber salad",
  ];

  return (
    <ApplicationStructure>
      <div className="act_collection">
        <h1>This Month's Activities</h1>
        <Carousel
          upperImages={upperImages}
          upperAltTexts={upperAltTexts}
          upperTitles={upperTitles}
          upperDescriptions={upperDescriptions}
          upperDates={upperDates} // Pass the dates here
          lowerImages={lowerImages}
          lowerAltTexts={lowerAltTexts}
          lowerTitles={lowerTitles}
          lowerDescriptions={lowerDescriptions}
        />
      </div>
    </ApplicationStructure>
  );
};

export default Activities;
