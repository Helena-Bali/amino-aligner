import React, { useEffect } from 'react';
import '../styles/CopyNotification.css';

interface Props {
  message: string;
  onClose: () => void;
}

const CopyNotification: React.FC<Props> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="copy-notification">
      {message}
    </div>
  );
};

export default CopyNotification; 