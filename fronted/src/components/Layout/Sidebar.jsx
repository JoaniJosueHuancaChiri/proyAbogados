import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      {/* Tarjeta del Usuario que inició sesión */}
      <div className="app-sidebar__user">
        <img
          className="app-sidebar__user-avatar"
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
          alt="User Image"
          style={{ width: "48px", height: "48px", objectFit: "cover" }}
        />
        <div>
          <p className="app-sidebar__user-name">Administrador</p>
          <p className="app-sidebar__user-designation">Panel de Control</p>
        </div>
      </div>

      {/* Lista de Enlaces */}
      <ul className="app-menu">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "app-menu__item active" : "app-menu__item"
            }
            to="/dashboard"
            end
          >
            <i className="app-menu__icon bi bi-speedometer"></i>
            <span className="app-menu__label">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "app-menu__item active" : "app-menu__item"
            }
            to="/dashboard/usuarios"
          >
            <i className="app-menu__icon bi bi-people"></i>
            <span className="app-menu__label">Administrador</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "app-menu__item active" : "app-menu__item"
            }
            to="/dashboard/abogados"
          >
            <i className="app-menu__icon bi bi-briefcase"></i>
            <span className="app-menu__label">Abogados</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "app-menu__item active" : "app-menu__item"
            }
            to="/dashboard/clientes"
          >
            <i className="app-menu__icon bi bi-people"></i>
            <span className="app-menu__label">Clientes</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "app-menu__item active" : "app-menu__item"
            }
            to="/dashboard/expedientes"
          >
            <i className="app-menu__icon bi bi-folder"></i>
            <span className="app-menu__label">Expedientes</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className="app-menu__item"
            to="/login"
            onClick={() => {
              // Aquí podrías agregar lógica para limpiar tokens o localStorage
              localStorage.removeItem("token");
            }}
          >
            <i className="app-menu__icon bi bi-box-arrow-right"></i>
            <span className="app-menu__label">Salir</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
