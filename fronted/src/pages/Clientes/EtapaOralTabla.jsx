import React from "react";

const EtapaOralTabla = ({ lista, onVolver, onEditar, onEliminar,onCrearEtapaOral,onListarEtapaOral }) => {
  const URL_BACKEND = "http://localhost:8080/";

  // Componente reutilizable para renderizar el enlace al PDF
  const PdfLink = ({ ruta, label }) => (
    <td>
      {ruta ? (
        <a
          href={`${URL_BACKEND}${ruta}`}
          target="_blank"
          rel="noreferrer"
          className="text-primary fw-semibold text-decoration-none"
        >
          <i className="bi bi-file-earmark-pdf-fill text-danger me-1"></i> Ver {label}
        </a>
      ) : (
        <span className="text-muted small italic">
          <i className="bi bi-dash-circle me-1"></i> No cargado
        </span>
      )}
    </td>
  );

  return (
    <div className="tile">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-dark fw-bold mb-0">
          <i className="bi bi-list-ol text-primary me-2"></i> Historial Etapa Oral
        </h4>
        <button className="btn btn-secondary" onClick={onVolver}>
          <i className="bi bi-arrow-left me-1"></i> Volver a Etapas Escritas
        </button>
      </div>

      <div className="tile-body table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "8%" }}>ID Exp.</th>
              <th>Ratificación</th>
              <th>Conciliación</th>
              <th>Saneamiento</th>
              <th>Fijación</th>
              <th>Recepción</th>
              <th style={{ width: "20%" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista && lista.length > 0 ? (
              lista.map((etapa) => (
                <tr key={etapa.idexpediente}>
                  <td className="fw-bold text-secondary">#{etapa.idexpediente}</td>
                  
                  {/* Filas de archivos */}
                  <PdfLink ruta={etapa.ratificacionDemanda} label="Ratificación" />
                  <PdfLink ruta={etapa.tentativaConciliacion} label="Conciliación" />
                  <PdfLink ruta={etapa.saneamientoProcesal} label="Saneamiento" />
                  <PdfLink ruta={etapa.fijacionObjetoPrueba} label="Fijación" />
                  <PdfLink ruta={etapa.recepcionPruebas} label="Recepción" />

                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-warning text-dark"
                        title="Editar Etapa Oral"
                        onClick={() => onEditar(etapa)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        title="Eliminar Etapa Oral"
                        onClick={() => onEliminar(etapa.idexpediente)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <button className="btn btn-sm btn-primary" title="Crear Etapa Oral" onClick={() => onCrearEtapaOral(etapa)}>
                        <i className="bi bi-plus-circle me-1"></i> Etapa Decisoria
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
                <td colSpan="7" className="text-center py-4 text-muted">
                  <i className="bi bi-info-circle me-2"></i> No hay etapas orales registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EtapaOralTabla;