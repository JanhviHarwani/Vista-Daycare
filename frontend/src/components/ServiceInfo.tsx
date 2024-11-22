import React from 'react';
import './ServiceInfo.css';

type ServiceInfoProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  content: string;
  imageUrl: string;
  extraImages?: string[];
  details?: string;
};

const ServiceInfo: React.FC<ServiceInfoProps> = ( {
    show,
    onClose,
    // title,
    // content,
    // imageUrl,
    extraImages = [],
    details,
  }) => {
    if (!show) return null;
  
    return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
            {details && <h2 className="modal-title">{details}</h2>}
    
            {extraImages.length > 0 && (
              <div className="modal-gallery">
                {extraImages.map((img, index) => (
                  <div key={index} className="modal-image-container">
                    <img src={img} alt={`Extra ${index + 1}`} className="modal-image" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
  };
  
export default ServiceInfo;
