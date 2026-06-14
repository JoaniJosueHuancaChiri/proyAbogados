import express from 'express';
import { registrarOActualizarEtapaImpugnativa, buscarEtapaImpugnativaPorExpediente } from '../controladores/etapaImpugnativaControlador.js';
import { cargarEtapaImpugnativaArchivos } from '../config/multerConfig.js'; 

const rutas = express.Router();

// POST para guardar/actualizar el PDF del recurso
rutas.post('/', cargarEtapaImpugnativaArchivos, registrarOActualizarEtapaImpugnativa);

// GET para consultar el estado actual por id de expediente
rutas.get('/:idexpediente', buscarEtapaImpugnativaPorExpediente);

export default rutas;