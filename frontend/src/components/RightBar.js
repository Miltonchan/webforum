import React from 'react';

const RightBar = ({topStudents, topSchools}) => {

  return (
    <div className="ranking" style={{ position: 'sticky', top: '90px' }}>
      
      <div className="list-group">
        <h6 className="list-group-item rounded shadow-sm" style={{ backgroundColor: '#e3f2fd' }}> <i className="bi bi-trophy-fill"></i> Top Students </h6>
        {topStudents.slice(0, 3).map((student, index) => (
          <span className="list-group-item " key={index}>{index+1}: {student.username}</span>
        ))}
      </div>
      <br></br>

      <div className="list-group">
        <h6 className="list-group-item rounded shadow-sm" style={{ backgroundColor: '#e3f2fd' }}> <i className="bi bi-trophy-fill"></i> Top Schools </h6>
        {topSchools.slice(0, 3).map((school, index) => (
          <span className="list-group-item " key={index}> {index+1}: {school.name.split(" | ")[0]}</span>
        ))}
      </div>

    </div>
  );
};

export default RightBar;