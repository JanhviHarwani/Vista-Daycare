import React, { useState } from "react";
import logo from "../assets/logo.png";
import css from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function Header() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  useEffect(() => {
    const userLanguage = navigator.language || "en";
    const supportedLanguages = ["en", "es"];
    const defaultLanguage = "en";
    const languageToUse = supportedLanguages.includes(userLanguage.slice(0, 2))
      ? userLanguage.slice(0, 2)
      : defaultLanguage;
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(languageToUse);
    }
  }, [i18n]);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const path = event.target.value;
    if (path) {
      navigate(path);
    }
  };

  const handleContactClick = () => {
    navigate("/contactus");
  };

  return (
    <header className={css.main_header_div}>
      <div className={css.header_wrapper}>
        <div className={css.logo_wrapper}>
          <>
            <img src={logo} alt="Logo of Adult Day Health Care" />
          </>
          <h3 className={css.logo_text}> {t("header.logoText")}</h3>
        </div>

        <nav
          className={`${css.nav_wrapper} ${isMobileMenuOpen ? css.open : ""}`}
          aria-label="Main navigation"
        >
          <Link className={css.nav_links} to="/">
            {t("header.home")}
          </Link>
          <Link className={css.nav_links} to="/gallery">
            {t("header.gallery")}
          </Link>
          <Link className={css.nav_links} to="/services">
            {t("header.services")}
          </Link>
          <Link className={css.nav_links} to="/aboutus">
            {t("header.aboutUs")}
          </Link>
          <select
            onChange={handleChange}
            defaultValue=""
            className={css.select}
            aria-label="Additional navigation options"
          >
            <option value="" disabled>
              {" "}
              {t("header.more")}
            </option>
            <option value="/activities">
              {" "}
              {t("header.activitiesCalendar")}
            </option>
            <option value="/eligibility"> {t("header.eligibility")}</option>
          </select>
          <div className={css.button_wrapper_custom}>
            <button
              onClick={handleContactClick}
              aria-label="Go to the contact us page"
            >
              {" "}
              {t("header.contactUs")}
            </button>
          </div>
        </nav>

        <button
          className={css.mobile_menu_button}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen ? "true" : "false"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
