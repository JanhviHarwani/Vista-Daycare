import React, { useEffect, useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Slider.module.css";
import { slider } from '../types/common';
import { getSignedMediaUrl } from '../lib/aws-config';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  const arrowStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 25px)',
    cursor: 'pointer',
    background: 'rgba(255, 255, 255, 0.8)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease'
  };

  const renderArrowPrev = (clickHandler: () => void) => {
    return (
      <div
        onClick={clickHandler}
        style={{ ...arrowStyles, left: '20px' }}
        className={`${styles.arrowButton} prev`}
      >
        <ChevronLeft size={24} color="#333" />
      </div>
    );
  };

  const renderArrowNext = (clickHandler: () => void) => {
    return (
      <div
        onClick={clickHandler}
        style={{ ...arrowStyles, right: '20px' }}
        className={`${styles.arrowButton} next`}
      >
        <ChevronRight size={24} color="#333" />
      </div>
    );
  };

  if (isLoading) {
    return <div className={styles.sliderLoading}>Loading gallery...</div>;
  }

  if (error) {
    return <div className={styles.sliderError}>{error}</div>;
  }

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderContainer}>
        <Carousel
          useKeyboardArrows={true}
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          interval={5000}
          showStatus={false}
          renderArrowPrev={renderArrowPrev}
          renderArrowNext={renderArrowNext}
          showIndicators={true}
          swipeable={true}
          emulateTouch={true}
          dynamicHeight={false}
          className={styles.customCarousel}
        >
          {gallery.map((image, index) => (
            <div className={styles.slide} key={index}>
              <img alt={image.alt} src={image.src} />
              <div className={styles.slideOverlay}></div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;