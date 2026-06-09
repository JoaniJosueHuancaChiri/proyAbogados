import React, { useState } from 'react';
import ClientesTabla from './ClientesTabla';
import ClienteForm from './ClienteForm';
import ExpedienteForm from './ExpedienteForm';
import ExpedientesTabla from './ExpedientesTabla';
import Swal from 'sweetalert2'; // IMPORTANTE: Importar SweetAlert2

const ClientesPage = () => {
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [clienteViendo, setClienteViendo] = useState(null);
  
  const [vista, setVista] = useState('tabla'); 
  const [idClienteSeleccionado, setIdClienteSeleccionado] = useState(null);
  const [expedientes, setExpedientes] = useState([]); 
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Juan", paterno: "Pérez", materno: "Gómez", ci: "1234567", celular: "70012345", estado: 1 }
  ]);

  // FUNCIÓN PARA GUARDAR (CREAR O EDITAR)
  const handleSaveCliente = (nuevoCliente) => {
    let mensaje = clienteEditando ? "Datos actualizados correctamente." : "Cliente registrado correctamente.";
    
    if (clienteEditando) {
      setClientes(clientes.map(c => c.id === clienteEditando.id ? { ...nuevoCliente, id: c.id } : c));
    } else {
      setClientes([...clientes, { ...nuevoCliente, id: Date.now() }]);
    }

    Swal.fire({
      title: 'Clientes',
      text: mensaje,
      icon: 'success',
      confirmButtonColor: '#009688',
      confirmButtonText: 'OK'
    });

    setFormularioAbierto(false);
    setClienteEditando(null);
  };

  // FUNCIÓN PARA ELIMINAR
  const handleDeleteCliente = (id) => {
    Swal.fire({
      title: 'Eliminar Cliente',
      text: '¿Realmente desea eliminar este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009688',
      cancelButtonColor: '#bcbcbc',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        setClientes(clientes.filter(c => c.id !== id));
        Swal.fire('Eliminado', 'El cliente ha sido eliminado.', 'success');
      }
    });
  };

  return (
    <>
      <div className="app-title">
        <div><h1><i className="bi bi-people"></i> Gestión de Clientes</h1></div>
        {!formularioAbierto && vista === 'tabla' && (
          <button className="btn btn-primary" onClick={() => setFormularioAbierto(true)}>
            <i className="bi bi-plus-lg me-1"></i> Registrar Cliente
          </button>
        )}
      </div>

      {formularioAbierto ? (
        <ClienteForm 
          clienteData={clienteEditando} 
          onSave={handleSaveCliente} 
          onCancel={() => { setFormularioAbierto(false); setClienteEditando(null); }} 
        />
      ) : vista === 'listaExpedientes' ? (
        <ExpedientesTabla 
          lista={expedientes.filter(e => e.idCliente === idClienteSeleccionado)} 
          onVolver={() => setVista('tabla')}
        />
      ) : vista === 'formExpediente' ? (
        <ExpedienteForm 
          idCliente={idClienteSeleccionado}
          onSave={(nuevoExp) => {
            setExpedientes([...expedientes, { ...nuevoExp, id: Date.now() }]);
            Swal.fire('Expedientes', 'Expediente guardado correctamente.', 'success');
            setVista('tabla');
          }} 
          onCancel={() => setVista('tabla')} 
        />
      ) : (
        <ClientesTabla 
          lista={clientes} 
          onEditar={(c) => { setClienteEditando(c); setFormularioAbierto(true); }} 
          onEliminar={handleDeleteCliente}
          onView={setClienteViendo}
          onCrearExpediente={(id) => { setIdClienteSeleccionado(id); setVista('formExpediente'); }}
          onListarExpedientes={(id) => { setIdClienteSeleccionado(id); setVista('listaExpedientes'); }}
        />
      )}

      {/* Modal de Visualización */}
      {clienteViendo && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
           <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles del Cliente</h5>
                <button className="btn-close" onClick={() => setClienteViendo(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Nombre:</strong> {clienteViendo.nombre} {clienteViendo.paterno} {clienteViendo.materno}</p>
                <p><strong>CI:</strong> {clienteViendo.ci}</p>
              </div>
            </div>
           </div>
        </div>
      )}
    </>
  );
};

export default ClientesPage;