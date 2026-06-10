import { pool } from "../config/bd.js";

// 🔍 OBTENER ETAPA ESCRITA DE UN EXPEDIENTE ESPECÍFICO
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

// 💾 GUARDAR O ACTUALIZAR ETAPA ESCRITA (Gestión Transaccional)
export const guardarEtapaEscrita = async (idexpediente, rutasArchivos) => {
  const { demanda, citacion, contestacion } = rutasArchivos;
  
  try {
    // Esta consulta verifica si ya existe el registro para ese expediente
    const existe = await obtenerEtapaPorExpediente(idexpediente);

    if (!existe) {
      // 📥 SI NO EXISTE: Hacemos un INSERT limpio
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

      // Si no se subió ningún archivo nuevo, no hace falta ejecutar un UPDATE vacío
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