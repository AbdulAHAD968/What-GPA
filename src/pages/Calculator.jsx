import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/calculator.css';
import '../styles/result.css';

const Calculator = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    rollNumber: '',
    semester: ''
  });

  const [creditCategories, setCreditCategories] = useState([
    { id: 1, value: 3, label: '3 Credit Hours' }
  ]);

  const [courses, setCourses] = useState({
    credit3: [{ id: 1, name: 'Course A', grade: 'A' }]
  });

  const [activeCreditTab, setActiveCreditTab] = useState('credit3');
  const navigate = useNavigate();

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('gpaCalculatorData');
    if (savedData) {
      try {
        const { userInfo: savedUserInfo, creditCategories: savedCategories, courses: savedCourses } = JSON.parse(savedData);
        
        // Initialize with default values if loaded data is invalid
        setUserInfo(savedUserInfo || { name: '', rollNumber: '', semester: '' });
        
        // Ensure at least one credit category exists
        const validCategories = savedCategories?.length > 0 
          ? savedCategories 
          : [{ id: 1, value: 3, label: '3 Credit Hours' }];
        setCreditCategories(validCategories);
        
        // Initialize courses for each credit category
        const initializedCourses = {};
        validCategories.forEach(cat => {
          const creditKey = `credit${cat.value}`;
          initializedCourses[creditKey] = savedCourses?.[creditKey]?.length > 0
            ? savedCourses[creditKey]
            : [{ id: Date.now(), name: 'Course A', grade: 'A' }];
        });
        setCourses(initializedCourses);
        
        // Set active tab to first available credit category
        if (validCategories.length > 0) {
          setActiveCreditTab(`credit${validCategories[0].value}`);
        }
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }
  }, []);

  const handleAddCreditCategory = () => {
    // Find the next available credit value (starting from 1)
    let newCreditValue = 1;
    while (creditCategories.some(cat => cat.value === newCreditValue)) {
      newCreditValue++;
    }
    
    const newCategory = {
      id: Date.now(),
      value: newCreditValue,
      label: `${newCreditValue} Credit Hour${newCreditValue !== 1 ? 's' : ''}`
    };
    
    const updatedCategories = [...creditCategories, newCategory];
    setCreditCategories(updatedCategories);
    
    // Add a default course for this new credit category
    const creditKey = `credit${newCreditValue}`;
    const updatedCourses = {
      ...courses,
      [creditKey]: [{ id: Date.now(), name: `Course A`, grade: 'A' }]
    };
    setCourses(updatedCourses);
    setActiveCreditTab(creditKey);
    
    saveToLocalStorage(userInfo, updatedCategories, updatedCourses);
  };

  const handleRemoveCreditCategory = (creditValue) => {
    if (creditCategories.length <= 1) {
      alert('You must have at least one credit category');
      return;
    }
    
    const updatedCategories = creditCategories.filter(cat => cat.value !== creditValue);
    setCreditCategories(updatedCategories);
    
    const creditKey = `credit${creditValue}`;
    const { [creditKey]: _, ...remainingCourses } = courses;
    setCourses(remainingCourses);
    
    // Switch to the first available tab if we're removing the active one
    if (activeCreditTab === creditKey) {
      setActiveCreditTab(`credit${updatedCategories[0].value}`);
    }
    
    saveToLocalStorage(userInfo, updatedCategories, remainingCourses);
  };

  const handleAddCourse = (creditValue) => {
    const creditKey = `credit${creditValue}`;
    const courseList = courses[creditKey] || [];
    const newCourse = {
      id: Date.now(),
      name: `Course ${String.fromCharCode(65 + courseList.length)}`,
      grade: 'A'
    };
    const updatedCourses = {
      ...courses,
      [creditKey]: [...courseList, newCourse]
    };
    setCourses(updatedCourses);
    saveToLocalStorage(userInfo, creditCategories, updatedCourses);
  };

  const handleRemoveCourse = (creditValue, id) => {
    const creditKey = `credit${creditValue}`;
    const courseList = courses[creditKey] || [];
    
    if (courseList.length <= 1) {
      alert('You must have at least one course in this credit category');
      return;
    }
    
    const updatedCourses = {
      ...courses,
      [creditKey]: courseList.filter(course => course.id !== id)
    };
    setCourses(updatedCourses);
    saveToLocalStorage(userInfo, creditCategories, updatedCourses);
  };

  const handleCourseChange = (creditValue, id, field, value) => {
    const creditKey = `credit${creditValue}`;
    const courseList = courses[creditKey] || [];
    
    const updatedCourses = {
      ...courses,
      [creditKey]: courseList.map(course => 
        course.id === id ? { ...course, [field]: value } : course
      )
    };
    setCourses(updatedCourses);
    saveToLocalStorage(userInfo, creditCategories, updatedCourses);
  };

  const handleUserInfoChange = (field, value) => {
    const updatedUserInfo = { ...userInfo, [field]: value };
    setUserInfo(updatedUserInfo);
    saveToLocalStorage(updatedUserInfo, creditCategories, courses);
  };

  const saveToLocalStorage = (userInfo, creditCategories, courses) => {
    localStorage.setItem('gpaCalculatorData', JSON.stringify({ userInfo, creditCategories, courses }));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    Object.keys(courses).forEach(creditKey => {
      const creditValue = parseInt(creditKey.replace('credit', ''));
      const courseList = courses[creditKey] || [];
      
      courseList.forEach(course => {
        if (course?.name?.trim() && course?.grade) {
          const gradePoint = getGradePoint(course.grade);
          totalPoints += gradePoint * creditValue;
          totalCredits += creditValue;
        }
      });
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const gpa = calculateGPA();
    navigate('/result', { 
      state: { 
        userInfo, 
        courses,
        creditCategories,
        gpa,
        totalCredits: calculateTotalCredits()
      } 
    });
  };

  const calculateTotalCredits = () => {
    return Object.keys(courses).reduce((total, creditKey) => {
      const creditValue = parseInt(creditKey.replace('credit', ''));
      const courseList = courses[creditKey] || [];
      return total + (courseList.filter(c => c?.name?.trim()).length * creditValue);
    }, 0);
  };

  return (
    <div className="calculator-wrapper">
      <div className="calculator-container">
        <header className="calculator-header">
          <h1 className="title">GPA Calculator</h1>
          <p className="subtitle">Enter your course details to calculate your semester GPA</p>
        </header>
        
        <form onSubmit={handleSubmit} className="calculator-form">
          <section className="user-info-section">
            <h2 className="section-title">Student Information <span className="optional-tag">(Optional)</span></h2>
            <div className="user-info-grid">
              {['name', 'rollNumber', 'semester'].map((field) => (
                <div className="input-group" key={field}>
                  <label htmlFor={field}>
                    {field === 'rollNumber' ? 'Roll Number' : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    type="text"
                    value={userInfo[field] || ''}
                    onChange={(e) => handleUserInfoChange(field, e.target.value)}
                    placeholder={field === 'semester' ? 'e.g. Fall 2023' : ''}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="courses-section">
            <div className="credit-tabs-header">
              <h2 className="section-title">Courses</h2>
              <button
                type="button"
                className="add-credit-btn"
                onClick={handleAddCreditCategory}
              >
                + Add Credit Category
              </button>
            </div>

            <div className="credit-tabs">
              {creditCategories.map((category) => (
                <div key={category.id} className="credit-tab-wrapper">
                  <button
                    type="button"
                    className={`credit-tab ${activeCreditTab === `credit${category.value}` ? 'active' : ''}`}
                    onClick={() => setActiveCreditTab(`credit${category.value}`)}
                  >
                    {category.label}
                  </button>
                  {creditCategories.length > 1 && (
                    <button
                      type="button"
                      className="remove-credit-tab"
                      onClick={() => handleRemoveCreditCategory(category.value)}
                      aria-label={`Remove ${category.label} category`}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="courses-container">
              {creditCategories.map((category) => {
                const creditKey = `credit${category.value}`;
                const courseList = courses[creditKey] || [];
                
                return (
                  <div 
                    key={category.id} 
                    className={`credit-courses ${activeCreditTab === creditKey ? 'active' : ''}`}
                  >
                    {courseList.map((course, index) => (
                      <div key={course.id} className="course-input-group">
                        <div className="course-input-row">
                          <div className="input-group">
                            <label>Course {String.fromCharCode(65 + index)}</label>
                            <input
                              type="text"
                              value={course.name}
                              onChange={(e) =>
                                handleCourseChange(category.value, course.id, 'name', e.target.value)
                              }
                            />
                          </div>
                          <div className="input-group">
                            <label>Grade</label>
                            <select
                              value={course.grade}
                              onChange={(e) =>
                                handleCourseChange(category.value, course.id, 'grade', e.target.value)
                              }
                            >
                              {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'].map((grade) => (
                                <option key={grade} value={grade}>{grade}</option>
                              ))}
                            </select>
                          </div>
                          {courseList.length > 1 && (
                            <button
                              type="button"
                              className="remove-course-btn"
                              onClick={() => handleRemoveCourse(category.value, course.id)}
                              aria-label="Remove course"
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-course-btn"
                      onClick={() => handleAddCourse(category.value)}
                    >
                      + Add Another {category.label} Course
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" className="calculate-btn">
              Calculate My GPA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Calculator;