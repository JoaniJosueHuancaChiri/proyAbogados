import express from 'express';
import { registrarOActualizarEtapaOral, buscarEtapaOralPorExpediente } from '../controladores/etapaOralControlador.js';
import { cargarEtapaOralArchivos } from '../config/multerConfig.js'; 

const rutas = express.Router();

// POST para guardar/actualizar archivos (usando el middleware de multer)
rutas.post('/', cargarEtapaOralArchivos, registrarOActualizarEtapaOral);

// GET para consultar el estado actual del expediente
rutas.get('/:idexpediente', buscarEtapaOralPorExpediente);

export default rutas;