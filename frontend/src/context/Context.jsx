import { createContext, useEffect, useState } from "react";
import api from "../services/api";


export const oSContext = createContext(null)
function OsContextProvider({ children }) {
   const dummyChallenges = [
  {
    id: 1,
    title: 'Wake Up at 5 AM',
    goal: 'Discipline',
    description: 'Wake up early every day to build a strong morning routine.',
    dailyTasks: 'Get out of bed at 5 AM\nSplash water\nStart journaling or light movement',
    rules: 'No snoozing the alarm\nSleep by 10:30 PM\nTrack consistency in log',
    streak: Array(30).fill('perfect'),
    logs: Array.from({ length: 30 }, (_, i) => ({
      date: `June ${i + 1}, 2025`,
      text: `Woke up on time and started the day right – Day ${i + 1}`,
    }))
  },
  {
    id: 2,
    title: 'Read 20 Pages Daily',
    goal: 'Knowledge',
    description: 'Read consistently to improve focus and understanding.',
    dailyTasks: 'Read for 30 uninterrupted minutes\nHighlight key ideas\nSummarize in notes',
    rules: 'No distractions while reading\nSummarize key learnings after each session\nOnly non-fiction books allowed',
    streak: Array(30).fill(null),
    logs: [
      { date: 'June 8, 2025', text: 'Read Atomic Habits' }
    ]
  }
];




    
    const [challenges, setChallenges] = useState([])

    const fetchChallenges= async()=>{
        try {
          const res = await api.get('challenges/')
          setChallenges(res.data)
          console.log(res.data)
        } catch (error) {
          console.error("Failed to fetch challenges",err)
        }
      }
    useEffect(() => {
      

      fetchChallenges()
    }, [])
    
    
    const context = {
        challenges,
        setChallenges,
        fetchChallenges

    }
    return (
        <oSContext.Provider value={context}>
            {children}
        </oSContext.Provider>
    )
}

export default OsContextProvider;