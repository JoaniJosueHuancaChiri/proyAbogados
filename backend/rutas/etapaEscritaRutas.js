import express from 'express';
import { registrarOActualizarEtapa, buscarEtapaExpediente } from '../controladores/etapaEscritaControlador.js';
import { cargarEtapaArchivos } from '../config/multerConfig.js'; // O donde guardaste Multer

const rutas = express.Router();

// 📥 Cargar o actualizar PDFs (Sirve para crear de cero y para los botones individuales de editar)
rutas.post('/', cargarEtapaArchivos, registrarOActualizarEtapa);

// 🔍 Obtener los PDFs de un expediente en específico
rutas.get('/:idexpediente', buscarEtapaExpediente);

export default rutas;