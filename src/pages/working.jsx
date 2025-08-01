import React from 'react';
import { motion } from 'framer-motion';
import '../styles/working.css';
import GradeTable from '../components/GradeTable';
import img1 from '../assets/working.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Working = () => {
  return (
    <div className="working-container">
      <motion.section
        className="info-section"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <motion.div className="info-content" variants={itemVariants}>
          <img src={img1} alt="How it works" className="info-image" />
          <div>
            <h2 className="section-title">How to Use?</h2>
            <ol className="steps-list">
              <li>Go to the Calculator page from the navigation bar.</li>
              <li>Enter course name, credit hours, and your expected grade.</li>
              <li>Add more courses if needed.</li>
              <li>Your GPA is calculated instantly as you enter data.</li>
              <li>Optionally, save or share your GPA result.</li>
            </ol>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="grading-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Grading System:</h2>
        <p className="section-subtitle">Based on the official FAST NUCES grading scale</p>
        <GradeTable />
      </motion.section>
    </div>
  );
};

export default Working;
