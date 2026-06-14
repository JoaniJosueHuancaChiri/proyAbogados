import { pool } from "../config/bd.js";

/**
 * 🔍 Busca si ya existe un registro de etapa decisoria para un expediente específico.
 */
export const obtenerEtapaDecisoriaPorExpediente = async (idexpediente) => {
  try {
    const [resultado] = await pool.query(
      "SELECT * FROM etapadecisoria WHERE idexpediente = ?",
      [idexpediente]
    );
    // Retorna la fila encontrada o null si todavía no se ha registrado la sentencia
    return resultado[0] || null;
  } catch (error) {
    throw new Error("Error al obtener la etapa decisoria: " + error.message);
  }
};

/**
 * 💾 Registra por primera vez o actualiza la sentencia (PDF) de la etapa decisoria.
 */
export const guardarEtapaDecisoria = async (idexpediente, rutaSentencia) => {
  try {
    // 1. Verificamos si ya hay un registro previo para este expediente
    const existe = await obtenerEtapaDecisoriaPorExpediente(idexpediente);

    if (!existe) {
      // 📥 MODO CREACIÓN (INSERT)
      // ⚠️ Nota: Usamos 'setencia' respetando el nombre exacto de tu tabla SQL
      const sqlInsert = `
        INSERT INTO etapadecisoria (idexpediente, setencia) 
        VALUES (?, ?)
      `;
      await pool.query(sqlInsert, [idexpediente, rutaSentencia || null]);
    } else {
      // 🔄 MODO EDICIÓN (UPDATE)
      // Si el usuario subió un archivo nuevo, actualizamos el campo
      if (!rutaSentencia) return true; // Si no mandó un archivo nuevo, no hacemos nada

      const sqlUpdate = `
        UPDATE etapadecisoria 
        SET setencia = ? 
        WHERE idexpediente = ?
      `;
      await pool.query(sqlUpdate, [rutaSentencia, idexpediente]);
    }
    return true;
  } catch (error) {
    throw new Error("Error al procesar el guardado de la etapa decisoria: " + error.message);
  }
};