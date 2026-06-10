import { pool } from "../config/bd.js";

// Listar todos los expedientes (opcional: con JOIN para mostrar datos del cliente y abogado)
export const listarExpedientes = async () => {
  try {
    const [resultado] = await pool.query(
       `SELECT e.*, u.nombre as nombreCliente, u.paterno as paternoCliente, a.rpa 
         FROM expediente e
         INNER JOIN usuario u ON e.idCliente = u.idUsuario
         INNER JOIN abogado a ON e.idAbogado = a.idUsuario`
    );
    return resultado;
  } catch (error) {
    throw new Error("Error al listar los expedientes en la BD: " + error.message);
  }
};

// Crear un nuevo expediente
// expedienteModelo.js
export const crearExpediente = async (datosExpediente) => {
  const { nurej, nroExpediente, tipoProceso, juzgado, idCliente, idAbogado, estado } = datosExpediente;
  
  try {
    const sql = `INSERT INTO expediente (nurej, nroExpediente, tipoProceso, juzgado, idCliente, idAbogado, estado) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    // IMPORTANTE: Los valores deben ser exactamente los que espera MySQL
    const [resultado] = await pool.query(sql, [
      nurej, 
      nroExpediente, 
      tipoProceso, 
      juzgado, 
      idCliente, 
      idAbogado, 
      estado // Debe ser 'Activo', 'Con Sentencia', 'En Apelación' o 'Archivado'
    ]);

    return { idExpediente: resultado.insertId };
  } catch (error) {
    // Esto es lo que verá tu terminal y evitará que se rompa la conexión
    console.error("Error al insertar en BD:", error.sqlMessage);
    throw new Error(error.sqlMessage || "Error desconocido en base de datos");
  }
};

// Modificar un expediente
export const modificarExpediente = async (idExpediente, datosActualizados) => {
  const {
    nurej,
    nroExpediente,
    tipoProceso,
    juzgado,
    estado
  } = datosActualizados;

  try {
    const sql = `
      UPDATE expediente 
      SET nurej = ?, nroExpediente = ?, tipoProceso = ?, juzgado = ?, estado = ?
      WHERE idexpediente = ?
    `;
    const [resultado] = await pool.query(sql, [
      nurej,
      nroExpediente,
      tipoProceso,
      juzgado,
      estado,
      idExpediente
    ]);
    
    return resultado.affectedRows > 0;
  } catch (error) {
    throw new Error("Error al modificar el expediente: " + error.message);
  }
};

// Eliminar un expediente
export const eliminarExpediente = async (idExpediente) => {
  try {
    const [resultado] = await pool.query(
      "DELETE FROM expediente WHERE idexpediente = ?",
      [idExpediente]
    );
    return resultado.affectedRows > 0;
  } catch (error) {
    throw new Error("Error al eliminar el expediente: " + error.message);
  }
};