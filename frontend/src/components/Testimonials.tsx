// Testimonials.tsx
import React from 'react';
import css from './testimonials.module.css';
// Import your images
import pacoImage from '/images/Paco.jpg';
import yolandaImage from '/images/yolanda.jpg';
import raulImage from '/images/raul.jpg'

const Testimonials: React.FC = () => {
  const testimonials = [
      // first recording
    {
      name: "Francisco(Paco) R.",
      text: "I love everything here. I also have a best friend here at the center. The fondest memory of this place for me is when I won at Raffle game.",
      rating: 5,
      role: "Long-term Member",
      image: pacoImage
    },
    // second recording
    {
      name: "Yolanda Perez",
      text: "I've been coming here for 10 years now and have made so many friends. I keep coming back here because I feel regenerated and I feel good and like I did something. It just does good for me when I go back home!",
      rating: 5,
      role: "Long-term Member",
      image: yolandaImage
    },
     // fifth recording
    {
      name: "Raul Moreno",
      text: "This center has impacted me in a great way due to my accident in the past. They focused on taking care of me, making sure I was mentally, physically, and emotionally good. I have been here for 19 years and their care for me is unwavering.",
      rating: 5,
      role: "Long-term Member",
      image: raulImage
    }
  ];

  return (
    <section className={css.testimonials_section}>
      <div className={css.content_wrapper}>
      <h1 className={css.title}>
          Testimonials
          <div className={css.title_underline}></div>
        </h1>

        <div className={css.testimonials_grid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={css.testimonial_card}>
              <div className={css.avatar}>
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name}'s portrait`}
                  className={css.avatar_image}
                  width={"75%"}
                />
              </div>
              
              <div className={css.card_content}>
                <div className={css.rating}>
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