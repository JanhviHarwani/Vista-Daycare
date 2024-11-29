/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { imageGalleryItems } from '../types/common';
import { getSignedMediaUrl } from '../lib/aws-config';
import ApplicationStructure from '../components/ApplicationStructure';
import { Helmet } from 'react-helmet';
import styles from './Eligibility.module.css';

const Eligibility: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [gallery, setGallery] = useState<{ src: string; alt: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        setIsLoading(true);
        const signedUrls = await Promise.all(
          imageGalleryItems.map(async (item) => ({
            src: await getSignedMediaUrl(item.key),
            alt: item.caption,
          }))
        );
        setGallery(signedUrls);
      } catch (err) {
        console.error('Error loading gallery images:', err);
        setError('Failed to load images');
      } finally {
        setIsLoading(false);
      }
    };

    loadGalleryImages();
  }, []);

  if (isLoading) {
    return <div>Loading gallery...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>{t('eligibility.title')}</title>
        <meta name="description" content={t('eligibility.description.eligibilityCriteria')} />
        <meta property="og:title" content={t('eligibility.title')} />
        <meta property="og:description" content={t('eligibility.description.eligibilityCriteria')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <ApplicationStructure>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>{t('eligibility.title')}</h2>
          <div className={styles.titleUnderline}></div>
          <h4 className={styles.eligibilityDescription}>
            {t('eligibility.description.eligibilityCriteria')}
          </h4>

          <h3 className={styles.sectionHeading}>{t('eligibility.paymentSources.title')}</h3>
          <div className={styles.paymentSourcesContainer}>
            {Object.values(
              t('eligibility.paymentSources.sources', { returnObjects: true })
            ).map((source: any, index) => (
              <div key={index} className={styles.paymentSourceItem}>
                <h4 className={styles.paymentSourceHeading}>{source.name}</h4>
                <p className={styles.paymentSourceDescription}>{source.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.imageGallery}>
            {gallery.map((image, index) => (
              <div key={index} className={styles.imageContainer}>
                <img src={image.src} alt={image.alt} className={styles.responsiveImg} />
              </div>
            ))}
          </div>
        </div>
      </ApplicationStructure>
    </>
  );
};

export default Eligibility;