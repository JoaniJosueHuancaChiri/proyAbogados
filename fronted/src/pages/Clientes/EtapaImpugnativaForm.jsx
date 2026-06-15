import React, { useState, useEffect } from "react";
import axios from "axios";

const EtapaImpugnativaForm = ({ idExpediente, onSave, onCancel }) => {
  const [archivos, setArchivos] = useState({
    recursos: null,
  });

  const [pdfsExistentes, setPdfsExistentes] = useState({
    recursos: null,
  });

  useEffect(() => {
    if (idExpediente) {
      axios
        .get(`http://localhost:8080/api/etapas/impugnativa/${idExpediente}`)
        .then((res) => {
          if (res.data.ok && res.data.datos) {
            setPdfsExistentes(res.data.datos);
          }
        })
        .catch((err) => console.warn("Aún no hay datos en BD para este exp."));
    }
  }, [idExpediente]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setArchivos({ ...archivos, [name]: files[0] });
    }
  };

  const descargarPdf = (rutaRelativa) => {
    if (!rutaRelativa) return;
    window.open(`http://localhost:8080/${rutaRelativa}`, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("idexpediente", idExpediente);

    if (archivos.recursos) {
      data.append("recursos", archivos.recursos);
    }

    console.log(
      "Contenido real del FormData Impugnativa:",
      Object.fromEntries(data.entries())
    );

    onSave(data);
  };

  const FileSection = ({ title, name, currentFile, rutaGuardada }) => (
    <div className="mb-4 p-3 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h5 className="mb-0 text-dark" style={{ fontSize: "0.9rem" }}>
          {title}
        </h5>
        {rutaGuardada ? (
          <span className="badge bg-success">
            <i className="bi bi-check-circle-fill"></i> Guardado
          </span>
        ) : (
          <span className="badge bg-secondary">Vacante</span>
        )}
      </div>

      <div className="form-group">
        <input
          className="form-control form-control-sm"
          type="file"
          name={name}
          accept=".pdf"
          onChange={handleFileChange}
        />
        <small className="form-text text-success d-block mt-1">
          {currentFile ? `📎 Listo: ${currentFile.name}` : ""}
        </small>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button
          type="button"
          className="btn btn-sm btn-info text-white flex-grow-1"
          disabled={!rutaGuardada}
          onClick={() => descargarPdf(rutaGuardada)}
        >
          <i className="bi bi-eye-fill me-1"></i> Ver PDF
        </button>
      </div>
    </div>
  );

  return (
    <div className="tile shadow">
      <div className="tile-title border-bottom pb-3 mb-4">
        <h3 className="fw-bold text-dark">Etapa Impugnativa del Proceso</h3>
        <span className="badge bg-primary">ID Expediente: {idExpediente}</span>
      </div>

      <div className="tile-body">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            {/* Centramos el campo ya que es hijo único en esta etapa */}
            <div className="col-md-6">
              <FileSection
                title="Recursos de Impugnación (Apelaciones / Otros)"
                name="recursos"
                currentFile={archivos.recursos}
                rutaGuardada={pdfsExistentes.recursos}
              />
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
            <button type="submit" className="btn btn-success">
              <i className="bi bi-cloud-upload me-1"></i> Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EtapaImpugnativaForm;