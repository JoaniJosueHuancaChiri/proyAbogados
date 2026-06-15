import React, { useState, useEffect } from "react";

const ClienteForm = ({ clienteData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    paterno: "",
    materno: "",
    ci: "",
    fechaNacimiento: "",
    genero: "",
    celular: "",
    direccion: "",
    estadoCivil: "",
    ocupacion: "",
    password: "", 
    estado: 1,
  });

  
  useEffect(() => {
    if (clienteData) {
      setFormData({ 
        ...clienteData,
        password: "" 
      });
    } else {
      setFormData({
        nombre: "",
        paterno: "",
        materno: "",
        ci: "",
        fechaNacimiento: "",
        genero: "",
        celular: "",
        direccion: "",
        estadoCivil: "",
        ocupacion: "",
        password: "",
        estado: 1,
      });
    }
  }, [clienteData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "estado") {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosFinales = {
      ...formData,
      tipoUsuario: "Cliente", 
    };

   
    if (!clienteData) {
      datosFinales.password = formData.password.trim() || formData.ci.trim();
    } else {
      if (!formData.password.trim()) {
        delete datosFinales.password;
      }
    }

    onSave(datosFinales);
  };

  return (
    <div className="tile">
      <h3 className="tile-title text-dark">
        {clienteData ? (
          <>
            <i className="bi bi-person-gear me-2 text-primary"></i> Editar Cliente
          </>
        ) : (
          <>
            <i
              className="bi bi-person-plus-fill me-2 text-teal"
              style={{ color: "#009688" }}
            ></i>{" "}
            Registrar Cliente
          </>
        )}
      </h3>

      <div className="tile-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label className="form-label fw-semibold">Nombre</label>
              <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="mb-3 col-md-4">
              <label className="form-label fw-semibold">Apellido Paterno</label>
              <input type="text" className="form-control" name="paterno" value={formData.paterno} onChange={handleChange} required />
            </div>
            <div className="mb-3 col-md-4">
              <label className="form-label fw-semibold">Apellido Materno</label>
              <input type="text" className="form-control" name="materno" value={formData.materno} onChange={handleChange} />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label fw-semibold">CI</label>
              <input type="text" className="form-control" name="ci" value={formData.ci} onChange={handleChange} required />
            </div>
            <div className="mb-3 col-md-4">
              <label className="form-label fw-semibold">Fecha Nacimiento</label>
              <input 
                type="date" 
                className="form-control" 
                name="fechaNacimiento" 
                value={formData.fechaNacimiento ? formData.fechaNacimiento.split("T")[0] : ""} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mb-3 col-md-4">
              <label className="form-label fw-semibold">Género</label>
              <select className="form-control form-select" name="genero" value={formData.genero} onChange={handleChange} required>
                <option value="">Seleccione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Celular</label>
              <input type="tel" className="form-control" name="celular" value={formData.celular} onChange={handleChange} required />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Dirección</label>
              <input type="text" className="form-control" name="direccion" value={formData.direccion} onChange={handleChange} required />
            </div>
            
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Estado Civil</label>
              <select className="form-control form-select" name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} required>
                <option value="">Seleccione...</option>
                <option value="Soltero/a">Soltero/a</option>
                <option value="Casado/a">Casado/a</option>
                <option value="Divorciado/a">Divorciado/a</option>
                <option value="Viudo/a">Viudo/a</option>
              </select>
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Ocupación</label>
              <input type="text" className="form-control" name="ocupacion" value={formData.ocupacion} onChange={handleChange} required />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Estado</label>
              <select className="form-control form-select" name="estado" value={formData.estado} onChange={handleChange} required>
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
              </select>
            </div>

            {!clienteData && (
              <div className="mb-3 col-md-6">
                <label className="form-label fw-semibold">Contraseña Opcional <span className="text-muted" style={{fontSize: '12px'}}>(Por defecto será su CI)</span></label>
                <input 
                  type="password" 
                  className="form-control" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Asigne clave o deje vacío" 
                />
              </div>
            )}
          </div>

          <div className="tile-footer d-flex justify-content-end gap-2 mt-3">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              <i className="bi bi-x-circle me-1"></i> Cancelar
            </button>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#009688", borderColor: "#009688" }}>
              <i className="bi bi-check-circle me-1"></i> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteForm;