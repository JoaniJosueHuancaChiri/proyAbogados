import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <header className="app-header">
      <Link className="app-header__logo" to="/dashboard">
        Estudio Jurídico
      </Link>
      
      <a 
        className="app-sidebar__toggle" 
        href="#" 
        onClick={onToggleSidebar}
        aria-label="Hide Sidebar"
      ></a>
      
      
    </header>
  );
};

export default Navbar;