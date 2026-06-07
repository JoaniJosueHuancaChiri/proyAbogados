import mysql from 'mysql2/promise';

// Conexión a MySQL
export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bdAbogado'
});