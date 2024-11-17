import css from "./Footer.module.css";
import  { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
function Footer() {
  const { i18n} = useTranslation(); 
  const { t } = useTranslation();

  useEffect(() => {
    const userLanguage = navigator.language || 'en'; 
    const supportedLanguages = ['en', 'es']; 
    const defaultLanguage = 'en'; 
    const languageToUse = supportedLanguages.includes(userLanguage.slice(0, 2)) ? userLanguage.slice(0, 2) : defaultLanguage;
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(languageToUse);
    }
  }, [i18n]);
  return (
    <footer className={css.main_footer_div}>
      <div className={css.main_footer_wrapper}>
        <div> {t('footer.copyright')}</div>
        <div> {t('footer.serving')}</div>
      </div>
    </footer>
  );
}

export default Footer;
