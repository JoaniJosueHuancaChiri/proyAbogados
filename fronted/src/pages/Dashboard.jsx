import React, { useState, useEffect } from "react";
import axios from "axios";

// 1. IMPORTACIONES REQUERIDAS PARA CHART.JS
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [totales, setTotales] = useState({
    abogados: 0,
    clientes: 0,
    casosActivos: 0,
    estados: {
      activo: 0,
      sentencia: 0,
      apelacion: 0,
      archivado: 0,
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/usuarios/dashboard/contadores")
      .then((res) => {
        if (res.data.ok && res.data.totales) {
          setTotales(res.data.totales);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar métricas del dashboard:", err);
        setLoading(false);
      });
  }, []);

  // 3. ESTRUCTURA DE DATOS PARA LA GRÁFICA (Alineado con los colores de Vali Admin)
  const dataGrafica = {
    labels: ["Activo", "Con Sentencia", "En Apelación", "Archivado"],
    datasets: [
      {
        label: "Cantidad de Expedientes",
        data: [
          totales.estados.activo,
          totales.estados.sentencia,
          totales.estados.apelacion,
          totales.estados.archivado,
        ],
        // Colores representativos basados en la paleta Vali Admin / Bootstrap
        backgroundColor: [
          "#009688", // Teal / Esmeralda (Activo)
          "#17a2b8", // Celeste / Info (Con Sentencia)
          "#ffc107", // Amarillo / Warning (En Apelación)
          "#dc3545", // Rojo / Danger (Archivado)
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  // Opciones de configuración visual para la torta
  const opcionesGrafica = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom", // Leyendas ubicadas en la base del gráfico
        labels: {
          boxWidth: 15,
          font: {
            size: 13,
            family: "'Lato', 'Segoe UI', sans-serif",
          },
        },
      },
    },
  };

  return (
    <>
      <div className="app-title">
        <div>
          <h1>
            <i className="bi bi-speedometer"></i> Panel de Control Jurídico
          </h1>
          <p>
            Bienvenido al sistema de administración de expedientes y litigios
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando estadísticas...</span>
          </div>
        </div>
      ) : (
        <>
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

        
          <div className="row mt-4">
            <div className="col-md-12 col-lg-6 mx-auto">
              
              <div className="tile shadow-sm p-4" style={{ backgroundColor: '#fff', borderRadius: '4px' }}>
                <h3 className="tile-title text-center mb-4" style={{ fontSize: '20px', fontWeight: '500' }}>
                  <i className="bi bi-pie-chart-fill text-success me-2"></i> Estado de los Expedientes
                </h3>
                
                {/* Altura fija para que la gráfica no se deforme ni crezca infinitamente */}
                <div style={{ height: '320px', position: 'relative' }}>
                  <Pie data={dataGrafica} options={opcionesGrafica} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
