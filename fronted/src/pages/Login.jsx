import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // 1. ESTADOS DEL COMPONENTE (Cambiamos email por usuario)
  const [formData, setFormData] = useState({
    usuario: '', // 👈 Cambiado para coincidir con la BD
    password: '',
    staySignedIn: false,
    captchaInput: ''
  });

  const [captchaError, setCaptchaError] = useState(false);
  const [backendError, setBackendError] = useState(''); // 👈 Para mostrar errores del servidor

  const captchaSimulado = {
    texto: "1 + 5",
    resultado: 6
  };
  
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 2. CONEXIÓN REAL CON EL BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError(''); // Limpiamos errores anteriores
    
    // Validación del Captcha
    if (parseInt(formData.captchaInput) !== captchaSimulado.resultado) {
      setCaptchaError(true);
      setFormData(prev => ({ ...prev, captchaInput: '' }));
      return;
    }
    setCaptchaError(false);

    try {
      // Petición fetch a tu servidor local en el puerto 8080
      const respuesta = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: formData.usuario.trim(),
          password: formData.password
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        // Si el backend responde con error (401, 403, 500), lo capturamos
        throw new Error(datos.mensaje || 'Error al iniciar sesión');
      }

      // Si todo sale bien:
      console.log('Autenticación exitosa en BD:', datos);
      
      // Guardamos el token en el almacenamiento local para mantener la sesión
      localStorage.setItem('token', datos.token);
      localStorage.setItem('user', JSON.stringify(datos.usuario));

      // Redirección al panel administrativo
      navigate('/dashboard');

    } catch (error) {
      setBackendError(error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-sans overflow-hidden">
      
      {/* IMAGEN DE FONDO JURÍDICO */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=2070" 
          className="w-full h-full object-cover"
          alt="Fondo Estudio Jurídico"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00705b]/80 via-slate-900/80 to-slate-950/95 backdrop-blur-xs"></div>
      </div>

      {/* CABECERA DE LA MARCA */}
      <div className="absolute top-10 left-0 right-0 text-center z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-white drop-shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <span className="text-2xl md:text-3xl font-bold tracking-wider font-mono text-white">ESTUDIO JURÍDICO</span>
        </Link>
      </div>

      {/* TARJETA DE LOGIN PRINCIPAL */}
      <div className="relative z-10 w-full max-w-[410px] p-4 mt-16">
        <div className="bg-white rounded-xs shadow-2xl overflow-hidden border-t-4 border-t-[#00705b]">
          
          <form onSubmit={handleSubmit} className="p-8 md:p-10">
            
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 text-slate-700 mb-2 border border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold tracking-widest text-slate-800 font-mono">INICIAR SESIÓN</h2>
            </div>

            {/* ERROR DEL BACKEND VISIBLE EN PANTALLA */}
            {backendError && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium rounded-r-sm">
                ❌ {backendError}
              </div>
            )}

            {/* CAMPO: USERNAME (Cambiado de type="email" a type="text") */}
            <div className="mb-4 text-left">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                USUARIO
              </label>
              <input 
                type="text" 
                name="usuario" // 👈 Mismo nombre que espera req.body en Node
                placeholder="Ej: LMN1234567" 
                value={formData.usuario}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00705b] focus:ring-1 focus:ring-[#00705b] text-sm transition-colors uppercase" // <-- Forzamos mayúsculas visuales
                required
              />
            </div>

            {/* CAMPO: PASSWORD */}
            <div className="mb-5 text-left">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                CONTRASEÑA
              </label>
              <input 
                type="password" 
                name="password"
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00705b] focus:ring-1 focus:ring-[#00705b] text-sm transition-colors"
                required
              />
            </div>

            {/* SECCIÓN CAPTCHA */}
            <div className="mb-5 text-left p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                SEGURIDAD (CAPTCHA)
              </label>
              <div className="flex flex-row items-center justify-between gap-3 w-full">
                <div className="bg-[#2d3748] text-white font-mono font-bold text-center py-2 px-4 rounded-sm text-sm whitespace-nowrap min-w-[85px] shadow-inner">
                  {captchaSimulado.texto}
                </div>
                <input 
                  type="text" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="captchaInput"
                  placeholder="Resultado" 
                  value={formData.captchaInput}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    handleChange({ target: { name: e.target.name, value } });
                  }}
                  className="w-full flex-1 px-3 py-2 bg-white border border-slate-300 rounded-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00705b] focus:ring-1 focus:ring-[#00705b] text-sm transition-colors"
                  required
                />
              </div>
              
              {captchaError && (
                <p className="text-red-600 text-xs mt-1.5 font-semibold">
                  ⚠️ El resultado es incorrecto. Inténtalo de nuevo.
                </p>
              )}
            </div>

            {/* RECORDAR SESIÓN Y RECUPERACIÓN */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input 
                  type="checkbox" 
                  name="staySignedIn"
                  checked={formData.staySignedIn}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#00705b] cursor-pointer rounded-xs" 
                />
                <span className="text-sm select-none">Recordar sesión</span>
              </label>
              
              <a href="#forgot" className="text-sm font-semibold text-[#00705b] hover:underline transition-all">
                ¿Olvido su contraseña?
              </a>
            </div>

            {/* BOTÓN DE ACCESO */}
            <button 
              type="submit" 
              className="w-full py-2.5 bg-[#00705b] hover:bg-[#005c4a] text-white text-sm font-bold uppercase tracking-wider rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              INGRESAR
            </button>

          </form>
        </div>
        
        <div className="text-center mt-4">
          <Link to="/" className="text-xs text-white/70 hover:text-white underline transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Login;