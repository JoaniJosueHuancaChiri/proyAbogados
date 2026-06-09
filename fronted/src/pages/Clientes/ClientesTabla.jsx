import React, { useState } from "react";

const ClientesTabla = ({ lista, onEditar, onEliminar, onView, onCrearExpediente, onListarExpedientes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 1. Lógica de filtrado en tiempo real
  const listaFiltrada = lista.filter((cli) => {
    const termino = searchTerm.toLowerCase();
    return (
      (cli.nombre && cli.nombre.toLowerCase().includes(termino)) ||
      (cli.paterno && cli.paterno.toLowerCase().includes(termino)) ||
      (cli.materno && cli.materno.toLowerCase().includes(termino)) ||
      (cli.ci && cli.ci.toLowerCase().includes(termino)) ||
      (cli.estadoCivil && cli.estadoCivil.toLowerCase().includes(termino)) ||
      (cli.ocupacion && cli.ocupacion.toLowerCase().includes(termino)) ||
      (cli.celular && cli.celular.toLowerCase().includes(termino))
    );
  });

  // 2. Lógica de Paginación
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
        {/* Barra de Búsqueda */}
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

        {/* Tabla de Datos */}
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle m-0">
            <thead className="table-dark">
              <tr>
                <th>CI</th>
                <th>Nombre Completo</th>
                <th>Celular</th>
                <th>Estado Civil</th>
                <th>Ocupacion</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((cli) => (
                  /* 🌟 CORREGIDO: Se usa idUsuario de MariaDB como key única */
                  <tr key={cli.idUsuario}>
                    <td className="fw-semibold">{cli.ci}</td>
                    <td>{`${cli.nombre || ""} ${cli.paterno || ""} ${cli.materno || ""}`}</td>
                    <td>{cli.celular}</td>
                    <td>{cli.estadoCivil}</td>
                    <td>{cli.ocupacion}</td>
                    <td>
                      <span className={`badge ${cli.estado === 1 ? 'bg-success' : 'bg-danger'} text-white`}>
                        {cli.estado === 1 ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        <button className="btn btn-primary btn-sm" title="Ver Detalles" onClick={() => onView(cli)}>
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-info btn-sm text-white" title="Editar" onClick={() => onEditar(cli)}>
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        {/* 🌟 CORREGIDO: Mandamos el objeto completo 'cli' para la extracción de idUsuario y tipoUsuario */}
                        <button className="btn btn-danger btn-sm" title="Eliminar" onClick={() => onEliminar(cli)}>
                          <i className="bi bi-trash"></i>
                        </button>
                        
                        {/* 🌟 CORREGIDO: Se cambia cli.id por cli.idUsuario para los Expedientes */}
                        <button className="btn btn-success btn-sm" title="Crear Expediente" onClick={() => onCrearExpediente(cli.idUsuario)}>
                          <i className="bi bi-file-earmark-plus"></i>
                        </button>
                        <button className="btn btn-warning btn-sm text-dark" title="Ver Expedientes" onClick={() => onListarExpedientes(cli.idUsuario)}>
                          <i className="bi bi-folder2-open"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">No se encontraron clientes.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación de Registros */}
        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
          <div className="text-secondary" style={{ fontSize: "14px" }}>
            Mostrando {showingFrom} a {showingTo} de {totalEntries} registros
          </div>
          {totalEntries > 0 && (
            <nav>
              <ul className="pagination pagination-sm m-0 gap-1">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>Anterior</button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(i + 1)}
                      style={{
                        backgroundColor: currentPage === i + 1 ? "#009688" : "",
                        borderColor: currentPage === i + 1 ? "#009688" : "",
                        color: currentPage === i + 1 ? "#fff" : "#009688",
                      }}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>Siguiente</button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientesTabla;