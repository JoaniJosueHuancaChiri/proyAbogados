import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 🌟 Estados para el Captcha
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const navigate = useNavigate();

  // Función para generar un captcha de 6 caracteres
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  // Generar al cargar el componente
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validación de Captcha
    if (captchaInput !== captcha) {
      alert("Código de verificación incorrecto.");
      generateCaptcha(); // Regenerar si falla
      setCaptchaInput('');
      return;
    }

    console.log("Datos de ingreso:", email, password);
    navigate('/dashboard');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(135deg, #009688 0%, #004d40 100%)', fontFamily: "'Roboto', sans-serif" }}>
      <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px', border: 'none', backgroundColor: '#ffffff' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle text-white mb-3" style={{ width: '60px', height: '60px', backgroundColor: '#009688' }}>
              <i className="fa-solid fa-user-tie fs-3"></i>
            </div>
            <h3 className="fw-bold text-dark m-0">INICIAR SESIÓN</h3>
            <small className="text-muted">Estudio Jurídico</small>
          </div>

          <form onSubmit={handleLogin}>
            {/* Input Usuario */}
            <div className="mb-3">
              <label className="form-label fw-semibold small text-secondary">USUARIO</label>
              <input type="email" className="form-control bg-light" placeholder="ejemplo@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
            </div>

            {/* Input Contraseña */}
            <div className="mb-3">
              <label className="form-label fw-semibold small text-secondary">CONTRASEÑA</label>
              <input type="password" className="form-control bg-light" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {/* BLOQUE CAPTCHA */}
            <div className="mb-4">
              <label className="form-label fw-semibold small text-secondary">CÓDIGO DE VERIFICACIÓN</label>
              <div className="d-flex align-items-center gap-2">
                <div className="bg-dark text-white text-center py-2 px-3 rounded fw-bold fs-5 flex-grow-1" style={{ letterSpacing: '4px' }}>
                  {captcha}
                </div>
                <button type="button" className="btn btn-outline-secondary" onClick={generateCaptcha}>
                  <i className="fa-solid fa-arrows-rotate"></i>
                </button>
              </div>
              <input type="text" className="form-control bg-light mt-2" placeholder="Ingrese el código" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} required />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-3" style={{ backgroundColor: '#009688', border: 'none' }}>
              <i className="fa-solid fa-right-to-bracket me-2"></i> INGRESAR
            </button>

            {/* ENLACE LANDING PAGE */}
            <div className="text-center">
              <Link to="/" className="text-decoration-none text-muted small">
                <i className="fa-solid fa-arrow-left me-1"></i> Volver a la página principal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;