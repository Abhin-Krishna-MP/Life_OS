import React, { useContext, useState } from 'react'
import StreakTracker from './StreakTracker'
import JournalEntry from './JournalEntry';
import { oSContext } from '../context/Context';


const ChallengeCard = ({id,title,goal,description}) => {
  const [streak, setStreak] = useState(Array(30).fill(null))
  const [showTracker, setShowTracker] = useState(false)
  const toggleTracker = () => {
    setShowTracker(!showTracker)
  }
  return (
    <div className='challenge-card'>
        <h3>{title}</h3>
        <p><strong>Goal:</strong> {goal}</p>
        <p>{description}</p>  
        <button className='streak-button' onClick={()=>setShowTracker(!showTracker)}>{showTracker ? 'Hide Streak' : 'Show Streak'}</button>
        {
          showTracker &&(
            <>
            <StreakTracker challengeId={id} streak={streak} setStreak={setStreak} />
            <JournalEntry challengeId={id} />
            </>
          )
        }


    </div>
  )
}

export default ChallengeCard
