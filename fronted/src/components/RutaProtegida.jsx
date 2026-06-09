import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { DataContext } from '../context/DataContext'; 

const RutaProtegida = ({ rolesPermitidos }) => {
  const { usuario } = useContext(DataContext); 
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  if (!rolesPermitidos.includes(usuario.tipoUsuario)) {
    return <Navigate to="/404" replace />; 
  }
  return <Outlet />;
};

export default RutaProtegida;