import React, { useState } from "react";

const ClientesTabla = ({ lista, onEditar, onEliminar, onView, onCrearExpediente, onListarExpedientes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lógica de filtrado
  const listaFiltrada = lista.filter((cli) => {
    const termino = searchTerm.toLowerCase();
    return (
      (cli.nombre && cli.nombre.toLowerCase().includes(termino)) ||
      (cli.paterno && cli.paterno.toLowerCase().includes(termino)) ||
      (cli.ci && cli.ci.toLowerCase().includes(termino)) ||
      (cli.celular && cli.celular.toLowerCase().includes(termino))
    );
  });

  // Paginación
  const totalEntries = listaFiltrada.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listaFiltrada.slice(indexOfFirstItem, indexOfLastItem);

  const showingFrom = totalEntries === 0 ? 0 : indexOfFirstItem + 1;
  const showingTo = indexOfLastItem > totalEntries ? totalEntries : indexOfLastItem;

  return (
    <div className="tile">
      <div className="tile-body">
        <div className="d-flex justify-content-end align-items-center mb-3">
          <label className="me-2 fw-semibold text-secondary mb-0" style={{ fontSize: "14px" }}>Buscar:</label>
          <input
            type="search"
            className="form-control form-control-sm"
            style={{ width: "250px", borderRadius: "4px" }}
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle m-0">
            <thead className="table-dark">
              <tr>
                <th>CI</th>
                <th>Nombre Completo</th>
                <th>Celular</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? currentItems.map((cli) => (
                <tr key={cli.id}>
                  <td className="fw-semibold">{cli.ci}</td>
                  <td>{`${cli.nombre || ""} ${cli.paterno || ""} ${cli.materno || ""}`}</td>
                  <td>{cli.celular}</td>
                  <td>
                    <span className={`badge ${cli.estado === 1 ? 'bg-success' : 'bg-danger'} text-white`}>
                      {cli.estado === 1 ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-1">
                      <button className="btn btn-primary btn-sm" title="Ver" onClick={() => onView(cli)}><i className="bi bi-eye"></i></button>
                      <button className="btn btn-info btn-sm text-white" title="Editar" onClick={() => onEditar(cli)}><i className="bi bi-pencil-square"></i></button>
                      <button className="btn btn-danger btn-sm" title="Eliminar" onClick={() => onEliminar(cli.id)}><i className="bi bi-trash"></i></button>
                      
                      {/* Nuevos botones vinculados correctamente */}
                      <button className="btn btn-success btn-sm" title="Crear Expediente" onClick={() => onCrearExpediente(cli.id)}>
                        <i className="bi bi-file-earmark-plus"></i>
                      </button>
                      <button className="btn btn-warning btn-sm" title="Ver Expedientes" onClick={() => onListarExpedientes(cli.id)}>
                        <i className="bi bi-folder2-open"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : <tr><td colSpan="5" className="text-center py-3">No se encontraron clientes.</td></tr>}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
          <div className="text-secondary" style={{ fontSize: "14px" }}>Mostrando {showingFrom} a {showingTo} de {totalEntries}</div>
          {totalEntries > 0 && (
            <nav><ul className="pagination pagination-sm m-0 gap-1">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>Anterior</button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>Siguiente</button>
              </li>
            </ul></nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientesTabla;