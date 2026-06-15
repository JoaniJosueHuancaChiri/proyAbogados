import { obtenerEtapaDecisoriaPorExpediente, guardarEtapaDecisoria } from "../modelos/etapaDecisoriaModelo.js";

export const registrarOActualizarEtapaDecisoria = async (req, res) => {
  const { idexpediente } = req.body;

  if (!idexpediente) {
    return res.status(400).json({ ok: false, mensaje: "El ID del expediente es requerido." });
  }

  try {
    let rutaSentencia = null;
    
    if (req.file) {
      rutaSentencia = req.file.path.replace(/\\/g, '/');
    }

    await guardarEtapaDecisoria(idexpediente, rutaSentencia);

    return res.json({ 
      ok: true, 
      mensaje: "Documento de la etapa decisoria (Sentencia) guardado con éxito.",
      ruta: rutaSentencia 
    });
  } catch (error) {
    console.error("Error en registrarOActualizarEtapaDecisoria:", error);
    return res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const buscarEtapaDecisoriaPorExpediente = async (req, res) => {
  const { idexpediente } = req.params;

  try {
    const etapa = await obtenerEtapaDecisoriaPorExpediente(idexpediente);
    
    if (!etapa) {
      return res.json({ 
        ok: true, 
        datos: { idexpediente, setencia: null }, 
        mensaje: "El expediente aún no cuenta con una resolución de sentencia registrada." 
      });
    }

    return res.json({ ok: true, datos: etapa });
  } catch (error) {
    console.error("ERROR REAL EN BD (Etapa Decisoria):", error);
    return res.status(500).json({ ok: false, mensaje: error.message });
  }
};