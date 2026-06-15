import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [totales, setTotales] = useState({
    abogados: 0,
    clientes: 0,
    casosActivos: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/usuarios/dashboard/contadores') 
      .then((res) => {
        if (res.data.ok && res.data.totales) {
          setTotales(res.data.totales);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar métricas del dashboard:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="app-title">
        <div>
          <h1>
            <i className="bi bi-speedometer"></i> Panel de Control Jurídico
          </h1>
          <p>Bienvenido al sistema de administración de expedientes y litigios</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando estadísticas...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <div className="widget-small primary coloured-icon">
              <i className="icon bi bi-briefcase"></i>
              <div className="info">
                <h4>Abogados</h4>
                <p>
                  <b>{totales.abogados}</b>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="widget-small info coloured-icon">
              <i className="icon bi bi-people"></i>
              <div className="info">
                <h4>Clientes</h4>
                <p>
                  <b>{totales.clientes}</b>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="widget-small danger coloured-icon">
              <i className="icon bi bi-folder"></i>
              <div className="info">
                <h4>Casos Activos</h4>
                <p>
                  <b>{totales.casosActivos}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;