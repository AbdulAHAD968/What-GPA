import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/noconnection.css'; // Create this CSS file

const NoConnection = () => {
  const navigate = useNavigate();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      // You could add actual connection checking logic here
      navigate('/');
    }, 1500);
  };

  return (
    <div className="no-connection-container">
      <div className="no-connection-content">
        <div className="connection-animation">
          <div className="satellite">
            <div className="satellite-body"></div>
            <div className="satellite-dish"></div>
            <div className="satellite-panel"></div>
          </div>
          <div className="signal">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`signal-bar ${isRetrying ? 'pulse' : ''}`} 
                   style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
          <div className="planet"></div>
        </div>
        
        <h1 className="no-connection-title">Connection Lost</h1>
        <h2 className="no-connection-subtitle">No Internet Connection</h2>
        <p className="no-connection-text">
          We can't connect to the internet. Please check your network settings.
        </p>
        
        <button 
          className={`no-connection-button ${isRetrying ? 'retrying' : ''}`} 
          onClick={handleRetry}
          disabled={isRetrying}
        >
          {isRetrying ? (
            <>
              <span className="spinner"></span>
              Connecting...
            </>
          ) : (
            'Retry Connection'
          )}
        </button>
      </div>
    </div>
  );
};

export default NoConnection;