import React, { useState, useEffect } from "react";
import axios from "axios";

const EtapaEscritaForm = ({ idExpediente, onSave, onCancel }) => {
  const [archivos, setArchivos] = useState({
    demanda: null,
    citacion: null,
    contestacion: null,
  });

  const [pdfsExistentes, setPdfsExistentes] = useState({
    demanda: null,
    citacion: null,
    contestacion: null,
  });

  useEffect(() => {
    if (idExpediente) {
      axios
        .get(`http://localhost:8080/api/etapas/escrita/${idExpediente}`)
        .then((res) => {
          if (res.data.ok && res.data.datos) {
            setPdfsExistentes(res.data.datos);
          }
        })
        .catch((err) =>
          console.error("Error al traer PDFs de la etapa escrita:", err),
        );
    }
  }, [idExpediente]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setArchivos({ ...archivos, [name]: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("idexpediente", idExpediente);

    if (archivos.demanda) data.append("demanda", archivos.demanda);
    if (archivos.citacion) data.append("citacion", archivos.citacion);
    if (archivos.contestacion)
      data.append("contestacion", archivos.contestacion);
    console.log(
      "Contenido real del FormData:",
      Object.fromEntries(data.entries()),
    );

    onSave(data);
  };

  const descargarPdf = (rutaRelativa) => {
    if (!rutaRelativa) return;
    window.open(`http://localhost:8080/${rutaRelativa}`, "_blank");
  };

  const FileSection = ({ title, name, currentFile, rutaGuardada }) => (
    <div className="mb-4 p-3 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h5 className="mb-0 text-dark">{title}</h5>
        {rutaGuardada ? (
          <span className="badge bg-success">
            <i className="bi bi-check-circle-fill"></i> Guardado
          </span>
        ) : (
          <span className="badge bg-secondary">Vacante</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label fw-bold small text-muted">
          {rutaGuardada
            ? "Reemplazar o subir nueva versión:"
            : "Seleccionar PDF:"}
        </label>
        <input
          className="form-control form-control-sm"
          type="file"
          name={name}
          accept=".pdf"
          onChange={handleFileChange}
        />
        <small className="form-text text-success d-block mt-1">
          {currentFile ? `📎 Listo para subir: ${currentFile.name}` : ""}
        </small>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button
          type="button"
          className="btn btn-sm btn-info text-white flex-grow-1"
          title="Ver o descargar archivo actual"
          disabled={!rutaGuardada} // Deshabilitado si no hay nada en la BD
          onClick={() => descargarPdf(rutaGuardada)}
        >
          <i className="bi bi-eye-fill me-1"></i> Ver PDF
        </button>
      </div>
    </div>
  );

  return (
    <div className="tile shadow">
      <div className="tile-title d-flex align-items-center justify-content-between border-bottom pb-3 mb-4">
        <div className="d-flex align-items-center">
          <i
            className="bi bi-file-earmark-text-fill me-3 text-success"
            style={{ fontSize: "2.5rem" }}
          ></i>
          <div>
            <h3 className="mb-0 fw-bold text-dark">
              Etapa Escrita del Proceso
            </h3>
            <span className="badge bg-dark mt-1">
              ID Expediente Judicial: {idExpediente}
            </span>
          </div>
        </div>
      </div>

      <div className="tile-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <FileSection
                title="1. Demanda"
                name="demanda"
                currentFile={archivos.demanda}
                rutaGuardada={pdfsExistentes.demanda}
              />
            </div>
            <div className="col-md-4">
              <FileSection
                title="2. Citación"
                name="citacion"
                currentFile={archivos.citacion}
                rutaGuardada={pdfsExistentes.citacion}
              />
            </div>
            <div className="col-md-4">
              <FileSection
                title="3. Contestación"
                name="contestacion"
                currentFile={archivos.contestacion}
                rutaGuardada={pdfsExistentes.contestacion}
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
            <button
              type="submit"
              className="btn btn-success"
              style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
            >
              <i className="bi bi-cloud-upload me-1"></i> Guardar Cambios Etapa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EtapaEscritaForm;
