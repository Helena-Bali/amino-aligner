import React, { useEffect } from 'react';

interface Props {
  message: string;
  onClose: () => void;
}

const CopyNotification: React.FC<Props> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        background: '#4CAF50',
        color: 'white',
        padding: '8px 16px',
        borderRadius: 4,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
};

export default CopyNotification; 