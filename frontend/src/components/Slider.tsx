import React, { useEffect, useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slider.css";
import { slider } from '../types/common';
import { getSignedMediaUrl } from '../lib/aws-config';


const Slider = () => {
  const [gallery, setGallery] = useState<{ src: string; alt: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSliderImages = async () => {
      try {
        setIsLoading(true);
        const signedUrls = await Promise.all(
          slider.map(async (item) => ({
            src: await getSignedMediaUrl(item.key),
            alt: item.caption || "Gallery Image",
          }))
        );
        setGallery(signedUrls);
      } catch (err) {
        console.error('Error loading gallery images:', err);
        setError('Failed to load images');
      } finally {
        setIsLoading(false);
      }
    };

    loadSliderImages();
  }, []);

  const imagesToDisplay = gallery;

  if (isLoading) {
    return <div className="loading-message">Loading gallery...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="slider-container">
      <Carousel
        useKeyboardArrows={true}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        showStatus={false}
      >
        {imagesToDisplay.map((image, index) => (
          <div className="slide" key={index}>
            <img alt={image.alt} src={image.src} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
