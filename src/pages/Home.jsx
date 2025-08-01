import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/home.css';

import img1 from '../assets/good-bro.png';
import img2 from '../assets/create-web.png';
import img3 from '../assets/dev-bro.png';

const Home = () => {
  return (
    <div className="modern-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">
              FAST NUCES <span className="gradient-text">GPA Calculator</span>
            </h1>
            <p className="hero-subtitle">
              Calculate your semester GPA with precision and ease. Designed specifically for FAST NUCES students.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="cta-container"
          >
            <Link to="/calculator" className="primary-cta">
              Calculate GPA Now
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/working" className="secondary-cta">
              How It Works
            </Link>
          </motion.div>
        </div>

        <div className="hero-graphic">
          <div className="graphic-circle"></div>
          <div className="graphic-circle"></div>
          <div className="graphic-circle"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why <span className="gradient-text">What GPA? </span>
          </motion.h2>
          <p>Tailored specifically for FAST NUCES grading system</p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="feature-card"
          >
            <div className="card-icon">
              <img src={img2} alt="Accurate Calculations" />
            </div>
            <h3>Precision Engine</h3>
            <p>Exact calculations following FAST NUCES grading policies with support for all course types and credit hours.</p>
            <div className="card-accent"></div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="feature-card"
          >
            <div className="card-icon">
              <img src={img1} alt="Performance Analysis" />
            </div>
            <h3>Smart Analysis</h3>
            <p>Visualize your academic trajectory and identify key areas to focus on for improvement.</p>
            <div className="card-accent"></div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="feature-card"
          >
            <div className="card-icon">
              <img src={img3} alt="University Specific" />
            </div>
            <h3>FAST Optimized</h3>
            <p>Built exclusively for FAST NUCES students with all department-specific requirements in mind.</p>
            <div className="card-accent"></div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial/Stats Section */}
      <section className="stats-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="stats-container"
        >
          <div className="stat-item">
            <h3>1000+</h3>
            <p>Students Helped</p>
          </div>
          <div className="stat-item">
            <h3>99.9%</h3>
            <p>Accuracy Rate</p>
          </div>
          <div className="stat-item">
            <h3>All</h3>
            <p>FAST Campuses</p>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="cta-card"
        >
          <h2>Ready to Calculate Your GPA?</h2>
          <p>Get started in seconds and take control of your academic performance.</p>
          <Link to="/calculator" className="cta-button">
            Calculate Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;