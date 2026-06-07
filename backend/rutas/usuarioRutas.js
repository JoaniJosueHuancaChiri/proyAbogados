// ❌ REVISIÓN: Si tu archivo está así, hay un choque de rutas:
import { registrarUsuario, loginUsuario } from "../controladores/usuarioControlador.js";
import express from 'express';

const rutas = express.Router();

rutas.post('/', registrarUsuario); // 👈 Esto maneja: POST http://localhost:8080/api/usuarios/
rutas.post('/login', loginUsuario); // 👈 Esto maneja: POST http://localhost:8080/api/usuarios/login

export default rutas;