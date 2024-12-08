import React from 'react';

const NotificationModal = ({ show, title, message, onClose }) => {
  if (!show) return null;  
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="custom-modal-overlay"
      onClick={onClose}  
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div
        role="document"
        className="custom-modal-content"
        style={{
          backgroundColor: 'white',  
          borderRadius: '10px',
          padding: '20px',
          width: '300px',  
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className="custom-modal-header" style={{ marginBottom: '20px' }}>
          <h3>{title}</h3>
        </div>
        <div className="custom-modal-body" style={{ marginBottom: '20px' }}>
          <p>{message}</p>
        </div>
        <div className="custom-modal-footer">
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
