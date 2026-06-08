import React, { useState } from 'react';

const UsuarioTabla = ({ usuarios, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrado incluyendo el nuevo campo estado
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const termino = searchTerm.toLowerCase();
    return (
      usuario.nombre.toLowerCase().includes(termino) ||
      usuario.apellidoPaterno.toLowerCase().includes(termino) ||
      (usuario.apellidoMaterno && usuario.apellidoMaterno.toLowerCase().includes(termino)) ||
      usuario.ci.toLowerCase().includes(termino) ||
      usuario.celular.toLowerCase().includes(termino) ||
      (usuario.estado && usuario.estado.toLowerCase().includes(termino))
    );
  });

  const totalEntries = usuariosFiltrados.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;

  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usuariosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  const showingFrom = totalEntries === 0 ? 0 : indexOfFirstItem + 1;
  const showingTo = indexOfLastItem > totalEntries ? totalEntries : indexOfLastItem;

  return (
    <div className="tile">
      <div className="tile-body">
        
        {/* Buscador */}
        <div className="d-flex justify-content-end align-items-center mb-3">
          <label className="me-2 fw-semibold text-secondary mb-0" style={{ fontSize: '14px' }}>Buscar:</label>
          <input
            type="search"
            className="form-control form-control-sm"
            style={{ width: '250px', borderRadius: '4px' }}
            placeholder="Buscar usuario..."
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
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Género</th>
                <th>Teléfono</th>
                <th>Status</th> {/* 🌟 NUEVA COLUMNA */}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((usuario, index) => (
                  <tr key={usuario.ci || index}>
                    <td className="fw-semibold">{usuario.ci}</td>
                    <td>{usuario.nombre}</td>
                    <td>{`${usuario.apellidoPaterno} ${usuario.apellidoMaterno || ''}`}</td>
                    <td>{usuario.genero}</td>
                    <td>{usuario.celular}</td>
                    
                    {/* 🌟 NUEVO RENDEREADO DE STATUS (Igual al de tu imagen) */}
                    <td>
                      <span 
                        className={`badge ${usuario.estado === 'Inactivo' ? 'bg-danger' : 'bg-success'} text-white px-2 py-1`}
                        style={{ fontSize: '12px', borderRadius: '4px' }}
                      >
                        {usuario.estado || 'Activo'}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-info btn-sm text-white" title="Editar" onClick={() => onEdit(usuario)}>
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-danger btn-sm" title="Eliminar" onClick={() => onDelete(usuario.ci)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-3">
                    No se encontraron usuarios coincidentes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
          <div className="text-secondary" style={{ fontSize: '14px' }}>
            Mostrando {showingFrom} a {showingTo} de {totalEntries} registros
          </div>

          {totalEntries > 0 && (
            <nav>
              <ul className="pagination pagination-sm m-0 gap-1">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                    Anterior
                  </button>
                </li>

                {[...Array(totalPages)].map((_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                      style={{
                        backgroundColor: currentPage === i + 1 ? '#009688' : '',
                        borderColor: currentPage === i + 1 ? '#009688' : '',
                        color: currentPage === i + 1 ? '#fff' : '#009688'
                      }}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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

export default UsuarioTabla;