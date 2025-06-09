import React from 'react';

const StreakGraph = ({ streak }) => {
  return (
    <div className="streak-graph">
      {streak.map((day, i) => (
        <div
          key={i}
          className="streak-bar"
          title={`Day ${i + 1}: ${day || 'Not marked'}`}
          style={{
            backgroundColor:
              day === 'perfect' ? '#28a745' :
              day === 'missed' ? '#dc3545' :
              '#ccc',
          }}
        />
      ))}
    </div>
  );
};

export default StreakGraph;
