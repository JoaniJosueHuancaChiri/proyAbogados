import React, { useState, useContext } from 'react'; 
import { DataContext } from '../../context/DataContext'; 
import UsuarioTabla from './UsuarioTabla';
import UsuarioForm from './UsuarioForm';
import Swal from 'sweetalert2'; 
import axios from 'axios';

const UsuariosPage = () => {
  // 🌟 CAMBIO 1: Traemos "fetchUsuarios" del contexto global para poder recargar la tabla
  const { usuarios, setUsuarios, loading, fetchUsuarios } = useContext(DataContext);
  
  const [showForm, setShowForm] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  // 🌟 CAMBIO 2: Volvemos la función asíncrona (async) para usar Axios correctamente
  const handleSave = async (nuevoUsuario) => {
    try {
      let mensaje = 'Usuario registrado correctamente.';
      
      if (selectedUsuario) {
        // 📝 MODO EDICIÓN (Local por ahora, luego harás el axios.put aquí)
        setUsuarios(usuarios.map(u => u.idUsuario === selectedUsuario.idUsuario ? nuevoUsuario : u));
        mensaje = 'Datos Actualizados correctamente.'; 
        setShowForm(false);
        setSelectedUsuario(null);
      } else {
        // 🚀 MODO REGISTRO REAL: Enviamos los datos directamente a tu API en el Backend
        const respuesta = await axios.post('http://localhost:8080/api/usuarios/', nuevoUsuario);
        
        // Si el backend responde que se creó con éxito (Status 200 o 201)
        if (respuesta.status === 201 || respuesta.status === 200) {
          // 🔥 LA CLAVE DE TODO: Forzamos al contexto a traer la lista limpia desde MariaDB
          await fetchUsuarios(); 
          setShowForm(false);
        }
      }

      // Despierta la ventana de SweetAlert2 en turquesa
      Swal.fire({
        title: 'Usuarios',
        text: mensaje,
        icon: 'success',
        confirmButtonColor: '#009688', 
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-primary px-4'
        }
      });

    } catch (error) {
      // Si el backend truena por C.I. duplicado o error de SQL, salta aquí
      console.error("Error al guardar en el servidor:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al registrar el administrador en la base de datos.',
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    }
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setShowForm(true);
  };

  // 🗑️ Eliminar con Ventana de Confirmación (Se queda igual por ahora)
  const handleDelete = (idUsuario) => { 
    Swal.fire({
      title: 'Eliminar Usuario',
      text: '¿Realmente quiere eliminar el Usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009688', 
      cancelButtonColor: '#bcbcbc',  
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true 
    }).then((result) => {
      if (result.isConfirmed) {
        setUsuarios(usuarios.filter(u => u.idUsuario !== idUsuario));
        
        Swal.fire({
          title: 'Eliminado',
          text: 'El usuario ha sido eliminado.',
          icon: 'success',
          confirmButtonColor: '#009688'
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <div className="text-secondary fw-semibold">Cargando administradores desde la base de datos...</div>
      </div>
    );
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
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UsuariosPage;