import { registrarUsuario, loginUsuario, listarAdministrador } from "../controladores/usuarioControlador.js";
import express from 'express';
import { verificarDispositivoUnico } from "../config/authMiddleware.js";
const rutas = express.Router();

rutas.post('/', registrarUsuario); 
rutas.post('/login', loginUsuario);
rutas.get("/verificar-token", verificarDispositivoUnico, (req, res) => {
  res.status(200).json({ ok: true, mensaje: "Sesión válida" });
});
rutas.get('/', listarAdministrador);
export default rutas;