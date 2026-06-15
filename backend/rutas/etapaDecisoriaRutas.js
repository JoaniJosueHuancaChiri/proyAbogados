import express from 'express';
import { 
  registrarOActualizarEtapaDecisoria, 
  buscarEtapaDecisoriaPorExpediente 
} from '../controladores/etapaDecisoriaControlador.js';
import { cargarSentenciaArchivo } from '../config/multerConfig.js'; 

const rutas = express.Router();

rutas.post('/', cargarSentenciaArchivo, registrarOActualizarEtapaDecisoria);

rutas.get('/:idexpediente', buscarEtapaDecisoriaPorExpediente);

export default rutas;