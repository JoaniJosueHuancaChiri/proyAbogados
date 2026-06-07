// 1. Importamos la función correcta desde tu modelo de usuarios
import { insertarUsuarioConRol } from '../modelos/usuarioModelo.js';

export const registrarUsuario = async (req, res) => {
    try {
        // Enviamos todo el body del frontend al modelo
        const usuarioNuevo = await insertarUsuarioConRol(req.body);
        
        // Devolvemos el estado 201 (Creado) junto al mensaje y usuario autogenerado
        res.status(201).json(usuarioNuevo);
    } catch (error) {
        // Si el modelo tira error (ej: CI duplicado), lo atrapamos aquí para que no muera el servidor
        console.error("Error en registrarUsuario:", error);
        res.status(500).json({ 
            mensaje: "Hubo un error al registrar el usuario", 
            error: error.message 
        });
    }
};