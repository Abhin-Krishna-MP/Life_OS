import React, { useContext } from 'react';
import { oSContext } from '../context/Context';

const Journal = () => {
  const { challenges } = useContext(oSContext);

  return (
    <div className="journal-page">
      <h2>Your Journal</h2>
      {challenges.map((challenge) => (
        <div key={challenge.id} className="journal-challenge-entry">
          <h3>{challenge.title}</h3>
          {challenge.logs.length === 0 ? (
            <p className="empty-log">No entries yet.</p>
          ) : (
            <ul>
              {challenge.logs.map((log, idx) => (
                <li key={idx}>
                  <strong>{log.date}:</strong> {log.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Journal;
