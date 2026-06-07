import { pool } from '../config/bd.js';
import bcrypt from 'bcrypt';

export const insertarUsuarioConRol = async (datosUsuario) => {
    const {
        // Quitamos "usuario" de aquí porque ahora lo generaremos adentro
        password, tipoUsuario, nombre, paterno, materno, ci, 
        fechaNacimiento, genero, celular, token, fechaCreacion,
        rpa, especialidad, universidad,
        direccion, estadoCivil, ocupacion
    } = datosUsuario;

    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();

        // 1. GENERAR EL USUARIO AUTOMÁTICAMENTE
        // Tomamos la primera letra de cada campo y la juntamos con el CI
        const inicialPaterno = paterno ? paterno.trim().charAt(0) : '';
        const inicialMaterno = materno ? materno.trim().charAt(0) : '';
        const inicialNombre = nombre ? nombre.trim().charAt(0) : '';
        const limpiaCI = ci.trim(); // Quitamos espacios en blanco si tuviera

        // Armamos la cadena: ej. "lmn1234567" y lo pasamos a minúsculas para estandarizar
        const usuarioGenerado = `${inicialPaterno}${inicialMaterno}${inicialNombre}${limpiaCI}`.toUpperCase();

        // 2. HASHEAR LA CONTRASEÑA
        const passwordHasheado = await bcrypt.hash(password, 10);

        // Paso A: Insertar en la tabla PADRE (usando usuarioGenerado y passwordHasheado)
        const sqlUsuario = `
            INSERT INTO usuario (usuario, password, tipoUsuario, nombre, paterno, materno, ci, fechaNacimiento, genero, celular, token, fechaCreacion) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [resUsuario] = await conexion.query(sqlUsuario, [
            usuarioGenerado, // <-- Aquí entra el usuario autogenerado
            passwordHasheado, 
            tipoUsuario, nombre, paterno, materno, ci, fechaNacimiento, genero, celular, token, fechaCreacion
        ]);

        const nuevoIdUsuario = resUsuario.insertId;

        // Paso B: Insertar en tablas hijas según el tipo
        if (tipoUsuario === 'Abogado') {
            const sqlAbogado = `INSERT INTO abogado (idUsuario, rpa, especialidad, universidad) VALUES (?, ?, ?, ?)`;
            await conexion.query(sqlAbogado, [nuevoIdUsuario, rpa, especialidad, universidad]);
        } else if (tipoUsuario === 'Cliente') {
            const sqlCliente = `INSERT INTO cliente (idUsuario, direccion, estadoCivil, ocupacion) VALUES (?, ?, ?, ?)`;
            await conexion.query(sqlCliente, [nuevoIdUsuario, direccion, estadoCivil, ocupacion]);
        }

        await conexion.commit();
        
        // Devolvemos el usuario generado para que el controlador se lo pueda mostrar al Frontend
        return { 
            idUsuario: nuevoIdUsuario,
            usuario: usuarioGenerado,
            mensaje: `Usuario registrado con éxito. Su nombre de usuario asignado es: ${usuarioGenerado}` 
        };

    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
};