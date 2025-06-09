import React from 'react';
import EvolutionCard from './EvolutionCard';

const EvolutionChart = ({ challenges }) => {
  return (
    <div className="evolution-chart">
      <h3>Your Challenge Evolution</h3>
      <div className="evolution-list">
        {challenges.map((challenge, idx) => (
          <EvolutionCard
            key={idx}
            title={challenge.title}
            goal={challenge.goal}
            streak={challenge.streak}
            logs={challenge.logs}
          />
        ))}
      </div>
    </div>
  );
};

export default EvolutionChart;
