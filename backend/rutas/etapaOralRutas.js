import express from 'express';
import { registrarOActualizarEtapaOral, buscarEtapaOralPorExpediente } from '../controladores/etapaOralControlador.js';
import { cargarEtapaOralArchivos } from '../config/multerConfig.js'; 

const rutas = express.Router();

rutas.post('/', cargarEtapaOralArchivos, registrarOActualizarEtapaOral);

rutas.get('/:idexpediente', buscarEtapaOralPorExpediente);

export default rutas;