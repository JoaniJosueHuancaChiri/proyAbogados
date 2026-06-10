import * as Modelo from "../modelos/expedienteModelo.js";

export const obtenerExpedientes = async (req, res) => {
  try {
    const expedientes = await Modelo.listarExpedientes();
    res.status(200).json(expedientes);
  } catch (error) {
    console.error("Error en obtenerExpedientes:", error);
    res.status(500).json({ mensaje: "Error al obtener los expedientes", error: error.message });
  }
};

export const registrarExpediente = async (req, res) => {
    try {
        const idAbogadoSesion = req.usuarioLogueado?.idUsuario;
        const datosConAbogado = { ...req.body, idAbogado: idAbogadoSesion };

        await Modelo.crearExpediente(datosConAbogado);
        res.status(201).json({ ok: true, mensaje: "Expediente registrado" });
    } catch (error) {
        console.error("Error capturado:", error.message);
        res.status(500).json({ mensaje: "Error al registrar", error: error.message });
    }
};

export const actualizarExpediente = async (req, res) => {
  const { id } = req.params;
  try {
    const actualizado = await Modelo.modificarExpediente(id, req.body);
    if (actualizado) {
      return res.status(200).json({ ok: true, mensaje: "Expediente actualizado correctamente." });
    } else {
      return res.status(404).json({ ok: false, mensaje: "No se encontró el expediente para actualizar." });
    }
  } catch (error) {
    console.error("Error en actualizarExpediente:", error);
    res.status(500).json({ mensaje: "Error al actualizar el expediente", error: error.message });
  }
};

export const eliminarExpediente = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await Modelo.eliminarExpediente(id);
    if (eliminado) {
      return res.status(200).json({ ok: true, mensaje: "Expediente eliminado correctamente." });
    } else {
      return res.status(404).json({ ok: false, mensaje: "No se encontró el expediente para eliminar." });
    }
  } catch (error) {
    console.error("Error en eliminarExpediente:", error);
    res.status(500).json({ mensaje: "Error al eliminar el expediente", error: error.message });
  }
};