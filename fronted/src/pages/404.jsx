import React from 'react';
import { Link } from 'react-router-dom';

const Pagina404 = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <p className="fs-3"> <span className="text-danger">Opps!</span> Página no encontrada o No Autorizada.</p>
        <p className="lead">
          No tienes los permisos necesarios para acceder a este apartado.
        </p>
        <Link to="/dashboard" className="btn btn-primary" style={{ backgroundColor: '#009688', borderColor: '#009688' }}>
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default Pagina404;