import React from 'react';

const Dashboard = () => {
  return (
    <>
      <div className="app-title">
        <div>
          <h1><i className="bi bi-speedometer"></i> Panel de Control Jurídico</h1>
          <p>Bienvenido al sistema de administración de expedientes y litigios</p>
        </div>
      </div>
      
      <div className="row">
        {/* Tarjeta Abogados */}
        <div className="col-md-6 col-lg-4">
          <div className="widget-small primary coloured-icon">
            <i className="icon bi bi-briefcase"></i>
            <div className="info">
              <h4>Abogados</h4>
              <p><b>12</b></p>
            </div>
          </div>
        </div>
        
        {/* Tarjeta Clientes */}
        <div className="col-md-6 col-lg-4">
          <div className="widget-small info coloured-icon">
            <i className="icon bi bi-people"></i>
            <div className="info">
              <h4>Clientes</h4>
              <p><b>142</b></p>
            </div>
          </div>
        </div>
        
        {/* Tarjeta Casos Activos */}
        <div className="col-md-6 col-lg-4">
          <div className="widget-small danger coloured-icon">
            <i className="icon bi bi-folder"></i>
            <div className="info">
              <h4>Casos Activos</h4>
              <p><b>24</b></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;