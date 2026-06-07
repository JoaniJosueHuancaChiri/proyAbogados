import React from "react";
import NavbarDashboard from "../components/dashboard/NavbarDashboard";
import Sidebar from "../components/dashboard/Sidebar";

const Dashboard = () => {
  // Forzamos a que el body de la página tenga la clase necesaria para Vali Admin
  // pages/Dashboard.jsx

  React.useEffect(() => {
    // 1. Añadimos las clases oficiales de Vali Admin
    document.body.classList.add("app", "sidebar-mini");

    // 2. TRUCO DE AISLAMIENTO: Marcamos que estamos en el dashboard
    document.body.setAttribute("data-theme", "vali"); // Cambia el tema para que DaisyUI no interfiera

    return () => {
      // Limpieza al salir de la página del Dashboard
      document.body.classList.remove("app", "sidebar-mini");
      document.body.removeAttribute("data-theme");
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 1. Componente Barra Superior */}
      <NavbarDashboard />

      {/* 2. Componente Barra Lateral */}
      <Sidebar />

      {/* 3. Contenedor del Contenido Principal (Estilo oficial de Vali) */}
      <main className="app-content pt-20 pl-64 p-6 transition-all duration-300">
        <div className="app-title flex justify-between items-center bg-white p-4 shadow-sm mb-6 rounded">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <i className="fa-solid fa-gauge-high text-primary"></i> Panel de
              Control Jurídico
            </h1>
            <p className="text-slate-500 text-sm italic">
              Bienvenido al sistema de administración de expedientes
            </p>
          </div>
        </div>

        {/* Tus Tarjetas de Casos Activos y Clientes Totales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-teal-500 p-6 rounded shadow flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-400 uppercase">
                Casos Activos
              </h2>
              <p className="text-3xl font-bold text-slate-700">24</p>
            </div>
            <i className="fa-solid fa-briefcase text-slate-300 text-4xl"></i>
          </div>

          <div className="bg-white border-l-4 border-blue-500 p-6 rounded shadow flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-400 uppercase">
                Clientes Totales
              </h2>
              <p className="text-3xl font-bold text-slate-700">142</p>
            </div>
            <i className="fa-solid fa-users text-slate-300 text-4xl"></i>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
