import React, { useState, useEffect } from "react";
import axios from "axios";

const EtapaDecisoriaForm = ({ idExpediente, onSave, onCancel }) => {
  const [archivoSentencia, setArchivoSentencia] = useState(null);

  const [pdfExistente, setPdfExistente] = useState(null);

  useEffect(() => {
    if (idExpediente) {
      axios
        .get(`http://localhost:8080/api/etapas/decisoria/${idExpediente}`)
        .then((res) => {
          if (res.data.ok && res.data.datos) {
            setPdfExistente(res.data.datos.setencia);
          }
        })
        .catch((err) => console.warn("Aún no hay sentencia registrada para este exp."));
    }
  }, [idExpediente]);

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setArchivoSentencia(files[0]);
    }
  };

  const descargarPdf = () => {
    if (!pdfExistente) return;
    window.open(`http://localhost:8080/${pdfExistente}`, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("idexpediente", idExpediente);

    if (archivoSentencia) {
      data.append("sentencia", archivoSentencia);
    }

    console.log(
      "Contenido real del FormData Decisoria:",
      Object.fromEntries(data.entries())
    );

    onSave(data);
  };

  return (
    <div className="tile shadow">
      <div className="tile-title border-bottom pb-3 mb-4">
        <h3 className="fw-bold text-dark">
          <i className="bi bi-gavel text-primary me-2"></i> Registro de Etapa Decisoria
        </h3>
        <span className="badge bg-primary">ID Expediente: {idExpediente}</span>
      </div>

      <div className="tile-body">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              
              <div className="mb-4 p-4 border rounded bg-light">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                  <h5 className="mb-0 text-dark fw-bold" style={{ fontSize: "1rem" }}>
                    Resolución Final (Sentencia)
                  </h5>
                  {pdfExistente ? (
                    <span className="badge bg-success">
                      <i className="bi bi-check-circle-fill"></i> Registrada
                    </span>
                  ) : (
                    <span className="badge bg-warning text-dark">Pendiente</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label text-secondary small">Seleccione el documento aprobatorio en formato PDF:</label>
                  <input
                    className="form-control"
                    type="file"
                    name="sentencia"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <small className="form-text text-success d-block mt-1">
                    {archivoSentencia ? `📎 Listo para subir: ${archivoSentencia.name}` : ""}
                  </small>
                </div>

                <div className="mt-4 d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-info text-white flex-grow-1"
                    disabled={!pdfExistente}
                    onClick={descargarPdf}
                  >
                    <i className="bi bi-eye-fill me-1"></i> Ver Sentencia Actual
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="tile-footer d-flex justify-content-end gap-2 pt-3 border-top">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              <i className="bi bi-x-circle me-1"></i> Cancelar
            </button>
            <button type="submit" className="btn btn-success" disabled={!archivoSentencia}>
              <i className="bi bi-cloud-upload me-1"></i> Guardar Sentencia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EtapaDecisoriaForm;