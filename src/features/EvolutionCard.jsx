import React from 'react';
import StreakGraph from './StreakGraph';

const EvolutionCard = ({ title, goal, streak = [], logs = [] }) => {
  const totalDays = streak.length;
  const perfectDays = streak.filter(day => day === 'perfect').length;
  const xp = perfectDays * 10; // 💡 10 XP per perfect day
  const progressPercent = Math.round((perfectDays / totalDays) * 100);

  return (
    <div className="evolution-card">
      <h4>{title}</h4>
      <p><strong>Goal:</strong> {goal}</p>
      <p><strong>XP Earned:</strong> {xp}</p>
      <p><strong>Journal Entries:</strong> {logs.length}</p>
      <div className="progress-bar-wrapper">
        <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
      </div>
      <StreakGraph streak={streak} />
    </div>
  );
};

export default EvolutionCard;
