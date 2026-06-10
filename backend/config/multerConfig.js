import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 🌟 Detectamos el nombre del campo del formulario (fieldname)
    let carpetaDestino = 'etapas/otros';
    
    if (file.fieldname === 'demanda') carpetaDestino = 'etapas/1raEtapa/demanda';
    if (file.fieldname === 'citacion') carpetaDestino = 'etapas/1raEtapa/citacion';
    if (file.fieldname === 'contestacion') carpetaDestino = 'etapas/1raEtapa/contestacion';

    // Crear la carpeta automáticamente si no existe en el disco duro
    fs.mkdirSync(carpetaDestino, { recursive: true });
    cb(null, carpetaDestino);
  },
  filename: (req, file, cb) => {
    // Generamos un nombre único: idexpediente-timestamp.pdf
    const idExp = req.body.idexpediente || req.params.id || 'sin-id';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${idExp}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Middleware que acepta la carga de los 3 archivos a la vez (opcionales)
export const cargarEtapaArchivos = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten documentos en formato PDF'), false);
    }
  }
}).fields([
  { name: 'demanda', maxCount: 1 },
  { name: 'citacion', maxCount: 1 },
  { name: 'contestacion', maxCount: 1 }
]);