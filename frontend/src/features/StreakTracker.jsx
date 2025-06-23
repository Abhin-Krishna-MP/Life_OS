import React, { useContext, useEffect } from 'react'
import { oSContext } from '../context/Context'
import api from '../services/api'
import { toast } from 'react-toastify'

const StreakTracker = ({ challengeId, streak, setStreak }) => {


    const { challenges, setChallenges } = useContext(oSContext)

    useEffect(() => {
    const challenge = challenges.find((ch) => ch.id === challengeId);
    if (challenge) {
      setStreak(challenge.streak || Array(30).fill(null));
    }
  }, [challengeId, challenges]);


    const markDay = async (index, status) => {
        try {
            console.log(index,status)
            await api.post(`challenges/${challengeId}/mark-day/`, {
                day: index,
                status: status
            })
            const updated = [...streak]
            updated[index] = status
            setStreak(updated)

            setChallenges(challenges.map(challenge => {
                if (challenge.id === challengeId) {
                    return { ...challenge, streak: updated };
                }
                return challenge;   
            }))

        } catch (err) {
            toast.error('Failed to mark day. Try again.');
            console.error(err);
        }
    }
    const getStatusColor = (status) => {
        switch (status) {
            case 'perfect':
                return '#28a745';
            case 'missed':
                return '#dc3545';
            default:
                return '#e0e0e0';
        }
    }
    return (
        <div className='streak-tracker'>
            <div className="days-grid">
                {
                    streak.map((status, i) => (
                        <div key={i} style={{ backgroundColor: getStatusColor(status) }} className="day-box">
                            <p>Day{i + 1}</p>
                            <button onClick={() => markDay(i, 'perfect')} >O</button>
                            <button onClick={() => markDay(i, 'missed')}>X</button>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default StreakTracker
