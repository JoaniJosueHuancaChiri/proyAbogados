//import * as oralModelo from "../modelos/etapaOralModelo.js";
import { obtenerEtapaOralPorExpediente, guardarEtapaOral } from "../modelos/etapaOralModelo.js";

export const registrarOActualizarEtapaOral = async (req, res) => {
  const { idexpediente } = req.body;
  if (!idexpediente) return res.status(400).json({ ok: false, mensaje: "ID requerido" });

  try {
    const files = req.files;
    const rutas = {
      ratificacionDemanda: files['ratificacionDemanda'] ? files['ratificacionDemanda'][0].path.replace(/\\/g, '/') : null,
      tentativaConciliacion: files['tentativaConciliacion'] ? files['tentativaConciliacion'][0].path.replace(/\\/g, '/') : null,
      saneamientoProcesal: files['saneamientoProcesal'] ? files['saneamientoProcesal'][0].path.replace(/\\/g, '/') : null,
      fijacionObjetoPrueba: files['fijacionObjetoPrueba'] ? files['fijacionObjetoPrueba'][0].path.replace(/\\/g, '/') : null,
      recepcionPruebas: files['recepcionPruebas'] ? files['recepcionPruebas'][0].path.replace(/\\/g, '/') : null,
    };

    await guardarEtapaOral(idexpediente, rutas);
    res.json({ ok: true, mensaje: "Etapa oral guardada" });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};


export const buscarEtapaOralPorExpediente = async (req, res) => {
  const { idexpediente } = req.params;
  try {
    const etapa = await obtenerEtapaOralPorExpediente(idexpediente);
    res.json({ ok: true, datos: etapa });
  } catch (error) {
    console.error("ERROR REAL EN BD:", error); // <-- ESTO ES CLAVE
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};