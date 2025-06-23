import React, { useContext, useEffect, useState } from 'react';
import { oSContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { challenges } = useContext(oSContext)
  const [profile, setProfile] = useState(null)
  const [displayXp, setDisplayXp] = useState(0)
  const [displayLevel, setDisplayLevel] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get('/profile')
        setProfile(res.data)
        const data = res.data
        console.log(res)
        let count = 0
        let countl = 0
        const increment = Math.ceil(data.xp / 25)
        const xpInterval = setInterval(() => {
          count += increment;
          if (count >= data.xp) {
            count = data.xp;
            clearInterval(xpInterval);
          }
          setDisplayXp(count);
        }, 20);

      } catch (error) {
        console.log(error)
      }

    }
    fetchProfile()
    
  }, [challenges])

  const handleCardClick = (id) => {
    navigate(`/challenge/${id}`)
  }


  const perfectDays = challenges.reduce(
    (total, c) => total + c.streak.filter((d) => d === 'perfect').length,
    0
  );
  const xp = perfectDays * 10;
  const level = Math.floor(xp / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="dashboard"
    >
      <h2>Welcome Back 👋</h2>


      <div className="dashboard-summary">
        {
          profile && (
            <>
              <div className="summary-box">
                <h3>XP</h3>
                <p>{displayXp}</p>
              </div>
              <div className="summary-box">
                <h3>Level</h3>
                <p>{profile.level}</p>
              </div>
            </>
          )
        }
        <div className="summary-box">
          <h3>Perfect Days</h3>
          <p>{perfectDays}</p>
        </div>
        <div className="summary-box">
          <h3>Active Challenges</h3>
          <p>{challenges.length}</p>
        </div>
      </div>

      <div className="dashboard-challenges">
        <h3>Current Challenges</h3>
        {challenges.map((c) => (
          <div key={c.id} className="challenge-preview">
            <h4>{c.title}</h4>
            <p><strong>Goal:</strong> {c.goal}</p>
            <p>{c.description}</p>
            <p><strong>Streak:</strong> {c.streak.filter(d => d === 'perfect').length} / 30</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
