import React, { useContext, useState } from 'react'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSignup = async (e)=>{
        e.preventDefault()
        try {
            const res = await api.post('register/',{username, password})
            localStorage.setItem('access',res.data.access)
            localStorage.setItem('refresh', res.data.refresh)

            await login(username, password)
            navigate('/dashboard')

        } catch (error) {
            toast("Signup failed. Username might already be taken.")
            console.log(error)
        }
    }
    return (
        <div className='auth-container'>
            <form className='auth-form' onSubmit={handleSignup}>
                <h2>Create Account</h2>
                <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder='Username' required />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
                <button type='submit'>Sign up</button>
                <p className="auth-switch">
                    Already have an account? <a href="/">Login</a>
                </p>
            </form>

        </div>
    )
}

export default Signup
