<style>{`
  .abogado-card { transition: transform 0.3s ease; }
  .abogado-card:hover { transform: scale(1.05); }
`}</style>

import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const mainColor = "#009688";

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
        <div className="container">
          <a
            className="navbar-brand fw-bold fs-3"
            href="#inicio"
            style={{ color: mainColor }}
          >
            <i className="fa-solid fa-scale-balanced me-2"></i> ESTUDIO JURÍDICO
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="#inicio">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="#servicios">
                  Servicios Jurídicos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="#equipo">
                  Nuestro Equipo
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="#contacto">
                  Contacto
                </a>
              </li>
              <li className="nav-item ms-3">
                <Link
                  to="/login"
                  className="btn text-white px-4"
                  style={{ backgroundColor: mainColor, borderRadius: "6px" }}
                >
                  Acceso
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header
        id="inicio"
        className="text-white text-center py-5 d-flex align-items-center"
        style={{
          minHeight: "85vh",
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-3">
            Soluciones Legales Estratégicas
          </h1>
          <p className="lead fs-4 text-light mb-4">
            Contamos con profesionales de amplia trayectoria dedicados a brindar
            respaldo y absoluta confidencialidad.
          </p>

          <div className="mb-4">
            <p className="mb-2">
              ¿Ya eres nuestro cliente? Puedes ver cómo va tu caso aquí.
            </p>
            <Link
              to="/login"
              className="btn btn-lg text-white px-5 shadow mb-3"
              style={{ backgroundColor: mainColor }}
            >
              Acceder al sistema
            </Link>
          </div>
        </div>
      </header>

      <section id="servicios" className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">Nuestros Servicios</h2>
          <div className="row g-4">
            {["Derecho Civil", "Derecho Penal", "Derecho Laboral"].map(
              (s, i) => (
                <div className="col-md-4" key={i}>
                  <div className="card h-100 border-0 shadow-sm p-4">
                    <i
                      className="fa-solid fa-gavel fs-1 mb-3"
                      style={{ color: mainColor }}
                    ></i>
                    <h4>{s}</h4>
                    <p className="text-muted">
                      Asesoramiento integral y especializado para resolver sus
                      conflictos legales con éxito.
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="equipo" className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">Nuestro Equipo</h2>
          <div className="row justify-content-center g-4">
            {/* Abogado 1 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow abogado-card">
                <img
                  src="https://via.placeholder.com/300x200"
                  className="card-img-top"
                  alt="Abogado"
                />
                <div className="card-body">
                  <h5 className="fw-bold">Dr. Juan Pérez</h5>
                  <p className="text-muted">Especialista en Derecho Civil</p>
                </div>
              </div>
            </div>

            {/* Abogado 2 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow abogado-card">
                <img
                  src="https://via.placeholder.com/300x200"
                  className="card-img-top"
                  alt="Abogado"
                />
                <div className="card-body">
                  <h5 className="fw-bold">Dra. María López</h5>
                  <p className="text-muted">Especialista en Derecho Penal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contacto */}
      <footer id="contacto" className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5>Estudio Jurídico</h5>
              <p className="text-secondary">
                Excelencia legal a su servicio con absoluta confidencialidad.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Datos de Contacto</h5>
              <p>
                <i
                  className="fa-solid fa-phone me-2"
                  style={{ color: mainColor }}
                ></i>{" "}
                +591 79650099
              </p>
              <p>
                <i
                  className="fa-solid fa-location-dot me-2"
                  style={{ color: mainColor }}
                ></i>{" "}
                Av. Principal #123, La Paz
              </p>
              <p>
                <i
                  className="fa-solid fa-envelope me-2"
                  style={{ color: mainColor }}
                ></i>{" "}
                contacto@juridico.com
              </p>
            </div>
            <div className="col-md-4">
              <h5>Horarios</h5>
              <p className="text-secondary">Lun - Vie: 09:00 - 18:00</p>
            </div>
          </div>
          <div className="text-center mt-5 pt-4 border-top border-secondary">
            <p className="text-secondary mb-0">
              &copy; 2026 Estudio Jurídico. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
