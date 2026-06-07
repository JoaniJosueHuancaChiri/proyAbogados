import React from 'react';
import NavbarDashboard from '../components/dashboard/NavbarDashboard';
import Sidebar from '../components/dashboard/Sidebar';

const Dashboard = () => {
  return (
    <div className="app sidebar-mini">
      {/* 1. Barra superior de Vali Admin */}
      <NavbarDashboard />
      
      {/* 2. Menú lateral izquierdo */}
      <Sidebar />

      {/* 3. Área de contenido dinámico */}
      <main className="app-content pl-64 pt-20 p-6 bg-[#f4f5f7] min-h-screen">
        <div className="app-title flex justify-between items-center mb-6 p-4 bg-white rounded shadow-sm border border-slate-100">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              <i className="fa-solid fa-gauge mr-2"></i> Panel de Control Jurídico
            </h1>
            <p className="text-xs text-slate-500 mt-1">Bienvenido al sistema de administración de expedientes</p>
          </div>
        </div>

        {/* Tarjetas de reportes rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow-sm border-l-4 border-[#009688] flex justify-between items-center">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Casos Activos</h4>
              <p className="text-3xl font-black text-slate-800 mt-2">24</p>
            </div>
            <div className="text-3xl text-slate-300"><i className="fa-solid fa-briefcase"></i></div>
          </div>
          
          <div className="bg-white p-6 rounded shadow-sm border-l-4 border-blue-500 flex justify-between items-center">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clientes Totales</h4>
              <p className="text-3xl font-black text-slate-800 mt-2">142</p>
            </div>
            <div className="text-3xl text-slate-300"><i className="fa-solid fa-users"></i></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;