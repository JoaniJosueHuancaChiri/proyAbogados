import React from 'react';

const NavbarDashboard = () => {
  const handleToggle = (e) => {
    e.preventDefault();
    // Alterna la clase nativa de Vali Admin en el body
    document.body.classList.toggle('sidenav-toggled');
  };

  return (
    <header className="app-header">
      {/* Logo de la marca */}
      <a className="app-header__logo font-serif" href="/dashboard">Vali</a>
      
      {/* Botón Hamburguesa Oficial (Debe ir vacío por dentro) */}
      <a 
        className="app-sidebar__toggle" 
        href="#" 
        onClick={handleToggle}
        aria-label="Hide Sidebar"
      ></a>
      
      {/* Menú derecho de la Navbar */}
      <ul className="app-nav">
        {/* Buscador */}
        <li className="app-search">
          <input className="app-search__input" type="search" placeholder="Search" />
          <button className="app-search__button" type="button">
            <i className="fa fa-search"></i>
          </button>
        </li>
        
        {/* Notificaciones */}
        <li className="dropdown">
          <a className="app-nav__item" href="#" data-toggle="dropdown" aria-label="Show notifications">
            <i className="fa fa-bell-o fa-lg"></i>
          </a>
        </li>
        
        {/* Menú de Usuario */}
        <li className="dropdown">
          <a className="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu">
            <i className="fa fa-user fa-lg"></i>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default NavbarDashboard;