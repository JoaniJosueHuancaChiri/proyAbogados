import { obtenerEtapaDecisoriaPorExpediente, guardarEtapaDecisoria } from "../modelos/etapaDecisoriaModelo.js";

/**
 * 📥 Registra o actualiza el documento de la sentencia en la etapa decisoria.
 */
export const registrarOActualizarEtapaDecisoria = async (req, res) => {
  const { idexpediente } = req.body;

  // Validación rápida de que el ID del expediente esté llegando
  if (!idexpediente) {
    return res.status(400).json({ ok: false, mensaje: "El ID del expediente es requerido." });
  }

  try {
    // 🌟 Como es un único archivo (sentencia), Multer lo guarda en req.file (singular)
    let rutaSentencia = null;
    
    if (req.file) {
      rutaSentencia = req.file.path.replace(/\\/g, '/');
    }

    // Enviamos los datos procesados al modelo
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

/**
 * 🔍 Recupera la información y la ruta de la sentencia adjunta a un expediente.
 */
export const buscarEtapaDecisoriaPorExpediente = async (req, res) => {
  const { idexpediente } = req.params;

  try {
    const etapa = await obtenerEtapaDecisoriaPorExpediente(idexpediente);
    
    // Si no existe un registro en la BD, respondemos con éxito pero enviando datos vacíos
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