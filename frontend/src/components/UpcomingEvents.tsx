// UpcomingEvents.tsx
import React from 'react';
import css from './upcomingEvents.module.css';

const UpcomingEvents: React.FC = () => {
  return (
    <section className={css.events_section}>
      <div className={css.content_wrapper}>
        <h1 className={css.title}>
          Upcoming Events
          <div className={css.title_underline}></div>
        </h1>
        
        <div className={css.events_container}>
          <div className={css.event_card}>
            <div className={css.date_circle}>
              <div className={css.date_content}>
                <span className={css.month}>JUL</span>
                <span className={css.day}>17</span>
              </div>
              <div className={css.circle_backdrop}></div>
            </div>
            <div className={css.event_info}>
              <h3 className={css.event_title}>Bingo</h3>
              <p className={css.event_time}>July 15, 10:00 AM</p>
            </div>
            <div className={css.hover_effect}></div>
          </div>

          <div className={css.event_card}>
            <div className={css.date_circle}>
              <div className={css.date_content}>
                <span className={css.icon}>🎨</span>
              </div>
              <div className={css.circle_backdrop}></div>
            </div>
            <div className={css.event_info}>
              <h3 className={css.event_title}>Group Exercises</h3>
              <p className={css.event_time}>July 20, 2:00 PM</p>
            </div>
            <div className={css.hover_effect}></div>
          </div>

          <div className={css.event_card}>
            <div className={css.date_circle}>
              <div className={css.date_content}>
                <span className={css.icon}>🌿</span>
              </div>
              <div className={css.circle_backdrop}></div>
            </div>
            <div className={css.event_info}>
              <h3 className={css.event_title}>Morning Orientation</h3>
              <p className={css.event_time}>July 25, 1:00 PM</p>
            </div>
            <div className={css.hover_effect}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;