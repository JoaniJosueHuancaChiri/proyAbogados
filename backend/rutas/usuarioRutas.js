// 1. Importamos la función que acabamos de corregir en el CONTROLADOR
import { registrarUsuario } from "../controladores/usuarioControlador.js";
import express from 'express';

const rutas = express.Router();

// 2. Apuntamos al controlador
rutas.post('/', registrarUsuario);

export default rutas;