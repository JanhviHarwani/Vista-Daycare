// Mission.tsx
import React from 'react';
import css from './MissionStatement.module.css';

const MissionStatement: React.FC = () => {
  return (
    <section className={css.mission_section}>
      <div className={css.background_decor}></div>
      
      <div className={css.content_wrapper}>
      <h1 className={css.title}>
          Mission Statement
          <div className={css.title_underline}></div>
        </h1>
        
        <div className={css.mission_statement}>
          <p>Vista's mission is to provide a nurturing and inclusive environment where adults can receive comprehensive care, support and participate in engaging activities. We aim to enhance their physical, emotional and cognitive well-being, promote social interaction, and empower individuals to maintain independence and lead fulfilling lives.</p>
        </div>

        <div className={css.cards_container}>
          <div className={css.card}>
            <div className={css.card_content}>
              <div className={css.icon_wrapper}>
                {/* You can use an actual icon here */}
                <svg viewBox="0 0 24 24" className={css.icon}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.17-5.24l-1.1-1.1c.71-1.33.53-3.01-.59-4.13-1.33-1.33-3.47-1.33-4.8 0s-1.33 3.47 0 4.8 3.47 1.33 4.8 0l1.1 1.1c.76.76 2 .76 2.76 0 .76-.76.76-2 0-2.76z"/>
                </svg>
              </div>
              <h2>Empowering Seniors</h2>
              <p>As a licensed provider of Community-Based Adult Services (CBAS) since 2007, we offer comprehensive care including professional nursing services, various therapies, mental health support, and personalized activities. Our dedicated staff treats each member with dignity and compassion, helping them maintain optimal health and independence.</p>
            </div>
          </div>

          <div className={css.card}>
            <div className={css.card_content}>
              <div className={css.icon_wrapper}>
                {/* You can use an actual icon here */}
                <svg viewBox="0 0 24 24" className={css.icon}>
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18h14v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18h6v-1.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <h2>Community Engagement</h2>
              <p>We create a vibrant community where seniors can socialize and thrive. Our services include therapeutic activities, social services, diverse meals, nutritional counseling, and convenient transportation. We welcome participants of all backgrounds, fostering an inclusive environment where everyone can participate in engaging activities and build meaningful connections.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;