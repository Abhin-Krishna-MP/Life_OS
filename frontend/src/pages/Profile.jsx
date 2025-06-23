import React, { useContext, useEffect, useState } from 'react'
import { oSContext } from '../context/Context'
import api from '../services/api'
import { motion } from 'framer-motion'

const Profile = () => {
  const { challenges } = useContext(oSContext)
  const [profile, setProfile] = useState({})
  const [xpPercent, setXpPercent] = useState(0)
  const [displayXp, setDisplayXp] = useState(0)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get('profile/')
        const data = res.data
        setProfile(res.data)
        const nextlevelXp = (data.level+1)*100
        const percent = Math.min(100, (data.xp / nextlevelXp)*100)
        setTimeout(()=> setXpPercent(percent), 200)

        let currentXp = 0
        const increment = Math.ceil(data.xp/30)
        const counter = setInterval(()=>{
          currentXp += increment
          if (currentXp >= data.xp){
            currentXp = data.xp
            clearInterval(counter)
          }
          setDisplayXp(currentXp)
        },20)


      } catch (error) {
        console.log(error)
      }
    }

    fetchProfile()
  }, [])


  const totalPerfectDays = challenges.reduce((total, challenge) => {
    return total + challenge.streak.filter(day => day === 'perfect').length
  }, 0)

  const nextlevelXp = (profile.level + 1) * 100


  return (
    <div className='profile-page'>
      <img className='profile-img' src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg" alt="profile-img" />
      <h2>Your Profile</h2>
      <p><strong>Total Perfect Days:</strong> {totalPerfectDays}</p>
      <p><strong>Total XP:</strong> {displayXp}</p>
      <p><strong>Level:</strong> {profile.level}</p>

      <div className="xp-bar-wrapper">
        <motion.div
          className="xp-bar"
          initial={{ width: 0 }}
          animate={{ width: `${xpPercent}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

      </div>
      <p>{displayXp} / {nextlevelXp} XP to next level</p>
    </div>
  )
}

export default Profile
