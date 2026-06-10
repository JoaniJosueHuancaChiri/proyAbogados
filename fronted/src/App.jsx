import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext'; // Importa el Provider

// Tus importaciones...
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AbogadosPage from './pages/Abogados/AbogadosPage';
import ClientesPage from './pages/Clientes/ClientesPage';
import ExpedientesPage from './pages/Expedientes/ExpedientesPage';
import UsuariosPage from './pages/Usuarios/UsuariosPage';
import AdminLayout from './layouts/AdminLayout';


function App() {
  return (
    <DataProvider> {/* ENVOLVEMOS TODO AQUÍ */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="abogados" element={<AbogadosPage />} />
            <Route path="clientes" element={<ClientesPage />} />
            <Route path="expedientes" element={<ExpedientesPage />} />
            <Route path="usuarios" element={<UsuariosPage />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;