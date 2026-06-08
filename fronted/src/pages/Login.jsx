import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí irá la conexión real con tu backend en Node.js/MySQL más adelante
    console.log("Datos de ingreso:", email, password);
    
    // Redirección directa al Dashboard
    navigate('/dashboard');
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ 
        background: 'linear-gradient(135deg, #009688 0%, #004d40 100%)',
        fontFamily: "'Roboto', sans-serif"
      }}
    >
      <div 
        className="card p-4 shadow-lg" 
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          borderRadius: '15px',
          border: 'none',
          backgroundColor: '#ffffff'
        }}
      >
        <div className="card-body">
          {/* Icono y Título Central */}
          <div className="text-center mb-4">
            <div 
              className="d-inline-flex align-items-center justify-content-center rounded-circle text-white mb-3"
              style={{ width: '60px', height: '60px', backgroundColor: '#009688' }}
            >
              <i className="fa-solid fontawesome-correct fa-user-tie fs-3"></i>
            </div>
            <h3 className="fw-bold text-dark m-0" style={{ letterSpacing: '1px' }}>
              INICIAR SESIÓN
            </h3>
            <small className="text-muted">Estudio Jurídico</small>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin}>
            
            {/* Input Correo */}
            <div className="mb-3">
              <label className="form-label fw-semibold small text-secondary">
                USUARIO
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fa-solid fa-envelope text-muted"></i>
                </span>
                <input 
                  type="email" 
                  className="form-control bg-light border-start-0" 
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ boxShadow: 'none' }}
                  required 
                  autoFocus
                />
              </div>
            </div>

            {/* Input Contraseña */}
            <div className="mb-4">
              <label className="form-label fw-semibold small text-secondary">
                CONTRASEÑA
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fa-solid fa-lock text-muted"></i>
                </span>
                <input 
                  type="password" 
                  className="form-control bg-light border-start-0" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ boxShadow: 'none' }}
                  required 
                />
              </div>
            </div>

            {/* Botón de Ingreso */}
            <button 
              type="submit" 
              className="btn btn-primary w-100 fw-bold py-2"
              style={{ 
                backgroundColor: '#009688', 
                border: 'none',
                borderRadius: '8px',
                transition: '0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#00796b'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#009688'}
            >
              <i className="fa-solid fa-right-to-bracket me-2"></i> INGRESAR
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;