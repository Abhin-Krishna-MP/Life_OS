import React, { useContext, useState } from 'react'
import ChallengeCard from '../features/ChallengeCard'
import ChallengeForm from '../features/ChallengeForm'
import { oSContext } from '../context/Context'

const Challenge = () => {
  
  const {challenges, setChallenges} = useContext(oSContext)

  const handleSaveChallenge = (challenge) => {
    setChallenges([...challenges,{ ...challenge, id: challenges.length + 1}]);
    console.log('Challenge saved:', challenge);
  }

  return (
    <div className='challenge'>
      <h2>30-Day Challenge Tracker</h2>
      <ChallengeForm onSave={handleSaveChallenge} />
      {
        challenges.map((challenge, index) => (
          <ChallengeCard key={index} id={challenge.id} title={challenge.title} goal={challenge.goal} description={challenge.description} />
        ))
      }
    </div>
  )
}

export default Challenge
