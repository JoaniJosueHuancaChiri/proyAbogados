import React, { useState, useEffect } from 'react';

const AbogadoForm = ({ abogadoData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    paterno: '',
    materno: '',
    ci: '',
    fechaNacimiento: '',
    genero: '',
    celular: '',
    rpa: '',          
    especialidad: '',  
    universidad: '',  
    password: '', // 🌟 Agregado para el registro inicial
    estado: 1
  });

  useEffect(() => {
    if (abogadoData) {
      setFormData({ 
        ...abogadoData,
        password: '' // Al editar dejamos la contraseña vacía por defecto
      });
    } else {
      setFormData({
        nombre: '', paterno: '', materno: '', ci: '',
        fechaNacimiento: '', genero: '', celular: '',
        rpa: '', especialidad: '', universidad: '',
        password: '',
        estado: 1
      });
    }
  }, [abogadoData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // 🌟 Si cambia el estado, guardamos directamente el valor numérico
    if (name === 'estado') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const datosFinales = {
      ...formData,
      tipoUsuario: 'Abogado', // 🌟 CRÍTICO para que el backend sepa que es un abogado
    };

    // 🌟 Si es un registro NUEVO, le inyectamos la contraseña inicial (su CI) y la fecha de creación
    if (!abogadoData) {
      datosFinales.password = formData.password || formData.ci.trim(); // Si no digitan clave, usa su CI
      datosFinales.fechaCreacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    onSave(datosFinales);
  };

  return (
    <div className="tile">
      <h3 className="tile-title text-dark">
        {abogadoData ? (
          <><i className="bi bi-person-gear me-2 text-primary"></i> Editar Abogado</>
        ) : (
          <><i className="bi bi-person-plus-fill me-2 text-success"></i> Registrar Abogado</>
        )}
      </h3>
      
      <div className="tile-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Datos Personales */}
            <div className="mb-3 col-md-4"><label className="form-label fw-semibold">Nombre</label><input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required /></div>
            <div className="mb-3 col-md-4"><label className="form-label fw-semibold">Apellido Paterno</label><input type="text" className="form-control" name="paterno" value={formData.paterno} onChange={handleChange} required /></div>
            <div className="mb-3 col-md-4"><label className="form-label fw-semibold">Apellido Materno</label><input type="text" className="form-control" name="materno" value={formData.materno} onChange={handleChange} /></div>
            
            <div className="mb-3 col-md-4"><label className="form-label fw-semibold">CI</label><input type="text" className="form-control" name="ci" value={formData.ci} onChange={handleChange} required /></div>
            <div className="mb-3 col-md-4"><label className="form-label fw-semibold">Fecha Nacimiento</label><input type="date" className="form-control" name="fechaNacimiento" value={formData.fechaNacimiento ? formData.fechaNacimiento.split('T')[0] : ''} onChange={handleChange} required /></div>
            <div className="mb-3 col-md-4">
              <label className="form-label fw-semibold">Género</label>
              <select className="form-control form-select" name="genero" value={formData.genero} onChange={handleChange} required>
                <option value="">Seleccione...</option><option value="Masculino">Masculino</option><option value="Femenino">Femenino</option>
              </select>
            </div>

            {/* Datos Profesionales */}
            <div className="mb-3 col-md-6"><label className="form-label fw-semibold">Celular</label><input type="tel" className="form-control" name="celular" value={formData.celular} onChange={handleChange} required /></div>
            <div className="mb-3 col-md-6"><label className="form-label fw-semibold">RPA</label><input type="text" className="form-control" name="rpa" value={formData.rpa} onChange={handleChange} required /></div>
            <div className="mb-3 col-md-6"><label className="form-label fw-semibold">Especialidad</label><input type="text" className="form-control" name="especialidad" value={formData.especialidad} onChange={handleChange} required /></div>
            <div className="mb-3 col-md-6"><label className="form-label fw-semibold">Universidad de Egreso</label><input type="text" className="form-control" name="universidad" value={formData.universidad} onChange={handleChange} required /></div>

            {/* Campos Condicionales o de Configuración */}
            {!abogadoData && (
              <div className="mb-3 col-md-6">
                <label className="form-label fw-semibold">Contraseña Opcional <span className="text-muted" style={{fontSize: '12px'}}>(Por defecto será su CI)</span></label>
                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Asigne clave o deje vacío" />
              </div>
            )}

            {abogadoData && (
              <div className="mb-3 col-md-6">
                <label className="form-label fw-semibold">Estado del Abogado</label>
                <select className="form-control form-select" name="estado" value={formData.estado} onChange={handleChange} required>
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </select>
              </div>
            )}
          </div>

          <div className="tile-footer d-flex justify-content-end gap-2 mt-3">
            <button type="button" className="btn btn-secondary" onClick={onCancel}><i className="bi bi-x-circle me-1"></i> Cancelar</button>
            <button type="submit" className="btn btn-primary"><i className="bi bi-check-circle me-1"></i> Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AbogadoForm;