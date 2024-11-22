import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import css from './MissionStatement.module.css';

interface Card {
  title: string;
  content: string;
  iconPath: string;
}

const MissionStatement: React.FC = () => {
  const { i18n} = useTranslation();
  const { t} = useTranslation();

  useEffect(() => {
    const userLanguage = navigator.language || 'en';
    const supportedLanguages = ['en', 'es'];
    const defaultLanguage = 'en';
    const languageToUse = supportedLanguages.includes(userLanguage.slice(0, 2)) ? userLanguage.slice(0, 2) : defaultLanguage;
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(languageToUse);
    }
  }, [i18n]);
  const cards = t('missionPage.cards', { returnObjects: true }) as Card[];

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={t('missionPage.description')} />
        <meta property="og:title" content={t('missionPage.title')} />
        <meta property="og:description" content={t('missionPage.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <section className={css.mission_section} aria-labelledby="mission-heading">
        <div className={css.background_decor}></div>

        <div className={css.content_wrapper}>
          <h1 id="mission-heading" className={css.title}>
            {t('missionPage.title')}
            <div className={css.title_underline}></div>
          </h1>

          <div className={css.mission_statement}>
            <p>{t('missionPage.description')}</p>
          </div>

          <div className={css.cards_container}>
            {cards.map((card, index) => (
              <div key={index} className={css.card}>
                <div className={css.card_content}>
                  <div className={css.icon_wrapper} role="img" aria-label={`${card.title} icon`}>
                    <svg viewBox="0 0 24 24" className={css.icon} aria-hidden="true">
                      <path d={card.iconPath} />
                    </svg>
                  </div>
                  <h2>{card.title}</h2>
                  <p>{card.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>

  );
};

export default MissionStatement;