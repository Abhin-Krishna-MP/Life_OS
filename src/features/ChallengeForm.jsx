import React, { useState } from 'react'

const ChallengeForm = ({ onSave }) => {
    const [title, setTitle] = useState('')
    const [goal, setGoal] = useState('')
    const [description, setDescription] = useState('')
    const [dailyTasks, setDailyTasks] = useState('')
    const [rules, setRules] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        if (title && goal && description) {
            onSave({ title, goal, description, dailyTasks,streak: Array(30).fill(null), logs: [] })
            setTitle('')
            setGoal('')
            setDescription('')
            setDailyTasks('')
            setRules('')
        }
    }
    return (
        <form onSubmit={handleSubmit} className='challenge-form'>
            <div>
                <label>Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Enter challenge title' required />
            </div>
            <div>
                <label>Goal</label>
                <input value={goal} onChange={(e) => setGoal(e.target.value)} type="text" placeholder='Enter challenge goal' required />
            </div>
            <div>
                <label>Description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Enter challenge description' required />
            </div>
            <div>
                <label>Daily tasks</label>
                <textarea value={dailyTasks} onChange={(e) => setDailyTasks(e.target.value)} placeholder='List of daily tasks' required></textarea>
            </div>
            <div>
                <label>Rules</label>
                <textarea value={rules} onChange={(e) => setRules(e.target.value)} placeholder='Define rules for the challenge' required></textarea>
            </div>
            <button type='submit'>Save Challenges</button>
        </form>

    )
}

export default ChallengeForm;
