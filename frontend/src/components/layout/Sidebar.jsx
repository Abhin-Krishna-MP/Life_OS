import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion'

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const token = localStorage.getItem('access');

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  // Listen for screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setOpen(false); // Close dropdown on desktop
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const MenuItems = (
    <ul>
      <li><NavLink to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavLink></li>
      <li><NavLink to="/challenge" onClick={() => setOpen(false)}>Challenge</NavLink></li>
      <li><NavLink to="/journal" onClick={() => setOpen(false)}>Journal</NavLink></li>
      <li><NavLink to="/evolution" onClick={() => setOpen(false)}>Evolution</NavLink></li>
      <li><NavLink to="/profile" onClick={() => setOpen(false)}>Profile</NavLink></li>
      <li><NavLink to="/rewards" onClick={() => setOpen(false)}>Rewards</NavLink></li>

      {token && <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
      className='logout-button' >Logout </motion.button>}

    </ul>
  );

  return (
    <>
      {isMobile ? (
        <>
          <div className="menu-toggle">
            {open ? <FiX onClick={() => setOpen(false)} size={28} /> : <FiMenu onClick={() => setOpen(true)} size={28} />}
          </div>
          <div className={`dropdown-sidebar ${open ? 'active' : ''}`}>
            {MenuItems}
          </div>
        </>
      ) : (
        <div className="sidebar">
          <nav>{MenuItems}</nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
