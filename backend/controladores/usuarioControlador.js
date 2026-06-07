import {
  insertarUsuarioConRol,
  buscarUsuarioPorNombre,
} from "../modelos/usuarioModelo.js";
import bcrypt from "bcrypt";
export const loginUsuario = async (req, res) => {
  
  try {
    console.log("Datos recibidos en el backend:", req.body);
    const { usuario, password } = req.body;

    // Aquí es donde realmente nace la variable 'user'
    const user = await buscarUsuarioPorNombre(usuario);
    console.log("Usuario encontrado en BD:", user);

    // Si el usuario no existe en la BD, salimos de inmediato
    if (!user) {
      return res
        .status(401)
        .json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    // 3. COMPARACIÓN CRUCIAL DE BCRYPT
    const passwordCorrecta = await bcrypt.compare(password, user.password);

    if (!passwordCorrecta) {
      return res
        .status(401)
        .json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    // 4. CONTROL DE ESTADO
    if (user.estado !== 1 && user.estado !== "1") {
      return res
        .status(401)
        .json({ mensaje: "El usuario se encuentra inactivo" });
    }

    // ¡SI TODO ESTÁ BIEN, MANDAMOS ÉXITO!
    res.json({
      mensaje: "¡Inicio de sesión exitoso!",
      usuario: {
        idUsuario: user.idUsuario,
        usuario: user.usuario,
        tipoUsuario: user.tipoUsuario,
        nombre: user.nombre,
      },
    });
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
export const registrarUsuario = async (req, res) => {
  try {
    // Enviamos todo el body del frontend al modelo
    const usuarioNuevo = await insertarUsuarioConRol(req.body);

    // Devolvemos el estado 201 (Creado) junto al mensaje y usuario autogenerado
    res.status(201).json(usuarioNuevo);
  } catch (error) {
    // Si el modelo tira error (ej: CI duplicado), lo atrapamos aquí para que no muera el servidor
    console.error("Error en registrarUsuario:", error);
    res.status(500).json({
      mensaje: "Hubo un error al registrar el usuario",
      error: error.message,
    });
  }
};
