import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <nav>
            <ul>
                <li><NavLink to="/">Dashboard</NavLink></li>
                <li><NavLink to="/challenge">Challenge</NavLink></li>
                <li><NavLink to="/journal">Journal</NavLink></li>
                <li><NavLink to="/evolution">Evolution</NavLink></li>
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink to="/rewards">Rewards</NavLink></li>
            </ul>
        </nav>
      
    </div>
  )
}

export default Sidebar
