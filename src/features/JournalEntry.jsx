import React, { useContext, useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import { oSContext } from '../context/Context'

const JournalEntry = (challengeId) => {
    const {challenges} = useContext(oSContext)
    const [logs, setlogs] = useState([])
    useEffect(() => {
        return () => {
        const challenge = challenges.find(challenge => challenge.id === challengeId.challengeId);
        console.log(challenge)
        if (challenge) {
            setlogs(challenge.logs);
        }
    }
    }, [logs]);
    const [entry, setEntry] = useState('')
    const [show, setShow] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        const today =  new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        const newEntry = {
            date: today,
            text: entry
        }
        const alreadyExists = logs.some((log)=> log.date === today)
        if (alreadyExists) {
            toast('You already logged your entry for today.')
            return
        }
        challenges.forEach((challenge) => {
            if (challenge.id === challengeId.challengeId) {
                challenge.logs.push(newEntry)
                console.log('Updated logs:', challenge.logs)
                setlogs([...logs,newEntry])
            }
        })
        toast('Entry added successfully!')
        console.log('New entry added:', newEntry)
        setEntry('')
    }

  return (
    <div className='journal-entry'> 
        <h4>Daily reflection</h4>
        <form onSubmit={handleSubmit}>
            <textarea value={entry} onChange={(e)=>setEntry(e.target.value)} placeholder='Write your thoughts here...' required></textarea>
            <button type='submit'>Submit</button>
        </form>
        <div className="logs">
            <h5>Previous logs</h5>
            <button onClick={()=>{setShow(!show)}}>{show ? "Hide logs" : "Show logs"}</button>
            { show &&(
                logs.length > 0 ? (
                    logs.map((log, i) =>(
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
