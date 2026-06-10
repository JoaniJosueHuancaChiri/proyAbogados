import bcrypt from 'bcrypt';

const passwordLimpia = '123456';

async function generar() {
    const hashUnico = await bcrypt.hash(passwordLimpia, 10);
    
    console.log("========================================================");
    console.log(`Contraseña limpia: ${passwordLimpia}`);
    console.log(`Tu código Hash a copiar:\n\n${hashUnico}`);
    console.log("========================================================\n");
}

generar();