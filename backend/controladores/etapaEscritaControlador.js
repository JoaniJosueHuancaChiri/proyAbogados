import * as etapaModelo from "../modelos/etapaEscritaModelo.js";

export const registrarOActualizarEtapa = async (req, res) => {
  const { idexpediente } = req.body; 

  if (!idexpediente) {
    return res.status(400).json({ ok: false, mensaje: "El idexpediente no llegó al backend" });
  }

  
  try {
    const rutasArchivos = {
      demanda: (req.files && req.files['demanda']) ? req.files['demanda'][0].path.replace(/\\/g, '/') : null,
      citacion: (req.files && req.files['citacion']) ? req.files['citacion'][0].path.replace(/\\/g, '/') : null,
      contestacion: (req.files && req.files['contestacion']) ? req.files['contestacion'][0].path.replace(/\\/g, '/') : null,
    };

    console.log("ID Recibido:", idexpediente);
    console.log("Rutas a insertar en BD:", rutasArchivos);

    await etapaModelo.guardarEtapaEscrita(idexpediente, rutasArchivos);

    return res.status(200).json({
      ok: true,
      mensaje: "Archivos guardados en la base de datos con éxito.",
      rutas: rutasArchivos
    });

  } catch (error) {
    console.error("Error en controlador:", error);
    return res.status(500).json({ mensaje: "Error interno", error: error.message });
  }
};

export const buscarEtapaExpediente = async (req, res) => {
  const { idexpediente } = req.params;
  try {
    const etapa = await etapaModelo.obtenerEtapaPorExpediente(idexpediente);
    if (!etapa) {
      return res.status(200).json({ ok: false, mensaje: "No hay documentos registrados para este expediente aún", datos: null });
    }
    return res.status(200).json({ ok: true, datos: etapa });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al traer la etapa escrita", error: error.message });
  }
};