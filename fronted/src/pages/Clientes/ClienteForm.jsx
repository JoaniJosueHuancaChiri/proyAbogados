import React, { useState } from "react";

const ClienteForm = ({ clienteData, onSubmit, onCancel }) => {
  const [nombre, setNombre] = useState(clienteData?.nombre || "");
  const [ci, setCi] = useState(clienteData?.ci || "");
  const [telefono, setTelefono] = useState(clienteData?.telefono || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, ci, telefono });
  };

  return (
    <div className="tile">
      <h3 className="tile-title text-dark">
        {clienteData ? (
          <>
            <i className="bi bi-pencil-square me-2 text-primary"></i> Editar
            Cliente
          </>
        ) : (
          <>
            <i className="bi bi-person-plus-fill me-2 text-success"></i>{" "}
            Registrar Cliente
          </>
        )}
      </h3>
      
      <div className="tile-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre Completo</label>
            <input
              className="form-control"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Cédula de Identidad (C.I.)</label>
            <input
              className="form-control"
              type="text"
              value={ci}
              onChange={(e) => setCi}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono / Celular</label>
            <input
              className="form-control"
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <div className="tile-footer">
            <button className="btn btn-primary me-2" type="submit">
              <i className="bi bi-check-circle-fill me-2"></i>Guardar
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={onCancel}
            >
              <i className="bi bi-x-circle-fill me-2"></i>Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteForm;
