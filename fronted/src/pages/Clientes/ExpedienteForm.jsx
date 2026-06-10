import React, { useState } from 'react';

const ExpedienteForm = ({ idCliente, expedienteData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(expedienteData || {
    nurej: '',
    nroExpediente: '',
    tipoProceso: '',
    juzgado: '',
    idCliente: idCliente || '',
    estado: 'Activo'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="tile">
      <h3 className="tile-title text-dark">
        <i className="bi bi-file-earmark-plus me-2 text-primary"></i> 
        {expedienteData ? "Editar Expediente" : "Nuevo Expediente"}
      </h3>
      <div className="tile-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">NUREJ</label>
              <input type="text" className="form-control" name="nurej" value={formData.nurej} onChange={handleChange} required />
            </div>
            
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Nro. de Expediente</label>
              <input type="text" className="form-control" name="nroExpediente" value={formData.nroExpediente} onChange={handleChange} required />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Tipo de Proceso</label>
              <input type="text" className="form-control" name="tipoProceso" value={formData.tipoProceso} onChange={handleChange} required />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Juzgado</label>
              <input type="text" className="form-control" name="juzgado" value={formData.juzgado} onChange={handleChange} required />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">ID Cliente</label>
              <input type="number" className="form-control" name="idCliente" value={formData.idCliente} onChange={handleChange} readOnly required />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Estado</label>
              <select className="form-control form-select" name="estado" value={formData.estado} onChange={handleChange} required>
                <option value="Activo">Activo</option>
                <option value="Con Sentencia">Con Sentencia</option>
                <option value="En Apelación">En Apelación</option>
                <option value="Archivado">Archivado</option>
              </select>
            </div>
          </div>

          <div className="tile-footer d-flex justify-content-end gap-2 mt-3">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              <i className="bi bi-x-circle me-1"></i> Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-check-circle me-1"></i> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpedienteForm;