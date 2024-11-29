import ApplicationStructure from "../components/ApplicationStructure";
import { useEffect } from "react";
import styles from "./ContactUs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import ContactForm from "../components/ContactForm";

function ContactUs() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const userLanguage = navigator.language || 'en';
    const supportedLanguages = ['en', 'es'];
    const defaultLanguage = 'en';
    const languageToUse = supportedLanguages.includes(userLanguage.slice(0, 2)) 
      ? userLanguage.slice(0, 2) 
      : defaultLanguage;
    
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(languageToUse);
    }
  }, [i18n]);

  return (
    <ApplicationStructure>
      <h1 className={styles.contactUsHeader}>{t('contact.title')}</h1>

      <div className={styles.wholeContact}>
        <div className={styles.contactColumn}>
          <h2>{t('contact.hours')}</h2>
     
          <ul style={{ paddingTop: '2rem', padding: '1rem' }}>
            <li className={styles.operatingHoursItem}>
              <span className={styles.day}>{t('contact.monday')}</span>
              <span className={styles.time}>7 AM - 2 PM</span>
            </li>
            <li className={styles.operatingHoursItem}>
              <span className={styles.day}>{t('contact.tuesday')}</span>
              <span className={styles.time}>7 AM - 2 PM</span>
            </li>
            <li className={styles.operatingHoursItem}>
              <span className={styles.day}>{t('contact.wednesday')}</span>
              <span className={styles.time}>7 AM - 2 PM</span>
            </li>
            <li className={styles.operatingHoursItem}>
              <span className={styles.day}>{t('contact.thursday')}</span>
              <span className={styles.time}>7 AM - 2 PM</span>
            </li>
            <li className={styles.operatingHoursItem}>
              <span className={styles.day}>{t('contact.friday')}</span>
              <span className={styles.time}>7 AM - 2 PM</span>
            </li>
            <li className={styles.operatingHoursItem}>
              <span className={styles.day}>{t('contact.saturday')}</span>
              <span className={styles.time}>{t('contact.closed')}</span>
            </li>
            <li className={styles.operatingHoursItem}>
              <span className={styles.day}>{t('contact.sunday')}</span>
              <span className={styles.time}>{t('contact.closed')}</span>
            </li>
          </ul>
        </div>

        <div className={styles.contactColumn}>
          <div className={styles.map}>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509597!2d-118.1718322153181!3d33.98034548067903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2a5a37f16df03%3A0x6192b5dcdbf4f2ff!2s6061%20Atlantic%20Blvd%2C%20Maywood%2C%20CA%2090270%2C%20USA!5e0!3m2!1sen!2sus!4v1691234567890!5m2!1sen!2sus"
              width="100%"
              height="200px"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
          <p style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon icon={faPhone} style={{ marginRight: "20px" }} />
            (323)-773-3555
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "20px" }} />
            Info@vistaadhc.com
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: "20px" }} />
            6061 Atlantic Blvd, Maywood, CA
          </p>
        </div>

        <div className={styles.contactColumn} style={{ backgroundColor: "#F2EEE8" }}>
          <h2 className={styles.contactTitle}>{t('contact.visit')}</h2>
          <ContactForm />
        </div>
      </div>
    </ApplicationStructure>
  );
}

export default ContactUs;