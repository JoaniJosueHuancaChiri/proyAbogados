import express from "express";
import { pool } from "../config/bd.js"; 

import {
  registrarUsuario,
  loginUsuario,
  listarAdministrador,
  actualizarUsuarioAdmin,
  removerUsuario,
  obtenerAbogados,
  actualizarUsuarioAbogado,
  obtenerClientes,
  actualizarUsuarioCliente,
} from "../controladores/usuarioControlador.js";
import { verificarDispositivoUnico } from "../config/authMiddleware.js";

const rutas = express.Router();

rutas.post("/", registrarUsuario);
rutas.post("/login", loginUsuario);
rutas.get("/verificar-token", verificarDispositivoUnico, (req, res) => {
  res.status(200).json({ ok: true, mensaje: "Sesión válida" });
});
rutas.get("/", listarAdministrador);
rutas.put("/:id", actualizarUsuarioAdmin);
rutas.delete('/:id', removerUsuario);
rutas.get("/abogados", obtenerAbogados);
rutas.put("/abogados/:id", actualizarUsuarioAbogado);
rutas.get("/clientes", obtenerClientes);
rutas.put("/clientes/:id", actualizarUsuarioCliente);

rutas.get('/dashboard/contadores', async (req, res) => {
  try {
    const [resAbogados] = await pool.query('SELECT COUNT(*) AS total FROM usuario WHERE tipoUsuario = "Abogado"'); 
    const [resClientes] = await pool.query('SELECT COUNT(*) AS total FROM cliente');
    const [resCasos] = await pool.query('SELECT COUNT(*) AS total FROM expediente');

    // 2. NUEVAS CONSULTAS: Contadores individuales por estado del expediente
    const [resActivos] = await pool.query('SELECT COUNT(*) AS total FROM expediente WHERE estado = "Activo"');
    const [resSentencia] = await pool.query('SELECT COUNT(*) AS total FROM expediente WHERE estado = "Con Sentencia"');
    const [resApelacion] = await pool.query('SELECT COUNT(*) AS total FROM expediente WHERE estado = "En Apelación"');
    const [resArchivado] = await pool.query('SELECT COUNT(*) AS total FROM expediente WHERE estado = "Archivado"');


    const totalAbogados = resAbogados[0] ? resAbogados[0].total : 0;
    const totalClientes = resClientes[0] ? resClientes[0].total : 0;
    const totalCasos    = resCasos[0]    ? resCasos[0].total    : 0;

    // Procesar valores de los estados particulares
    const totalActivos    = resActivos[0]    ? resActivos[0].total    : 0;
    const totalSentencia  = resSentencia[0]  ? resSentencia[0].total  : 0;
    const totalApelacion  = resApelacion[0]  ? resApelacion[0].total  : 0;
    const totalArchivado  = resArchivado[0]  ? resArchivado[0].total  : 0;

    console.log("Contadores calculados con éxito:", { totalAbogados, totalClientes, totalCasos, estados: { totalActivos, totalSentencia, totalApelacion, totalArchivado } });

    res.json({
      ok: true,
      totales: {
        abogados: totalAbogados,
        clientes: totalClientes,
        casosActivos: totalCasos,
        estados: {
          activo: totalActivos,
          sentencia: totalSentencia,
          apelacion: totalApelacion,
          archivado: totalArchivado
        }
      }
    });
  } catch (error) {
    console.error("Error en contadores backend:", error);
    res.status(500).json({ ok: false, mensaje: 'Error al obtener contadores' });
  }
});

export default rutas;