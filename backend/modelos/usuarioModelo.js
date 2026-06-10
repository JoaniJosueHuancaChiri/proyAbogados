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

    const inicialPaterno = paterno ? paterno.trim().charAt(0) : "";
    const inicialMaterno = materno ? materno.trim().charAt(0) : "";
    const inicialNombre = nombre ? nombre.trim().charAt(0) : "";
    const limpiaCI = ci.trim();

    const usuarioGenerado =
      `${inicialPaterno}${inicialMaterno}${inicialNombre}${limpiaCI}`.toUpperCase();

    const passwordHasheado = await bcrypt.hash(password, 10);

    const estadoFinal = estado !== undefined ? estado : 1;

    const sqlUsuario = `
            INSERT INTO usuario (usuario, password, tipoUsuario, nombre, paterno, materno, ci, fechaNacimiento, genero, celular, token, estado) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      estadoFinal,
    ]);

    const nuevoIdUsuario = resUsuario.insertId;

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
  const conexion = await pool.getConnection();

  try {
    await conexion.beginTransaction();

    if (tipoUsuario === "Abogado") {
      await conexion.query("DELETE FROM Abogado WHERE idUsuario = ?", [
        idUsuario,
      ]);
    } else if (tipoUsuario === "Cliente") {
      await conexion.query(
        "DELETE FROM Cliente WHERE idUsuario = ?", 
        [idUsuario],
      );
    }

    const [resultadoUsuario] = await conexion.query(
      "DELETE FROM usuario WHERE idUsuario = ?",
      [idUsuario],
    );

    await conexion.commit();

    return resultadoUsuario.affectedRows > 0;
  } catch (error) {
    await conexion.rollback();
    throw new Error("Error al eliminar el usuario en la BD: " + error.message);
  } finally {
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
export const listarClientes = async () => {
  try {
    const [resultado] = await pool.query(
      `SELECT u.*, c.* FROM usuario u 
       INNER JOIN cliente c ON u.idUsuario = c.idUsuario 
       WHERE u.tipoUsuario = 'Cliente'`
    );
    return resultado;
  } catch (error) {
    throw new Error("Error al listar los clientes en la BD: " + error.message);
  }
};

export const buscarClientesPorCI = async (ci) => {
  try {
    const terminoBusqueda = `%${ci}%`;
    
    const [resultado] = await pool.query(
      `SELECT u.*, c.* FROM usuario u 
       INNER JOIN cliente c ON u.idUsuario = c.idUsuario 
       WHERE u.ci LIKE ? AND u.tipoUsuario = 'Cliente'`,
      [terminoBusqueda]
    );
    return resultado;
  } catch (error) {
    throw new Error("Error al buscar cliente por C.I. en la BD: " + error.message);
  }
};

export const modificarUsuarioCliente = async (idUsuario, datosActualizados) => {
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
    direccion,
    estadoCivil,
    ocupacion
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

    const sqlCliente = `
      UPDATE cliente 
      SET direccion = ?, estadoCivil = ?, ocupacion = ?
      WHERE idUsuario = ?
    `;
    const parametrosCliente = [direccion, estadoCivil, ocupacion, idUsuario];
    await conexion.query(sqlCliente, parametrosCliente);
    
    await conexion.commit();
    return true;

  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
};