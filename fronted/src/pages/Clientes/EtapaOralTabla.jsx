import React from "react";

const EtapaOralTabla = ({ lista, onVolver, onEditar, onEliminar }) => {
  // 🌟 REGISTRO FICTICIO PARA PRUEBAS (Solo se usa si no hay datos reales)
  const datosFicticios = [
    {
      idexpediente: 7,
      ratificacionDemanda: "Ratificada",
      tentativaConciliacion: "Realizada",
      saneamientoProcesal: "Pendiente",
      fijacionObjetoPrueba: "En curso",
      recepcionPruebas: "Programada",
    },
  ];

  // Si lista es nula o vacía, usamos los datos ficticios
  const datosParaMostrar = lista && lista.length > 0 ? lista : datosFicticios;
  
  return (
    <div className="tile">
      {/* Cabecera con título y botón Volver alineado a la derecha */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-dark fw-bold">
          <i className="bi bi-list-ol text-primary me-2"></i> Historial Etapa
          Oral
        </h4>
        <button className="btn btn-secondary" onClick={onVolver}>
          <i className="bi bi-arrow-left me-1"></i> Volver a Etapas Escritas
        </button>
      </div>

      <div className="tile-body table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "10%" }}>ID Exp.</th>
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
                  <td className="fw-bold text-secondary">
                    #{etapa.idexpediente}
                  </td>
                  <td>{etapa.ratificacionDemanda || "-"}</td>
                  <td>{etapa.tentativaConciliacion || "-"}</td>
                  <td>{etapa.saneamientoProcesal || "-"}</td>
                  <td>{etapa.fijacionObjetoPrueba || "-"}</td>
                  <td>{etapa.recepcionPruebas || "-"}</td>
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
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  <i className="bi bi-info-circle me-2"></i> No hay etapas
                  orales registradas para este expediente.
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
