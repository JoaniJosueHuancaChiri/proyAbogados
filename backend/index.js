import express from 'express';
import cors from 'cors';
import usuarioRutas from './rutas/usuarioRutas.js'; 
import expedienteRutas from './rutas/expedienteRutas.js'; 
import etapaRutas from './rutas/etapaEscritaRutas.js';

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// RUTAS BASE
app.use('/api/usuarios', usuarioRutas);
app.use('/api/expedientes', expedienteRutas);

app.use('/api/etapas', etapaRutas);

// LEVANTAR SERVIDOR
app.listen(8080, () => {
    console.log("Servidor se levantó correctamente en el puerto 8080");
});

