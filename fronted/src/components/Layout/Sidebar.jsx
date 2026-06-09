import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Estados para pintar los datos del Abogado/Admin en tiempo real
  const [nombreCompleto, setNombreCompleto] = useState("Cargando...");
  const [rolUsuario, setRolUsuario] = useState("Usuario");
  const comprobarSesionUnica = async () => {
    const token = localStorage.getItem("token");

    // Si ni siquiera hay token, directo al login
    if (!token) {
      localStorage.clear();
      navigate("/login");
      return;
    }

    try {
      const respuesta = await fetch(
        "http://localhost:8080/api/usuarios/verificar-token",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Envíamos el token al authMiddleware
          },
        },
      );

      if (!respuesta.ok) {
        // 🚨 SI EL MIDDLEWARE RESPONDE 401: Significa que el token de la BD ya es otro
        alert(
          "Tu sesión ha caducado porque se inició sesión en otro dispositivo.",
        );
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error de conexión al verificar token:", error);
    }
  };
  // Cambia tu useEffect actual por este:
  useEffect(() => {
    // 🚀 1. EJECUTAR EL GUARDIA EN CADA CAMBIO DE PESTAÑA
    comprobarSesionUnica();

    // 2. Extraemos los datos del usuario que guardó el Login
    const infoUsuario = localStorage.getItem("usuarioLogueado");

    if (infoUsuario) {
      const user = JSON.parse(infoUsuario);

      const nom = user.nombre ? user.nombre.trim() : "";
      const pat = user.paterno ? user.paterno.trim() : "";
      const mat = user.materno ? user.materno.trim() : "";

      const nombreCompletoBD = `${nom} ${pat} ${mat}`
        .replace(/\s+/g, " ")
        .trim();

      setNombreCompleto(nombreCompletoBD || user.usuario);
      setRolUsuario(
        user.tipoUsuario ? user.tipoUsuario.toUpperCase() : "SIN ROL",
      );
    }
  }, [location.pathname]); // 👈 🌟 ¡ESTA PARTE ES CRUCIAL! Hace que el useEffect se dispare cada vez que haces clic en el menú

  return (
    <aside className="app-sidebar">
      {/* 🌟 Tarjeta del Usuario Dinámica con datos de la BD */}
      <div className="app-sidebar__user">
        <div>
          {/* Muestra el nombre real */}
          <p className="app-sidebar__user-name text-capitalize">
            {nombreCompleto}
          </p>
          {/* Muestra Administrador, Abogado o Cliente */}
          <p className="app-sidebar__user-designation">{rolUsuario}</p>
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

        {rolUsuario === "ADMINISTRADOR" && (
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
        )}
        {(rolUsuario === "ADMINISTRADOR" || rolUsuario === "ABOGADO") && (
          <>
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
          </>
        )}
        <li>
          <NavLink
            className="app-menu__item"
            to="/login"
            onClick={() => {
              // Limpieza total al cerrar sesión manualmente
              localStorage.clear();
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
