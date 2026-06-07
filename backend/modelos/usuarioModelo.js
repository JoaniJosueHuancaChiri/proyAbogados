import { pool } from '../config/bd.js';
import bcrypt from 'bcrypt';

export const insertarUsuarioConRol = async (datosUsuario) => {
    const {
        password, tipoUsuario, nombre, paterno, materno, ci, 
        fechaNacimiento, genero, celular, token, fechaCreacion,
        estado,
        rpa, especialidad, universidad,
        direccion, estadoCivil, ocupacion
    } = datosUsuario;

    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();

        // 1. GENERAR EL USUARIO AUTOMÁTICAMENTE
        const inicialPaterno = paterno ? paterno.trim().charAt(0) : '';
        const inicialMaterno = materno ? materno.trim().charAt(0) : '';
        const inicialNombre = nombre ? nombre.trim().charAt(0) : '';
        const limpiaCI = ci.trim();

        const usuarioGenerado = `${inicialPaterno}${inicialMaterno}${inicialNombre}${limpiaCI}`.toUpperCase();

        // 2. HASHEAR LA CONTRASEÑA
        const passwordHasheado = await bcrypt.hash(password, 10);

        // 3. CONTROLAR EL VALOR DEL ESTADO
        const estadoFinal = estado !== undefined ? estado : 1;

        // Paso A: Insertar en la tabla PADRE (usuario)
        const sqlUsuario = `
            INSERT INTO usuario (usuario, password, tipoUsuario, nombre, paterno, materno, ci, fechaNacimiento, genero, celular, token, fechaCreacion, estado) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [resUsuario] = await conexion.query(sqlUsuario, [
            usuarioGenerado, 
            passwordHasheado, 
            tipoUsuario, nombre, paterno, materno, ci, fechaNacimiento, genero, celular, token, fechaCreacion,
            estadoFinal
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
        
        return { 
            idUsuario: nuevoIdUsuario,
            usuario: usuarioGenerado,
            estado: estadoFinal,
            mensaje: `Usuario registrado con éxito. Su nombre de usuario asignado es: ${usuarioGenerado}` 
        };

    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
};

// BUSCAR USUARIO POR SU NOMBRE DE USUARIO (Para el Login)
export const buscarUsuarioPorNombre = async (nombreUsuario) => {
    const [resultado] = await pool.query(
        'SELECT * FROM usuario WHERE usuario = ?', 
        [nombreUsuario]
    );
    return resultado[0];
};