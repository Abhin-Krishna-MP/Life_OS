import React, { useContext, useState } from 'react'
import StreakTracker from './StreakTracker'
import JournalEntry from './JournalEntry';
import { oSContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import api from '../services/api';
import { FiTrash2 } from 'react-icons/fi'


const ChallengeCard = ({ id, title, goal, description }) => {
  const [streak, setStreak] = useState(Array(30).fill(null))
  const [showTracker, setShowTracker] = useState(false)
  const [showLogs, setShowLogs] = useState(false)
  const {fetchChallenges} = useContext(oSContext)
  const navigate = useNavigate()
  const toggleTracker = () => {
    setShowTracker(!showTracker)
  }
  const goToDetail = () => {
    navigate(`/challenge/${id}`);
  };
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      try {
        await api.delete(`challenges/${id}/`)
        fetchChallenges()
      } catch (err) {
        console.error('Delete failed', err)
      }
    }
  }
  return (

    <motion.div
      className="challenge-card"
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.button
          className="delete-icon"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDelete(id)}
        >
          <FiTrash2 />
        </motion.button>
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
    </motion.div>

  )
}

export default ChallengeCard
