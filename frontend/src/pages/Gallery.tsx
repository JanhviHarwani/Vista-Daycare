import ApplicationStructure from "../components/ApplicationStructure";
import "./Gallery.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

import env_img1 from "../assets/image/env_main2.jpg";
import env_img2 from "../assets/image/env_main1.jpg";
import env_img3 from "../assets/image/env_door.jpg";
import env_img4 from "../assets/image/env_c_door.jpg";
import env_img5 from "../assets/image/env_outside.jpg";
import env_img6 from "../assets/image/env_entrance.jpg";
import env_img7 from "../assets/image/env_gym.jpg";
import env_img8 from "../assets/image/env_parking.jpg";
import env_img9 from "../assets/image/env_wall.jpg";

import act_img1 from "../assets/image/act_act1.jpg";
import act_img2 from "../assets/image/act_act2.jpg";
import act_img3 from "../assets/image/act_act3.jpg";
import act_img4 from "../assets/image/act_act4.jpg";
import act_img5 from "../assets/image/act_act5.jpg";
import act_img6 from "../assets/image/act_act6.jpg";
import act_img7 from "../assets/image/act_bingo1.jpg";
import act_img8 from "../assets/image/act_bingo2.jpg";
import act_img9 from "../assets/image/act_bingo3.jpg";
import act_img10 from "../assets/image/act_bingo4.jpg";
import act_img11 from "../assets/image/act_bingo5.jpg";
import act_img12 from "../assets/image/act_bingo6.jpg";
import act_img13 from "../assets/image/act_bingo7.jpg";
import act_img14 from "../assets/image/act_bingo8.jpg";
import act_img15 from "../assets/image/act_gym1.jpg";
import act_img16 from "../assets/image/act_gym2.jpg";
import act_img17 from "../assets/image/act_gym3.jpg";
import act_img18 from "../assets/image/act_gym4.jpg";
import act_img19 from "../assets/image/act_gym5.jpg";
import act_img20 from "../assets/image/act_gym6.jpg";

function Gallery() {
  let data1 = [
    { id: 1, imgSrc: env_img1 },
    { id: 2, imgSrc: env_img2 },
    { id: 3, imgSrc: env_img3 },
    { id: 4, imgSrc: env_img4 },
    { id: 5, imgSrc: env_img5 },
    { id: 6, imgSrc: env_img6 },
    { id: 7, imgSrc: env_img7 },
    { id: 8, imgSrc: env_img8 },
    { id: 9, imgSrc: env_img9 },
  ];
  let data2 = [
    { id: 1, imgSrc: act_img1 },
    { id: 2, imgSrc: act_img2 },
    { id: 3, imgSrc: act_img3 },
    { id: 4, imgSrc: act_img4 },
    { id: 5, imgSrc: act_img5 },
    { id: 6, imgSrc: act_img6 },
    { id: 7, imgSrc: act_img7 },
    { id: 8, imgSrc: act_img8 },
    { id: 9, imgSrc: act_img9 },
    { id: 10, imgSrc: act_img10 },
    { id: 11, imgSrc: act_img11 },
    { id: 12, imgSrc: act_img12 },
    { id: 13, imgSrc: act_img13 },
    { id: 14, imgSrc: act_img14 },
    { id: 15, imgSrc: act_img15 },
    { id: 16, imgSrc: act_img16 },
    { id: 17, imgSrc: act_img17 },
    { id: 18, imgSrc: act_img18 },
    { id: 19, imgSrc: act_img19 },
    { id: 20, imgSrc: act_img20 },
  ];

  const [model, setModel] = useState(false);
  const [temImgSrc, setTempImgSrc] = useState("");
  const getImg = (imgSrc: string) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  return (
    <ApplicationStructure>
      <div className={model ? "model open" : "model"}>
        <img src={temImgSrc} />
        <CloseIcon className="close-icon" onClick={() => setModel(false)} />
      </div>
      <div className="gallery-section1">
        <div className="parent-container">
          <h1 style={{ textAlign: "left" }}>
            <span style={{ fontSize: "1.4em" }}>Life </span> at our center
          </h1>
          <h4 style={{ textAlign: "left" }}>
            Discover the vibrant atmosphere, supportive environment, and
            engaging activities that make our elderly daycare center a special
            place to be.{" "}
          </h4>

          <h3 className="section-heading" style={{ textAlign: "left" }}>
            Our Environment
          </h3>
          <div className="gallery">
            {data1.map((item, index) => {
              return (
                <div
                  className="pics"
                  key={index}
                  onClick={() => getImg(item.imgSrc)}
                >
                  <img src={item.imgSrc} style={{ width: "100%" }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={model ? "model open" : "model"}>
        <img src={temImgSrc} />
        <CloseIcon className="close-icon" onClick={() => setModel(false)} />
      </div>
      <div className="gallery-section2">
        <div className="parent-container">
          <h3 className="section-heading" style={{ textAlign: "left" }}>
            Activities
          </h3>
          <h4>
            Take a look at the engaging activities we offer, from group
            exercises to creative arts, that bring joy and connection to our
            residents.
          </h4>
          <div className="gallery">
            {data2.map((item, index) => {
              return (
                <div
                  className="pics"
                  key={index}
                  onClick={() => getImg(item.imgSrc)}
                >
                  <img src={item.imgSrc} style={{ width: "100%" }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ApplicationStructure>
  );
}

export default Gallery;
