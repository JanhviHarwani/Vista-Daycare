// Testimonials.tsx
import React, { useState, useEffect } from 'react';
import { getSignedMediaUrl } from '../lib/aws-config';
import css from './testimonials.module.css';
import { testimonialData, type Testimonial } from '../types/common';


const Testimonials: React.FC = () => {
  const [ testimonials, setTestimonials] = useState<(Testimonial & { imageUrl?: string })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        const testimonialsWithUrls = await Promise.all(
          testimonialData.map(async (testimonial) => ({
            ...testimonial,
            imageUrl: await getSignedMediaUrl(testimonial.imageKey)
          }))
        );
        setTestimonials(testimonialsWithUrls);
        setError(null);
      } catch (error) {
        console.error('Error loading testimonial images:', error);
        setError('Error loading images');
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  if (isLoading) {
    return <div className={css.loading}>Loading testimonials...</div>;
  }

  if (error) {
    return <div className={css.error}>{error}</div>;
  }

  return (
    <section className={css.testimonials_section} aria-labelledby="testimonials-heading">
      <div className={css.content_wrapper}>
      <h1 id="testimonials-heading" className={css.title}>
          Testimonials
          <div className={css.title_underline}></div>
        </h1>

        <div className={css.testimonials_grid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={css.testimonial_card}>
              <div className={css.avatar}>
                {testimonial.imageUrl && (
                  <img 
                    src={testimonial.imageUrl} 
                    alt={`${testimonial.name}'s portrait`}
                    className={css.avatar_image}
                    width="75%"
                    onError={(e) => {
                      e.currentTarget.src = '/images/fallback-avatar.jpg'; // Add a fallback image
                    }}
                  />
                )}
              </div>
              
              <div className={css.card_content}>
                <div className={css.rating} aria-label={`Rating: ${testimonial.rating} out of 5`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className={css.star}>⭐</span>
                  ))}
                </div>
                
                <div className={css.testimonial_text}>
                  {testimonial.text}
                </div>

                <div className={css.profile_info}>
                  <h3>{testimonial.name}</h3>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;