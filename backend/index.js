import express from 'express';
import cors from 'cors';
import usuarioRutas from './rutas/usuarioRutas.js'; // 👈 Fíjate bien en el punto y la barra './'
import expedienteRutas from './rutas/expedienteRutas.js'; // rutas de expedientes

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// RUTAS BASE
app.use('/api/usuarios', usuarioRutas);
app.use('/api/expedientes', expedienteRutas);

// LEVANTAR SERVIDOR
app.listen(8080, () => {
    console.log("Servidor se levantó correctamente en el puerto 8080");
});

