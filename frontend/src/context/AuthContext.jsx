import {createContext, useState, useEffect, useContext} from 'react'
import api from '../services/api'
import { oSContext } from './Context'

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const {fetchChallenges} = useContext(oSContext)

    const login = async (username,password)=>{
        const res = await api.post('token/', {username,password})
        localStorage.setItem('access',res.data.access)
        localStorage.setItem('refresh',res.data.refresh)
        await fetchProfile();
        await fetchChallenges()
    }

    const fetchProfile = async () =>{
        try {
            const res = await api.get('profile/')
            setUser(res.data)
            console.log(user)
        } catch (error) {
            setUser(null)
        }
    }

    const logout = ()=>{
        localStorage.clear()
        setUser(null)
    }

    useEffect(()=>{
        fetchProfile()
    },[])

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}