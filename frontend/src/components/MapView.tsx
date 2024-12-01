// LocationMap.tsx
import React, { useEffect, useState } from "react";
import css from "./MapView.module.css";

const MapView: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  useEffect(() => {
    const browserLanguage = navigator.language.slice(0, 2);
    setLanguage(browserLanguage === 'es' ? 'es' : 'en');
  }, []);
  return (
    <section className={css.location_section}>
      <div className={css.content_wrapper}>
        <div className={css.header}>
          <h1 className={css.title}>Find Us Here</h1>
          <div className={css.title_underline}></div>
          <p className={css.subtitle}>6061 Atlantic Blvd, Maywood, CA 90270</p>
        </div>

        <div className={css.map_grid}>
          <div className={css.map_container}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509597!2d-118.1718322153181!3d33.98034548067903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2a5a37f16df03%3A0x6192b5dcdbf4f2ff!2s6061%20Atlantic%20Blvd%2C%20Maywood%2C%20CA%2090270%2C%20USA!5e0!3m2!1sen!2sus!4v1691234567890!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vista Day Care Location"
              aria-label="Google Maps location for Vista Day Care"
            />
          </div>
          <div className={css.location_highlights} >
            <div className={css.highlight_item} aria-label="Location Highlight">
              <div className={css.icon} role="img" aria-label="Map Pin">📍</div>
              <p>
              {language === 'es' ? 'Ubicado convenientemente en Maywood' : 'Conveniently located in Maywood'}
              </p>
            </div>
            <div className={css.highlight_item} aria-label="Transport Highlight">
              <div className={css.icon} role="img" aria-label="Bus">🚌</div>
              <p>
              {language === 'es' ? 'Servicio de transporte disponible' : 'Transportation service available'}
              </p>
            </div>
            <div className={css.highlight_item} aria-label="Parking Highlight">
              <div className={css.icon} role="img" aria-label="Parking">🅿️</div>
              <p>
              {language === 'es' ? 'Estacionamiento amplio disponible' : 'Ample parking available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapView;
