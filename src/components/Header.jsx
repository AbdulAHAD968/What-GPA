import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="logo" onClick={() => navigate('/')}>
          What GPA?
        </h1>
        <nav className="nav-links">
          <span onClick={() => navigate('/working')}>How it Works?</span>
          <span onClick={() => navigate('/calculator')}>Calculate</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
