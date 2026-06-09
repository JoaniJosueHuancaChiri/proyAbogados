import { pool } from "../config/bd.js";
import bcrypt from "bcrypt";

export const insertarUsuarioConRol = async (datosUsuario) => {
  const {
    password,
    tipoUsuario,
    nombre,
    paterno,
    materno,
    ci,
    fechaNacimiento,
    genero,
    celular,
    token,
    fechaCreacion,
    estado,
    rpa,
    especialidad,
    universidad,
    direccion,
    estadoCivil,
    ocupacion,
  } = datosUsuario;

  const conexion = await pool.getConnection();
  try {
    await conexion.beginTransaction();

    // 1. GENERAR EL USUARIO AUTOMÁTICAMENTE
    const inicialPaterno = paterno ? paterno.trim().charAt(0) : "";
    const inicialMaterno = materno ? materno.trim().charAt(0) : "";
    const inicialNombre = nombre ? nombre.trim().charAt(0) : "";
    const limpiaCI = ci.trim();

    const usuarioGenerado =
      `${inicialPaterno}${inicialMaterno}${inicialNombre}${limpiaCI}`.toUpperCase();

    // 2. HASHEAR LA CONTRASEÑA
    const passwordHasheado = await bcrypt.hash(password, 10);

    // 3. CONTROLAR EL VALOR DEL ESTADO
    const estadoFinal = estado !== undefined ? estado : 1;

    // Paso A: Insertar en la tabla PADRE (usuario)
    const sqlUsuario = `
            INSERT INTO usuario (usuario, password, tipoUsuario, nombre, paterno, materno, ci, fechaNacimiento, genero, celular, token, fechaCreacion, estado) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const [resUsuario] = await conexion.query(sqlUsuario, [
      usuarioGenerado,
      passwordHasheado,
      tipoUsuario,
      nombre,
      paterno,
      materno,
      ci,
      fechaNacimiento,
      genero,
      celular,
      token,
      fechaCreacion,
      estadoFinal,
    ]);

    const nuevoIdUsuario = resUsuario.insertId;

    // Paso B: Insertar en tablas hijas según el tipo
    if (tipoUsuario === "Abogado") {
      const sqlAbogado = `INSERT INTO abogado (idUsuario, rpa, especialidad, universidad) VALUES (?, ?, ?, ?)`;
      await conexion.query(sqlAbogado, [
        nuevoIdUsuario,
        rpa,
        especialidad,
        universidad,
      ]);
    } else if (tipoUsuario === "Cliente") {
      const sqlCliente = `INSERT INTO cliente (idUsuario, direccion, estadoCivil, ocupacion) VALUES (?, ?, ?, ?)`;
      await conexion.query(sqlCliente, [
        nuevoIdUsuario,
        direccion,
        estadoCivil,
        ocupacion,
      ]);
    }

    await conexion.commit();

    return {
      idUsuario: nuevoIdUsuario,
      usuario: usuarioGenerado,
      estado: estadoFinal,
      mensaje: `Usuario registrado con éxito. Su nombre de usuario asignado es: ${usuarioGenerado}`,
    };
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
};

// BUSCAR USUARIO POR SU NOMBRE DE USUARIO (Para el Login)
export const buscarUsuarioPorNombre = async (nombreUsuario) => {
  const [resultado] = await pool.query(
    "SELECT * FROM usuario WHERE usuario = ?",
    [nombreUsuario],
  );
  return resultado[0];
};

export const actualizarTokenUsuario = async (idUsuario, token) => {
  try {
    const [resultado] = await pool.query(
      "UPDATE usuario SET token = ? WHERE idUsuario = ?",
      [token, idUsuario],
    );
    return resultado;
  } catch (error) {
    throw new Error("Error al actualizar el token en la BD: " + error.message);
  }
};
export const listarAdministradores = async () => {
  try {
    const [resultado] = await pool.query(
      'SELECT * FROM usuario WHERE tipoUsuario = "Administrador"',
    );
    return resultado;
  } catch (error) {
    throw new Error("Error al listar los administradores: " + error.message);
  }
};
// Añade esta función al final de modelos/usuarioModelo.js

export const modificarUsuarioAdmin = async (idUsuario, datosActualizados) => {
  const {
    nombre,
    paterno,
    materno,
    ci,
    fechaNacimiento,
    genero,
    celular,
    password,
    estado,
  } = datosActualizados;
  const conexion = await pool.getConnection();

  try {
    let sql;
    let parametros;

    // Si el administrador escribió una nueva contraseña, la hasheamos y la actualizamos
    if (password && password.trim() !== "") {
      const passwordHasheado = await bcrypt.hash(password, 10);
      sql = `
                UPDATE usuario 
                SET nombre = ?, paterno = ?, materno = ?, ci = ?, fechaNacimiento = ?, genero = ?, celular = ?, password = ?, estado = ?
                WHERE idUsuario = ?
            `;
      parametros = [
        nombre,
        paterno,
        materno,
        ci,
        fechaNacimiento,
        genero,
        celular,
        passwordHasheado,
        estado,
        idUsuario,
      ];
    } else {
      // Si la dejó en blanco, actualizamos todo MENOS la contraseña
      sql = `
                UPDATE usuario 
                SET nombre = ?, paterno = ?, materno = ?, ci = ?, fechaNacimiento = ?, genero = ?, celular = ?, estado = ?
                WHERE idUsuario = ?
            `;
      parametros = [
        nombre,
        paterno,
        materno,
        ci,
        fechaNacimiento,
        genero,
        celular,
        estado,
        idUsuario,
      ];
    }

    const [resultado] = await conexion.query(sql, parametros);
    return resultado.affectedRows > 0;
  } catch (error) {
    throw error;
  } finally {
    conexion.release();
  }
};
export const eliminarUsuario = async (idUsuario, tipoUsuario) => {
  // Pedimos una conexión dedicada del pool para manejar la transacción de forma segura
  const conexion = await pool.getConnection();

  try {
    // 🌟 Iniciamos una transacción para que se borre TODO o NADA
    await conexion.beginTransaction();

    // Paso 1: Eliminar primero de la tabla específica (El hijo)
    if (tipoUsuario === "Abogado") {
      await conexion.query("DELETE FROM Abogado WHERE idUsuario = ?", [
        idUsuario,
      ]);
    } else if (tipoUsuario === "Cliente") {
      await conexion.query(
        "DELETE FROM Cliente WHERE idUsuario = ?", // 👈 Corregido a Cliente
        [idUsuario],
      );
    }

    // Paso 2: Ahora que el hijo ya no existe, eliminamos de la tabla principal (El padre)
    const [resultadoUsuario] = await conexion.query(
      "DELETE FROM usuario WHERE idUsuario = ?",
      [idUsuario],
    );

    // Guardamos los cambios permanentemente en MariaDB
    await conexion.commit();

    // Retornamos si se afectó alguna fila en la tabla principal
    return resultadoUsuario.affectedRows > 0;
  } catch (error) {
    // Si algo falla en medio del camino, cancelamos los borrados para no romper consistencia
    await conexion.rollback();
    throw new Error("Error al eliminar el usuario en la BD: " + error.message);
  } finally {
    // 🌟 CRÍTICAL: Liberamos la conexión de vuelta al pool para que no se congele el servidor
    conexion.release();
  }
};
export const buscarAdministradorPorCI = async (ci) => {
  try {
    const terminoBusqueda = `%${ci}%`;
    const [resultado] = await pool.query(
      "SELECT * FROM usuario WHERE ci LIKE ? AND tipoUsuario = 'Administrador'",
      [terminoBusqueda],
    );
    return resultado;
  } catch (error) {
    throw new Error("Error al buscar administrador por C.I.: " + error.message);
  }
};
export const listarAbogados = async () => {
  try {
    const [resultado] = await pool.query(
      `SELECT u.*, a.* FROM usuario u 
       INNER JOIN abogado a ON u.idUsuario = a.idUsuario 
       WHERE u.tipoUsuario = 'Abogado'`
    );
    return resultado;
  } catch (error) {
    throw new Error("Error al listar los abogados en la BD: " + error.message);
  }
};
export const buscarAbogadosPorCI = async (ci) => {
  try {
    const terminoBusqueda = `%${ci}%`;
    
    const [resultado] = await pool.query(
      `SELECT u.*, a.* FROM usuario u 
       INNER JOIN abogado a ON u.idUsuario = a.idUsuario 
       WHERE u.ci LIKE ? AND u.tipoUsuario = 'Abogado'`,
      [terminoBusqueda]
    );
    return resultado;
  } catch (error) {
    throw new Error("Error al buscar abogado por C.I. en la BD: " + error.message);
  }
};
export const modificarUsuarioAbogado = async (idUsuario, datosActualizados) => {
  const {
    nombre,
    paterno,
    materno,
    ci,
    fechaNacimiento,
    genero,
    celular,
    password,
    estado,
    rpa,
    especialidad,
    universidad
  } = datosActualizados;
  
  const conexion = await pool.getConnection();

  try {
    await conexion.beginTransaction();

    let sqlUsuario;
    let parametrosUsuario;
    if (password && password.trim() !== "") {
      const passwordHasheado = await bcrypt.hash(password, 10);
      sqlUsuario = `
        UPDATE usuario 
        SET nombre = ?, paterno = ?, materno = ?, ci = ?, fechaNacimiento = ?, genero = ?, celular = ?, password = ?, estado = ?
        WHERE idUsuario = ?
      `;
      parametrosUsuario = [nombre, paterno, materno, ci, fechaNacimiento, genero, celular, passwordHasheado, estado, idUsuario];
    } else {
      sqlUsuario = `
        UPDATE usuario 
        SET nombre = ?, paterno = ?, materno = ?, ci = ?, fechaNacimiento = ?, genero = ?, celular = ?, estado = ?
        WHERE idUsuario = ?
      `;
      parametrosUsuario = [nombre, paterno, materno, ci, fechaNacimiento, genero, celular, estado, idUsuario];
    }
    await conexion.query(sqlUsuario, parametrosUsuario);
    const sqlAbogado = `
      UPDATE abogado 
      SET rpa = ?, especialidad = ?, universidad = ?
      WHERE idUsuario = ?
    `;
    const parametrosAbogado = [rpa, especialidad, universidad, idUsuario];
    await conexion.query(sqlAbogado, parametrosAbogado);
    await conexion.commit();
    return true;

  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
};