import React, { useEffect, useState } from 'react';
import StreakGraph from './StreakGraph';
import { motion } from 'framer-motion'


const EvolutionCard = ({ title, goal, streak = [], logs = [] }) => {
  const totalDays = streak.length;
  const perfectDays = streak.filter(day => day === 'perfect').length;
  const xp = perfectDays * 10; // 💡 10 XP per perfect day
  const progressPercent = Math.round((perfectDays / totalDays) * 100);
  const [displayXP, setDisplayXP] = useState(0);
  const [animatePercent, setAnimatePercent] = useState(0);

  useEffect(() => {
    // Animate XP counter
    let count = 0;
    const increment = Math.ceil(xp / 25);
    const xpInterval = setInterval(() => {
      count += increment;
      if (count >= xp) {
        count = xp;
        clearInterval(xpInterval);
      }
      setDisplayXP(count);
    }, 20);

    // Animate bar percent
    setTimeout(() => setAnimatePercent(progressPercent), 100);

    return () => clearInterval(xpInterval);
  }, [xp, progressPercent]);


  return (
    <div className="evolution-card">
      <h4>{title}</h4>
      <p><strong>Goal:</strong> {goal}</p>
      <p><strong>XP Earned:</strong> {displayXP}</p>
      <p><strong>Journal Entries:</strong> {logs.length}</p>
      <div className="progress-bar-wrapper">
        <motion.div
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${animatePercent}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
      <StreakGraph streak={streak} />
    </div>
  );
};

export default EvolutionCard;
