import React, { useState } from 'react';
import AbogadosTabla from './AbogadosTabla';
import AbogadoForm from './AbogadoForm';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

const AbogadosPage = () => {
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [abogadoEditando, setAbogadoEditando] = useState(null);
  const [abogadoViendo, setAbogadoViendo] = useState(null);
  const [abogados, setAbogados] = useState([]);

  // FUNCIÓN PARA GUARDAR (CREAR O EDITAR)
  const handleSaveAbogado = (nuevoAbogado) => {
    let mensaje = abogadoEditando ? "Datos actualizados correctamente." : "Abogado registrado correctamente.";
    
    if (abogadoEditando) {
      setAbogados(abogados.map(a => a.id === abogadoEditando.id ? { ...nuevoAbogado, id: a.id } : a));
    } else {
      setAbogados([...abogados, { ...nuevoAbogado, id: Date.now() }]);
    }

    Swal.fire({
      title: 'Abogados',
      text: mensaje,
      icon: 'success',
      confirmButtonColor: '#009688',
      confirmButtonText: 'OK'
    });

    setFormularioAbierto(false);
    setAbogadoEditando(null);
  };

  // FUNCIÓN PARA ELIMINAR
  const handleDeleteAbogado = (id) => {
    Swal.fire({
      title: 'Eliminar Abogado',
      text: '¿Realmente desea eliminar este abogado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009688',
      cancelButtonColor: '#bcbcbc',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        setAbogados(abogados.filter(a => a.id !== id));
        Swal.fire('Eliminado', 'El abogado ha sido eliminado.', 'success');
      }
    });
  };

  return (
    <>
      <div className="app-title">
        <div>
          <h1><i className="bi bi-gavel"></i> Gestión de Abogados</h1>
        </div>
        {!formularioAbierto && (
          <button className="btn btn-primary" onClick={() => setFormularioAbierto(true)}>
            <i className="bi bi-plus-lg me-1"></i> Agregar Abogado
          </button>
        )}
      </div>

      {formularioAbierto ? (
        <AbogadoForm 
          abogadoData={abogadoEditando} 
          onSave={handleSaveAbogado} 
          onCancel={() => { setFormularioAbierto(false); setAbogadoEditando(null); }} 
        />
      ) : (
        <AbogadosTabla 
          lista={abogados} 
          onEditar={(a) => { setAbogadoEditando(a); setFormularioAbierto(true); }} 
          onEliminar={handleDeleteAbogado} // Usamos la nueva función
          onView={setAbogadoViendo} 
        />
      )}

      {/* Modal de Visualización */}
      {abogadoViendo && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title">Detalles del Abogado</h5>
                <button className="btn-close" onClick={() => setAbogadoViendo(null)}></button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr><th>Nombre:</th><td>{abogadoViendo.nombre} {abogadoViendo.paterno} {abogadoViendo.materno}</td></tr>
                    <tr><th>CI:</th><td>{abogadoViendo.ci}</td></tr>
                    <tr><th>Celular:</th><td>{abogadoViendo.celular}</td></tr>
                    <tr><th>RPA:</th><td>{abogadoViendo.rpa}</td></tr>
                    <tr><th>Especialidad:</th><td>{abogadoViendo.especialidad}</td></tr>
                    <tr><th>Universidad:</th><td>{abogadoViendo.universidad}</td></tr>
                    <tr><th>Género:</th><td>{abogadoViendo.genero}</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setAbogadoViendo(null)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AbogadosPage;