import { pool } from "../config/bd.js";

export const obtenerEtapaOralPorExpediente = async (idexpediente) => {
  try {
    const [resultado] = await pool.query(
      "SELECT * FROM etapaoral WHERE idexpediente = ?",
      [idexpediente]
    );
    return resultado[0] || null;
  } catch (error) {
    throw new Error("Error al obtener la etapa oral: " + error.message);
  }
};

export const guardarEtapaOral = async (idexpediente, rutas) => {
  const { ratificacionDemanda, tentativaConciliacion, saneamientoProcesal, fijacionObjetoPrueba, recepcionPruebas } = rutas;
  
  try {
    const existe = await obtenerEtapaOralPorExpediente(idexpediente);

    if (!existe) {
      const sqlInsert = `
        INSERT INTO etapaoral (idexpediente, ratificacionDemanda, tentativaConciliacion, saneamientoProcesal, fijacionObjetoPrueba, recepcionPruebas) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await pool.query(sqlInsert, [idexpediente, ratificacionDemanda, tentativaConciliacion, saneamientoProcesal, fijacionObjetoPrueba, recepcionPruebas]);
    } else {
      let sets = [];
      let params = [];

      if (ratificacionDemanda) { sets.push("ratificacionDemanda = ?"); params.push(ratificacionDemanda); }
      if (tentativaConciliacion) { sets.push("tentativaConciliacion = ?"); params.push(tentativaConciliacion); }
      if (saneamientoProcesal) { sets.push("saneamientoProcesal = ?"); params.push(saneamientoProcesal); }
      if (fijacionObjetoPrueba) { sets.push("fijacionObjetoPrueba = ?"); params.push(fijacionObjetoPrueba); }
      if (recepcionPruebas) { sets.push("recepcionPruebas = ?"); params.push(recepcionPruebas); }

      if (sets.length === 0) return true;

      params.push(idexpediente);
      await pool.query(`UPDATE etapaoral SET ${sets.join(", ")} WHERE idexpediente = ?`, params);
    }
  } catch (error) {
    throw new Error("Error al guardar etapa oral: " + error.message);
  }
};