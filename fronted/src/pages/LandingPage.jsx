import React from 'react';
import { Link } from 'react-router-dom';
import ServiceModal from '../components/ServiceModal'; 
import AbogadoCard from '../components/AbogadoCard';

// servicios
const serviciosData = [
  {
    id: "modal-penal",
    title: "Derecho Penal",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070",
    description: "Contamos con un equipo de especialistas en litigación compleja, enfocados en la protección de los derechos fundamentales y la libertad de nuestros representados.",
    items: ["Defensa técnica especializada en procesos complejos", "Representación legal integral", "Asesoría en medidas cautelares", "Recursos de apelación y casación"]
  },

  {
    id: "modal-civil",
    title: "Derecho Civil",
    image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description: "Especialistas en la regulación de las relaciones privadas, gestionando con absoluta reserva y eficacia todo lo relativo a contratos, derechos reales, sucesiones y responsabilidad civil. Buscamos soluciones que protejan su patrimonio y tranquilidad familiar.",
    items: ["Asesoramiento en contratos y obligaciones", "Gestión de herencias y sucesiones complejas", "Procesos de usucapión y derechos de propiedad", "Divorcios y procesos de asistencia familiar"]
  },

  {
    id: "modal-laboral",
    title: "Derecho Laboral",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070",
    description: "Protegemos el capital más importante: el trabajo. Ofrecemos asesoría integral tanto a empresas como a trabajadores, garantizando el cumplimiento de la normativa vigente y la justa resolución de conflictos derivados de la relación laboral.",
    items: ["Beneficios sociales", "Despidos injustificados", "Seguridad Social"]
  }
  
];

