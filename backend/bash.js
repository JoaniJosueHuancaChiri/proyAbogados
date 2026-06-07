import bcrypt from 'bcrypt';

const passwordLimpia = '123456';

async function generar() {
    // Generamos el hash usando el factor de costo 10, tal cual tu modelo
    const hashUnico = await bcrypt.hash(passwordLimpia, 10);
    
    console.log("========================================================");
    console.log(`Contraseña limpia: ${passwordLimpia}`);
    console.log(`Tu código Hash a copiar:\n\n${hashUnico}`);
    console.log("========================================================\n");
}

generar();