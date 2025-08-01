import React from 'react';

const CourseInput = ({ creditHours, courses, onAdd, onRemove, onChange }) => {
  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

  return (
    <div className="credit-section">
      <h3>{creditHours} Credit Hour Courses</h3>
      {courses.map((course, index) => (
        <div key={index} className="course-row">
          <input
            type="text"
            value={course.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
            placeholder="Course name"
          />
          <select
            value={course.grade}
            onChange={(e) => onChange(index, 'grade', e.target.value)}
          >
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          <button 
            type="button" 
            className="remove-btn"
            onClick={() => onRemove(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button 
        type="button" 
        className="add-btn"
        onClick={onAdd}
      >
        Add Course
      </button>
    </div>
  );
};

export default CourseInput;