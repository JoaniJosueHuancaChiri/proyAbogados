import React from 'react';

const ServiceModal = ({ id, title, description, image, items }) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box p-0 max-w-4xl overflow-hidden rounded-2xl border border-slate-700">
          {/* Cabecera con Imagen y Overlay */}
          <div className="relative h-48 flex items-center justify-center">
            <img 
              src={image} 
              alt={title} 
              className="absolute inset-0 w-full h-full object-cover"
            />            
            {/* Esto crea un degradado de transparente a negro solo en las orillas */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent bg-slate-900/40 backdrop-blur-[2px]"></div>
            <h3 className="relative z-10 text-3xl font-bold text-white uppercase tracking-widest">
              {title}
            </h3>
          </div>

          {/* Cuerpo del Modal: 2 Columnas */}
          <div className="p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-slate-800 mb-3 text-lg border-b-2 border-primary w-fit">Descripción</h4>
              <p className="text-slate-600 leading-relaxed">
                {description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-3 text-lg border-b-2 border-primary w-fit">Nuestros Servicios</h4>
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Botón de Cierre */}
          <div className="modal-action p-4 bg-slate-50 mt-0">
            <label htmlFor={id} className="btn btn-outline btn-sm">Cerrar Detalle</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={id}>Close</label>
      </div>
    </>
  );
};

export default ServiceModal;