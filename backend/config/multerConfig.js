import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let carpetaDestino = 'etapas/otros';

    if (file.fieldname === 'demanda') carpetaDestino = 'etapas/1raEtapa/demanda';
    if (file.fieldname === 'citacion') carpetaDestino = 'etapas/1raEtapa/citacion';
    if (file.fieldname === 'contestacion') carpetaDestino = 'etapas/1raEtapa/contestacion';

    if (file.fieldname === 'ratificacionDemanda') carpetaDestino = 'etapas/2daEtapa/ratificacion';
    if (file.fieldname === 'tentativaConciliacion') carpetaDestino = 'etapas/2daEtapa/conciliacion';
    if (file.fieldname === 'saneamientoProcesal') carpetaDestino = 'etapas/2daEtapa/saneamiento';
    if (file.fieldname === 'fijacionObjetoPrueba') carpetaDestino = 'etapas/2daEtapa/fijacion';
    if (file.fieldname === 'recepcionPruebas') carpetaDestino = 'etapas/2daEtapa/recepcion';

    if (file.fieldname === 'sentencia') carpetaDestino = 'etapas/3raEtapa/sentencia';

    if (file.fieldname === 'recursos') carpetaDestino = 'etapas/4taEtapa/recursos';

    fs.mkdirSync(carpetaDestino, { recursive: true });
    cb(null, carpetaDestino);
  },
  filename: (req, file, cb) => {
    const idExp = req.body.idexpediente || req.params.id || 'sin-id';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${idExp}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

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

export const cargarEtapaOralArchivos = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Solo PDF'), false);
  }
}).fields([
  { name: 'ratificacionDemanda', maxCount: 1 },
  { name: 'tentativaConciliacion', maxCount: 1 },
  { name: 'saneamientoProcesal', maxCount: 1 },
  { name: 'fijacionObjetoPrueba', maxCount: 1 },
  { name: 'recepcionPruebas', maxCount: 1 }
]);

export const cargarSentenciaArchivo = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten resoluciones de sentencia en formato PDF'), false);
    }
  }
}).single('sentencia'); 

export const cargarEtapaImpugnativaArchivos = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten recursos en formato PDF'), false);
    }
  }
}).fields([
  { name: 'recursos', maxCount: 1 }
]);