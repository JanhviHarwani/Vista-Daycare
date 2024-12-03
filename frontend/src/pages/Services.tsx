import React, { useEffect, useState } from "react";
import { getSignedMediaUrl } from "../lib/aws-config";
import { serviceData, type ServiceUrl } from "../types/common";
import ApplicationStructure from "../components/ApplicationStructure";
import Slider from "../components/Slider";
import Team from "../components/Team";
import ServiceInfo from "../components/ServiceInfo";
import styles from "./Services.module.css";
import CustomSpinner from "../components/Spinner";

const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceUrl | null>(null);
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    const browserLanguage = navigator.language.slice(0, 2);
    setLanguage(browserLanguage === 'es' ? 'es' : 'en');
  }, []);

  useEffect(() => {
    const loadServiceImages = async () => {
      try {
        setIsLoading(true);
        const servicesWithUrls = await Promise.all(
          serviceData.map(async (service) => ({
            ...service,
            imageUrl: await getSignedMediaUrl(service.imageKey),
            extraImages: await Promise.all(
              (service.extraImages || []).map((key) => getSignedMediaUrl(key))
            ),
          }))
        );
        setServices(servicesWithUrls);
        setError(null);
      } catch (error) {
        console.error("Error loading service images:", error);
        setError("Error loading images");
      } finally {
        setIsLoading(false);
      }
    };

    loadServiceImages();
  }, []);

  const handleCardClick = (service: ServiceUrl) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <CustomSpinner size={60} color="#C41E3A" />
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <ApplicationStructure>
      <div className={styles.servicesPage}>
        <Slider />
        
        <div className={styles.servicesHeader}>
          <h1 className={styles.mainTitle}>
          {language === 'es' ? 'Nuestros Servicios' : 'Our Services'}
          </h1>
          <p className={styles.subtitle}>
          {language === 'es' ? 'Atención integral adaptada a tus necesidades' : 'Comprehensive care tailored to your needs'}
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => handleCardClick(service)}
            >
              <div className={styles.cardInner}>
                <div className={styles.imageWrapper}>
                  <Team
                    members={[
                      {
                        image: service.imageUrl || "/images/fallback-image.jpg",
                      },
                    ]}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.learnMoreText}>Learn More</span>
                  </div>
                </div>
                
                <div className={styles.content}>
                  <h2 className={styles.title}>
                    {language === 'es' ? service.title_es : service.title}
                  </h2>
                  <div className={styles.divider}></div>
                  <p className={styles.description}>
                    {language === 'es' ? service.description_es : service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedService && (
          <ServiceInfo
            show={showModal}
            onClose={closeModal}
            title={language === 'es' ? selectedService.title_es : selectedService.title}
            content={language === 'es' ? selectedService.description_es : selectedService.description}
            imageUrl={selectedService.imageUrl || "/images/fallback-image.jpg"}
            extraImages={selectedService.extraImages}
            details={language === 'es' ? selectedService.details_es : selectedService.details}
            language={language} 
          />
        )}
      </div>
    </ApplicationStructure>
  );
};

export default Services;