import { obtenerEtapaImpugnativaPorExpediente, guardarEtapaImpugnativa } from "../modelos/etapaImpugnativaModelo.js";

export const registrarOActualizarEtapaImpugnativa = async (req, res) => {
  const { idexpediente } = req.body;
  if (!idexpediente) return res.status(400).json({ ok: false, mensaje: "ID de expediente requerido" });

  try {
    const files = req.files;
    const rutas = {
      recursos: files && files['recursos'] ? files['recursos'][0].path.replace(/\\/g, '/') : null,
    };

    await guardarEtapaImpugnativa(idexpediente, rutas);
    res.json({ ok: true, mensaje: "Etapa impugnativa guardada con éxito" });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const buscarEtapaImpugnativaPorExpediente = async (req, res) => {
  const { idexpediente } = req.params;
  try {
    const etapa = await obtenerEtapaImpugnativaPorExpediente(idexpediente);
    res.json({ ok: true, datos: etapa });
  } catch (error) {
    console.error("ERROR REAL EN BD (IMPUGNATIVA):", error);
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};