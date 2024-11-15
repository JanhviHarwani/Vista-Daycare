import React, { useState, useEffect } from "react";
import "./Carousel.css";

interface CarouselProps {
  upperImages: string[];
  upperAltTexts: string[];
  upperDescriptions: string[][];
  upperTitles: string[];
  upperDates: string[];
  lowerImages: string[];
  lowerAltTexts: string[];
  lowerDescriptions: string[];
  lowerTitles: string[];
}

const Carousel: React.FC<CarouselProps> = ({
  upperImages,
  upperAltTexts,
  upperDescriptions,
  upperTitles,
  upperDates,
  lowerImages,
  lowerAltTexts,
  lowerDescriptions,
  lowerTitles,
}) => {
  // Get today's date in the format used by upperDates (e.g., YYYY-MM-DD)
  const todayDate = new Date().toLocaleDateString("en-CA");

  // Find the index of the card with today's date, or default to 0
  const todayIndex = upperDates.findIndex((date) => date === todayDate);
  const initialIndex = todayIndex !== -1 ? todayIndex : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % upperImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? upperImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const getDisplayedItems = () => {
    const totalItems = upperImages.length;

    // Calculate the indices of the 3 items to display
    const firstIndex = currentIndex;
    const secondIndex = (currentIndex + 1) % totalItems;
    const thirdIndex = (currentIndex + 2) % totalItems;

    return [
      {
        upperImage: upperImages[firstIndex],
        upperAltText: upperAltTexts[firstIndex],
        upperTitle: upperTitles[firstIndex],
        upperDescription: upperDescriptions[firstIndex],
        upperDate: upperDates[firstIndex],
        lowerImage: lowerImages[firstIndex],
        lowerAltText: lowerAltTexts[firstIndex],
        lowerTitle: lowerTitles[firstIndex],
        lowerDescription: lowerDescriptions[firstIndex],
      },
      {
        upperImage: upperImages[secondIndex],
        upperAltText: upperAltTexts[secondIndex],
        upperTitle: upperTitles[secondIndex],
        upperDescription: upperDescriptions[secondIndex],
        upperDate: upperDates[secondIndex],
        lowerImage: lowerImages[secondIndex],
        lowerAltText: lowerAltTexts[secondIndex],
        lowerTitle: lowerTitles[secondIndex],
        lowerDescription: lowerDescriptions[secondIndex],
      },
      {
        upperImage: upperImages[thirdIndex],
        upperAltText: upperAltTexts[thirdIndex],
        upperTitle: upperTitles[thirdIndex],
        upperDescription: upperDescriptions[thirdIndex],
        upperDate: upperDates[thirdIndex],
        lowerImage: lowerImages[thirdIndex],
        lowerAltText: lowerAltTexts[thirdIndex],
        lowerTitle: lowerTitles[thirdIndex],
        lowerDescription: lowerDescriptions[thirdIndex],
      },
    ];
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <div className="carousel-slide">
          {getDisplayedItems().map((item, index) => (
            <div
              className={`carousel-item ${
                item.upperDate === todayDate ? "highlight" : ""
              }`}
              key={index}
            >
              <div className="card">
                <h4>{item.upperDate}</h4>
                <div className="card-upper">
                  <div className="card-image-left">
                    <img
                      src={item.upperImage}
                      alt={item.upperAltText}
                      className="card-image"
                    />
                  </div>
                  <div className="card-timeline-right">
                    <h3>{item.upperTitle}</h3>
                    <p>
                      {item.upperDescription.map(
                        (line: string, idx: number) => (
                          <React.Fragment key={idx}>
                            {line}
                            <br />
                          </React.Fragment>
                        )
                      )}
                    </p>
                  </div>
                </div>
                <div className="card-lower">
                  <div className="card-description-left">
                    <h3>{item.lowerTitle}</h3>
                    <p>{item.lowerDescription}</p>
                  </div>
                  <div className="card-image-right">
                    <img
                      src={item.lowerImage}
                      alt={item.lowerAltText}
                      className="card-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={prevSlide} className="carousel-button prev">
          &#10094;
        </button>
        <button onClick={nextSlide} className="carousel-button next">
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
