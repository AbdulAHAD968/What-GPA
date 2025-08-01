import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu after navigation
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        navRef.current &&
        !navRef.current.contains(e.target) &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="logo" onClick={() => handleNavigate('/')}>
          What GPA?
        </h1>

        <div
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          ref={hamburgerRef}
        >
          &#9776;
        </div>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} ref={navRef}>
          <span onClick={() => handleNavigate('/working')}>How it Works?</span>
          <span onClick={() => handleNavigate('/calculator')}>Calculate</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
