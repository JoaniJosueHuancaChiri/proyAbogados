import {
  insertarUsuarioConRol,
  buscarUsuarioPorNombre,
  actualizarTokenUsuario,
  listarAdministradores,
} from "../modelos/usuarioModelo.js";
import bcrypt from "bcrypt";
import crypto from "crypto"; // 👈 Módulo nativo de Node (No requiere instalar nada)

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

export const listarAdministrador = async (req, res) => {
  try {
    const admins = await listarAdministradores();
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error en listar:", error);
    res.status(500).json({
      mensaje: "Hubo un error al listar los administradores",
      error: error.message,
    });
  }
};
