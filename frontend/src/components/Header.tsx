import React, { useState } from "react";
import logo from "../assets/logo.png";
import css from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
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
            <img src={logo} alt="logo" />
          </>
          <h3 className={css.logo_text}>ADULT DAY HEALTH CARE</h3>
        </div>

        <nav className={`${css.nav_wrapper} ${isMobileMenuOpen ? css.open : ''}`}>
          <Link className={css.nav_links} to="/">
            Home
          </Link>
          <Link className={css.nav_links} to="/gallery">
            Gallery
          </Link>
          <Link className={css.nav_links} to="/services">
            Services
          </Link>
          <Link className={css.nav_links} to="/aboutus">
            About Us
          </Link>
          <select
            onChange={handleChange}
            defaultValue=""
            className={css.select}
          >
            <option value="" disabled>
              More
            </option>
            <option value="/activities">Events Calendar</option>
            <option value="/eligibility">Eligibility & Insurance</option>
          </select>
          <div className={css.button_wrapper_custom}>
            <button onClick={handleContactClick}>Contact Us</button>
          </div>
        </nav>

        <button 
          className={css.mobile_menu_button}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
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