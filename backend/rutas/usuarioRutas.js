import { registrarUsuario, loginUsuario } from "../controladores/usuarioControlador.js";
import express from 'express';

const rutas = express.Router();

rutas.post('/', registrarUsuario); 
rutas.post('/login', loginUsuario);

export default rutas;