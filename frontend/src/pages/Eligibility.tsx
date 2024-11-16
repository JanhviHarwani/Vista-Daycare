import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { imageGalleryItems } from '../types/common';
import { getSignedMediaUrl } from '../lib/aws-config';
import ApplicationStructure from '../components/ApplicationStructure';
import './Eligibility.css';

const Eligibility: React.FC = () => {
  const { t } = useTranslation();
  const [gallery, setGallery] = useState<{ src: string; alt: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    <ApplicationStructure>
      <div className="eligibility-container">
        <h2 className="section-heading">{t('eligibility.title')}</h2>
        <div className="title_underline"></div>
        <h4 className="eligibility-description">
          {t('eligibility.description.eligibilityCriteria')}
        </h4>

        <h3 className="section-heading">{t('eligibility.paymentSources.title')}</h3>
        <div className="payment-sources-container">
          {Object.values(
            t('eligibility.paymentSources.sources', { returnObjects: true })
          ).map((source: any, index) => (
            <div key={index} className="payment-source-item">
              <h4 className="payment-source-heading">{source.name}</h4>
              <p className="payment-source-description">{source.description}</p>
            </div>
          ))}
        </div>

        <div className="image-gallery">
          {gallery.map((image, index) => (
            <div key={index} className="image-container">
              <img src={image.src} alt={image.alt} className="responsive-img" />
            </div>
          ))}
        </div>
      </div>
    </ApplicationStructure>
  );
};

export default Eligibility;
