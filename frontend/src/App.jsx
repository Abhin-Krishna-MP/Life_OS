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
import ChallengeDetail from './pages/ChallengeDetail.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import PrivateRoute from './pages/PrivateRouter.jsx'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import NotFound from './pages/NotFound.jsx'
import ServerError from './pages/ServerError.jsx'
import PublicRoute from './pages/PublicRouter.jsx'


const App = () => {
  const location = useLocation()
  return (
    <div className='app-container'>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-view">
          <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<PublicRoute><Login/></PublicRoute> } />
            <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute> } />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
            <Route path="/challenge" element={<PrivateRoute><Challenge /></PrivateRoute> } />
            <Route path="/journal" element={<PrivateRoute><Journal /></PrivateRoute> } />
            <Route path="/evolution" element={<PrivateRoute><Evolution /></PrivateRoute> } />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute> } />
            <Route path="/rewards" element={<PrivateRoute><Rewards /></PrivateRoute> } />
            <Route path="/challenge/:id" element={<PrivateRoute><ChallengeDetail /></PrivateRoute> } />

            <Route path="*" element={<NotFound />} />
            <Route path="/server-error" element={<ServerError />} />
          </Routes>
          </AnimatePresence>

        </div>
      </div>


    </div>
  )
}

export default App
