import express from 'express';
import cors from 'cors';
import usuarioRutas from './rutas/usuarioRutas.js'; 
import expedienteRutas from './rutas/expedienteRutas.js'; 
import etapaEscritaRutas from './rutas/etapaEscritaRutas.js';
import path from 'path'; 
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/etapas', express.static(path.join(__dirname, 'etapas')));

app.use('/api/usuarios', usuarioRutas);
app.use('/api/expedientes', expedienteRutas);
app.use('/api/etapas/escrita', etapaEscritaRutas);


app.listen(8080, () => {
    console.log("Servidor se levantó correctamente en el puerto 8080");
});

