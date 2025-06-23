import React, { useContext, useState } from 'react'
import StreakTracker from './StreakTracker'
import JournalEntry from './JournalEntry';
import { oSContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'


const ChallengeCard = ({ id, title, goal, description }) => {
  const [streak, setStreak] = useState(Array(30).fill(null))
  const [showTracker, setShowTracker] = useState(false)
  const [showLogs, setShowLogs] = useState(false)
  const navigate = useNavigate()
  const toggleTracker = () => {
    setShowTracker(!showTracker)
  }
  const goToDetail = () => {
    navigate(`/challenge/${id}`);
  };
  return (

      <motion.div
      className="challenge-card"
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
    <div className='challenge-card'>
      <h3>{title}</h3>
      <p><strong>Goal:</strong> {goal}</p>
      <p>{description}</p>
      <div className="card-button">
        <button className='streak-button' onClick={() => setShowTracker(!showTracker)}>{showTracker ? 'Hide Streak' : 'Show Streak'}</button>
        <button className='streak-button' onClick={() => setShowLogs(!showLogs)}>{showLogs ? 'Hide logs' : 'Show logs'}</button>
        <button className='streak-button' onClick={goToDetail} >Details</button>
      </div>
      {
        showTracker && (
          <>
            <StreakTracker challengeId={id} streak={streak} setStreak={setStreak} />
          </>
        )
      }
      {
        showLogs && (
          <>
            <JournalEntry challengeId={id} />
          </>
        )
      }


    </div >
      </motion.div>

  )
}

export default ChallengeCard
