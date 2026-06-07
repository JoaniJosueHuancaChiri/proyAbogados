import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavbarDashboard = () => {
  const navigate = useNavigate();

  return (

    <header className="app-header fixed top-0 left-0 w-full h-16 bg-[#009688] flex items-center justify-between px-4 z-50 shadow-md text-white">
      {/* Logotipo de Vali Admin */}
      <a className="app-header__logo font-serif tracking-wider text-xl font-bold px-4" href="/dashboard">
        Vali
      </a>
      

      <button 
        className="app-sidebar__toggle p-3 hover:bg-[#00796b] rounded transition-colors" 
        aria-label="Hide Sidebar"
      >
        <i className="fa-solid fa-bars text-lg"></i>
      </button>


      <ul className="app-nav flex items-center gap-2 pr-4">
        <li className="dropdown">
          <button 
            onClick={() => navigate('/')} 
            className="app-nav__item p-2 hover:bg-[#00796b] rounded flex items-center gap-2 transition-colors text-sm font-medium"
            title="Cerrar Sesión"
          >
            <i className="fa-solid fa-sign-out-alt"></i> Salir
          </button>
        </li>
      </ul>
    </header>
  );
};

export default NavbarDashboard;