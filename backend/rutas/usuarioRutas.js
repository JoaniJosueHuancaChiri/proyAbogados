import {
  registrarUsuario,
  loginUsuario,
  listarAdministrador,
  actualizarUsuarioAdmin,
  removerUsuario,
  obtenerAbogados,
  actualizarUsuarioAbogado,
} from "../controladores/usuarioControlador.js";
import express from "express";
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
export default rutas;
