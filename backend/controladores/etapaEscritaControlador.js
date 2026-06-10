import * as etapaModelo from "../modelos/etapaEscritaModelo.js";

export const registrarOActualizarEtapa = async (req, res) => {
  const { idexpediente } = req.body; // En el front mandaremos el id en el cuerpo

  if (!idexpediente) {
    return res.status(400).json({ ok: false, mensaje: "El idexpediente es obligatorio" });
  }

  try {
    // req.files contiene los archivos cargados organizados por su clave
    const rutasArchivos = {
      demanda: req.files['demanda'] ? req.files['demanda'][0].path.replace(/\\/g, '/') : null,
      citacion: req.files['citacion'] ? req.files['citacion'][0].path.replace(/\\/g, '/') : null,
      contestacion: req.files['contestacion'] ? req.files['contestacion'][0].path.replace(/\\/g, '/') : null,
    };

    await etapaModelo.guardarEtapaEscrita(idexpediente, rutasArchivos);

    return res.status(200).json({
      ok: true,
      mensaje: "Archivos de la etapa procesados correctamente.",
      rutas: rutasArchivos
    });

  } catch (error) {
    console.error("Error en etapaEscritaControlador:", error);
    return res.status(500).json({
      mensaje: "Error interno al guardar los documentos de la etapa",
      error: error.message
    });
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