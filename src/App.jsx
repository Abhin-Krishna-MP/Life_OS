import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Sidebar from './components/layout/Sidebar.jsx' 
import Dashboard from './pages/Dashboard.jsx'
import Challenge from './pages/Challenge.jsx'
import Journal from './pages/Journal.jsx'
import Evolution from './pages/Evolution.jsx'
import Profile from './pages/Profile.jsx'
import Rewards from './pages/Rewards.jsx'
import './styles/global.css'
const App = () => {
  return (
    <div className='app-container'>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-view">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/evolution" element={<Evolution />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rewards" element={<Rewards />} />
          </Routes>

        </div>
      </div>


    </div>
  )
}

export default App
