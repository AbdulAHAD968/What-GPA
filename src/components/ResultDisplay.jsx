import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/result.css';

const ResultDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo = {}, courses = {}, gpa = '0.00', totalCredits = 0 } = location.state || {};
  
  const getGradePoint = (grade) => {
    const gradeMap = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.67,
      'B+': 3.33, 'B': 3.0, 'B-': 2.67,
      'C+': 2.33, 'C': 2.0, 'C-': 1.67,
      'D+': 1.33, 'D': 1.0, 'F': 0.0
    };
    return gradeMap[grade] || 0;
  };

  const handleBack = () => {
    navigate(-1); // Go back to calculator
  };

  const handleNewCalculation = () => {
    navigate('/'); // Go to home or calculator
  };

  if (!location.state) {
    return (
      <div className="result-container error">
        <h2>No GPA Data Found</h2>
        <p>Please use the calculator to get your GPA results.</p>
        <button onClick={handleNewCalculation} className="action-btn">
          Go to Calculator
        </button>
      </div>
    );
  }

  return (
    <div className="result-container">
      <div className="result-header">
        <h1>GPA Result</h1>
        <div className="student-info">
          {userInfo.name && <p><strong>Name:</strong> {userInfo.name}</p>}
          {userInfo.rollNumber && <p><strong>Roll Number:</strong> {userInfo.rollNumber}</p>}
          {userInfo.semester && <p><strong>Semester:</strong> {userInfo.semester}</p>}
        </div>
      </div>
      
      <div className="result-details">
        <h2>Course Details</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Credit Hours</th>
                <th>Grade</th>
                <th>Grade Points</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(courses).map(creditType => (
                courses[creditType].filter(course => course.name.trim()).map((course, index) => (
                  <tr key={`${creditType}-${index}`}>
                    <td>{course.name || 'N/A'}</td>
                    <td>{creditType.replace('credit', '')}</td>
                    <td>{course.grade}</td>
                    <td>{getGradePoint(course.grade)}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="summary">
          <p><strong>Total Credit Hours:</strong> {totalCredits}</p>
          <div className="gpa-display">
            <h3>Your Semester GPA:</h3>
            <div className="gpa-value">{gpa}</div>
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <button onClick={handleBack} className="action-btn back-btn">
          Back to Calculator
        </button>
        <button onClick={() => window.print()} className="action-btn print-btn">
          Print Result
        </button>
        <button onClick={handleNewCalculation} className="action-btn new-btn">
          New Calculation
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;