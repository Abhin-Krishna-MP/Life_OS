import React, { useContext, useEffect } from 'react'
import { oSContext } from '../context/Context'

const StreakTracker = ({challengeId,streak,setStreak}) =>{
    
    
    const {challenges,setChallenges} = useContext(oSContext)
    useEffect(() => {
        const new_streak = challenges.find(challenge => challenge.id === challengeId)?.streak || Array(30).fill(null);
        setStreak(new_streak)
    }, [streak])
    const markDay=(index, status)=>{
        const updated = [...streak]
        updated[index] = status
        setStreak(updated)
        console.log(streak)
        setChallenges(challenges.map(challenge => {
            if (challenge.id === challengeId) {
                return { ...challenge, streak: updated };
            }
            return challenge;
        }))
    }
    const getStatusColor = (status) => {
        switch (status) {
            case 'perfect':
                return '#28a745';
            case 'missed':
                return '#dc3545';
            default:
                return  '#e0e0e0';
        }
    }
  return (
    <div className='streak-tracker'>
        <div className="days-grid">
            {
                streak.map((status, i)=>(
                    <div key={i} style={{backgroundColor:getStatusColor(status)}} className="day-box">
                        <p>Day{i+1}</p>
                        <button onClick={()=>markDay(i,'perfect')} >O</button>
                        <button onClick={()=>markDay(i,'missed')}>X</button>
                    </div>
                ))
            }
        </div>
      
    </div>
  )
}

export default StreakTracker
