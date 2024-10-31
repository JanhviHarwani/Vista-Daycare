import React from "react";
import logo from "../assets/logo.png";
import css from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();

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
          <div>
            <img src={logo} alt="logo" />
          </div>
          <h3 className={css.logo_text}>ADULT DAY HEALTH CARE</h3>
        </div>
        <nav className={css.nav_wrapper}>
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
        </nav>
        <div className={css.button_wrapper}>
          <button onClick={handleContactClick}>Contact Us</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
