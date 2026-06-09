import React, { useState } from "react";

const AbogadosTabla = ({ lista, onEditar, onEliminar, onView }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 1. Lógica de Filtrado (Busca por nombre, paterno, CI, especialidad o RPA)
 const listaFiltrada = lista.filter((abg) => {
    const termino = searchTerm.toLowerCase();

    return (
      (abg.nombre && abg.nombre.toLowerCase().includes(termino)) ||
      (abg.paterno && abg.paterno.toLowerCase().includes(termino)) ||
      (abg.materno && abg.materno.toLowerCase().includes(termino)) ||
      (abg.ci && abg.ci.toLowerCase().includes(termino)) ||
      (abg.especialidad && abg.especialidad.toLowerCase().includes(termino)) ||
      (abg.rpa && String(abg.rpa).toLowerCase().includes(termino)) || 
      (abg.celular && abg.celular.toLowerCase().includes(termino)) || 
      (abg.universidad && abg.universidad.toLowerCase().includes(termino)) 
    );
  });

  // 2. Lógica de Paginación
  const totalEntries = listaFiltrada.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;

  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listaFiltrada.slice(indexOfFirstItem, indexOfLastItem);

  const showingFrom = totalEntries === 0 ? 0 : indexOfFirstItem + 1;
  const showingTo = indexOfLastItem > totalEntries ? totalEntries : indexOfLastItem;

  return (
    <div className="tile">
      <div className="tile-body">
        {/* Buscador */}
        <div className="d-flex justify-content-end align-items-center mb-3">
          <label className="me-2 fw-semibold text-secondary mb-0" style={{ fontSize: "14px" }}>
            Buscar:
          </label>
          <input
            type="search"
            className="form-control form-control-sm"
            style={{ width: "250px", borderRadius: "4px" }}
            placeholder="Buscar abogado..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Tabla */}
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle m-0">
            <thead className="table-dark">
              <tr>
                <th>CI</th>
                <th>Nombre Completo</th>
                <th>Especialidad</th>
                <th>RPA</th>
                <th>Celular</th>
                <th>Universidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((abg) => (
                  // 🌟 CORREGIDO: u.idUsuario como identificador único real
                  <tr key={abg.idUsuario}> 
                    <td className="fw-semibold">{abg.ci}</td>
                    <td>{`${abg.nombre || ""} ${abg.paterno || ""} ${abg.materno || ""}`}</td>
                    <td>
                      <span className="badge bg-success text-white px-2 py-1" style={{ fontSize: "12px", borderRadius: "4px" }}>
                        {abg.especialidad}
                      </span>
                    </td>
                    <td>{abg.rpa}</td>
                    <td>{abg.celular}</td>
                    <td>{abg.universidad}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        <button className="btn btn-primary btn-sm" title="Ver" onClick={() => onView(abg)}>
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-info btn-sm text-white" title="Editar" onClick={() => onEditar(abg)}>
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        {/* 🌟 CORREGIDO: Pasamos todo el objeto 'abg' para sincronizar con el borrado en cascada */}
                        <button className="btn btn-danger btn-sm" title="Eliminar" onClick={() => onEliminar(abg)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
                    No se encontraron abogados coincidentes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
          <div className="text-secondary" style={{ fontSize: "14px" }}>
            Mostrando {showingFrom} a {showingTo} de {totalEntries} registros
          </div>

          {totalEntries > 0 && (
            <nav>
              <ul className="pagination pagination-sm m-0 gap-1">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                    Anterior
                  </button>
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
                  <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default AbogadosTabla;