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
      
      <ul className="app-nav">
        <li className="dropdown">
          <a className="app-nav__item" href="#" aria-label="Open Profile Menu">
            <i className="bi bi-person fs-4"></i>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;