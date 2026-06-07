import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="app-sidebar">
      {/* Sección del Perfil de Usuario idéntica a imagen_7.png */}
      <div className="app-sidebar__user">
        <img
          className="app-sidebar__user-avatar"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
          alt="User Image"
        />
        <div>
          <p className="app-sidebar__user-name">Administrador</p>
          <p className="app-sidebar__user-designation">Panel de Control</p>
        </div>
      </div>

      {/* Árbol de Navegación del Menú */}
      <ul className="app-menu">
        <li>
          <Link
            to="/dashboard"
            className={`app-menu__item ${location.pathname === "/dashboard" ? "active" : ""}`}
          >
            <i className="app-menu__icon fa fa-dashboard"></i>
            <span className="app-menu__label">Dashboard</span>
          </Link>
        </li>

        {/* Ejemplo de item con sub-elementos desplegables */}
        <li className="treeview">
          <a className="app-menu__item" href="#" data-toggle="treeview">
            <i className="app-menu__icon fa fa-laptop"></i>
            <span className="app-menu__label">UI Elements</span>
            <i className="treeview-indicator fa fa-angle-right"></i>
          </a>
        </li>

        <li>
          <Link
            to="/expedientes"
            className={`app-menu__item ${location.pathname === "/expedientes" ? "active" : ""}`}
          >
            <i className="app-menu__icon fa fa-file-text"></i>
            <span className="app-menu__label">Expedientes</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
