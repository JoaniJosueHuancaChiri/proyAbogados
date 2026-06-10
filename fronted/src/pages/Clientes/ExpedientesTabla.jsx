import React from 'react';

const ExpedientesTabla = ({ lista, onVolver, onVer, onEditar, onEliminar }) => {
  
  // Función auxiliar para obtener el color del badge según el estado
  const getBadgeClass = (estado) => {
    switch (estado) {
      case 'Activo': return 'bg-success';
      case 'Con Sentencia': return 'bg-info text-dark';
      case 'En Apelación': return 'bg-warning text-dark';
      case 'Archivado': return 'bg-secondary';
      default: return 'bg-dark';
    }
  };

  return (
    <div className="tile">
      <div className="tile-title d-flex justify-content-between align-items-center">
        <h4>Expedientes del Cliente</h4>
        <button className="btn btn-secondary btn-sm" onClick={onVolver}>
          <i className="bi bi-arrow-left"></i> Volver
        </button>
      </div>
      
      {/* Añadimos table-responsive para evitar desajustes en pantallas pequeñas */}
      <div className="tile-body table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: '10%' }}>NUREJ</th>
              <th style={{ width: '15%' }}>Nro. Exp</th>
              <th style={{ width: '25%' }}>Proceso</th>
              <th style={{ width: '20%' }}>Juzgado</th>
              <th style={{ width: '15%' }}>Estado</th>
              <th style={{ width: '15%' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.length > 0 ? (
              lista.map((exp, index) => (
                <tr key={exp.idexpediente || exp.idExpediente || index}>
                  <td>{exp.nurej}</td>
                  <td>{exp.nroExpediente}</td>
                  <td>{exp.tipoProceso}</td>
                  <td>{exp.juzgado}</td>
                  <td>
                    <span className={`badge ${getBadgeClass(exp.estado)}`}>
                      {exp.estado}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-1">
                      <button className="btn btn-primary btn-sm" title="Ver" onClick={() => onVer(exp)}>
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-info btn-sm text-white" title="Editar" onClick={() => onEditar(exp)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn btn-danger btn-sm" title="Eliminar" onClick={() => onEliminar(exp.idexpediente || exp.idExpediente)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No hay expedientes registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpedientesTabla;