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

    const totalAbogados = resAbogados[0] ? resAbogados[0].total : 0;
    const totalClientes = resClientes[0] ? resClientes[0].total : 0;
    const totalCasos    = resCasos[0]    ? resCasos[0].total    : 0;

    console.log("Contadores calculados con éxito:", { totalAbogados, totalClientes, totalCasos });

    res.json({
      ok: true,
      totales: {
        abogados: totalAbogados,
        clientes: totalClientes,
        casosActivos: totalCasos
      }
    });
  } catch (error) {
    console.error("Error en contadores backend:", error);
    res.status(500).json({ ok: false, mensaje: 'Error al obtener contadores' });
  }
});

export default rutas;