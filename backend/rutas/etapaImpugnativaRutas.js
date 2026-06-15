import express from 'express';
import { registrarOActualizarEtapaImpugnativa, buscarEtapaImpugnativaPorExpediente } from '../controladores/etapaImpugnativaControlador.js';
import { cargarEtapaImpugnativaArchivos } from '../config/multerConfig.js'; 

const rutas = express.Router();

rutas.post('/', cargarEtapaImpugnativaArchivos, registrarOActualizarEtapaImpugnativa);

rutas.get('/:idexpediente', buscarEtapaImpugnativaPorExpediente);

export default rutas;