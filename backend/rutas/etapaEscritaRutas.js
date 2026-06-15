import express from 'express';
import { registrarOActualizarEtapa, buscarEtapaExpediente } from '../controladores/etapaEscritaControlador.js';
import { cargarEtapaArchivos } from '../config/multerConfig.js'; 

const rutas = express.Router();

rutas.post('/', cargarEtapaArchivos, registrarOActualizarEtapa);

rutas.get('/:idexpediente', buscarEtapaExpediente);

export default rutas;