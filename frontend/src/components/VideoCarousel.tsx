// VideoCarousel.tsx
import React, { useState, useRef } from 'react';
import css from './videoCarousel.module.css';

// Define types for our media items
type MediaItem = {
  type: 'video' | 'image';
  url: string;
  caption: string;
};

const VideoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mediaItems: MediaItem[] = [
    {
      type: 'video',
      url: "/videos/full_day_care.MP4",
      caption: "A Day in Life at Vista Adult Day Care",
    },
    {
      type: 'video',
      url: "/videos/Gym.MP4",
      caption: "Our Modern Facilities",
    },
    {
      type: 'image',
      url: "/images/happy_faces.jpg", // Put your image in public/images/
      caption: "Happy Faces",
    },
    {
      type: 'image',
      url: "/images/team.jpg", // Put your image in public/images/
      caption: "Our Team",
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
    videoRef.current?.play().catch(e => {
      console.error('Error playing video:', e);
      setError('Error playing video. Please try again.');
    });
  };

  const handleError = () => {
    setIsLoading(false);
    setError('Error loading media. Please try again.');
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const renderMedia = () => {
    const currentItem = mediaItems[currentIndex];

    if (currentItem.type === 'video') {
      return (
        <video 
          ref={videoRef}
          src={currentItem.url}
          autoPlay 
          muted 
          loop 
          playsInline
          className={css.video}
          onLoadStart={handleLoadStart}
          onLoadedData={handleLoadedData}
          onError={handleError}
        >
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <img 
          src={currentItem.url}
          alt={currentItem.caption}
          className={css.image}
          onLoad={handleImageLoad}
          onError={handleError}
        />
      );
    }
  };

  return (
    <div className={css.carouselContainer}>
      <div className={css.mediaWrapper}>
        {isLoading && (
          <div className={css.loadingOverlay}>
            Loading...
          </div>
        )}
        
        {error && (
          <div className={css.errorOverlay}>
            {error}
          </div>
        )}

        {renderMedia()}

        <div className={css.caption}>
          {mediaItems[currentIndex].caption}
        </div>

        {mediaItems.length > 1 && (
          <>
            <button 
              className={`${css.navButton} ${css.prevButton}`}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button 
              className={`${css.navButton} ${css.nextButton}`}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              ›
            </button>

            <div className={css.dots}>
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  className={`${css.dot} ${index === currentIndex ? css.activeDot : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCarousel;