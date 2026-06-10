import React from 'react';

const EtapaEscritaTabla = ({ 
  lista, 
  onVer, 
  onEditar, 
  onEliminar, 
  onCrearEtapaOral, 
  onListarEtapaOral 
}) => {
  return (
    <div className="tile">
      <h4 className="mb-3">Etapas Escritas</h4>
      <div className="tile-body table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Demanda</th>
              <th>Citación</th>
              <th>Contestación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.length > 0 ? (
              lista.map((etapa) => (
                <tr key={etapa.id}>
                  <td>{etapa.id}</td>
                  {/* Los enlaces apuntan a la URL del archivo en el servidor */}
                  <td>
                    <a href={etapa.urlDemanda} target="_blank" rel="noreferrer" className="text-decoration-underline">
                      {etapa.nombreDemanda || "Ver Demanda"}
                    </a>
                  </td>
                  <td>
                    <a href={etapa.urlCitacion} target="_blank" rel="noreferrer" className="text-decoration-underline">
                      {etapa.nombreCitacion || "Ver Citación"}
                    </a>
                  </td>
                  <td>
                    <a href={etapa.urlContestacion} target="_blank" rel="noreferrer" className="text-decoration-underline">
                      {etapa.nombreContestacion || "Ver Contestación"}
                    </a>
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      <button className="btn btn-sm btn-info" title="Leer" onClick={() => onVer(etapa)}>
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-warning" title="Editar" onClick={() => onEditar(etapa)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-danger" title="Eliminar" onClick={() => onEliminar(etapa.id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                      <button className="btn btn-sm btn-primary" title="Crear Etapa Oral" onClick={() => onCrearEtapaOral(etapa)}>
                        + Oral
                      </button>
                      <button className="btn btn-sm btn-secondary" title="Listar Etapas Orales" onClick={() => onListarEtapaOral(etapa)}>
                        List. Oral
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No hay etapas escritas registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EtapaEscritaTabla;