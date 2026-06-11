import React, { useState, useEffect } from "react";
import axios from "axios";

const EtapaOralForm = ({ idExpediente, onSave, onCancel }) => {
  // Estado para archivos (archivos físicos)
  const [archivos, setArchivos] = useState({
    ratificacionDemanda: null,
    tentativaConciliacion: null,
    saneamientoProcesal: null,
    fijacionObjetoPrueba: null,
    recepcionPruebas: null
  });

  // Estado para rutas de archivos ya existentes (si los hay)
  const [pdfsExistentes, setPdfsExistentes] = useState({});

  useEffect(() => {
    if (idExpediente) {
      axios.get(`http://localhost:8080/api/etapas/oral/${idExpediente}`)
        .then((res) => {
          if (res.data && res.data.datos) setPdfsExistentes(res.data.datos);
        })
        .catch((err) => console.log("Nota: El endpoint GET aún no existe", err));
    }
  }, [idExpediente]);

  const handleFileChange = (e) => {
    setArchivos({ ...archivos, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("idexpediente", idExpediente);
    
    // Agregar solo los archivos que han sido seleccionados
    Object.keys(archivos).forEach((key) => {
      if (archivos[key]) formData.append(key, archivos[key]);
    });

    onSave(formData);
  };

  const campos = ["ratificacionDemanda", "tentativaConciliacion", "saneamientoProcesal", "fijacionObjetoPrueba", "recepcionPruebas"];

  return (
    <div className="tile shadow">
      <div className="tile-title d-flex align-items-center justify-content-between border-bottom pb-3 mb-4">
        <div className="d-flex align-items-center">
          <i className="bi bi-mic-fill me-3 text-primary" style={{ fontSize: "2.5rem" }}></i>
          <div>
            <h3 className="mb-0 fw-bold text-dark">Etapa Oral del Proceso</h3>
            <span className="badge bg-primary mt-1">ID Expediente: {idExpediente}</span>
          </div>
        </div>
      </div>

      <div className="tile-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {campos.map((campo) => (
              <div className="col-md-6 mb-4" key={campo}>
                <label className="form-label fw-bold text-capitalize">
                  {campo.replace(/([A-Z])/g, ' $1')}
                </label>
                
                {/* Si ya existe un PDF, mostrar enlace */}
                {pdfsExistentes[campo] && (
                  <div className="mb-2">
                    <a href={`http://localhost:8080/${pdfsExistentes[campo]}`} target="_blank" rel="noreferrer" className="text-danger small">
                      <i className="bi bi-file-pdf"></i> Ver archivo actual
                    </a>
                  </div>
                )}
                
                <input 
                  type="file" 
                  className="form-control" 
                  name={campo} 
                  accept="application/pdf"
                  onChange={handleFileChange} 
                />
              </div>
            ))}
          </div>

          <div className="tile-footer d-flex justify-content-end gap-2 pt-3 border-top">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              <i className="bi bi-x-circle me-1"></i> Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              <i className="bi bi-cloud-upload me-1"></i> Guardar Documentos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EtapaOralForm;