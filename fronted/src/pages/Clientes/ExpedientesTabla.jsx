import React from 'react';

const ExpedientesTabla = ({ lista, onVolver }) => {
  return (
    <div className="tile">
      <div className="tile-title d-flex justify-content-between align-items-center">
        <h4>Expedientes del Cliente</h4>
        <button className="btn btn-secondary btn-sm" onClick={onVolver}><i className="bi bi-arrow-left"></i> Volver</button>
      </div>
      <div className="tile-body">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>NUREJ</th>
              <th>Nro. Exp</th>
              <th>Proceso</th>
              <th>Juzgado</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {lista.length > 0 ? lista.map((exp, index) => (
              <tr key={index}>
                <td>{exp.nurej}</td>
                <td>{exp.nroExpediente}</td>
                <td>{exp.tipoProceso}</td>
                <td>{exp.juzgado}</td>
                <td><span className={`badge ${exp.estado === 1 ? 'bg-success' : 'bg-danger'}`}>{exp.estado === 1 ? 'Activo' : 'Inactivo'}</span></td>
              </tr>
            )) : <tr><td colSpan="5" className="text-center">No hay expedientes registrados.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ExpedientesTabla;