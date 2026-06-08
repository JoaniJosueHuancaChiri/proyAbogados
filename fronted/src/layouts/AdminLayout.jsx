import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';

const AdminLayout = () => {
  // Estado para controlar si el menú lateral está abierto o cerrado en pantallas chicas/grandes
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = (e) => {
    e.preventDefault();
    setSidebarOpen(!sidebarOpen);
  };

  return (
    // Vali Admin necesita estas clases exactas para posicionar los bloques
    <div className={`app sidebar-mini ${sidebarOpen ? '' : 'sidenav-toggled'}`}>
      
      {/* Le pasamos la función de abrir/cerrar al Navbar */}
      <Navbar onToggleSidebar={toggleSidebar} />
      
      <Sidebar />
      
      {/* Contenedor principal del Dashboard */}
      <main className="app-content" style={{ minHeight: '100vh', transition: 'margin-left 0.3s ease' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;