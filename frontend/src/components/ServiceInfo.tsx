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

const ServiceInfo: React.FC<ServiceInfoProps> = ({
  show,
  title,
  onClose,
  extraImages = [],
  details,
}) => {
  if (!show) return null;
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

  return (
    <div className={`modal-overlay ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        {title && <h2 className="modal-title">{title}</h2>}
        
        {details && <p className="modal-details">{details}</p>}

        {extraImages.length > 0 && (
          <div className="modal-gallery">
            {extraImages.map((img, index) => (
              <div key={index} className="modal-image-container">
                <img
                  src={img}
                  alt={`Extra ${index + 1}`}
                  className="modal-image"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceInfo;
