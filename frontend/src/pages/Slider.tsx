// Slider.js
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slider.css"; // Custom styles for Slider component if needed

const images = [
  "/image2.jpg",
  "/image1.jpg",
];

const Slider = () => {
  return (
    <div className="slider-container">
    <Carousel useKeyboardArrows={true} showThumbs={false}>
        {images.map((URL, index) => (
          <div className="slide" key={index}>
            <img alt="sample_file" src={URL} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
