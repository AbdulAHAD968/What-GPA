import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/result.css';

import fast_image from '../assets/fast.png';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, courses, gpa, totalCredits } = location.state || {};
  
  const [editableData, setEditableData] = useState({
    userInfo: userInfo || { name: '', rollNumber: '', semester: '' },
    courses: courses || {
      credit1: [{ id: 1, name: 'Course A', grade: 'A' }],
      credit2: [{ id: 2, name: 'Course B', grade: 'A' }],
      credit3: [{ id: 3, name: 'Course C', grade: 'A' }]
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [calculatedGpa, setCalculatedGpa] = useState(gpa || '0.00');
  const [calculatedCredits, setCalculatedCredits] = useState(totalCredits || 0);

  useEffect(() => {
    if (!location.state) {
      // Try to load from localStorage if no state was passed
      const savedData = localStorage.getItem('gpaCalculatorData');
      if (savedData) {
        const { userInfo: savedUserInfo, courses: savedCourses } = JSON.parse(savedData);
        setEditableData({ userInfo: savedUserInfo, courses: savedCourses });
        calculateGpaAndCredits(savedCourses);
      }
    }
  }, [location.state]);

  const calculateGpaAndCredits = (courses) => {
    let totalPoints = 0;
    let totalCredits = 0;

    Object.keys(courses).forEach(creditType => {
      const creditHours = parseInt(creditType.replace('credit', ''));
      courses[creditType].forEach(course => {
        if (course.name.trim() && course.grade) {
          const gradePoint = getGradePoint(course.grade);
          totalPoints += gradePoint * creditHours;
          totalCredits += creditHours;
        }
      });
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    setCalculatedCredits(totalCredits);
    setCalculatedGpa(gpa);
  };

  const getGradePoint = (grade) => {
    const map = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.67,
      'B+': 3.33, 'B': 3.0, 'B-': 2.67,
      'C+': 2.33, 'C': 2.0, 'C-': 1.67,
      'D+': 1.33, 'D': 1.0, 'F': 0.0
    };
    return map[grade] || 0;
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCourseChange = (creditType, id, field, value) => {
    const updatedCourses = {
      ...editableData.courses,
      [creditType]: editableData.courses[creditType].map(course => 
        course.id === id ? { ...course, [field]: value } : course
      )
    };
    setEditableData({ ...editableData, courses: updatedCourses });
    calculateGpaAndCredits(updatedCourses);
  };

  const handleUserInfoChange = (field, value) => {
    setEditableData({
      ...editableData,
      userInfo: { ...editableData.userInfo, [field]: value }
    });
  };

  const handleSave = () => {
    localStorage.setItem('gpaCalculatorData', JSON.stringify(editableData));
    setIsEditing(false);
  };

  const handleRecalculate = () => {
    navigate('/');
  };

  const percentage = (parseFloat(calculatedGpa) / 4.0 * 100).toFixed(2);

  return (
    <div className="result-wrapper">
      
      <div className="result-container">
        
        <div className="result-card">
          
          <header className="result-header">
            
            <div className="university-logo-placeholder">
              <img src={fast_image} alt="University Logo" className="university-logo" />
              <h2>National University Of Computing And Engineering Sciences</h2>
            </div>
            
            <div className="student-info">
              <h3>{editableData.userInfo.name || 'Student Name'}</h3>
              <p>
                {editableData.userInfo.semester && `${editableData.userInfo.semester} • `}
                {editableData.userInfo.rollNumber || 'Roll Number'}
              </p>
            </div>

          </header>

          <div className="result-content">
            <table className="grades-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Credit Hours</th>
                  <th>Grade</th>
                  <th>Grade Points</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(editableData.courses).map(creditType => (
                  editableData.courses[creditType].map((course, index) => {
                    const creditHours = parseInt(creditType.replace('credit', ''));
                    const gradePoints = getGradePoint(course.grade) * creditHours;
                    
                    return (
                      <tr key={course.id}>
                        <td>
                          {isEditing ? (
                            <input
                              type="text"
                              value={course.name}
                              onChange={(e) => handleCourseChange(creditType, course.id, 'name', e.target.value)}
                            />
                          ) : (
                            course.name || `Course ${String.fromCharCode(65 + index)}`
                          )}
                        </td>
                        <td>{creditHours}</td>
                        <td>
                          {isEditing ? (
                            <select
                              value={course.grade}
                              onChange={(e) => handleCourseChange(creditType, course.id, 'grade', e.target.value)}
                            >
                              {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'].map(grade => (
                                <option key={grade} value={grade}>{grade}</option>
                              ))}
                            </select>
                          ) : (
                            course.grade
                          )}
                        </td>
                        <td>{gradePoints.toFixed(2)}</td>
                      </tr>
                    );
                  })
                ))}
              </tbody>
            </table>

            <div className="gpa-summary">
              <div className="gpa-box">
                <span className="gpa-label">GPA</span>
                <span className="gpa-value">{calculatedGpa}</span>
              </div>
              <div className="gpa-box">
                <span className="gpa-label">Percentage</span>
                <span className="gpa-value">{percentage}%</span>
              </div>
              <div className="gpa-box">
                <span className="gpa-label">Total Credits</span>
                <span className="gpa-value">{calculatedCredits}</span>
              </div>
            </div>
          </div>

          <div className="result-actions">
            {isEditing ? (
              <>
                <button type="button" className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button type="button" className="edit-btn" onClick={handleEditToggle}>
                  Edit Results
                </button>
                <button type="button" className="recalculate-btn" onClick={handleRecalculate}>
                  Recalculate GPA
                </button>
                <button type="button" className="print-btn" onClick={() => window.print()}>
                  Print Result
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Result;