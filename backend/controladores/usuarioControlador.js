import {
  insertarUsuarioConRol,
  buscarUsuarioPorNombre,
  actualizarTokenUsuario,
  listarAdministradores,
  modificarUsuarioAdmin, 
  eliminarUsuario,
  buscarAdministradorPorCI,
  listarAbogados,
  buscarAbogadosPorCI,
  modificarUsuarioAbogado,
} from "../modelos/usuarioModelo.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const loginUsuario = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const user = await buscarUsuarioPorNombre(usuario);

    if (!user) {
      return res
        .status(401)
        .json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    const passwordCorrecta = await bcrypt.compare(password, user.password);
    if (!passwordCorrecta) {
      return res
        .status(401)
        .json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    if (user.estado !== 1 && user.estado !== "1") {
      return res
        .status(401)
        .json({ mensaje: "El usuario se encuentra inactivo" });
    }

    const tokenAleatorio = crypto.randomBytes(16).toString("hex");

    await actualizarTokenUsuario(user.idUsuario, tokenAleatorio);

    res.json({
      mensaje: "¡Inicio de sesión exitoso!",
      token: tokenAleatorio,
      usuario: {
        idUsuario: user.idUsuario,
        usuario: user.usuario,
        tipoUsuario: user.tipoUsuario,
        nombre: user.nombre,
        paterno: user.paterno,
        materno: user.materno,
      },
    });
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const registrarUsuario = async (req, res) => {
  try {
    const usuarioNuevo = await insertarUsuarioConRol(req.body);
    res.status(201).json(usuarioNuevo);
  } catch (error) {
    console.error("Error en registrarUsuario:", error);
    res.status(500).json({
      mensaje: "Hubo un error al registrar el usuario",
      error: error.message,
    });
  }
};
export const actualizarUsuarioAdmin = async (req, res) => {
  const { id } = req.params; 
  try {
    const actualizado = await modificarUsuarioAdmin(id, req.body);
    if (actualizado) {
      return res.status(200).json({ ok: true, mensaje: "Administrador actualizado correctamente." });
    } else {
      return res.status(404).json({ ok: false, mensaje: "No se encontró el usuario para actualizar." });
    }
  } catch (error) {
    console.error("Error en el controlador:", error);
    return res.status(500).json({
      mensaje: "Hubo un error al actualizar el administrador",
      error: error.message,
    });
  }
};
export const removerUsuario = async (req, res) => {
  const { id } = req.params;
  const { tipo } = req.query; 

  console.log(` Petición de eliminación recibida para ID: ${id} - Tipo: ${tipo || 'Administrador'}`);

  try {
    const eliminado = await eliminarUsuario(id, tipo);

    if (eliminado) {
      return res.status(200).json({ ok: true, mensaje: "Usuario eliminado correctamente de la base de datos." });
    } else {
      return res.status(404).json({ ok: false, mensaje: "No se encontró el usuario para eliminar." });
    }
  } catch (error) {
    console.error("ERROR EN REMOVER USUARIO:", error);
    return res.status(500).json({
      mensaje: "Hubo un error al eliminar el usuario",
      error: error.message,
    });
  }
};
// 1. Recuerda agregar 'buscarAdministradorPorCI' en las importaciones de arriba

export const listarAdministrador = async (req, res) => {
  // Capturamos el ci desde la query string de la URL (?ci=123)
  const { ci } = req.query;

  try {
    let admins;

    // 🧠 Si viene un CI en la URL, llamamos al buscador parcial
    if (ci && ci.trim() !== "") {
      console.log(`Buscando administradores que coincidan con CI: ${ci}`);
      admins = await buscarAdministradorPorCI(ci);
    } else {
      // 📋 Si no viene ningún CI, listamos todos normalmente
      admins = await listarAdministradores();
    }

    return res.status(200).json(admins);
  } catch (error) {
    console.error("Error en listar/buscar administradores:", error);
    return res.status(500).json({
      mensaje: "Hubo un error al procesar la solicitud",
      error: error.message,
    });
  }
};
export const obtenerAbogados = async (req, res) => {
  const { ci } = req.query;
  try {
    let abogados; 

    if (ci && ci.trim() !== "") {
      console.log(`Buscando abogados que coincidan con CI: ${ci}`);
      abogados = await buscarAbogadosPorCI(ci);
    } else {
      abogados = await listarAbogados(); 
    }
    return res.status(200).json(abogados);
  } catch (error) {
    console.error("Error en listar/buscar abogados:", error);
    return res.status(500).json({
      mensaje: "Hubo un error al procesar la solicitud",
      error: error.message,
    });
  }
};
export const actualizarUsuarioAbogado = async (req, res) => {
  const { id } = req.params; 
  try {
    const actualizado = await modificarUsuarioAbogado(id, req.body);
    if (actualizado) {
      return res.status(200).json({ ok: true, mensaje: "Abogado actualizado correctamente." });
    } else {
      return res.status(404).json({ ok: false, mensaje: "No se encontró el usuario para actualizar." });
    }
  } catch (error) {
    console.error("Error en el controlador:", error);
    return res.status(500).json({
      mensaje: "Hubo un error al actualizar al abogado",
      error: error.message,
    });
  }
};