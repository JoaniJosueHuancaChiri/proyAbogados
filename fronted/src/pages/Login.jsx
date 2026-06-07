import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // 1. ESTADOS DEL COMPONENTE (Con valores fijos simulados para evitar errores)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    staySignedIn: false,
    captchaInput: ''
  });

  // Captcha simulado fijo: "1 + 5 = 6"
  const captchaSimulado = {
    texto: "1 + 5",
    resultado: 6
  };
  
  const [captchaError, setCaptchaError] = useState(false);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación del Captcha simulado
    if (parseInt(formData.captchaInput) !== captchaSimulado.resultado) {
      setCaptchaError(true);
      setFormData(prev => ({ ...prev, captchaInput: '' })); // Limpia el input si falla
      return;
    }

    setCaptchaError(false);
    console.log('Autenticación exitosa. Datos enviados:', formData);
    
    // Redirección al panel administrativo
    navigate('/dashboard');
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
        {/* Capa de degradado verde/oscuro estilo Vali Admin */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00705b]/80 via-slate-900/80 to-slate-950/95 backdrop-blur-xs"></div>
      </div>

      {/* CABECERA DE LA MARCA EN LA PARTE SUPERIOR */}
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
            
            {/* Encabezado Interno del Formulario */}
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 text-slate-700 mb-2 border border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold tracking-widest text-slate-800 font-mono">INICIAR SESIÓN</h2>
            </div>

            {/* CAMPO: USERNAME (Email) */}
            <div className="mb-4 text-left">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                USUARIO
              </label>
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00705b] focus:ring-1 focus:ring-[#00705b] text-sm transition-colors"
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
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00705b] focus:ring-1 focus:ring-[#00705b] text-sm transition-colors"
                required
              />
            </div>

            {/* SECCIÓN CORREGIDA: CAPTCHA SIMULADO HORIZONTAL */}
            <div className="mb-5 text-left p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                SEGURIDAD (CAPTCHA)
              </label>
              <div className="flex flex-row items-center justify-between gap-3 w-full">
                {/* Caja del número fija en una sola línea */}
                <div className="bg-[#2d3748] text-white font-mono font-bold text-center py-2 px-4 rounded-sm text-sm whitespace-nowrap min-w-[85px] shadow-inner">
                  {captchaSimulado.texto}
                </div>
                {/* Campo de entrada */}
                <input 
                  type="text" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="captchaInput"
                  placeholder="Resultado" 
                  value={formData.captchaInput}
                  onChange={(e) => {
                    // Esto evita que escriban letras si usan teclado físico
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

            {/* OPCIONES: RECORDAR SESIÓN Y RECUPERACIÓN */}
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

            {/* BOTÓN DE ACCESO ESTILO VALI */}
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
        
        {/* RETORNO A LA LANDING PAGE */}
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