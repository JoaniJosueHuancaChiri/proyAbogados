import React from 'react';

const AbogadoCard = ({ foto, nombre, especialidad, email, celular }) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-slate-100">
      {/* Contenedor de Imagen*/}
      <div className="overflow-hidden h-80 relative">
        <img 
          src={foto} 
          alt={nombre} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <p className="text-white text-sm italic">"Excelencia y Compromiso"</p>
        </div>
      </div>

      {/* Información del Abogado */}
      <div className="p-6 text-center md:text-left">
        <h3 className="text-xl font-bold text-slate-800 mb-1">{nombre}</h3>
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 border-b pb-2">
          {especialidad}
        </p>
        
        <div className="space-y-3 text-slate-600 text-sm">
          <div className="flex items-center justify-center md:justify-start gap-3 hover:text-primary transition-colors">
            <i className="fas fa-envelope text-primary w-5"></i>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3 hover:text-primary transition-colors">
            <i className="fas fa-phone-alt text-primary w-5"></i>
            <a href={`tel:${celular.replace(/\s/g, '')}`}>{celular}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbogadoCard;