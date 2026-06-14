import React from "react";

const EtapaImpugnativaTabla = ({ 
  lista, 
  onVolver, 
  onEditar, 
  onEliminar 
}) => {
  const URL_BACKEND = "http://localhost:8080/";

  // Componente reutilizable para renderizar el enlace al PDF de la Impugnación
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
          <i className="bi bi-bank text-primary me-2"></i> Resolución de Etapa Impugnativa
        </h4>
        <button className="btn btn-secondary" onClick={onVolver}>
          <i className="bi bi-arrow-left me-1"></i> Volver a Etapa Decisoria
        </button>
      </div>

      <div className="tile-body table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "15%" }}>ID Exp.</th>
              <th>Documento de Impugnación</th>
              <th style={{ width: "20%" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista && lista.length > 0 ? (
              lista.map((etapa) => (
                <tr key={etapa.idexpediente}>
                  <td className="fw-bold text-secondary">#{etapa.idexpediente}</td>
                  
                  {/* ⚠️ Mapeamos con 'recursos' respetando estrictamente el campo de tu BD */}
                  <PdfLink ruta={etapa.recursos} label="Recurso de Apelación" />

                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-warning text-dark"
                        title="Modificar Impugnación"
                        onClick={() => onEditar(etapa)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        title="Eliminar Registro Impugnativo"
                        onClick={() => onEliminar(etapa.idexpediente)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-muted">
                  <i className="bi bi-info-circle me-2"></i> Este expediente no cuenta con un recurso impugnativo registrado todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EtapaImpugnativaTabla;