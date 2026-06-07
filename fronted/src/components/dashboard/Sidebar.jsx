import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="app-sidebar fixed left-0 top-0 h-screen w-64 bg-[#222d32] text-slate-300 pt-20 z-40 shadow-lg">
      
      <div className="app-sidebar__user flex items-center gap-4 p-4 border-b border-slate-700 mb-4 bg-[#1a2226]">
        <img 
          className="app-sidebar__user-avatar w-12 h-12 rounded-full border-2 border-slate-500" 
          src="https://randomuser.me/api/portraits/men/1.jpg" 
          alt="User Image" 
        />
        <div>
          <p className="app-sidebar__user-name font-bold text-white text-sm">Abog. Administrador</p>
          <p className="app-sidebar__user-designation text-xs text-slate-400">Panel de Control</p>
        </div>
      </div>

      <ul className="app-menu space-y-1">
        <li>
          <Link to="/dashboard" className="app-menu__item flex items-center gap-3 px-6 py-3 bg-[#1a2226] text-white border-l-4 border-[#009688]">
            <i className="app-menu__icon fa-solid fa-dashboard"></i>
            <span className="app-menu__label">Dashboard</span>
          </Link>
        </li>
        <li>
          <a className="app-menu__item flex items-center gap-3 px-6 py-3 hover:bg-[#1a2226] hover:text-white transition-colors" href="#casos">
            <i className="app-menu__icon fa-solid fa-laptop"></i>
            <span className="app-menu__label">Expedientes</span>
          </a>
        </li>
      </ul>
      
    </aside>
  );
};

export default Sidebar;