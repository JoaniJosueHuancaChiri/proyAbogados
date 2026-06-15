import { pool } from "../config/bd.js";

export const obtenerEtapaDecisoriaPorExpediente = async (idexpediente) => {
  try {
    const [resultado] = await pool.query(
      "SELECT * FROM etapadecisoria WHERE idexpediente = ?",
      [idexpediente]
    );
    return resultado[0] || null;
  } catch (error) {
    throw new Error("Error al obtener la etapa decisoria: " + error.message);
  }
};

export const guardarEtapaDecisoria = async (idexpediente, rutaSentencia) => {
  try {
    const existe = await obtenerEtapaDecisoriaPorExpediente(idexpediente);

    if (!existe) {
      const sqlInsert = `
        INSERT INTO etapadecisoria (idexpediente, setencia) 
        VALUES (?, ?)
      `;
      await pool.query(sqlInsert, [idexpediente, rutaSentencia || null]);
    } else {
      if (!rutaSentencia) return true; 

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