// equipo
const equipoData = [
  {
    nombre: "Dr. Alejandro Lex",
    especialidad: "Especialista en Derecho Penal",
    email: "a.lex@lexasociados.bo",
    celular: "+591 777 00000",
    foto: "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260"
  },
  {
    nombre: "Dra. Maria Asociados",
    especialidad: "Especialista en Derecho Civil",
    email: "m.asociados@lexasociados.bo",
    celular: "+591 777 11111",
    foto: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260"
  },
  {
    nombre: "Dr. Roberto Suarez",
    especialidad: "Especialista en Derecho Laboral",
    email: "r.suarez@lexasociados.bo",
    celular: "+591 777 22222",
    foto: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260"
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-base-100 font-sans">      
      {/* NAVBAR RESPONSIVO CON DRAWER */}
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="drawer-content flex flex-col">
                {/* Navbar*/}
                <div className="w-full navbar bg-base-100/90 backdrop-blur-sm shadow-md px-4 md:px-20 fixed top-0 z-50">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div> 
                    <div className="flex-1 px-2 mx-2 font-bold text-xl tracking-tighter text-slate-800">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                            ESTUDIO JURÍDICO
                        </div>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal font-semibold">
                            <li><a href="#inicio">Inicio</a></li>
                            <li><a href="#servicios">Servicios Jurídicos</a></li>
                            <li><a href="#equipo">Nuestro Equipo</a></li>
                            <li><a href="#contacto">Contacto</a></li>
                        </ul>
                    </div>
                    <div className="flex-none ml-4">
                        <button className="btn btn-primary btn-sm md:btn-md">
                            <Link to="/login" className="btn btn-primary btn-sm md:btn-md shadow-lg">
                                Acceso
                            </Link>
                        </button>
                    </div>                
                </div>
            </div> 

            {/* LADO DEL MENÚ MÓVIL (SIDEBAR) */}
            <div className="drawer-side z-[100]">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-lg font-medium">
                    <li className="mb-4 text-primary font-bold text-xl px-4">ESTUDIO JURÍDICO</li>
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#servicios">Servicios Jurídicos</a></li>
                    <li><a href="#equipo">Nuestro Equipo</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                    <div className="divider"></div>
                    <li><button className="btn btn-primary w-full">Acceso</button></li>
                </ul>
            </div>
        </div>

      {/* HERO SECTION */}
      <div id="inicio" className="hero min-h-[80vh] bg-slate-900 relative overflow-hidden">
        {/* Imagen de fondo con opacidad */}
        <img 
          src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=2070" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Estudio Juridico"
        />
        <div className="hero-content text-center text-white relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Excelencia Legal a su Servicio</h1>
            <p className="text-lg md:text-xl mb-8 font-light">Defendemos sus intereses con transparencia, ética y resultados garantizados en todas las áreas del derecho.</p>
            <div className="flex gap-4 justify-center">
              <button className="btn btn-primary px-8"><a href="#servicios" className="btn btn-primary px-8">Nuestros Servicios</a></button>
              <button className="btn btn-outline btn-white text-white border-white hover:bg-white hover:text-slate-900 px-8"><a href="#equipo">Conocer al Equipo</a></button>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE SERVICIOS (Cards) */}
        <section id="servicios" className="py-20 bg-base-200 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12 text-slate-800">Servicios Jurídicos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {serviciosData.map((ser) => (
                        <div key={ser.id} className="card bg-white shadow-xl border-t-4 border-primary">
                            <div className="card-body items-center">
                                <h2 className="card-title text-primary">{ser.title}</h2>
                                <p className="text-slate-600 text-sm mb-4">Haga clic para conocer más detalles sobre nuestra especialidad.</p>
                                <div className="card-actions">
                                    {/*label abre el modal usando el ID */}
                                    <label htmlFor={ser.id} className="btn btn-primary btn-sm">Ver Detalles</label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>        
            {/* Renderizamos los modales fuera del grid para que no estorben */}
            {serviciosData.map((ser) => (
                <ServiceModal key={ser.id} {...ser} />
            ))}
        </section>

        {/* SECCIÓN DE EQUIPO (Cards) */}
        <section id="equipo" className="py-24 bg-slate-50 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-800 mb-4">Nuestro Equipo Exclusivo</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Contamos con profesionales de amplia trayectoria dedicados a brindar soluciones legales estratégicas.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {equipoData.map((abogado, index) => (
                    <AbogadoCard key={index} {...abogado} />
                ))}
                </div>
            </div>
        </section>

        {/* secccion (Acceso al Sistema) */}
        <section className="py-16 bg-primary text-primary-content text-center px-4">
            <h2 className="text-3xl font-bold mb-4">¿Ya es cliente nuestro?</h2>
            <p className="text-lg mb-8 opacity-90 text-white">Consulte el estado de su expediente.</p>
            <button className="btn btn-lg btn-secondary shadow-lg"><Link to="/login" className="btn-sm md:btn-md">Ingresar al Portal</Link></button>
        </section>

      {/* FOOTER */}
        <footer id='contacto' className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4 md:px-20">
            <div className="max-w-7xl mx-auto">
                {/* SECCIÓN SUPERIOR: LOGO Y DESCRIPCIÓN */}
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                        <span className="text-2xl font-bold tracking-tighter text-white">ESTUDIO JURÍDICO</span>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed opacity-80">
                        Estudio jurídico con más de 20 años de trayectoria en La Paz, Bolivia. <br />
                        Excelencia, ética y resultados.
                    </p>

                    {/* seccion media ICONOS REDES SOCIALES (CENTRADOS) */}
                    <div className="flex gap-6 mt-6 justify-center">
                        <a href="#" className="hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.2c0-1.21.593-1.8 1.724-1.8h2.276v-4.203c-.438-.058-1.944-.197-3.702-.197-3.666 0-6.142 2.235-6.142 6.327v2.073z"/></svg>
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31 0 2.573.311 3.688.865a8.19 8.19 0 0 0 4.961 3.03c.027.004.056.002.081.016v4.363a12.062 12.062 0 0 1-5.187-1.464l-.014 8.78a6.516 6.516 0 1 1-6.516-6.516l.011 4.542a1.974 1.974 0 1 0 1.974 1.974l.012-15.59z"/></svg>
                        </a>
                    </div>

                </div>

                <div className="divider opacity-10"></div>

                {/* SECCIÓN ENLACES Y CONTACTO */}
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center justify-items-center md:text-left mb-12 mb-12">
                
                    {/* Columna 1: Servicios */}
                    <div>
                        <h3 className="footer-title text-white opacity-100 mb-4">Servicios Jurídicos</h3>
                        <ul className="space-y-2 text-sm">
                        <li><a href="#servicios" className="hover:link">Derecho Civil</a></li>
                        <li><a href="#servicios" className="hover:link">Derecho Laboral</a></li>
                        <li><a href="#servicios" className="hover:link">Derecho Penal</a></li>
                        </ul>
                    </div>

                    {/* Columna 2: Estudio */}
                    <div>
                        <h3 className="footer-title text-white opacity-100 mb-4">Estudio</h3>
                        <ul className="space-y-2 text-sm">
                        <li><a href="#equipo" className="hover:link">Sobre Nosotros</a></li>
                        <li><a href="#" className="hover:link">Acceso Clientes</a></li>
                        </ul>
                    </div>

                    {/* Columna 3: Contacto */}
                    <div>
                        <h3 className="footer-title text-white opacity-100 mb-4">Contacto</h3>
                        <ul className="space-y-3 text-sm">
                        <li className="flex items-center justify-center md:justify-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +591 2 2440000
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            contacto@lexasociados.bo
                        </li>
                        <li className="flex items-start justify-center md:justify-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Av. Arce, Edificio Multicentro <br /> Piso 10, La Paz - Bolivia
                        </li>
                        </ul>
                    </div>
                </div>
                <div className="divider opacity-10"></div>

                {/* SECCIÓN INFERIOR: COPYRIGHT Y LEGAL */}
                <div className="flex flex-col md:flex-column justify-between items-center text-xs opacity-60 gap-4">
                    <p>© 2026 ESTUDIO JURÍDICO · Todos los derechos reservados</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Términos de uso</a>
                        <a href="#" className="hover:text-white transition-colors">Política de privacidad</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
};

export default LandingPage;