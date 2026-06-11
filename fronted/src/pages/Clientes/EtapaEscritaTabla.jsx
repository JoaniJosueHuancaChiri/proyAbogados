import React from 'react';

const EtapaEscritaTabla = ({ 
  lista, 
  onVolver,
  onVer, 
  onEditar, 
  onEliminar, 
  onCrearEtapaOral, 
  onListarEtapaOral 
}) => {
  const URL_BACKEND = "http://localhost:8080/";

  return (
    <div className="tile">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-dark fw-bold mb-0">
          <i className="bi bi-folder-fill text-warning me-2"></i> Control de Etapas Escritas
        </h4>
        <button className="btn btn-secondary" onClick={onVolver}>
          <i className="bi bi-arrow-left me-1"></i> Volver a Expedientes
        </button>
      </div>
      
      <div className="tile-body table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: '8%' }}>ID Exp.</th>
              <th>Demanda (PDF)</th>
              <th>Citación (PDF)</th>
              <th>Contestación (PDF)</th>
              <th style={{ width: '25%' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista && lista.length > 0 ? (
              lista.map((etapa) => (
                <tr key={etapa.idexpediente}>
                  <td className="fw-bold text-secondary">#{etapa.idexpediente}</td>
                  
                  <td>
                    {etapa.demanda ? (
                      <a 
                        href={`${URL_BACKEND}${etapa.demanda}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-primary fw-semibold text-decoration-none"
                      >
                        <i className="bi bi-file-earmark-pdf-fill text-danger me-1"></i> Ver Demanda
                      </a>
                    ) : (
                      <span className="text-muted small italic"><i className="bi bi-dash-circle me-1"></i> No cargado</span>
                    )}
                  </td>

                  <td>
                    {etapa.citacion ? (
                      <a 
                        href={`${URL_BACKEND}${etapa.citacion}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-primary fw-semibold text-decoration-none"
                      >
                        <i className="bi bi-file-earmark-pdf-fill text-danger me-1"></i> Ver Citación
                      </a>
                    ) : (
                      <span className="text-muted small italic"><i className="bi bi-dash-circle me-1"></i> No cargado</span>
                    )}
                  </td>

                  <td>
                    {etapa.contestacion ? (
                      <a 
                        href={`${URL_BACKEND}${etapa.contestacion}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-primary fw-semibold text-decoration-none"
                      >
                        <i className="bi bi-file-earmark-pdf-fill text-danger me-1"></i> Ver Contestación
                      </a>
                    ) : (
                      <span className="text-muted small italic"><i className="bi bi-dash-circle me-1"></i> No cargado</span>
                    )}
                  </td>

                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      <button className="btn btn-sm btn-info text-white" title="Detalles" onClick={() => onVer(etapa)}>
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-warning text-dark" title="Editar Documentos" onClick={() => onEditar(etapa)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn btn-sm btn-danger" title="Eliminar Etapa" onClick={() => onEliminar(etapa.idexpediente)}>
                        <i className="bi bi-trash"></i>
                      </button>
                      
                      <button className="btn btn-sm btn-primary" title="Crear Etapa Oral" onClick={() => onCrearEtapaOral(etapa)}>
                        <i className="bi bi-plus-circle me-1"></i> Etapa Oral
                      </button>
                      <button className="btn btn-sm btn-secondary" title="Historial Etapa Oral" onClick={() => onListarEtapaOral(etapa)}>
                        <i className="bi bi-list-task me-1"></i> Listar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  <i className="bi bi-info-circle me-2"></i> No hay etapas escritas registradas en el sistema.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EtapaEscritaTabla;