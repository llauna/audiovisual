require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Usuario = require('../src/models/Usuario');

const email = process.argv[2]; // Email del usuario
const nuevaPassword = process.argv[3]; // Nueva contraseña

if (!email || !nuevaPassword) {
    console.error("❌ Uso: node scripts/updatePasword.js <email> <nuevaPassword>");
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => {
        console.error('❌ Error de conexión:', err);
        process.exit(1);
    });

(async () => {
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            console.log(`⚠ No se encontró usuario con email: ${email}`);
            mongoose.connection.close();
            return;
        }

        const passwordHash = await bcrypt.hash(nuevaPassword, 10);
        usuario.password = passwordHash;
        await usuario.save();

        console.log(`✅ Contraseña actualizada para ${email}`);
    } catch (err) {
        console.error('❌ Error al actualizar contraseña:', err.message);
    } finally {
        mongoose.connection.close();
    }
})();
