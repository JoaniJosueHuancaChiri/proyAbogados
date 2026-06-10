import express from 'express';
import { registrarOActualizarEtapa, buscarEtapaExpediente } from '../controladores/etapaEscritaControlador.js';
import { cargarEtapaArchivos } from '../config/multerConfig.js'; // O donde guardaste Multer

const rutas = express.Router();

rutas.post('/', cargarEtapaArchivos, registrarOActualizarEtapa);

rutas.get('/:idexpediente', buscarEtapaExpediente);

export default rutas;