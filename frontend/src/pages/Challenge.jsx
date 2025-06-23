import React, { useContext, useState } from 'react'
import ChallengeCard from '../features/ChallengeCard'
import ChallengeForm from '../features/ChallengeForm'
import { oSContext } from '../context/Context'
import { Navigate } from 'react-router-dom'
import api from '../services/api'

const Challenge = () => {
  
  const {challenges, setChallenges} = useContext(oSContext)

  const handleSaveChallenge = async (challenge) => {
    setChallenges([...challenges,{ ...challenge, id: challenges.length + 1}]);
    try {
      const res = await api.post('challenges/',challenge)
      console.log('Challenge saved:', challenge);
    } catch (error) {
      console.error('Failed to add challenge', err)
    }
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
