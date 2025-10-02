import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Use a hamburger icon for the mobile toggle button
  const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );

  return (
    <>
      <button className={styles.toggleButton} onClick={toggleMobileSidebar}>
        <HamburgerIcon />
      </button>
      <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isMobileOpen ? styles.open : ''}`}>
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setIsMobileOpen(false)}>
                <span className={styles.icon}>🏠</span>
                <span className={styles.text}>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/inventory" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setIsMobileOpen(false)}>
                <span className={styles.icon}>📦</span>
                <span className={styles.text}>Inventory</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setIsMobileOpen(false)}>
                <span className={styles.icon}>📊</span>
                <span className={styles.text}>Reports</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <button className={styles.desktopToggleButton} onClick={toggleSidebar}>
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
    </>
  );
};

export default Sidebar;