import { pool } from "./bd.js";

export const verificarDispositivoUnico = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ mensaje: "Acceso denegado. No se proporcionó un token válido." });
    }

    const tokenCliente = authHeader.split(" ")[1]; 

    const [resultado] = await pool.query(
      "SELECT idUsuario, usuario, tipoUsuario FROM usuario WHERE token = ?",
      [tokenCliente]
    );

    if (resultado.length === 0) {
      return res.status(401).json({ 
        mensaje: "Tu sesión ha caducado porque se inició sesión en otro dispositivo." 
      });
    }

    req.usuarioLogueado = resultado[0];

    next(); 
  } catch (error) {
    console.error("Error en middleware de autenticación:", error);
    res.status(500).json({ mensaje: "Error interno de validación de sesión." });
  }
};

export const verificarToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ mensaje: "Acceso denegado. No se proporcionó un token válido." });
    }

    const token = authHeader.split(" ")[1];
    const [resultado] = await pool.query(
      "SELECT idUsuario, usuario, tipoUsuario FROM usuario WHERE token = ?",
      [token]
    );

    if (resultado.length === 0) {
      return res.status(401).json({ mensaje: "Token inválido o sesión no encontrada." });
    }

    req.usuarioLogueado = resultado[0];
    next();
  } catch (error) {
    console.error("Error en verificarToken middleware:", error);
    res.status(500).json({ mensaje: "Error interno de validación de token." });
  }
};