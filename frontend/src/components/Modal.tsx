import { modalStyles } from "../styles/styles";
import { ModalProps } from "../types/common";

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div style={modalStyles.wrapper} onClick={onClose}> {/* Close on backdrop click */}
        <div style={modalStyles.content} onClick={e => e.stopPropagation()}> {/* Prevent closing when clicking modal content */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
          <h2 style={modalStyles.title}>{title}</h2>
          {children}
        </div>
      </div>
    );
  };