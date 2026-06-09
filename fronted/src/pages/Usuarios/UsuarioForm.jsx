import React, { useState, useEffect } from 'react';

const UsuarioForm = ({ usuarioData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    paterno: '',       // 🌟 CORRECCIÓN: Sincronizado con MariaDB
    materno: '',       // 🌟 CORRECCIÓN: Sincronizado con MariaDB
    ci: '',
    fechaNacimiento: '',
    genero: '',
    celular: '',
    password: '',      // 🌟 CORRECCIÓN: Sincronizado con MariaDB
    estado: 1          // 🌟 CORRECCIÓN: MariaDB maneja números (1 = Activo, 0 = Inactivo)
  });

  useEffect(() => {
    if (usuarioData) {
      // Si estamos editando, mapeamos lo que viene de la BD al formulario
      setFormData({
        ...usuarioData,
        // Nos aseguramos de mantener la contraseña en blanco por seguridad al editar
        password: ''
      });
    } else {
      setFormData({
        nombre: '',
        paterno: '',
        materno: '',
        ci: '',
        fechaNacimiento: '',
        genero: '',
        celular: '',
        password: '',
        estado: 1
      });
    }
  }, [usuarioData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si cambia el estado de selección, lo guardamos como número para la BD
    if (name === 'estado') {
      setFormData({ ...formData, [name]: value === 'Activo' ? 1 : 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🚀 INYECCIÓN DINÁMICA: Armamos el paquete final agregando el rol oculto
    const datosFinalesParaBackend = {
      ...formData,
      tipoUsuario: 'Administrador', // 👈 ¡Justo aquí pasa la magia!
      fechaCreacion: new Date().toISOString().slice(0, 19).replace('T', ' ') // Formato YYYY-MM-DD HH:mm:ss para SQL
    };

    onSave(datosFinalesParaBackend);
  };

  return (
    <div className="tile">
      <h3 className="tile-title text-dark">
        {usuarioData ? (
          <>
            <i className="bi bi-person-gear me-2 text-primary"></i> Editar Administrador
          </>
        ) : (
          <>
            <i className="bi bi-person-plus-fill me-2 text-success"></i> Registrar Administrador
          </>
        )}
      </h3>
      
      <div className="tile-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            
            {/* Nombre */}
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Nombre</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-person"></i></span>
                <input type="text" className="form-control" name="nombre" value={formData.nombre || ''} onChange={handleChange} required />
              </div>
            </div>

            {/* Apellido Paterno */}
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Apellido Paterno</label>
              <input type="text" className="form-control" name="paterno" value={formData.paterno || ''} onChange={handleChange} required />
            </div>

            {/* Apellido Materno */}
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Apellido Materno</label>
              <input type="text" className="form-control" name="materno" value={formData.materno || ''} onChange={handleChange} />
            </div>

            {/* Carnet de Identidad (CI) */}
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Carnet de Identidad (CI)</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-card-text"></i></span>
                <input type="text" className="form-control" name="ci" value={formData.ci || ''} onChange={handleChange} required />
              </div>
            </div>

            {/* Fecha de Nacimiento */}
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Fecha de Nacimiento</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-calendar-date"></i></span>
                {/* Formateamos la fecha si viene completa de la BD */}
                <input 
                  type="date" 
                  className="form-control" 
                  name="fechaNacimiento" 
                  value={formData.fechaNacimiento ? formData.fechaNacimiento.split('T')[0] : ''} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            {/* Género */}
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Género</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-gender-ambiguous"></i></span>
                <select className="form-control form-select" name="genero" value={formData.genero || ''} onChange={handleChange} required>
                  <option value="">Seleccione...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
            </div>

            {/* Celular */}
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Celular</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-telephone"></i></span>
                <input type="tel" className="form-control" name="celular" value={formData.celular || ''} onChange={handleChange} required />
              </div>
            </div>

            {/* Contraseña */}
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                <input 
                  type="password" 
                  className="form-control" 
                  name="password" 
                  value={formData.password || ''} 
                  onChange={handleChange} 
                  required={!usuarioData} 
                  placeholder={usuarioData ? "Dejar en blanco para no cambiar" : "Escriba la contraseña"}
                />
              </div>
            </div>

            {/* Estado */}
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Estado</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-toggle-on"></i></span>
                <select 
                  className="form-control form-select" 
                  name="estado" 
                  value={formData.estado === 0 ? 'Inactivo' : 'Activo'} 
                  onChange={handleChange} 
                  required
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>

          </div>

          <div className="tile-footer d-flex justify-content-end gap-2 mt-3">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              <i className="bi bi-x-circle me-1"></i> Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-check-circle me-1"></i> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsuarioForm;