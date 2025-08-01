import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/notfound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-animation">
          <div className="ghost">
            <div className="face">
              <div className="eyes">
                <div className="eye"></div>
                <div className="eye"></div>
              </div>
              <div className="mouth"></div>
            </div>
            <div className="hands">
              <div className="hand"></div>
              <div className="hand"></div>
            </div>
          </div>
          <div className="shadow"></div>
        </div>
        
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Oops! The page you're looking for has vanished into the digital void.
        </p>
        
        <button 
          className="not-found-button" 
          onClick={handleGoHome}
        >
          Return to Safety
        </button>
      </div>
    </div>
  );
};

export default NotFound;