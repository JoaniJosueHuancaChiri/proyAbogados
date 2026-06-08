import React, { useState } from 'react';
import ClientesTabla from './ClientesTabla';
import ClienteForm from './ClienteForm';

const ClientesPage = () => {
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Carlos Mendoza Ramos', ci: '6843211 LP', telefono: '78945612' },
    { id: 2, nombre: 'María Elena Torrez', ci: '4875221 SC', telefono: '65412398' }
  ]);

  const handleGuardar = (datos) => {
    if (clienteEditando) {
      setClientes(clientes.map(c => c.id === clienteEditando.id ? { ...c, ...datos } : c));
    } else {
      setClientes([...clientes, { id: Date.now(), ...datos }]);
    }
    setFormularioAbierto(false);
    setClienteEditando(null);
  };

  return (
    <>
      <div className="app-title">
        <div>
          <h1><i className="bi bi-people"></i> Módulo de Clientes</h1>
          
        </div>
        {!formularioAbierto && (
          <button className="btn btn-primary" onClick={() => setFormularioAbierto(true)}>
            <i className="bi bi-plus-circle me-2"></i>Nuevo Cliente
          </button>
        )}
      </div>
      {formularioAbierto ? (
        <ClienteForm clienteData={clienteEditando} onSubmit={handleGuardar} onCancel={() => { setFormularioAbierto(false); setClienteEditando(null); }} />
      ) : (
        <ClientesTabla lista={clientes} onEditar={(cli) => { setClienteEditando(cli); setFormularioAbierto(true); }} onEliminar={(id) => setClientes(clientes.filter(c => c.id !== id))} />
      )}
    </>
  );
};

export default ClientesPage;