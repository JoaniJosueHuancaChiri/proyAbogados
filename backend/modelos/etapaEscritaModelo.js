import { pool } from "../config/bd.js";

export const obtenerEtapaPorExpediente = async (idexpediente) => {
  try {
    const [resultado] = await pool.query(
      "SELECT * FROM etapaescrita WHERE idexpediente = ?",
      [idexpediente]
    );
    return resultado[0] || null; // Retorna la fila o null si no se ha creado todavía
  } catch (error) {
    throw new Error("Error al obtener la etapa escrita: " + error.message);
  }
};

export const guardarEtapaEscrita = async (idexpediente, rutasArchivos) => {
  const { demanda, citacion, contestacion } = rutasArchivos;
  
  try {
    const existe = await obtenerEtapaPorExpediente(idexpediente);

    if (!existe) {
      const sqlInsert = `
        INSERT INTO etapaescrita (idexpediente, demanda, citacion, contestacion) 
        VALUES (?, ?, ?, ?)
      `;
      await pool.query(sqlInsert, [idexpediente, demanda || null, citacion || null, contestacion || null]);
    } else {
      // 🔄 SI YA EXISTE (MODO EDICIÓN): Actualizamos dinámicamente solo los archivos que se subieron nuevos
      let sets = [];
      let parametros = [];

      if (demanda) { sets.push("demanda = ?"); parametros.push(demanda); }
      if (citacion) { sets.push("citacion = ?"); parametros.push(citacion); }
      if (contestacion) { sets.push("contestacion = ?"); parametros.push(contestacion); }

      if (sets.length === 0) return true;

      parametros.push(idexpediente);
      const sqlUpdate = `UPDATE etapaescrita SET ${sets.join(", ")} WHERE idexpediente = ?`;
      await pool.query(sqlUpdate, parametros);
    }
    return true;
  } catch (error) {
    throw new Error("Error al procesar el guardado de la etapa escrita: " + error.message);
  }
};