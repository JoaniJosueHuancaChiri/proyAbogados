import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [captchaInput, setCaptchaInput] = useState('');

  // Simulación de CAPTCHA
  const captchaCode = "L7X-92";

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url('/img/fondo1.jpg')`
      }}
    >
      {/* Overlay oscuro para que el texto se vea bien */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Botón Volver */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-white hover:text-slate-200 flex items-center gap-2 transition-colors z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al Inicio
      </button>

      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10">
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Iniciar Sesión</h2>
            <p className="text-slate-600 mt-2 text-sm uppercase tracking-widest">Portal de Seguridad Jurídica</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Usuario / Email</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-300 outline-none transition-all"
                placeholder="ejemplo@lex.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-300 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Sección CAPTCHA */}
            <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-3">Verificación de seguridad</label>
              <div className="flex items-center gap-4">
                <div className="bg-slate-800 text-white px-4 py-2 rounded font-serif italic tracking-widest select-none shadow-inner">
                  {captchaCode}
                </div>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Ingrese el código"
                  className="flex-1 px-3 py-2 text-sm rounded border border-slate-200 outline-none focus:border-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-lg transition-all transform hover:-translate-y-1 shadow-lg active:scale-95"
            >
              INGRESAR AL SISTEMA
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-700 transition-colors underline underline-offset-4">
              ¿Olvidó sus credenciales de acceso?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;