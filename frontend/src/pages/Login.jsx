import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

const Login = () => {
    const { login } = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(username, password)
            navigate('/dashboard')
        } catch (error) {
            toast("Login failed. Check your credentials.")
        }
    }

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleLogin} >
                <h2>Life OS login</h2>
                <input onChange={(e) => setUsername(e.target.value)} type="text" value={username} placeholder='Username' required />
                <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder='Password' required />
                <button type='submit'>Login</button>
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Don’t have an account? <a href="/signup">Sign Up</a>
                </p>

            </form>

        </div>
    )
}

export default Login
