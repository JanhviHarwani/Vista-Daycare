import React, { useState, useRef, useEffect } from 'react';
import { getCachedSignedMediaUrl } from '../lib/aws-config';
import css from './VideoCarousel.module.css';
import { mediaItems, MediaWithUrl } from '../types/common';

export const VideoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mediaUrls, setMediaUrls] = useState<MediaWithUrl[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadMediaUrls = async () => {
      try {
        setIsLoading(true);
        const urls = await Promise.all(
          mediaItems.map(async (item) => ({
            type: item.type,
            url: await getCachedSignedMediaUrl(item.key),
            caption: item.caption
          }))
        );
        setMediaUrls(urls);
        setError(null);
      } catch (error) {
        console.error('Error loading media:', error);
        setError('Error loading media content');
      } finally {
        setIsLoading(false);
      }
    };

    loadMediaUrls();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === mediaUrls.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaUrls.length - 1 : prev - 1));
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

  const renderMedia = () => {
    if (!mediaUrls.length) return null;
    
    const currentItem = mediaUrls[currentIndex];
    
    if (currentItem.type === 'video') {
      return (
        <video 
          ref={videoRef}
          src={currentItem.url}
          className={css.video}
          autoPlay 
          muted 
          loop 
          playsInline
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
          onLoad={() => setIsLoading(false)}
          onError={handleError}
        />
      );
    }
  };

  if (!mediaUrls.length) {
    return <div>Loading...</div>;
  }

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
          {mediaUrls[currentIndex].caption}
        </div>

        {mediaUrls.length > 1 && (
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
              {mediaUrls.map((_, index) => (
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