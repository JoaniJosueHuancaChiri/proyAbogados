import React, { useState } from 'react';

const EtapaEscritaForm = ({ idExpediente, onSave, onCancel }) => {
  const [archivos, setArchivos] = useState({
    demanda: null,
    citacion: null,
    contestacion: null
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setArchivos({ ...archivos, [name]: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('idExpediente', idExpediente);
    data.append('demanda', archivos.demanda);
    data.append('citacion', archivos.citacion);
    data.append('contestacion', archivos.contestacion);
    onSave(data);
  };

  // Reutilizamos el estilo de Vali Admin para los inputs de archivo
  const FileSection = ({ title, name, currentFile }) => (
    <div className="mb-4 p-3 border rounded bg-light">
      <h5 className="mb-3 text-dark border-bottom pb-2">{title}</h5>
      <div className="form-group">
        <label className="form-label fw-bold">Seleccionar PDF</label>
        <input 
          className="form-control" 
          type="file" 
          name={name}
          accept=".pdf"
          onChange={handleFileChange}
        />
        <small className="form-text text-muted">
          {currentFile ? `Archivo seleccionado: ${currentFile.name}` : "No hay archivo seleccionado."}
        </small>
      </div>
      
      {/* Botones de acción para PDFs existentes */}
      <div className="mt-2 d-flex gap-2">
        <button type="button" className="btn btn-sm btn-outline-info" title="Descargar actual" disabled>
          <i className="bi bi-download"></i> Descargar
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary" title="Reemplazar actual" disabled>
          <i className="bi bi-pencil"></i> Reemplazar
        </button>
      </div>
    </div>
  );

  return (
    <div className="tile">
      <div className="tile-title d-flex align-items-center">
        <i className="bi bi-file-earmark-text-fill me-2 text-success" style={{fontSize: '2rem'}}></i>
        <div>
          <h3 className="mb-0">Etapa Escrita</h3>
          <small className="text-muted">Expediente ID: {idExpediente}</small>
        </div>
      </div>

      <div className="tile-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <FileSection title="1. Demanda" name="demanda" currentFile={archivos.demanda} />
            </div>
            <div className="col-md-4">
              <FileSection title="2. Citación" name="citacion" currentFile={archivos.citacion} />
            </div>
            <div className="col-md-4">
              <FileSection title="3. Contestación" name="contestacion" currentFile={archivos.contestacion} />
            </div>
          </div>

          <div className="tile-footer d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              <i className="bi bi-x-circle me-1"></i> Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              <i className="bi bi-cloud-upload me-1"></i> Guardar Etapa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EtapaEscritaForm;