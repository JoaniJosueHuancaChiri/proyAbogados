import React from 'react';

const EtapaEscritaTabla = ({ 
  lista, 
  onVer, 
  onEditar, 
  onEliminar, 
  onCrearEtapaOral, 
  onListarEtapaOral 
}) => {
  const URL_BACKEND = "http://localhost:8080/";

  return (
    <div className="tile">
      <h4 className="mb-3 text-dark fw-bold">
        <i className="bi bi-folder-fill text-warning me-2"></i> Control de Etapas Escritas
      </h4>
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
                // 🌟 CORRECCIÓN: Usamos idexpediente como key nativa
                <tr key={etapa.idexpediente}>
                  <td className="fw-bold text-secondary">#{etapa.idexpediente}</td>
                  
                  {/* DOCUMENTO: DEMANDA */}
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

                  {/* DOCUMENTO: CITACIÓN */}
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

                  {/* DOCUMENTO: CONTESTACIÓN */}
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

                  {/* ACCIONES */}
                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      <button className="btn btn-sm btn-info text-white" title="Detalles" onClick={() => onVer(etapa)}>
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-warning text-dark" title="Gestionar Documentos" onClick={() => onEditar(etapa)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn btn-sm btn-danger" title="Eliminar Etapa" onClick={() => onEliminar(etapa.idexpediente)}>
                        <i className="bi bi-trash"></i>
                      </button>
                      
                      {/* Enlaces de flujo a Etapa Oral */}
                      <button className="btn btn-sm btn-primary" title="Iniciar Etapa Oral" onClick={() => onCrearEtapaOral(etapa)}>
                        <i className="bi bi-plus-circle me-1"></i> Oral
                      </button>
                      <button className="btn btn-sm btn-secondary" title="Ver Historial Oral" onClick={() => onListarEtapaOral(etapa)}>
                        <i className="bi bi-list-task me-1"></i> List. Oral
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