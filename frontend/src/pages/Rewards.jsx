import React from 'react';
import { motion } from 'framer-motion';

const Rewards = () => {
  return (
    <div className="reward-page">
      <motion.div
        className="coming-soon-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>🎁 Rewards</h2>
        <p>Exciting rewards and gamification features are on the way!</p>
        <p className="soon-tag">🚧 Coming Soon...</p>
      </motion.div>
    </div>
  );
};

export default Rewards;
