import React, { useState } from "react";

const AbogadoForm = ({ abogadoData, onSubmit, onCancel }) => {
  const [nombre, setNombre] = useState(abogadoData?.nombre || "");
  const [especialidad, setEspecialidad] = useState(
    abogadoData?.especialidad || "",
  );
  const [licencia, setLicencia] = useState(abogadoData?.licencia || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, especialidad, licencia });
  };

  return (
    <div className="tile">
      <h3 className="tile-title text-dark">
        {abogadoData ? (
          <>
            <i className="bi bi-person-gear me-2 text-primary"></i> Editar
            Abogado
          </>
        ) : (
          <>
            <i className="bi bi-briefcase-fill me-2 text-success"></i> Registrar
            Abogado
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
            <label className="form-label">Especialidad</label>
            <input
              className="form-control"
              type="text"
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
              placeholder="Ej. Civil, Penal, Laboral"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nro. de Matrícula Profesional</label>
            <input
              className="form-control"
              type="text"
              value={licencia}
              onChange={(e) => setLicencia(e.target.value)}
              required
            />
          </div>
          <div className="tile-footer">
            <button className="btn btn-primary me-2" type="submit">
              <i className="bi bi-check-circle-fill me-2"></i>Guardar
            </button>
            <button
              className="btn className btn-secondary"
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

export default AbogadoForm;
