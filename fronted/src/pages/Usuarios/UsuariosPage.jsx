import React, { useState } from 'react';
import UsuarioTabla from './UsuarioTabla';
import UsuarioForm from './UsuarioForm';
// 🌟 Importamos SweetAlert2
import Swal from 'sweetalert2'; 

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  // 📝 Guardar o Editar con Ventana de Éxito (Imagen 1)
  const handleSave = (nuevoUsuario) => {
    let mensaje = 'Usuario registrado correctamente.';
    
    if (selectedUsuario) {
      // Modo edición
      setUsuarios(usuarios.map(u => u.ci === selectedUsuario.ci ? nuevoUsuario : u));
      mensaje = 'Datos Actualizados correctamente.'; // 👈 Mismo texto de tu captura
    } else {
      // Modo registro
      setUsuarios([...usuarios, nuevoUsuario]);
    }

    setShowForm(false);
    setSelectedUsuario(null);

    // 🔥 Disparador de la Alerta de Éxito (Imagen 1)
    Swal.fire({
      title: 'Usuarios',
      text: mensaje,
      icon: 'success',
      confirmButtonColor: '#009688', // El color turquesa de tu plantilla Vali Admin
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-primary px-4'
      }
    });
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setShowForm(true);
  };

  // 🗑️ Eliminar con Ventana de Confirmación Estilizada (Imagen 2)
  const handleDelete = (ci) => {
    // 🔥 Disparador de la Alerta de Advertencia (Imagen 2)
    Swal.fire({
      title: 'Eliminar Usuario',
      text: '¿Realmente quiere eliminar el Usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009688', // Botón "Si, eliminar!" en turquesa
      cancelButtonColor: '#bcbcbc',  // Botón "No, cancelar!" en gris
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true // Para que "No, cancelar!" salga a la izquierda como tu imagen
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, lo borramos del estado
        setUsuarios(usuarios.filter(u => u.ci !== ci));
        
        // Opcional: Alerta secundaria avisando que ya se borró
        Swal.fire({
          title: 'Eliminado',
          text: 'El usuario ha sido eliminado.',
          icon: 'success',
          confirmButtonColor: '#009688'
        });
      }
    });
  };

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