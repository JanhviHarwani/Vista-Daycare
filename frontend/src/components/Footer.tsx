import css from "./Footer.module.css";
function Footer() {
  return (
    <footer className={css.main_footer_div}>
      <div className={css.main_footer_wrapper}>
        <div>© 2024 Vista Adult Day Health Care. All rights reserved.</div>
        <div>Proudly serving the community since 2007.</div>
      </div>
    </footer>
  );
}

export default Footer;
