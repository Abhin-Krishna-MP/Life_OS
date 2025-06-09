import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [Menu, setMenu] = useState('dashboard')

  const toggleMenu = (menu) => {
    if (Menu === menu) {
      setMenu(String(menu).toLowerCase())
    } else {
      setMenu('dashboard')
    }
  }
  return (
    <div className='sidebar'>
        <nav>
            <ul>
                <li onClick={()=>toggleMenu('dashboard')} className={Menu==='dashboard' ? 'active' : ''} ><NavLink to="/">Dashboard</NavLink></li>
                <li onClick={()=>toggleMenu('challenge')} className={Menu==='challenge' ? 'active' : ''} ><NavLink to="/challenge">Challenge</NavLink></li>
                <li onClick={()=>toggleMenu('journal')} className={Menu==='journal' ? 'active' : ''} ><NavLink to="/journal">Journal</NavLink></li>
                <li onClick={()=>toggleMenu('evolution')} className={Menu==='evolution' ? 'active' : ''} ><NavLink to="/evolution">Evolution</NavLink></li>
                <li onClick={()=>toggleMenu('profile')} className={Menu==='profile' ? 'active' : ''} ><NavLink to="/profile">Profile</NavLink></li>
                <li onClick={()=>toggleMenu('rewards')} className={Menu==='rewards' ? 'active' : ''} ><NavLink to="/rewards">Rewards</NavLink></li>
            </ul>
        </nav>
      
    </div>
  )
}

export default Sidebar
