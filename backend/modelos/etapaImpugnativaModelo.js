import { pool } from "../config/bd.js";

export const obtenerEtapaImpugnativaPorExpediente = async (idexpediente) => {
  try {
    const [resultado] = await pool.query(
      "SELECT * FROM etapaimpugnativa WHERE idexpediente = ?",
      [idexpediente]
    );
    return resultado[0] || null;
  } catch (error) {
    throw new Error("Error al obtener la etapa impugnativa: " + error.message);
  }
};

export const guardarEtapaImpugnativa = async (idexpediente, rutasArchivos) => {
  const { recursos } = rutasArchivos;
  
  try {
    const existe = await obtenerEtapaImpugnativaPorExpediente(idexpediente);

    if (!existe) {
      const sqlInsert = `
        INSERT INTO etapaimpugnativa (idexpediente, recursos) 
        VALUES (?, ?)
      `;
      await pool.query(sqlInsert, [idexpediente, recursos || null]);
    } else {
      if (!recursos) return true; 

      const sqlUpdate = `UPDATE etapaimpugnativa SET recursos = ? WHERE idexpediente = ?`;
      await pool.query(sqlUpdate, [recursos, idexpediente]);
    }
    return true;
  } catch (error) {
    throw new Error("Error al procesar el guardado de la etapa impugnativa: " + error.message);
  }
};