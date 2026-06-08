import React from 'react';

const ClientesTabla = ({ lista, onEditar, onEliminar }) => {
  return (
    <div className="tile">
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre Patrocinado</th>
              <th>C.I.</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map(cli => (
              <tr key={cli.id}>
                <td>{cli.id}</td>
                <td>{cli.nombre}</td>
                <td>{cli.ci}</td>
                <td>{cli.telefono}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2" onClick={() => onEditar(cli)}><i className="bi bi-pencil-square"></i></button>
                  <button className="btn btn-danger btn-sm" onClick={() => onEliminar(cli.id)}><i className="bi bi-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientesTabla;