import React, { useState, useEffect } from "react";
import axios from "axios";


import ExpedientesTabla from "./Clientes/ExpedientesTabla"; 
import { getExpedientes as apiGetExpedientes } from "../api/expedientes";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [totales, setTotales] = useState({
    abogados: 0,
    clientes: 0,
    casosActivos: 0,
    estados: { activo: 0, sentencia: 0, apelacion: 0, archivado: 0 },
  });

  const [loading, setLoading] = useState(true);
  const [rolUsuario, setRolUsuario] = useState("USUARIO");
  
  
  const [idLogueado, setIdLogueado] = useState(null);
  const [expedientesCliente, setExpedientesCliente] = useState([]);
  const [expedienteViendo, setExpedienteViendo] = useState(null);

  useEffect(() => {
    const infoUsuario = localStorage.getItem("usuarioLogueado");
    let token = localStorage.getItem("token");

    if (infoUsuario) {
      const user = JSON.parse(infoUsuario);
      const rol = user.tipoUsuario ? user.tipoUsuario.toUpperCase() : "SIN ROL";
      setRolUsuario(rol);
      
      
      if (rol === "CLIENTE") {
        const idCliente = user.idUsuario;
        setIdLogueado(idCliente);
        
        (async () => {
          try {
            const todosLosExpedientes = await apiGetExpedientes();
            
            const filtrados = todosLosExpedientes.filter(e => e.idCliente === idCliente);
            setExpedientesCliente(filtrados);
          } catch (err) {
            console.error("Error cargando los expedientes del cliente:", err);
          } finally {
            setLoading(false);
          }
        })();
        return; 
      }
    }


    axios
      .get("http://localhost:8080/api/usuarios/dashboard/contadores", {
        headers: { Authorization: `Bearer ${token}` }
      })
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
        backgroundColor: ["#009688", "#17a2b8", "#ffc107", "#dc3545"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };



  if (rolUsuario === "CLIENTE") {
    return (
      <>
        <div className="app-title">
          <div>
            <h1>
              <i className="bi bi-folder2-open"></i> Mis Expedientes Jurídicos
            </h1>
            <p>Bienvenido. Aquí se muestra el historial y estado actual de tus procesos.</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando tus casos...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12">
              <ExpedientesTabla
                lista={expedientesCliente}
                onVer={(exp) => setExpedienteViendo(exp)}
                esCliente={true} 
              />
            </div>
          </div>
        )}


        {expedienteViendo && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-dark text-white">
                  <h5 className="modal-title">
                    <i className="bi bi-file-earmark-text me-2"></i> Detalle del Expediente
                  </h5>
                  <button className="btn-close btn-close-white" onClick={() => setExpedienteViendo(null)}></button>
                </div>
                <div className="modal-body">
                  <p><strong>NUREJ:</strong> {expedienteViendo.nurej}</p>
                  <p><strong>Nro. Expediente:</strong> {expedienteViendo.nroExpediente}</p>
                  <p><strong>Tipo de Proceso:</strong> {expedienteViendo.tipoProceso}</p>
                  <p><strong>Juzgado:</strong> {expedienteViendo.juzgado}</p>
                  <p><strong>Estado:</strong> <span className="badge bg-success">{expedienteViendo.estado}</span></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }



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
        <>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="widget-small primary coloured-icon">
                <i className="icon bi bi-briefcase"></i>
                <div className="info">
                  <h4>Abogados</h4>
                  <p><b>{totales.abogados}</b></p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="widget-small info coloured-icon">
                <i className="icon bi bi-people"></i>
                <div className="info">
                  <h4>Clientes</h4>
                  <p><b>{totales.clientes}</b></p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="widget-small danger coloured-icon">
                <i className="icon bi bi-folder"></i>
                <div className="info">
                  <h4>Casos Activos</h4>
                  <p><b>{totales.casosActivos}</b></p>
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
                <div style={{ height: '320px', position: 'relative' }}>
                  <Pie data={dataGrafica} options={{ responsive: true, maintainAspectRatio: false }} />
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