import express from 'express';
import { 
  registrarOActualizarEtapaDecisoria, 
  buscarEtapaDecisoriaPorExpediente 
} from '../controladores/etapaDecisoriaControlador.js';
import { cargarSentenciaArchivo } from '../config/multerConfig.js'; // 🌟 Tu middleware para archivo único

const rutas = express.Router();

// 📥 POST para registrar o actualizar el PDF de la sentencia (Etapa Decisoria)
rutas.post('/', cargarSentenciaArchivo, registrarOActualizarEtapaDecisoria);

// 🔍 GET para obtener la sentencia de un expediente específico
rutas.get('/:idexpediente', buscarEtapaDecisoriaPorExpediente);

export default rutas;