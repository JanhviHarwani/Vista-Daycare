import React from 'react';
import { useTranslation } from 'react-i18next';
import css from './MissionStatement.module.css';

interface Card {
  title: string;
  content: string;
  iconPath: string;
}

const MissionStatement: React.FC = () => {
  const { t } = useTranslation();
  const cards = t('missionPage.cards', { returnObjects: true }) as Card[];

  return (
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
  );
};

export default MissionStatement;