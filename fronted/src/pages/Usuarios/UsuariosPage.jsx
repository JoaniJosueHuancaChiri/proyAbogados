import React, { useState, useContext } from 'react'; 
import { DataContext } from '../../context/DataContext'; 
import UsuarioTabla from './UsuarioTabla';
import UsuarioForm from './UsuarioForm';
import Swal from 'sweetalert2'; 
import axios from 'axios';

const UsuariosPage = () => {
  const { usuarios, setUsuarios, loading, fetchUsuarios } = useContext(DataContext);
  
  const [showForm, setShowForm] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  // ESTADO PARA EL MODAL DE VER
  const [showModal, setShowModal] = useState(false);

  const handleSave = async (nuevoUsuario) => {
    try {
      let mensaje = 'Usuario registrado correctamente.';
      
      if (selectedUsuario) {
        setUsuarios(usuarios.map(u => u.idUsuario === selectedUsuario.idUsuario ? nuevoUsuario : u));
        mensaje = 'Datos Actualizados correctamente.'; 
        setShowForm(false);
        setSelectedUsuario(null);
      } else {
        const respuesta = await axios.post('http://localhost:8080/api/usuarios/', nuevoUsuario);
        if (respuesta.status === 201 || respuesta.status === 200) {
          await fetchUsuarios(); 
          setShowForm(false);
        }
      }

      Swal.fire({
        title: 'Usuarios',
        text: mensaje,
        icon: 'success',
        confirmButtonColor: '#009688', 
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error("Error al guardar:", error);
      Swal.fire({ title: 'Error', text: 'Hubo un problema con la base de datos.', icon: 'error' });
    }
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setShowForm(true);
  };

  // FUNCIÓN PARA ABRIR MODAL VER
  const handleView = (usuario) => {
    setSelectedUsuario(usuario);
    setShowModal(true);
  };

  const handleDelete = (idUsuario) => { 
    Swal.fire({
      title: 'Eliminar Usuario',
      text: '¿Realmente quiere eliminar el Usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009688', 
      cancelButtonColor: '#bcbcbc',  
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        setUsuarios(usuarios.filter(u => u.idUsuario !== idUsuario));
        Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
      }
    });
  };

  if (loading) {
    return <div className="d-flex justify-content-center p-5">Cargando...</div>;
  }

  return (
    <>
      <div className="app-title">
        <div>
          <h1><i className="bi bi-people"></i> Gestión de Usuarios</h1>
          <p>Administración del personal</p>
        </div>
        {!showForm && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <i className="bi bi-plus-lg me-1"></i> Agregar Usuario
          </button>
        )}
      </div>

      <div className="row">
        <div className="col-md-12">
          {showForm ? (
            <UsuarioForm
              usuarioData={selectedUsuario}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setSelectedUsuario(null); }}
            />
          ) : (
            <UsuarioTabla
              usuarios={usuarios} 
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView} 
            />
          )}
        </div>
      </div>

      {/* MODAL DE VISUALIZACIÓN */}
      {showModal && selectedUsuario && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title fw-bold">Datos del usuario</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr><th className="bg-light">C.I.:</th><td>{selectedUsuario.ci}</td></tr>
                    <tr><th className="bg-light">Nombres:</th><td>{selectedUsuario.nombre}</td></tr>
                    <tr><th className="bg-light">Apellidos:</th><td>{selectedUsuario.paterno} {selectedUsuario.materno}</td></tr>
                    <tr><th className="bg-light">Teléfono:</th><td>{selectedUsuario.celular}</td></tr>
                    
                    <tr><th className="bg-light">Estado:</th><td>
                      <span className={`badge ${selectedUsuario.estado === 0 ? 'bg-danger' : 'bg-success'}`}>
                        {selectedUsuario.estado === 0 ? 'Inactivo' : 'Activo'}
                      </span>
                    </td></tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsuariosPage;