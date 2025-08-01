import React from 'react';
import '../styles/gradeTable.css';


const GradeTable = () => {
  const gradeData = [
    { grade: 'A+', points: '4.00', interpretation: 'Excellent', percentage: '≥ 90' },
    { grade: 'A', points: '4.00', interpretation: 'Excellent', percentage: '86 – 89' },
    { grade: 'A−', points: '3.67', interpretation: 'Very Good', percentage: '82 – 85' },
    { grade: 'B+', points: '3.33', interpretation: 'Very Good', percentage: '78 – 81' },
    { grade: 'B', points: '3.00', interpretation: 'Good', percentage: '74 – 77' },
    { grade: 'B−', points: '2.67', interpretation: 'Average', percentage: '70 – 73' },
    { grade: 'C+', points: '2.33', interpretation: 'Below Average', percentage: '66 – 69' },
    { grade: 'C', points: '2.00', interpretation: 'Adequate', percentage: '62 – 65' },
    { grade: 'C−', points: '1.67', interpretation: 'Pass', percentage: '58 – 61' },
    { grade: 'D+', points: '1.33', interpretation: 'Pass', percentage: '54 – 57' },
    { grade: 'D', points: '1.00', interpretation: 'Pass', percentage: '50 – 53' },
    { grade: 'F', points: '0.00', interpretation: 'Fail', percentage: '≤ 49' }
  ];

  return (
    <div className="grade-table">
      <h2>Grading System</h2>
      <table>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Points</th>
            <th>Interpretation</th>
            <th>Percentage Range (%)</th>
          </tr>
        </thead>
        <tbody>
          {gradeData.map((row, index) => (
            <tr key={index}>
              <td>{row.grade}</td>
              <td>{row.points}</td>
              <td>{row.interpretation}</td>
              <td>{row.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeTable;