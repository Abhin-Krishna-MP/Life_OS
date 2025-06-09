import { createContext, useState } from "react";


export const oSContext = createContext(null)
function OsContextProvider({ children }) {
    const dummyChallenges = [
        {
            id: 1,
            title: 'Wake Up at 5 AM',
            goal: 'Discipline',
            description: 'Wake up early every day to build a strong morning routine.',
            streak: Array(30).fill(null),
            logs: [
                { date: 'June 7, 2025', text: 'Day 1 done' },
                { date: 'June 8, 2025', text: 'Kept the streak' },
            ]
        },
        {
            id: 2,
            title: 'Read 20 Pages Daily',
            goal: 'Knowledge',
            description: 'Read consistently to improve focus and understanding.',
            streak:Array(30).fill(null),
            logs: [
                { date: 'June 8, 2025', text: 'Atomic Habits' }
            ]
        }
    ];
    
    
    const [challenges, setChallenges] = useState(dummyChallenges)
    
    
    
    const context = {
        challenges,
        setChallenges

    }
    return (
        <oSContext.Provider value={context}>
            {children}
        </oSContext.Provider>
    )
}

export default OsContextProvider;