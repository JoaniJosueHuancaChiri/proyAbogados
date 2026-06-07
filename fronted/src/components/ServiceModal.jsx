import React from 'react';

const ServiceModal = ({ isOpen, onClose, title, description, image, items }) => {
  // Si no está abierto, no renderiza absolutamente nada en el DOM
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
      
      {/* Fondo oscuro translúcido con desenfoque suave */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Contenedor del Modal (Estilo Vali Admin: Borde superior característico y esquinas sutiles) */}
      <div className="relative w-full max-w-4xl bg-white rounded-sm shadow-2xl overflow-hidden border-t-4 border-t-[#00705b] z-10 transform transition-all animate-scale-up">
        
        {/* Cabecera del Modal con la Imagen y filtro */}
        <div className="relative h-48 flex items-center justify-center bg-slate-900">
          <img 
            src={image} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          
          <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-white uppercase tracking-widest font-mono drop-shadow-md text-center px-4">
            {title}
          </h3>
        </div>

        {/* Cuerpo del Modal: Estructura limpia en 2 Columnas */}
        <div className="p-6 md:p-10 bg-white grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* Columna Izquierda: Descripción */}
          <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono border-b border-slate-100 pb-1">
              Descripción general
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Columna Derecha: Items / Sub-servicios */}
          <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono border-b border-slate-100 pb-1">
              Servicios Incluidos
            </h4>
            <ul className="space-y-2.5">
              {items && items.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#00705b] shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Pie del Modal: Botón de Cierre Estilo Vali Admin (Plano y Recto) */}
        <div className="flex justify-end p-4 bg-slate-50 border-t border-slate-100">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
          >
            Cerrar Detalles
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceModal;