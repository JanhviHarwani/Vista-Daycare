import React, { useEffect, useState } from 'react';
import { getSignedMediaUrl } from '../lib/aws-config';
import { serviceData, type ServiceUrl } from '../types/common';
import ApplicationStructure from '../components/ApplicationStructure';
import Slider from '../components/Slider';
import Team from '../components/Team';
import ServiceInfo from '../components/ServiceInfo';
import './Services.css';

const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceUrl | null>(null);

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
        console.error('Error loading service images:', error);
        setError('Error loading images');
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
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ApplicationStructure>
      <div className="whole">
        <Slider />
        <div className="services-container">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              onClick={() => handleCardClick(service)}
            >
              <h2 className="service-title">{service.title}</h2>
              <hr className="card-divider" />
              <Team
                members={[
                  {
                    image: service.imageUrl || '/images/fallback-image.jpg',
                  },
                ]}
              />
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
        {selectedService && (
          <ServiceInfo
            show={showModal}
            onClose={closeModal}
            title={selectedService.title}
            content={selectedService.description}
            imageUrl={selectedService.imageUrl || '/images/fallback-image.jpg'}
            extraImages={selectedService.extraImages}
            details={selectedService.details}
          />
        )}
      </div>
    </ApplicationStructure>
  );
};

export default Services;
