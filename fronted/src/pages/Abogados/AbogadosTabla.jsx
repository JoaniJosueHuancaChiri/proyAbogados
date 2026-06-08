import React from 'react';

const AbogadosTabla = ({ lista, onEditar, onEliminar }) => {
  return (
    <div className="tile">
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Especialidad</th>
              <th>Matrícula</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map(abg => (
              <tr key={abg.id}>
                <td>{abg.id}</td>
                <td>{abg.nombre}</td>
                <td><span className="badge bg-success">{abg.especialidad}</span></td>
                <td>{abg.licencia}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2" onClick={() => onEditar(abg)}><i className="bi bi-pencil-square"></i></button>
                  <button className="btn btn-danger btn-sm" onClick={() => onEliminar(abg.id)}><i className="bi bi-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AbogadosTabla;