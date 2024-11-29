import React from 'react';
import styles from './ServiceInfo.module.css';

type ServiceInfoProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  content: string;
  imageUrl: string;
  extraImages?: string[];
  details?: string;
};

const ServiceInfo: React.FC<ServiceInfoProps> = ({
  show,
  title,
  onClose,
  imageUrl,
  extraImages = [],
  details,
}) => {
  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <button className={styles.modalClose} onClick={onClose} style={{color:"black"}}>
            X
          </button>
        </div>
        <div className={styles.modalHero}>
          <img src={imageUrl} alt={title} className={styles.modalHeroImage} />
          <div className={styles.modalHeroOverlay}>
            <h2 className={styles.modalTitle}>{title}</h2>
          </div>
        </div>

        {details && (
          <div className={styles.modalBody}>
            <div className={styles.modalDetailsContainer}>
              <p className={styles.modalDetails}>{details}</p>
            </div>
          </div>
        )}

        {extraImages?.length > 0 && (
          <div className={styles.modalGallerySection}>
            <h3 className={styles.galleryTitle}>Gallery</h3>
            <div className={styles.modalGallery}>
              {extraImages.map((img, index) => (
                <div key={index} className={styles.modalImageContainer}>
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className={styles.modalImage}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.imageNumber}>0{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceInfo;