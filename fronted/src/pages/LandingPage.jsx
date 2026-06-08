import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Navbar de la Landing */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3 text-success" to="/" style={{ fontFamily: 'serif' }}>
            ⚖️ ESTUDIO JURÍDICO
          </Link>
          <Link to="/login" className="btn btn-success px-4">Acceso Sistema</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-dark text-white text-center py-5 flex-grow-1 d-flex align-items-center" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-3">Soluciones Legales Estratégicas</h1>
          <p className="lead fs-4 text-light mb-4">Contamos con profesionales de amplia trayectoria dedicados a brindar respaldo y absoluta confidencialidad.</p>
          <Link to="/login" className="btn btn-success btn-lg px-5 shadow">Iniciar Consulta</Link>
        </div>
      </header>

      {/* Servicios Cortos */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold mb-5 text-dark">Nuestras Especialidades</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <i className="bi bi-house-door text-success fs-1 mb-3"></i>
              <h4 className="fw-bold">Derecho Civil</h4>
              <p className="text-muted">Asesoramiento integral en contratos, propiedades, herencias y obligaciones.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <i className="bi bi-shield-exclamation text-success fs-1 mb-3"></i>
              <h4 className="fw-bold">Derecho Penal</h4>
              <p className="text-muted">Defensa penal corporativa y litigios de alta complejidad con reserva absoluta.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <i className="bi bi-briefcase text-success fs-1 mb-3"></i>
              <h4 className="fw-bold">Derecho Laboral</h4>
              <p className="text-muted">Protección corporativa, conciliaciones y regulaciones de contratos de trabajo.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;