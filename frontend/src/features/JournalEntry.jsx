import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { oSContext } from '../context/Context'
import api from '../services/api'

const JournalEntry = (challengeId) => {
    const { challenges, setChallenges } = useContext(oSContext)
    const [logs, setlogs] = useState([])

    useEffect(() => {
        const challenge = challenges.find(
            (ch) => ch.id === challengeId.challengeId
        );
        if (challenge) {
            setlogs(challenge.logs || [])
        }
    }, [challengeId, challenges])

    const [entry, setEntry] = useState('')
    const [show, setShow] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const today = new Date().toISOString().split("T")[0];
        const alreadyExists = logs.some((log) => log.date === today)
        if (alreadyExists) {
            return toast('You already logged your entry for today.')

        }
        const newEntry = {
            date: today,
            text: entry,
            challenge: challengeId.challengeId
        }

        try {
            await api.post('logs/', newEntry)
            setlogs((prevLogs) => [...prevLogs, { date: today, text: entry }])
            setChallenges(prev =>
                prev.map(ch => {
                    if (ch.id === challengeId.challengeId) {
                        return {
                            ...ch,
                            logs: [...ch.logs, newEntry] 
                        };
                    }
                    return ch;
                })
            )

            toast('Entry added successfully!')
            console.log('New entry added:', newEntry)
            setEntry('')
        } catch (err) {
            console.error("Error adding log:", err);
            toast("Something went wrong. Please try again.");
        }
    }

    useEffect(() => {
        async function fetchLogs() {
            try {
                const res = await api.get('challenges/')
                setlogs(res.logs)
            } catch (err) {
                console.error('Error loading logs:', err);
            }

        }
    }, [logs])

    return (
        <div className='journal-entry'>
            <h4>Daily reflection</h4>
            <form onSubmit={handleSubmit}>
                <textarea value={entry} onChange={(e) => setEntry(e.target.value)} placeholder='Write your thoughts here...' required></textarea>
                <button type='submit'>Submit</button>
            </form>
            <div className="logs">
                <h5>Previous logs</h5>
                <button onClick={() => { setShow(!show) }}>{show ? "Hide logs" : "Show logs"}</button>
                {show && (
                    logs.length > 0 ? (
                        logs.map((log, i) => (
                            <div key={i} className="log-entry">
                                <p key={i}><strong>{log.date}:</strong> {log.text}</p>
                            </div>
                        ))
                    ) : (
                        <p>No entries yet. Start journaling today!</p>
                    ))
                }
            </div>

        </div>
    )
}

export default JournalEntry
