import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); 
  const navigate = useNavigate();

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(''); 
    
    if (captchaInput !== captcha) {
      setErrorMsg("Código de verificación (Captcha) incorrecto.");
      generateCaptcha(); // Regenerar si falla
      setCaptchaInput('');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, password })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setErrorMsg(datos.mensaje || "Error al iniciar sesión");
        generateCaptcha();
        setCaptchaInput('');
        return;
      }

      console.log("Login exitoso:", datos);
      localStorage.setItem('token', datos.token);
      localStorage.setItem('usuarioLogueado', JSON.stringify(datos.usuario));
      navigate('/dashboard'); 

    } catch (error) {
      console.error("Error en la petición:", error);
      setErrorMsg("No se pudo conectar con el servidor. Verifica que tu backend esté encendido.");
    }
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

          {errorMsg && (
            <div className="alert alert-danger py-2 small text-center" role="alert">
              <i className="fa-solid fa-circle-exclamation me-2"></i>{errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold small text-secondary">USUARIO</label>
              <input 
                type="text" 
                className="form-control bg-light text-uppercase" 
                placeholder="Ej: HHJ12345678" 
                value={usuario} 
                onChange={(e) => setUsuario(e.target.value)} 
                required 
                autoFocus 
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small text-secondary">CONTRASEÑA</label>
              <input 
                type="password" 
                className="form-control bg-light" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

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
              <input 
                type="text" 
                className="form-control bg-light mt-2" 
                placeholder="Ingrese el código" 
                value={captchaInput} 
                onChange={(e) => setCaptchaInput(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-3" style={{ backgroundColor: '#009688', border: 'none' }}>
              <i className="fa-solid fa-right-to-bracket me-2"></i> INGRESAR
            </button>

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