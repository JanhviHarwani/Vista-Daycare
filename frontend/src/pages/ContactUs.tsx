import ApplicationStructure from "../components/ApplicationStructure";
import { useEffect, useState } from "react";
import "./ContactUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function ContactUs() {
  const { t } = useTranslation();
  const { i18n} = useTranslation();
  useEffect(() => {
    const userLanguage = navigator.language || 'en';
    const supportedLanguages = ['en', 'es'];
    const defaultLanguage = 'en';
    const languageToUse = supportedLanguages.includes(userLanguage.slice(0, 2)) ? userLanguage.slice(0, 2) : defaultLanguage;
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(languageToUse);
    }
  }, [i18n]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false); // State to track form submission

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true); // Set form submission state to true
  };

  return (
    <ApplicationStructure>
      <h1 className="contact-us-header">{t('contact.title')}</h1>

      <div className="whole_contact">
        <div className="contact_column">
          <h2>{t('contact.hours')}</h2>
          <ul>
            <li className="operating-hours-item">
              <span className="day">{t('contact.monday')}</span>
              <span className="time">7 AM - 2 PM</span>
            </li>
            <li className="operating-hours-item">
              <span className="day">{t('contact.tuesday')}</span>
              <span className="time">7 AM - 2 PM</span>
            </li>
            <li className="operating-hours-item">
              <span className="day">{t('contact.wednesday')}</span>
              <span className="time">7 AM - 2 PM</span>
            </li>
            <li className="operating-hours-item">
              <span className="day">{t('contact.thursday')}</span>
              <span className="time">7 AM - 2 PM</span>
            </li>
            <li className="operating-hours-item">
              <span className="day">{t('contact.friday')}</span>
              <span className="time">7 AM - 2 PM</span>
            </li>
            <li className="operating-hours-item">
              <span className="day">{t('contact.saturday')}</span>
              <span className="time">{t('contact.closed')}</span>
            </li>
            <li className="operating-hours-item">
              <span className="day">{t('contact.sunday')}</span>
              <span className="time">{t('contact.closed')}</span>
            </li>
          </ul>
        </div>

        <div className="contact_column">
          <div className="map">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509597!2d-118.1718322153181!3d33.98034548067903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2a5a37f16df03%3A0x6192b5dcdbf4f2ff!2s6061%20Atlantic%20Blvd%2C%20Maywood%2C%20CA%2090270%2C%20USA!5e0!3m2!1sen!2sus!4v1691234567890!5m2!1sen!2sus"
              width="100%"
              height="200px"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
          <p
            style={{ marginTop: "10px", display: "flex", alignItems: "center" }}
          >
            <FontAwesomeIcon icon={faPhone} style={{ marginRight: "20px" }} />
            (323)-773-3555
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ marginRight: "20px" }}
            />
            Info@vistaadhc.com
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ marginRight: "20px" }}
            />
            6061 Atlantic Blvd, Maywood, CA
          </p>
        </div>

        <div className="contact_column" style={{ backgroundColor: "#fbf6e9" }}>
          <h2>{t('contact.visit')}</h2>

          {/* Success alert box */}
          {submitted && (
            <div className="success-alert">
              {t('contact.message')}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{ marginBottom: "10px", textAlign: "left", width: "100%" }}
            >
              {t('contact.name')}:
              <div style={{ position: "relative", marginTop: "5px" }}>
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "40%",
                    transform: "translateY(-50%)",
                    color: "#aaa",
                  }}
                />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder= {t('contact.enterName')}
                  required
                  style={{
                    padding: "8px 10px 8px 40px",
                    width: "83%",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    backgroundColor: "#E9E6E1",
                  }}
                />
              </div>
            </label>
            <label
              style={{ marginBottom: "10px", textAlign: "left", width: "100%" }}
            >
              {t('contact.phone')}:
              <div style={{ position: "relative", marginTop: "5px" }}>
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "40%",
                    transform: "translateY(-50%)",
                    color: "#aaa",
                  }}
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder= {t('contact.enterPhone')}
                  required
                  style={{
                    padding: "8px 10px 8px 40px",
                    width: "83%",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    backgroundColor: "#E9E6E1",
                  }}
                />
              </div>
            </label>
            <label
              style={{ marginBottom: "10px", textAlign: "left", width: "100%" }}
            >
              {t('contact.email')}:
              <div style={{ position: "relative", marginTop: "5px" }}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "40%",
                    transform: "translateY(-50%)",
                    color: "#aaa",
                  }}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder= {t('contact.enterEmail')}
                  required
                  style={{
                    padding: "8px 10px 8px 40px",
                    width: "83%",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    backgroundColor: "#E9E6E1",
                  }}
                />
              </div>
            </label>
            <button
              type="submit"
              style={{
                padding: "8px 15px",
                backgroundColor: "#9A1C1A",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
                alignSelf: "flex-end",
                marginTop: "30px",
              }}
            >
              {t('contact.book')}
            </button>
          </form>
        </div>
      </div>
    </ApplicationStructure>
  );
}

export default ContactUs;
