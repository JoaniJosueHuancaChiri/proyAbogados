import React, { useState } from 'react';
import AbogadosTabla from './AbogadosTabla';
import AbogadoForm from './AbogadoForm';

const AbogadosPage = () => {
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [abogadoEditando, setAbogadoEditando] = useState(null);
  
  const [abogados, setAbogados] = useState([
    { id: 1, nombre: 'Dr. Alejandro Mendoza', especialidad: 'Penal', licencia: 'MN-98432' },
    { id: 2, nombre: 'Dra. Claudia Gutiérrez', especialidad: 'Civil', licencia: 'MN-12455' }
  ]);

  const handleGuardar = (datos) => {
    if (abogadoEditando) {
      setAbogados(abogados.map(a => a.id === abogadoEditando.id ? { ...a, ...datos } : a));
    } else {
      setAbogados([...abogados, { id: Date.now(), ...datos }]);
    }
    setFormularioAbierto(false);
    setAbogadoEditando(null);
  };

  const handleEliminar = (id) => {
    if(window.confirm("¿Está seguro de eliminar este abogado?")) {
      setAbogados(abogados.filter(a => a.id !== id));
    }
  };

  return (
    <>
      <div className="app-title">
        <div>
          <h1><i className="bi bi-gavel"></i> Módulo de Abogados</h1>
          
        </div>
        {!formularioAbierto && (
          <button className="btn btn-primary" onClick={() => setFormularioAbierto(true)}>
            <i className="bi bi-plus-circle me-2"></i>Nuevo Abogado
          </button>
        )}
      </div>
      {formularioAbierto ? (
        <AbogadoForm 
          abogadoData={abogadoEditando} 
          onSubmit={handleGuardar} 
          onCancel={() => { setFormularioAbierto(false); setAbogadoEditando(null); }} 
        />
      ) : (
        <AbogadosTabla lista={abogados} onEditar={(abg) => { setAbogadoEditando(abg); setFormularioAbierto(true); }} onEliminar={handleEliminar} />
      )}
    </>
  );
};

export default AbogadosPage;