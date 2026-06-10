import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = (e) => {
    e.preventDefault();
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`app sidebar-mini ${sidebarOpen ? '' : 'sidenav-toggled'}`}>
      
      <Navbar onToggleSidebar={toggleSidebar} />
      
      <Sidebar />
      
      <main className="app-content" style={{ minHeight: '100vh', transition: 'margin-left 0.3s ease' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;